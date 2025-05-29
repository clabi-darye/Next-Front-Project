import { parseStreamEvent } from "@/utils/parseEvent";
import { StreamEndEvent, StreamEvent } from "@/types/Stream";

export const processAiStream = async (
  stream: ReadableStream<Uint8Array>,
  onEvent: (data: StreamEvent) => void,
  onDone?: (data: StreamEndEvent) => void,
  onError?: (err: Error) => void
) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() || "";

      for (const raw of chunks) {
        const { eventType, eventData, eventId } = parseStreamEvent(raw);

        if (
          (eventType === "ClarioStatus" || eventType === "ClarioResponse") &&
          eventData
        ) {
          const eventPayload: StreamEvent = JSON.parse(eventData);

          if (eventPayload.type === "all") {
            onDone?.(eventPayload);
          } else {
            onEvent(eventPayload);
          }
        }

        if (eventType === "ClarioMessageID" && eventId) {
          onEvent({ type: "eventId", eventId });
        }
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      onError?.(err);
    } else {
      onError?.(new Error("Unknown stream processing error"));
    }
  }
};
