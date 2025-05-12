"use client";

import React from "react";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import { DrawerItem } from "../types/Drawer";

interface Props {
  item: DrawerItem;
  isOpen: boolean;
  onClick: (item: DrawerItem) => void;
}

const DrawerMenuItem = ({ item, isOpen, onClick }: Props) => {
  const buttonStyle = {
    backgroundColor: "#fff",
    color: "#000",
    margin: "0 1rem",
    borderRadius: "10px",
    ":hover": {
      backgroundColor: "#f5f5f5",
    },
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => onClick(item)}
          sx={item.type === "button" ? buttonStyle : {}}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            {item.icon && (
              <item.icon
                className={
                  item.type === "toggle" && !isOpen ? "rotate-180" : ""
                }
              />
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>

      {item.type === "toggle" && item.subList && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {item.subList}
        </Collapse>
      )}
    </>
  );
};

export default DrawerMenuItem;
