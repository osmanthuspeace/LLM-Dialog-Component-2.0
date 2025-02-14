export interface LaunchApiProps {
  bot_id: string;//要进行会话聊天的智能体ID
  user_id: string;//标识当前与智能体的用户
  additional_messages?: object[]; //对话的附加信息，其中最后一条作为本次对话的用户输入（role=user），其他内容均为本次对话的上下文
  stream?: boolean; //是否启用流式返回
  //...
}
