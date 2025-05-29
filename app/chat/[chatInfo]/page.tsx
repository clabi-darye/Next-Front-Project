"use client";

import { use, useEffect, useRef, useState } from "react";

import {
  useCreateChatGroup,
  useCreateShareCode,
  useFetchSavedChat,
  useSaveChat,
} from "@/hooks/useChatData";
import { base64Decode } from "@/utils/encoding";
import { saveChatGroupToIndexedDB } from "@/utils/indexedDB";
import { processAiStream } from "@/lib/streamProcessor";
import { fetchAiStream } from "@/services/aiStreamService";

import { StreamEndEvent, StreamEvent } from "@/types/Stream";
import SearchBar from "@/components/SearchBar";
import { usePromptInput } from "@/hooks/useHomeData";
import { useRouter } from "next/navigation";
import { useChatHistoryStore } from "@/store/useChatHistoryStore";

interface PageProps {
  params: Promise<{
    chatInfo: string;
  }>;
}

const ChatDetailPage = ({ params }: PageProps) => {
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null);

  const { chatInfo } = use(params);
  const { addHistory } = useChatHistoryStore();

  const { mutate: createChatGroupMutate, data: chatGroup } =
    useCreateChatGroup();
  const { mutate: saveChatMutate } = useSaveChat();
  const { mutateAsync: shareCodeMutate } = useCreateShareCode();
  const { mutateAsync: savedChatMutate } = useFetchSavedChat();
  const { data: promptInputData } = usePromptInput();

  const [streamId, setStreamId] = useState<number>();
  const [streamText, setStreamText] = useState("");
  const [streamStages, setStreamStages] = useState<StreamEvent[]>([]);
  const [chatQuestion, setChatQuestion] = useState<string>("");

  useEffect(() => {
    if (!chatInfo) return;

    try {
      const decoded = base64Decode(chatInfo);
      const parsed = JSON.parse(decoded);
      const { title } = parsed;
      setChatQuestion(title);

      createChatGroupMutate({ title });
    } catch {
      getSavedChat(chatInfo);
    }
  }, []);

  useEffect(() => {
    if (!chatGroup?.chat_group_id) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    handleChatFlow(controller);

    return () => controller.abort();
  }, [chatGroup?.chat_group_id]);

  const getSavedChat = async (encodedData: string) => {
    const savedChatData = await savedChatMutate({ encodedData });
    const { chat_answer } = savedChatData.chats[0];
    setStreamText(chat_answer);
  };

  const handleChatFlow = async (controller: AbortController) => {
    try {
      await startAiStream(controller);
    } catch (error) {
      console.error("채팅 흐름 처리 중 오류:", error);
    }
  };

  const startAiStream = async (controller: AbortController) => {
    if (!chatGroup) return;

    try {
      const stream = await fetchAiStream(
        chatQuestion,
        chatGroup.chat_group_id,
        controller.signal
      );

      await processAiStream(
        stream,
        handleStreamingEvent,
        onStreamingComplete,
        onStreamingError
      );
    } catch (error) {
      console.error("스트리밍 시작 에러:", error);
    }
  };

  const handleStreamingEvent = (event: StreamEvent) => {
    if (!event) return;

    switch (event.type) {
      case "eventId":
        setStreamId(event.eventId as number);
        break;
      case "main":
      case "sub":
        setStreamStages((prev) => [...prev, { ...event, id: Date.now() }]);
        break;
      default:
        setStreamText((prev) => prev + (event.text || ""));
    }
  };

  const onStreamingComplete = async (event: StreamEndEvent) => {
    if (!chatGroup) return;

    const chatData = extractChatDataFromEvent(
      event,
      chatGroup.chat_group_id,
      streamStages
    );

    await saveChatMutate({ chatData });

    const shareCodeData = await shareCodeMutate({
      groupId: chatGroup.chat_group_id,
    });
    await saveChatGroupToIndexedDB({
      id: chatGroup.chat_group_id,
      title: chatQuestion,
      shareCode: shareCodeData.encoded_data,
    });
    addHistory({
      id: chatGroup.chat_group_id,
      title: chatQuestion,
      shareCode: shareCodeData.encoded_data,
    });

    router.replace(`/chat/${shareCodeData.encoded_data}`);
  };

  const extractChatDataFromEvent = (
    event: StreamEndEvent,
    chatGroupId: number,
    chat_history_list: {
      type: string;
      text: string;
    }[]
  ) => {
    const {
      chat_question = "",
      chat_answer = "",
      ip_address = "",
      use_token_count = 0,
      latency = 0,
      action = "",
      sub_action = "",
      recommended_questions = [],
      reference = [],
      images = [],
    } = event;

    const formattedRecommendedQuestions = recommended_questions.map(
      (question) => ({ question, answer: "" })
    );

    return {
      chat_question,
      chat_answer,
      chat_group_id: chatGroupId,
      ip_address,
      use_token_count,
      latency,
      action,
      sub_action,
      recommended_questions: formattedRecommendedQuestions,
      references: reference,
      images,
      chat_history_list,
    };
  };

  const onStreamingError = (err: Error) => {
    console.error("❌ 스트리밍 중 오류 발생:", err);
  };

  const handleSearch = (searchText: string) => {
    console.log(`멀티턴: ${searchText}`);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      <div className="overflow-y-auto">
        <div className="h-full w-full flex flex-col items-center">
          {streamStages.map((item: StreamEvent, index: number) => (
            <div key={`answerMetadataList_${index}`}>
              {item.type + String(item?.text)}
            </div>
          ))}
          <div dangerouslySetInnerHTML={{ __html: streamText }} />
        </div>
      </div>
      <SearchBar
        className="mt-8"
        placeholder={promptInputData.input}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ChatDetailPage;
