import React from "react";
import { useGreeting } from "@/hooks/useHomeData";

const Greeting = ({ className }: { className?: string }) => {
  const { data: greetingData } = useGreeting();

  return (
    <div
      className={`text-cente ${className}`}
      dangerouslySetInnerHTML={{ __html: greetingData.mainGreeting }}
    />
  );
};

export default Greeting;
