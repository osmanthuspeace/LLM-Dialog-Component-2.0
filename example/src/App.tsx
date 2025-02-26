import './App.css';
import React, { ChangeEvent, useEffect, useLayoutEffect } from 'react';
import { launchChat } from '../../src/api/index';
import { useStreamProcessor, useThrottle } from './util';
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
          content_type: 'text',
        },
      ],
    });
    useStreamProcessor(response, setMessageList, setIsReplying);
  };
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = React.useState(true);
  const handleScroll = useThrottle(() => {
    if (!containerRef.current) return;

    const isNearBottom =
      containerRef.current.scrollTop + containerRef.current.clientHeight + 50 >=
      containerRef.current.scrollHeight;
    if (!isNearBottom) {
      //说明用户有意的向上滚动
      setIsAutoScrollEnabled(false);
    } else if (!isAutoScrollEnabled) {
      //说明回到了底部，重新启用自动滚动
      setIsAutoScrollEnabled(true);
    }
  });
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    return () =>
      containerRef.current?.removeEventListener('scroll', handleScroll);
  }, []);
  const autoScroll = useThrottle(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  });
  useLayoutEffect(() => {
    if (!containerRef.current || !isAutoScrollEnabled) return;

    autoScroll();
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
