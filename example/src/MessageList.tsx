import Bubble from '../../src/components/bubble';
import { MessageInfo } from './App';

export const MessageList = ({
  messageList,
}: {
  messageList: MessageInfo[];
}) => {
  return (
    <>
      <div
        className="message-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px 0',
          height: '80%',
          overflow: 'scroll',
        }}
      >
        {messageList.map((message, index) => {
          return (
            <Bubble
              key={index}
              content={message.content}
              placement={message.role === 'user' ? 'end' : 'start'}
            />
          );
        })}
      </div>
    </>
  );
};
