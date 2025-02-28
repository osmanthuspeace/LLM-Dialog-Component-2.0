import React from 'react';

interface StartProcessingOptions {
  data: ReadableStream;
  onMessageUpdate: (content: string) => void;
  onStart: () => void;
  onCompleted: () => void;
  onError: (error: unknown) => void;
  handleExtractContent?: (decodedValue: string) => string;
}

export const useStreamProcessor = () => {
  const controller = new AbortController();
  const startProcessing = async (options: StartProcessingOptions) => {
    const {
      data,
      onStart,
      onMessageUpdate,
      onCompleted,
      onError,
      handleExtractContent = extractContent,
    } = options;

    if (!data) {
      onError(new Error('No body in response'));
    }
    const { signal } = controller;
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let isDone = false;
    let content = '';

    try {
      onStart();
      while (!signal.aborted) {
        const { value, done } = await reader.read();
        isDone = done;
        if (isDone) {
          const finalText = decoder.decode(undefined, { stream: false });
          content += finalText;

          onMessageUpdate(content);
          break;
        } else if (value) {
          const decodedValue = decoder.decode(value, { stream: true });

          const result = handleExtractContent(decodedValue);

          content += result;

          onMessageUpdate(content);
        }
      }
      onCompleted();
    } catch (error) {
      onError(error);
    }
  };
  return { startProcessing, abort: () => controller.abort() };
};

//从raw的数据中提取出AI的回答内容
const extractContent = (decodedValue: string): string => {
  const BLOCK_SEPARATOR = '\n\n';
  const DATA_PREFIX = 'data:';
  const blocks = decodedValue.split(BLOCK_SEPARATOR);
  const resultArray: string[] = [];

  for (const block of blocks) {
    const lines = block.split('\n');
    const type = lines[0].split('.')[2];
    let jsonData = '';
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      if (trimmedLine.startsWith(DATA_PREFIX)) {
        jsonData += trimmedLine.slice(DATA_PREFIX.length).trim();
      }
    }
    if (type === 'delta') {
      try {
        const json = JSON.parse(jsonData);
        if (json.role === 'assistant' && json.type === 'answer') {
          resultArray.push(json.content || '');
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          console.warn('JSON 语法错误:', jsonData, 'in block:', block);
        } else if (typeof error === 'string') {
          console.warn('未知错误:', error, 'in block:', block);
        }
        continue;
      }
    }
  }
  return resultArray.join('');
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
