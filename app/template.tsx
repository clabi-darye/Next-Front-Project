"use client";

import { useDrawerStore } from "@/store/useDrawerStore";
import { drawerConfig } from "../config/drawer.config";

const Template = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useDrawerStore();

  return (
    <section
      className="h-[100vh]"
      style={{
        width: `calc(100% - ${isOpen ? drawerConfig.drawerWidth : 0}px)`,
        marginLeft: `${isOpen ? drawerConfig.drawerWidth : 0}px`,
        transitionDuration: "0.225s",
      }}
    >
      {children}
    </section>
  );
};

export default Template;
