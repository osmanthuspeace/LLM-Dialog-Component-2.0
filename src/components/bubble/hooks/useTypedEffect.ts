import React from 'react';

const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const useTypedEffect = (
  content: string | undefined,
  isStreaming: boolean,
  typingEnabled: boolean,
  typingStep: number,
  typingInterval: number
): [typedContent: string, shouldContinueTyping: boolean] => {
  const prevContentRef = React.useRef<React.ReactNode | object>(''); //保存content中已经打印出来的内容
  const [typingIndex, setTypingIndex] = React.useState<number>(0);
  const mergedTypingEnabled =
    (typingEnabled || isStreaming) && isString(content);

  //在DOM更新之前判断
  React.useLayoutEffect(() => {
    if (isStreaming) return;
    //如果没有开启打字效果，直接显示所有内容
    if (!mergedTypingEnabled && isString(content)) {
      setTypingIndex(content.length);
    } else if (
      isString(content) &&
      isString(prevContentRef.current) &&
      content.indexOf(prevContentRef.current) !== 0 //prevContent不再是content的前缀时，说明content已经完全不一样了
    ) {
      setTypingIndex(1);
    }
    prevContentRef.current = content;
  }, [content]);

  React.useEffect(() => {
    if (mergedTypingEnabled && typingIndex < content.length) {
      const timer = setTimeout(() => {
        setTypingIndex(prev => prev + typingStep);
      }, typingInterval);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [typingIndex, typingEnabled, content]);

  //应该实时显示的内容
  const mergedTypingContent = mergedTypingEnabled
    ? content.slice(0, typingIndex)
    : content;
  //是否应该继续打字
  const shouldContinueTyping =
    mergedTypingEnabled && typingIndex < content.length;

  return [mergedTypingContent, shouldContinueTyping];
};
export default useTypedEffect;
