import { fetchGreeting, fetchPromptInput } from "@/api/home/route";
import { useQuery } from "@tanstack/react-query";

export const usePromptInput = () => {
  return useQuery({
    queryKey: ["PromptInput"],
    queryFn: fetchPromptInput,
    initialData: { id: 0, input: "검색어를 입력하세요" },
  });
};

export const useGrerting = () => {
  return useQuery({
    queryKey: ["Greeting"],
    queryFn: fetchGreeting,
    initialData: {
      id: 0,
      mainGreeting: "CLARIO는 아래와 같은 내용에 대한 질의응답이 가능합니다.",
    },
  });
};
