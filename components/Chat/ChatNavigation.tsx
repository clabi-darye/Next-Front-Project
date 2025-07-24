import clsx from "clsx";

import { Button, IconButton } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import ShareDialog from "./ShareDialog";
import { useState } from "react";

interface ChatNavigationProps {
  className?: string;
}

const ChatNavigation = ({ className }: ChatNavigationProps) => {
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        className,
        "flex justify-end items-center mt-3 mb-1 mx-2"
      )}
    >
      <Button
        color="basic"
        variant="outlined"
        size="small"
        sx={{
          height: "30px",
        }}
        onClick={() => setShareDialogOpen(true)}
      >
        <ShareIcon
          sx={{
            fontSize: "18px",
            marginRight: "4px",
          }}
        />
        공유
      </Button>
      <IconButton>
        <SettingsIcon />
      </IconButton>

      <ShareDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
      />
    </div>
  );
};

export default ChatNavigation;
