import { ChatGroupResponse } from "@/types/Chat";
import { baseService } from "./baseService";

export const createChatGroup = async (
  title: string
): Promise<ChatGroupResponse> => {
  const response = await baseService.post(`/chat/group`, { title });
  return response.data;
};
