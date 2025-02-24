import { AxiosResponse } from 'axios';
import { MessageInfo } from './App';
import React from 'react';

export const useStreamProcessor = async (
  response: AxiosResponse<ReadableStream>,
  setMessageList: React.Dispatch<React.SetStateAction<MessageInfo[]>>,
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
      if (resultArray.length > 0) {
        data += resultArray.join('');

        setMessageList(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: data }];
        });
      }
    }
  }
  console.log('Received data:', data);
  setIsReplying(false);
};

export const useThrottle = (fn: Function, delay: number = 100) => {
  const last = React.useRef(0);
  return React.useCallback(
    (...args: any[]) => {
      const now = performance.now();
      if (now - last.current > delay) {
        last.current = now;
        fn(...args);
      }
    },
    [fn, delay]
  );
};
