import { useChatHistoryStore } from "@/store/useChatHistoryStore";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const ChatHistoryList = () => {
  const { histories } = useChatHistoryStore();

  return (
    <List component="div" disablePadding key="histories">
      {histories.map((item, index) => (
        <ListItemButton
          sx={{ pl: 4, py: "2px" }}
          key={`${item.title}-${index}`}
        >
          <ListItemIcon sx={{ minWidth: "32px" }} />
          <ListItemText
            primary={item.title}
            sx={{
              fontSize: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export default ChatHistoryList;
