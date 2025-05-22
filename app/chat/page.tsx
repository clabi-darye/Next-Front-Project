"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "next/navigation";
import { base64Encode } from "@/utils/encoding";

const ChatPage = () => {
  const router = useRouter();
  const { searchText } = useChatStore();

  useEffect(() => {
    if (!searchText) return;
    const encoded = base64Encode(searchText);
    router.replace(`/chat/${encoded}`);
  }, [searchText, router]);

  return (
    <div className="h-full w-full p-[1rem] flex flex-col items-center">
      기본 chat 화면
    </div>
  );
};

export default ChatPage;
