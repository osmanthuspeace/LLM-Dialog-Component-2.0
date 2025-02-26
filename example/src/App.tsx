import './App.css';
import React, { ChangeEvent, useEffect, useLayoutEffect } from 'react';
import { launchChat } from '../../src/api/index';
import { useStreamProcessor, useThrottle } from './util';
import { MessageList } from './MessageList';
import { MessageContainer } from './MessageContainer';
import { Sender } from './Sender';
export interface MessageInfo {
  role: string;
  content: string;
}
function App() {
  const [isReplying, setIsReplying] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [messageList, setMessageList] = React.useState<MessageInfo[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const fetchData = async (content: string) => {
    setIsReplying(true);
    const response = await launchChat({
      bot_id: '7471194205889904640',
      user_id: '1018580164938858',
      stream: true,
      additional_messages: [
        {
          role: 'user',
          content: content,
          content_type: 'text',
        },
      ],
    });
    useStreamProcessor(response, setMessageList, setIsReplying);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    setMessageList(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    fetchData(inputValue);
  };

  return (
    <>
      <MessageList messageList={messageList} />
      <Sender
        inputValue={inputValue}
        isReplying={isReplying}
        onSubmit={handleSubmit}
        onChange={handleChange}
      ></Sender>
    </>
  );
}

export default App;
