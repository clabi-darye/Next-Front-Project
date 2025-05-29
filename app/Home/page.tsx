"use client";

import { useRouter } from "next/navigation";

import { base64Encode } from "@/utils/encoding";
import { homeConfig } from "@/config/home.config";
import { usePromptInput } from "@/hooks/useHomeData";

import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Greeting from "@/components/Greeting";
import AiDisclaimer from "@/components/AiDisclaimer";

const HomePage = () => {
  const router = useRouter();

  const { data: promptInputData } = usePromptInput();

  const handleSearch = async (searchText: string) => {
    const obj = {
      title: searchText,
    };
    router.push(`/chat/${base64Encode(JSON.stringify(obj))}`);
  };

  return (
    <div className="h-full w-full p-[1rem] flex flex-col items-center">
      <div className="flex-1 overflow-auto flex flex-col items-center justify-center md:min-w-[640px]">
        <Image src={homeConfig.logo} alt="logo" />
        <Greeting className="mt-4" />
        <SearchBar
          className="mt-8"
          placeholder={promptInputData.input}
          onSearch={handleSearch}
        />
      </div>
      <AiDisclaimer className="mt-2" />
    </div>
  );
};

export default HomePage;
