import { LaunchApiProps } from './interface';
import api from './request';

/**
 * 可以直接发起对话，与智能体进行一次交互；
 * 也可以创建会话和消息，并在指定会话中发起对话，会话中的其他消息会作为历史消息传递给大模型
 * 参考：https://www.coze.cn/open/docs/developer_guides/coze_api_overview#4a288f73
 */

// 创建会话
export const createConversation = () => {
  return api.post('/v1/conversation/create');
};

// 创建消息
export const createMessage = () => {
  return api.post('/v1/conversation/message/create');
};

// 发起对话
export const launchChat = ({ bot_id, user_id, additional_messages, stream }: LaunchApiProps) => {
  return api.post('/v3/chat', {
    bot_id,
    user_id,
    additional_messages,
    stream,
  });
};
