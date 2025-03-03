import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Bubble from '../../src/components/bubble';
import { MessageInfo } from './App';
import { useThrottle } from './util';

export interface MessageListProps extends HTMLAttributes<HTMLDivElement> {
  messageList: MessageInfo[];
  autoScroll?: boolean;
  renderBubble?: (message: MessageInfo, index: number) => JSX.Element;
}

export const MessageList = ({
  messageList,
  autoScroll = true,
  renderBubble,
  ...rest
}: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(autoScroll);

  const handleScroll = useThrottle(() => {
    if (!containerRef.current || !isAutoScrollEnabled) return;

    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    const isNearBottom = scrollTop + clientHeight + 50 >= scrollHeight;
    if (!isNearBottom) {
      //说明用户有意的向上滚动
      setIsAutoScrollEnabled(false);
    } else if (!isAutoScrollEnabled) {
      //说明回到了底部，重新启用自动滚动
      setIsAutoScrollEnabled(true);
    }
  });

  useLayoutEffect(() => {
    if (!containerRef || !containerRef.current || !isAutoScrollEnabled) return;

    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'auto',
    });
  }, [autoScroll, isAutoScrollEnabled, messageList]);

  useEffect(() => {
    if (!isAutoScrollEnabled) return;
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isAutoScrollEnabled]);
  return (
    <>
      <div
        className="message-container"
        style={{
          height: '95%',
          overflow: 'auto',
          padding: '0 10px',
          position: 'relative',
        }}
        {...rest}
        ref={containerRef}
      >
        <div
          className="list-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            height: '100%',
          }}
        >
          {messageList.map((message, index) => {
            return renderBubble ? (
              renderBubble(message, index)
            ) : (
              <Bubble
                loading={message.loading}
                key={index}
                content={message.content}
                placement={message.role === 'user' ? 'end' : 'start'}
                style={
                  message.role === 'user'
                    ? { justifyContent: 'flex-end' }
                    : { justifyContent: 'flex-start' }
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
