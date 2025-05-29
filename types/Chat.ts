export interface ChatGroupResponse {
  chat_group_id: number;
  title: string;
  chats: Chat[];
  created_at: string;
  updated_at: string;
}

export interface Chat {
  chat_id: number;
  ip_address: string;
  chat_question: string;
  chat_answer: string;
  use_token_count: number;
  latency: number;
  action: string;
  sub_action: string;
  recommended_questions: [
    {
      question: string;
      answer: string;
    }
  ];
  references: [
    {
      referenceType: string;
      referenceContent: string;
    }
  ];
  images: [
    {
      imageUrl: string;
      imageType: string;
    }
  ];
  chat_history_list: {
    [key: string]: string;
  }[];
  chat_group_id: number;
  created_at: string;
  updated_at: string;
}
