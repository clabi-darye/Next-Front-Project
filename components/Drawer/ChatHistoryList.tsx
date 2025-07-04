import { useChatHistoryStore } from "@/store/useChatHistoryStore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

const ChatHistoryList = () => {
  const { histories } = useChatHistoryStore();

  return (
    <List component="div" disablePadding key="histories">
      {histories.map((item, index) => (
        <ListItemButton
          sx={{
            pl: 4,
            py: "2px",
            "&:hover .more-icon": {
              display: "inline-flex",
            },
          }}
          key={`${item.title}-${index}`}
        >
          <Link
            href={`/chat/${item.shareCode}`}
            className="w-[calc(100%-32px)] flex align-center"
          >
            <ListItemText
              className="flex align-center"
              primary={item.title}
              sx={{ maxWidth: 200 }}
              slotProps={{
                primary: {
                  sx: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                  },
                },
              }}
            />
          </Link>
          <ListItemIcon
            className="more-icon ml-2"
            sx={{
              minWidth: "24px",
              display: "none",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("open");
            }}
          >
            <MoreHorizIcon sx={{ color: "white" }}></MoreHorizIcon>
          </ListItemIcon>
        </ListItemButton>
      ))}
    </List>
  );
};

export default ChatHistoryList;
