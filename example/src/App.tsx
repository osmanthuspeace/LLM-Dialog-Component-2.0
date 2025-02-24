import './App.css';
import React, { ChangeEvent, FormEvent, useLayoutEffect } from 'react';
import { launchChat } from '../../src/api/index';
import { useStreamProcessor } from './util';
import { MessageList } from './MessageList';
import { Sender } from './Sender';
import { MessageContainer } from './MessageContainer';

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
          // '你好，我正在测试这个api，请输出一段长的文本，最好有一些markdown格式的内容，增加停留时间，便于我调试前端页面的样子，谢谢',
          content_type: 'text',
        },
      ],
    });

    useStreamProcessor(response, setMessageList, setIsReplying);
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messageList]);
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
      <MessageContainer ref={containerRef}>
        <MessageList messageList={messageList} />
      </MessageContainer>
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
