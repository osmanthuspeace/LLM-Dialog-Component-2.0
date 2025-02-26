import './App.css';
import React, { ChangeEvent } from 'react';
import { launchChat } from '../../src/api/index';
import { useStreamProcessor } from './util';
import { MessageList } from './MessageList';
import { Sender } from './Sender';
import Conversations from '../../src/components/conversations/index';
import Bubble from '../../src/components/bubble';
export interface MessageInfo {
  role: string;
  content: string;
}
function App() {
  const [isReplying, setIsReplying] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [messageList, setMessageList] = React.useState<MessageInfo[]>([]);

  const { startProcessing } = useStreamProcessor();
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
    startProcessing({
      data: response.data,
      onStart: () => {
        setMessageList(prev => [
          ...prev,
          {
            role: 'assistant',
            content: '',
          },
        ]);
      },
      onMessageUpdate: content => {
        setMessageList(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: content }];
        });
      },
      onCompleted: () => {
        setIsReplying(false);
      },
      onError: error => {
        console.error(error);
        setIsReplying(false);
      },
    });
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
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div>
        <Conversations
          style={{
            width: '100px',
            height: '100%',
            overflow: 'auto',
          }}
          items={[
            {
              key: '1',
              title: 'title',
              timestamp: 1629782400000,
            },
            {
              key: '2',
              title: 'title',
              timestamp: 1629782400000,
            },
          ]}
        ></Conversations>
      </div>
      <div
        style={{
          flex: '1',
        }}
      >
        <MessageList
          messageList={messageList}
          autoScroll={false}
          renderBubble={(message: MessageInfo, index: number) => {
            return (
              <Bubble
                key={index}
                header={
                  message.role === 'assistant' ? (
                    'Assistant'
                  ) : (
                    <div
                      style={{
                        textAlign: 'end',
                      }}
                    >
                      User
                    </div>
                  )
                }
                footer={message.role === 'user' ? null : '2021-08-24 15:00:00'}
                content={message.content}
                placement={message.role === 'user' ? 'end' : 'start'}
                style={{
                  backgroundColor:
                    message.role === 'user' ? '#e3f2fd' : '#f5f5f5',
                  borderRadius: '15px',
                }}
              />
            );
          }}
        />

        <Sender
          inputValue={inputValue}
          isReplying={isReplying}
          onSubmit={handleSubmit}
          onChange={handleChange}
        ></Sender>
      </div>
    </div>
  );
}

export default App;
