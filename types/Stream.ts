export interface StreamEvent {
  type: string;
  [key: string]: unknown;
}

export interface StreamEndEvent {
  type?: string;
  chat_question?: string;
  chat_ai_group_id?: string;
  ip_address?: string;
  action?: string;
  sub_action?: string;
  use_token_count?: number;
  latency?: number;
  clario_uuid?: string;
  chat_answer?: string;
  reference?: unknown[];
  recommended_questions?: unknown[];
  images?: unknown[];
  [key: string]: unknown;
}
