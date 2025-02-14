import React from 'react';
import './Dialog.css';

// 定义消息的数据结构
export interface Message {
  /** 消息的唯一标识符 */
  id: string;
  /** 消息发送者的角色 */
  role: 'user' | 'assistant';
  /** 消息的文本内容 */
  content: string;
  /** 消息的发送时间 */
  timestamp: string;
}

// 定义组件的属性接口
export interface DialogProps {
  /** 对话消息列表 */
  messages: Message[];
  /** 发送新消息时的回调函数 */
  onSend?: (message: string) => void;
}

/** 对话界面组件，用于展示对话消息并支持发送新消息 */
export const Dialog: React.FC<DialogProps> = ({ messages, onSend }) => {
  /** 输入框的当前值 */
  const [input, setInput] = React.useState('');

  /** 处理消息发送事件 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && onSend) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="dialog-container">
      {/* 消息列表区域 */}
      <div className="dialog-messages">
        {messages.map(message => (
          <div
            key={message.id}
            className={`dialog-message ${message.role === 'user' ? 'user' : 'assistant'}`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>

      {/* 消息输入区域 */}
      <form className="dialog-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="输入消息..."
        />
        <button type="submit">发送</button>
      </form>
    </div>
  );
};
