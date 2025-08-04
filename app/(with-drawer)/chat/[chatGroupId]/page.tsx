import ChatDetailPageView from "@/components/Chat/ChatDetailPageView";
import { createShareCode, fetchSavedChat } from "@/services/chatService";
import { base64Decode } from "@/utils/encoding";
import { notFound } from "next/navigation";

interface ChatDetailPageProps {
  params: { chatGroupId: string };
}

const ChatDetailPage = async ({ params }: ChatDetailPageProps) => {
  const { chatGroupId } = params;

  console.log("ChatDetailPage - chatGroupId:", chatGroupId);

  // 1. chatGroupId 유효성 검사
  if (!chatGroupId) {
    console.error("ChatDetailPage - chatGroupId is missing");
    notFound();
  }

  let groupId: number;

  try {
    // 2. base64 디코딩 및 숫자 변환
    const decoded = base64Decode(chatGroupId);
    console.log("ChatDetailPage - decoded:", decoded);

    groupId = Number(decoded);

    // 숫자 유효성 검사
    if (isNaN(groupId) || groupId <= 0) {
      console.error("ChatDetailPage - Invalid groupId:", decoded);
      notFound();
    }
  } catch (error) {
    console.error("ChatDetailPage - Base64 decode error:", error);
    notFound();
  }

  try {
    // 3. shareCode 생성
    console.log("ChatDetailPage - Creating share code for groupId:", groupId);
    const shareCodeData = await createShareCode(groupId);
    console.log("ChatDetailPage - Share code created:", shareCodeData);

    let chatGroupData;

    try {
      // 4. 채팅 데이터 fetch
      console.log(
        "ChatDetailPage - Fetching chat data with encoded_data:",
        shareCodeData.encoded_data
      );
      chatGroupData = await fetchSavedChat(shareCodeData.encoded_data);
    } catch (fetchError) {
      console.error("ChatDetailPage - Fetch chat error:", fetchError);
      // fallback 데이터 사용
      chatGroupData = {
        chat_group_id: groupId,
        chats: [],
      };
    }

    console.log("ChatDetailPage - Final chatGroupData:", chatGroupData);

    return (
      <ChatDetailPageView
        initialChatGroupData={chatGroupData}
        groupId={groupId}
      />
    );
  } catch (error) {
    console.error("ChatDetailPage - Share code creation error:", error);

    // createShareCode 실패 시에도 기본 데이터로 렌더링 시도
    const fallbackData = {
      chat_group_id: groupId,
      chats: [],
    };

    return (
      <ChatDetailPageView
        initialChatGroupData={fallbackData}
        groupId={groupId}
      />
    );
  }
};

export default ChatDetailPage;
