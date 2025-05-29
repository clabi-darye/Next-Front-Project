import { useMutation } from "@tanstack/react-query";
import { createChatGroup } from "@/services/chatService";

export const useChatGroup = () => {
  return useMutation({
    mutationFn: ({ title }: { title: string }) => createChatGroup(title),
  });
};
