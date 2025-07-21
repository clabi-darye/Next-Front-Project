"use client";

import { use, useEffect, useRef, useState } from "react";
import { useAiStreaming } from "@/hooks/useAiStreaming";
import { useCreateChatGroup, useFetchSavedChat } from "@/hooks/useChatData";
import { base64Decode } from "@/utils/encoding";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useFetchSetting } from "@/hooks/useHomeData";

import SearchBar from "@/components/Common/SearchBar";
import UserActionForm from "@/components/Chat/UserActionForm";
import PastChatsListview from "@/components/Chat/PastChatsListview";
import CurrentChatView from "@/components/Chat/CurrentChatView";

import { ChatListItem } from "@/types/Chat";

const ChatDetailPage = ({
  params,
}: {
  params: Promise<{ chatInfo: string }>;
}) => {
  const { data: settingData } = useFetchSetting();

  const { chatInfo } = use(params);
  const { mutateAsync: fetchSavedChat } = useFetchSavedChat();
  const { mutateAsync: createChatGroup } = useCreateChatGroup();

  const [chatGroupId, setChatGroupId] = useState<number>();
  const [pastChats, setPastChats] = useState<ChatListItem[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [isRecommend, setIsRecommend] = useState<boolean>(false);

  const {
    streamStages,
    streamText,
    recommendedQuestions,
    references,
    isFinished,
    abortStreaming,
  } = useAiStreaming(chatGroupId, newQuestion, isRecommend);

  useEffect(() => {
    return () => {
      abortStreaming?.();
    };
  }, []);

  const {
    containerRef: chatWrapRef,
    isUserScrolling,
    scrollToBottom,
  } = useAutoScroll<HTMLDivElement>();

  // 콘텐츠 변화 시 자동 스크롤
  useEffect(() => {
    if (!isUserScrolling) {
      scrollToBottom();
    }
  }, [pastChats, streamStages, newQuestion, streamText]);

  // 초기 마운트 시 처리
  useEffect(() => {
    if (!chatInfo) return;

    const init = async () => {
      try {
        // 새로운 검색으로 접근 시
        const decoded = base64Decode(chatInfo);
        const parsed = JSON.parse(decoded);
        const { title } = parsed;
        handleCreateNewChat(title);
      } catch {
        // Chat History에서 접근 시
        fetchSavedChat({ encodedData: chatInfo }).then((data) => {
          setChatGroupId(data.chat_group_id);
          const list = data.chats.map((chat) => {
            return {
              chatId: chat.chat_id ?? undefined,
              question: chat.chat_question ?? "",
              streamStages: chat.chat_history_list ?? [],
              streamText: chat.chat_answer ?? "",
              recommendedQuestions: chat.recommended_questions ?? [],
              references: chat.references ?? [],
            };
          });
          setPastChats(list);
        });
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatInfo]);

  const handleCreateNewChat = async (title: string) => {
    try {
      const chatGroup = await createChatGroup({ title });
      setChatGroupId(chatGroup.chat_group_id);
      setNewQuestion(title);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (text: string, isRecommend = false) => {
    if (!text) return;

    setIsRecommend(isRecommend);
    setNewQuestion(text);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between">
      {/* 스트리밍 준 사용자 액션 영역 */}
      <UserActionForm></UserActionForm>

      <div
        id="chatwrap"
        ref={chatWrapRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {/* 이전 채팅 목록 */}
        {pastChats.length > 0 && (
          <PastChatsListview chatList={pastChats} onSearch={handleSearch} />
        )}

        {/* 새 질문 응답 영역 */}
        {newQuestion && (
          <CurrentChatView
            className={pastChats.length === 0 ? "" : "mt-10"}
            question={newQuestion}
            streamStages={streamStages}
            streamText={streamText}
            isFinished={isFinished}
            references={references}
            recommendedQuestions={recommendedQuestions}
            onSearch={handleSearch}
            hasPastChats={pastChats.length > 0}
          />
        )}
      </div>

      <SearchBar
        className="mt-4 mx-auto w-[90%]"
        placeholder={settingData.prompt.input}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ChatDetailPage;
