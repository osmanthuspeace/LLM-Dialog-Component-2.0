export interface LaunchApiProps {
  bot_id: string; //要进行会话聊天的智能体ID
  user_id: string; //标识当前与智能体的用户
  additional_messages?: object[]; //对话的附加信息，其中最后一条作为本次对话的用户输入（role=user），其他内容均为本次对话的上下文
  stream?: boolean; //是否启用流式返回，默认为false
  conversation_id?: string; //会话ID，如果不传则会自动创建一个新的会话
  auto_save_history?: boolean; //是否自动保存对话历史，默认为true
  //...
}
export interface BaseApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ViewMessaageListReturnType
  extends BaseApiResponse<OpenMessageApi[]> {
  has_more: boolean;
  first_id: string;
  last_id: string;
  detail: object;
}
export interface OpenMessageApi {
  id: string;
  conversation_id: string;
  bot_id: string;
  chat_id: string;
  meta_data: object;
  role: string;
  content: string;
  content_type: string;
  created_at: string;
  updated_at: string;
  type: string;
  section_id: string;
  reasoning_content?: string; //DeepSeek-R1 模型的思维链
}
