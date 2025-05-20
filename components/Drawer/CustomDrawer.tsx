"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDrawerStore } from "../../store/useDrawerStore";
import { useChatHistoryStore } from "../../store/useChatHistoryStore";
import { drawerWidth, drawerMenuList } from "../../config/drawer.config";

import { Drawer, IconButton, List } from "@mui/material";
import DrawerMenuItem from "./DrawerMenuItem";

import MenuIcon from "@mui/icons-material/Menu";

import { DrawerItem } from "../../types/Drawer";

const CustomDrawer = () => {
  const router = useRouter();
  const { isOpen, setOpen } = useDrawerStore();
  const { histories } = useChatHistoryStore();

  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialToggles = drawerMenuList
      .filter((item) => item.type === "toggle")
      .reduce((acc, item) => {
        acc[item.key] = true;
        return acc;
      }, {} as Record<string, boolean>);

    setToggleStates(initialToggles);
  }, []);

  useEffect(() => {
    router.prefetch("/chat");
  }, [router]);

  const handleListItemClick = (drawerItem: DrawerItem) => {
    if (drawerItem.link) {
      router.push(drawerItem.link);
      return;
    }

    if (drawerItem.type === "toggle") {
      setToggleStates((prev) => ({
        ...prev,
        [drawerItem.key]: !prev[drawerItem.key],
      }));
      return;
    }

    if (drawerItem.key === "style") {
      console.log("스타일 변경 다이얼로그 open");
    }
  };

  return (
    <>
      {/* toggle icon */}
      <div className="px-2 pt-1 fixed">
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon></MenuIcon>
        </IconButton>
      </div>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        {/* toggle icon */}
        <div className="px-2 pt-1 bg-drawer-bg text-drawer-text">
          <IconButton
            color="inherit"
            onClick={() => {
              setOpen(false);
            }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
        </div>

        {/* Drawer Item*/}
        <List
          className="bg-drawer-bg text-drawer-text h-[100vh] overflow-auto"
          key="drawerItems"
        >
          {drawerMenuList.map((menu) =>
            menu.key === "history" && histories.length === 0 ? null : (
              <DrawerMenuItem
                key={menu.key}
                item={menu}
                isOpen={toggleStates[menu.key] ?? false}
                onClick={handleListItemClick}
              />
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
