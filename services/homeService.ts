import { baseService } from "./baseService";

export const fetchPromptInput = async (): Promise<{
  id: number;
  input: string;
}> => {
  const response = await baseService.get(`/prompt-input`);
  return response.data[0];
};

export const fetchGreeting = async (): Promise<{
  id: number;
  mainGreeting: string;
}> => {
  const response = await baseService.get(`/greeting`);
  return response.data[0];
};
