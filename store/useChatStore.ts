import { create } from "zustand";

interface ChatState {
  query: string;
  setQuery: (query: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
