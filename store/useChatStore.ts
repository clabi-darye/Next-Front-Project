import { create } from "zustand";

interface ChatState {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),
}));
