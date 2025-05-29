export const parseStreamEvent = (raw: string) => {
  const lines = raw.split("\n");
  const result: { eventType?: string; eventData?: string; eventId?: string } =
    {};

  for (const line of lines) {
    if (line.startsWith("event:"))
      result.eventType = line.replace("event:", "").trim();
    else if (line.startsWith("data:"))
      result.eventData = line.replace("data:", "").trim();
    else if (line.startsWith("id:"))
      result.eventId = line.replace("id:", "").trim();
  }

  return result;
};
