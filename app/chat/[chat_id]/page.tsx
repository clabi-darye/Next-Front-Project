"use client";

import { useChatStore } from "@/store/useChatStore";

const ChatDetailPage = () => {
  const { searchText } = useChatStore();
  return (
    <div className="h-full w-full p-[1rem] flex flex-col items-center">
      응답 chat 화면 - {searchText}
    </div>
  );
};

export default ChatDetailPage;
