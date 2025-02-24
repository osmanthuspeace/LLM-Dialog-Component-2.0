import './App.css';
import Bubble from '../../src/components/bubble';
import React, { ChangeEvent, FormEvent } from 'react';
import { launchChat } from '../../src/api/index';
function App() {
  const [isReplying, setIsReplying] = React.useState(false);

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
    // console.log('response', response);

    if (!response.data) {
      console.error('No body in response');
      return;
    }
    setMessageList(prev => [
      ...prev,
      {
        role: 'assistant',
        content: '',
      },
    ]);
    const reader = response.data.getReader();
    const decoder = new TextDecoder();
    let isDone = false;
    let data = '';
    while (!isDone) {
      const { value, done } = await reader.read();
      isDone = done;
      if (isDone) {
        const finalText = decoder.decode(undefined, { stream: false });
        data += finalText;
        setMessageList(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: data }];
        });
        break;
      } else if (value) {
        const decodedValue = decoder.decode(value, { stream: true });

        // console.log('decodedValue', decodedValue);

        const splitedValue = decodedValue.split('\n');

        const resultArray: string[] = [];
        for (let i = 0; i < splitedValue.length; i++) {
          const str = splitedValue[i];
          if (str.trim().length === 0) continue;
          if (str.startsWith('event:')) {
            const type = str.split('.')[2];
            if (type === 'delta') {
              i++;
              const substr = splitedValue[i];
              if (substr.startsWith('data:')) {
                const data = substr.substring('data:'.length);
                try {
                  const json = JSON.parse(data);
                  // console.log('json', json);

                  if (json.role === 'assistant' && json.type === 'answer') {
                    resultArray.push(json.content);
                  }
                } catch (error) {
                  if (error instanceof SyntaxError) {
                    console.warn('JSON 语法错误:', str);
                  } else if (typeof error === 'string') {
                    console.warn('未知错误:', error);
                  }
                  continue;
                }
              }
            }
          }
        }

        data += resultArray.join('');

        setMessageList(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: data }];
        });
      }
    }
    console.log('Received data:', data);
    setIsReplying(false);
  };

  const [inputValue, setInputValue] = React.useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  interface MessageInfo {
    role: string;
    content: string;
  }

  const [messageList, setMessageList] = React.useState<MessageInfo[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessageList(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    fetchData(inputValue);
  };

  const cursorStyle =
    inputValue === '' || isReplying
      ? { cursor: 'not-allowed' }
      : { cursor: 'pointer' };

  return (
    <>
      <div
        className="container"
        style={{
          height: '100%',
          overflow: 'auto',
          border: '1px solid black',
          borderRadius: '10px',
          margin: '50px',
          padding: '50px',
          position: 'relative',
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
      <form
        onSubmit={handleSubmit}
        style={{
          width: '400px',
          position: 'absolute',
          bottom: '-60px',
          margin: 'auto 0',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="发送消息"
          value={inputValue}
          onChange={handleChange}
          style={{
            flex: '1',
            height: '20px',
            fontSize: '16px',
            padding: '10px 40px 10px 10px',
            outline: 'none',
            border: '1px solid grey',
            borderRadius: 'calc(infinity * 1px)',
          }}
        ></input>
        <button
          type="submit"
          disabled={!inputValue}
          style={{
            ...cursorStyle,
            position: 'absolute',
            right: '20px',
            outline: 'none',
            border: 'none',
            height: '24px',
            width: '24px',
            padding: '0',
            backgroundColor: '#00B8DB',
            borderRadius: 'calc(infinity * 1px)',
          }}
        >
          ⬆️
        </button>
      </form>
    </>
  );
}

export default App;
