import { useAlertStore } from "@/store/useAlertStore";

import { IconButton } from "@mui/material";

import ChatVoiceIcon from "@/public/icons/ChatVoiceIcon";
import ChatDislikeIcon from "@/public/icons/ChatDislikeIcon";
import ChatlikeIcon from "@/public/icons/ChatlikeIcon";
import ChatCopyIcon from "@/public/icons/ChatCopyIcon";

const FeedBack = ({ streamText }: { streamText: string }) => {
  const openAlert = useAlertStore((state) => state.openAlert);

  const handleCopy = () => {
    navigator.clipboard.writeText(streamText);
    openAlert({
      severity: "success",
      message: "클립보드에 복사되었습니다.",
    });
  };

  return (
    <div className="flex items-center mt-2">
      <IconButton sx={{ padding: "2px" }} onClick={handleCopy}>
        <ChatCopyIcon />
      </IconButton>
      <IconButton sx={{ padding: "2px" }}>
        <ChatlikeIcon />
      </IconButton>
      <IconButton sx={{ padding: "2px" }}>
        <ChatDislikeIcon />
      </IconButton>
      <IconButton sx={{ padding: "2px" }}>
        <ChatVoiceIcon />
      </IconButton>
    </div>
  );
};

export default FeedBack;
