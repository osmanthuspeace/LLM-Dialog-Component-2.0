import React from 'react';

interface StartProcessingOptions {
  data: ReadableStream;
  onMessageUpdate: (content: string, isLoading?: boolean) => void;
  onStart: () => void;
  onCompleted: () => void;
  onError: (error: unknown) => void;
  setLoading?: (isLoading: boolean) => void;
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
      handleExtractContent = handleStream,
    } = options;

    if (!data) {
      onError(new Error('No body in response'));
    }
    const { signal } = controller;
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let isDone = false;
    let content = '';
    let globalLoading = false;
    try {
      onStart();
      while (!signal.aborted) {
        const { value, done } = await reader.read();
        isDone = done;
        if (isDone) {
          const finalText = decoder.decode(undefined, { stream: false });
          content += finalText;

          onMessageUpdate(content, false);
          break;
        } else if (value) {
          const decodedValue = decoder.decode(value, { stream: true });

          const result = handleExtractContent(decodedValue, isLoading => {
            globalLoading = isLoading;
          });

          content += result;

          onMessageUpdate(content, globalLoading);
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
const handleStream = (
  decodedValue: string,
  setLoading?: (isLoading: boolean) => void
): string => {
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
    handleBlock(type, jsonData, block, resultArray, setLoading);
  }
  return resultArray.join('');
};

const handleBlock = (
  type: string,
  jsonData: string,
  block: string,
  resultArray: string[],
  setLoading?: (isLoading: boolean) => void
) => {
  switch (type) {
    case 'delta': {
      console.log('delta:', jsonData);
      setLoading?.(false);
      const parsed = extractContent(jsonData, block);
      try {
        resultArray.push(parsed);
      } catch (e) {
        console.error(e);
      }
      break;
    }
    case 'created':
    case 'in_progress': {
      console.log('created/in_progress:', jsonData);
      setLoading?.(true);
      break;
    }
    case 'completed': {
      console.log('completed:', jsonData);
      setLoading?.(false);
      break;
    }
  }
};

const extractContent = (jsonData: string, block: string): string => {
  try {
    const json = JSON.parse(jsonData);
    if (json.role === 'assistant' && json.type === 'answer') {
      return json.content || '';
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn('JSON 语法错误:', jsonData, 'in block:', block);
    } else if (typeof error === 'string') {
      console.warn('未知错误:', error, 'in block:', block);
    }
  }
  return '';
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
