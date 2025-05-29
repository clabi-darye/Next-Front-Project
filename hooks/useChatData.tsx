import { useMutation } from "@tanstack/react-query";

import {
  saveChat,
  createChatGroup,
  updateChat,
  createShareCode,
  fetchSavedChat,
} from "@/services/chatService";

import { Chat } from "@/types/Chat";

export const useCreateChatGroup = () => {
  return useMutation({
    mutationFn: ({ title }: { title: string }) => createChatGroup(title),
  });
};

export const useSaveChat = () => {
  return useMutation({
    mutationFn: ({ chatData }: { chatData: Chat }) => saveChat(chatData),
  });
};

export const useUpdateChat = () => {
  return useMutation({
    mutationFn: ({ chatData }: { chatData: Chat }) => updateChat(chatData),
  });
};

export const useCreateShareCode = () => {
  return useMutation({
    mutationFn: ({ groupId }: { groupId: number }) => createShareCode(groupId),
  });
};

export const useFetchSavedChat = () => {
  return useMutation({
    mutationFn: ({ encodedData }: { encodedData: string }) =>
      fetchSavedChat(encodedData),
  });
};
