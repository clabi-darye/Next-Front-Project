// hooks/useAiStreaming.ts
import { useRef, useState } from "react";
import { processAiStream } from "@/lib/aiStream";
import { StreamEvent, StreamEndEvent } from "@/types/Stream";
import { fetchAiStream } from "@/services/aiStreamService";

export function useAiStreaming({
  chatGroupId,
  question,
  onComplete,
  onError,
}: {
  chatGroupId: number | undefined;
  question: string;
  onComplete: (event: StreamEndEvent, stages: StreamEvent[]) => Promise<void>;
  onError: (err: Error) => void;
}) {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [streamId, setStreamId] = useState<number>();
  const [streamText, setStreamText] = useState("");
  const [streamStages, setStreamStages] = useState<StreamEvent[]>([]);

  const stagesRef = useRef<StreamEvent[]>([]); // 최신 값 보존용
  const textRef = useRef<string>("");

  const start = async () => {
    if (!chatGroupId) return;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStreamText("");
    setStreamStages([]);
    stagesRef.current = [];
    textRef.current = "";

    try {
      const stream = await fetchAiStream(
        question,
        chatGroupId,
        controller.signal
      );

      await processAiStream(
        stream,
        (event) => {
          if (event.type === "eventId") {
            setStreamId(event.eventId as number);
          } else if (event.type === "main" || event.type === "sub") {
            stagesRef.current.push({ ...event, id: Date.now() });
            setStreamStages([...stagesRef.current]); // 렌더링용 상태 갱신
          } else {
            textRef.current += event.text || "";
            setStreamText(textRef.current); // 렌더링용 상태 갱신
          }
        },
        (event) => onComplete(event, stagesRef.current), // 최신 값 사용
        onError
      );
    } catch (err: any) {
      onError(err);
    }
  };

  const stop = () => {
    abortControllerRef.current?.abort();
  };

  return {
    start,
    stop,
    streamId,
    streamText,
    streamStages,
  };
}
