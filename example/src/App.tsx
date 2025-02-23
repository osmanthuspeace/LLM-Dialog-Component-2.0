import './App.css';
import Bubble from '../../src/components/bubble';
import React, { useEffect } from 'react';
import { launchChat } from '../../src/api/index';
function App() {
  const [content, setContent] = React.useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await launchChat({
        bot_id: '7471194205889904640',
        user_id: '1018580164938858',
        stream: true,
        additional_messages: [
          {
            role: 'user',
            content:
              '你好，我正在测试这个api，请输出一段长的文本，最好有一些markdown格式的内容，增加停留时间，便于我调试前端页面的样子，谢谢',
            content_type: 'text',
          },
        ],
      });

      if (!response.data) {
        console.error('No body in response');
        return;
      }
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
          break;
        } else if (value) {
          const decodedValue = decoder.decode(value, { stream: true });

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
          console.log('data', data);
          setContent(data);
        }
      }
      console.log('Received data:', data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <Bubble content={content} placement="end" />
      </div>
    </>
  );
}

export default App;
