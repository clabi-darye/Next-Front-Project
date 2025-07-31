import { ProjectInfo } from "@/types/Common";
import { create } from "zustand";

interface ProjectState {
  projectInfo: ProjectInfo;
  setProjectInfo: (projectInfo: ProjectInfo) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectInfo: {
    greeting: {
      id: 0,
      main_greeting: "",
      light_logo_url: "/",
      dark_logo_url: "/",
    },
    prompt: {
      id: 0,
      input: "",
    },
    example_questions: [],
  },
  setProjectInfo: (projectInfo) => set({ projectInfo }),
}));
