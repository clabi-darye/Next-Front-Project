"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";

import { useChatGroup } from "@/hooks/useChatData";
import { base64Decode } from "@/utils/encoding";
import {
  getChatGroupByTitle,
  saveChatGroupToIndexedDB,
} from "@/utils/indexedDB";
import { processAiStream } from "@/lib/streamProcessor";

import { fetchAiStream } from "@/services/aiStreamService";

import { StreamEvent } from "@/types/Stream";

interface PageProps {
  params: Promise<{ chatTitle: string }>;
}

const ChatDetailPage = ({ params }: PageProps) => {
  const { chatTitle } = use(params);
  const { mutate, data: chatGroup } = useChatGroup();

  const abortControllerRef = useRef<AbortController | null>(null);

  const [streamId, setStreamId] = useState<number>();
  const [streamText, setStreamText] = useState("");
  const [streamStages, setStreamStages] = useState<StreamEvent[]>([]);

  // chatTitle 디코딩
  const decodedChatTitle = useMemo(() => {
    return chatTitle ? base64Decode(chatTitle) : "";
  }, [chatTitle]);

  // 디코딩된 제목으로 그룹 데이터 가져오기
  useEffect(() => {
    if (!decodedChatTitle) return;
    mutate({ title: decodedChatTitle });
  }, [decodedChatTitle]);

  useEffect(() => {
    if (!chatGroup?.chat_group_id) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    checkAndStartChatStream(controller);

    return () => controller.abort();
  }, [chatGroup?.chat_group_id]);

  const checkAndStartChatStream = async (controller: AbortController) => {
    const exists = await doesChatGroupExist(decodedChatTitle);

    if (exists) {
      console.log("이미 처리된 응답: API 호출 생략");
      return;
    }

    await startAiStream(controller);
  };

  // IndexedDB에서 채팅 그룹 존재 여부 확인
  const doesChatGroupExist = async (title: string): Promise<boolean> => {
    try {
      return await getChatGroupByTitle(title);
    } catch (error) {
      console.error("IndexedDB 조회 에러:", error);
      return false;
    }
  };

  // 스트림 시작 함수
  const startAiStream = async (controller: AbortController) => {
    if (!chatGroup) return;

    try {
      const stream = await fetchAiStream(
        decodedChatTitle,
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

  // 스트리밍 중 이벤트 처리 함수
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

  // 스트리밍 완료 시 처리
  const onStreamingComplete = async () => {
    console.log("✅ 스트리밍 완료: 후처리 작업 수행 예정");

    if (!chatGroup) return;
    await saveChatGroupToIndexedDB({
      id: chatGroup?.chat_group_id,
      title: decodedChatTitle,
    });
  };

  // 스트리밍 중 에러 발생 시
  const onStreamingError = (err: Error) => {
    console.error("❌ 스트리밍 중 오류 발생:", err);
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      {streamStages.map((item: StreamEvent, index: number) => (
        <div key={`answerMetadataList_${index}`}>
          {item.type + String(item?.text)}
        </div>
      ))}
      <div dangerouslySetInnerHTML={{ __html: streamText }} />
    </div>
  );
};

export default ChatDetailPage;
