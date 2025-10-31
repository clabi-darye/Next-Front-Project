import ChatDetailPageView from "@/components/Chat/ChatDetailPageView";
import { createShareCode, fetchSavedChat } from "@/services/chatService";
import { base64Decode } from "@/utils/encoding";

// 페이지 캐시 비활성화
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ChatDetailPageProps {
  params: Promise<{ chatGroupId: string }>;
}

const ChatDetailPage = async ({ params }: ChatDetailPageProps) => {
  const { chatGroupId } = await params;

  if (!chatGroupId) {
    throw new Error("Not found");
  }

  const decoded = base64Decode(chatGroupId);
  const groupId = Number(decoded);

  // 서버에서 초기 데이터 fetch
  const shareCodeData = await createShareCode(groupId);
  const chatGroupData = await fetchSavedChat(shareCodeData.encoded_data);

  return (
    <ChatDetailPageView
      key={`chat-detail-${groupId}-${Date.now()}`}
      initialChatGroupData={chatGroupData}
      groupId={groupId}
    />
  );
};

export default ChatDetailPage;
