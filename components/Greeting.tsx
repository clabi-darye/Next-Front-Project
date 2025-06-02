import React from "react";
import { useFetchGreeting } from "@/hooks/useHomeData";

const Greeting = ({ className }: { className?: string }) => {
  const { data: greetingData } = useFetchGreeting();

  return (
    <div
      className={`text-cente ${className}`}
      dangerouslySetInnerHTML={{ __html: greetingData.mainGreeting }}
    />
  );
};

export default Greeting;
