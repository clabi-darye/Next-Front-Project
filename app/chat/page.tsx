"use client";

import { useRouter } from "next/navigation";

import { base64Encode } from "@/utils/encoding";
import { usePromptInput } from "@/hooks/useHomeData";

import Greeting from "@/components/Greeting";
import SearchBar from "@/components/SearchBar";

const ChatPage = () => {
  const router = useRouter();

  const { data: promptInputData } = usePromptInput();

  const handleSearch = async (query: string) => {
    router.push(`/chat/${base64Encode(query.trim())}`);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Greeting />
      <SearchBar
        className="mt-8"
        placeholder={promptInputData.input}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ChatPage;
