import './App.css';
import React, { ChangeEvent } from 'react';
import {
  createConversation,
  launchChat,
  viewMessageList,
} from '../../src/api/index';
import { useStreamProcessor } from '../../src/components/messageList/_util/util';
import { MessageList } from '../../src/components/messageList/MessageList';
import Bubble from '../../src/components/bubble';
import { Conversation, Conversations } from './Conversations';
import Sender from '../../src/components/Sender/index';
export interface MessageInfo {
  role: string;
  content: string;
  loading?: boolean;
}
function App() {
  const [isReplying, setIsReplying] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [messageList, setMessageList] = React.useState<MessageInfo[]>([]);

  const [currentConversationId, setCurrentConversationId] =
    React.useState<string>('');

  const { startProcessing } = useStreamProcessor();
  const fetchData = async (content: string) => {
    setIsReplying(true);
    const response = await launchChat({
      bot_id: '7471194205889904640',
      user_id: '1018580164938858',
      stream: true,
      conversation_id: currentConversationId,
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
            loading: true,
          },
        ]);
      },
      onMessageUpdate: (content, isLoading) => {
        setMessageList(prev => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...last, content: content, loading: isLoading },
          ];
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
  const [conversations, setConversations] = React.useState<Conversation[]>([]);

  const handleNewConversation = () => {
    console.log('new conversation');
    createConversation()
      .then(r => {
        const conversationId = r.data.data.id;
        setCurrentConversationId(conversationId);
        setConversations(prev => [
          {
            key: conversationId,
            title: '新对话',
            timestamp: Date.now(),
          },
          ...prev,
        ]);
        setCurrentConversationId(conversationId);
        setMessageList([]);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setMessageList([]);
      });
  };
  React.useEffect(() => {
    console.log('messageList', messageList);
  }, [messageList]);
  const handleActiveChange = (key: string) => {
    viewMessageList(key).then(r => {
      const messages = r.data.data;
      setMessageList([]);
      messages.forEach(message => {
        setMessageList(prev => [
          ...prev,
          {
            role: message.role,
            content: message.content,
          },
        ]);
      });
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        gap: '10px',
      }}
    >
      <div>
        {/* <Conversations
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
        ></Conversations> */}
        <Conversations
          className="conversations-container"
          defaultActiveKey="1"
          activeKey={currentConversationId}
          conversations={conversations}
          onActiveChange={handleActiveChange}
        >
          <button
            onClick={handleNewConversation}
            className="new-conversation-btn"
          >
            新建对话
          </button>
        </Conversations>
      </div>
      <div className="message-list-container">
        <MessageList
          messageList={messageList}
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
                loading={message.loading}
                footer={message.role === 'user' ? null : '2021-08-24 15:00:00'}
                content={message.content}
                avatar={
                  message.role === 'user' ? (
                    <img
                      src="https://img.icons8.com/user"
                      alt="user"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <img
                      src="https://img.icons8.com/user"
                      alt="user"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                      }}
                    />
                  )
                }
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
        <Sender onSubmit={handleSubmit} onChange={handleChange}></Sender>
        {/* <Sender
          inputValue={inputValue}
          isReplying={isReplying}
          onSubmit={handleSubmit}
          onChange={handleChange}
        ></Sender> */}
      </div>
    </div>
  );
}

export default App;
