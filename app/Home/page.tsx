"use client";

import { homeConfig } from "@/config/home.config";
import { useGrerting, usePromptInput } from "@/hooks/useHomeData";

import Image from "next/image";
import SearchBar from "@/components/SearchBar";

const HomePage = () => {
  const { data: promptInputData } = usePromptInput();
  const { data: grertingData } = useGrerting();

  return (
    <div className="h-full w-full p-[1rem] flex flex-col items-center">
      <div className="flex-1 overflow-auto flex flex-col items-center justify-center min-w-[640px]">
        <Image src={homeConfig.logo} alt="logo" />
        <div
          className="mt-4 text-center"
          dangerouslySetInnerHTML={{ __html: grertingData.mainGreeting }}
        />
        <SearchBar className="mt-8" placeholder={promptInputData.input} />
      </div>
      <div
        className="text-gray-400 text-xs"
        dangerouslySetInnerHTML={{ __html: homeConfig.aiDisclaimer }}
      ></div>
    </div>
  );
};

export default HomePage;
