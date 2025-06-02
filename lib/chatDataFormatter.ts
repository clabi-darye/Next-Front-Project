import { StreamEndEvent } from "@/types/Stream";

export const formatChatSaveData = (
  event: StreamEndEvent,
  chatGroupId: number,
  chat_history_list: {
    type: string;
    text: string;
  }[]
) => {
  const {
    chat_question = "",
    chat_answer = "",
    ip_address = "",
    use_token_count = 0,
    latency = 0,
    action = "",
    sub_action = "",
    recommended_questions = [],
    reference = [],
    images = [],
  } = event;

  const formattedRecommendedQuestions = recommended_questions.map(
    (question) => ({ question, answer: "" })
  );

  return {
    chat_question,
    chat_answer,
    chat_group_id: chatGroupId,
    ip_address,
    use_token_count,
    latency,
    action,
    sub_action,
    recommended_questions: formattedRecommendedQuestions,
    references: reference,
    images,
    chat_history_list,
  };
};
