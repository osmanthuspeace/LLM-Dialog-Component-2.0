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
        className="list-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          height: '100%',
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
