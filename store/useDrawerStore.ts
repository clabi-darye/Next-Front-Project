import { Filter } from "@/types/Filter";
import { create } from "zustand";

interface DrawerState {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface FilterState {
  selectedFilters: Filter[];
  filterTags: string[];
  setSelectedFilters: (filter: Filter[]) => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: true,
  setOpen: (isOpen) => set({ isOpen }),
}));

export const useFilterStore = create<FilterState>((set) => ({
  selectedFilters: [],
  filterTags: [],
  setSelectedFilters: (filters: Filter[]) => {
    set({
      selectedFilters: filters,
      filterTags: filters
        .filter((f: Filter) => f.depth === 3 && f.description)
        .map((f: Filter) => f.description),
    });
  },
}));
