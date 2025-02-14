import React from 'react';
import { BubbleProps, TypingOption } from '../interface';

const useTypingConfig = (
  typing: BubbleProps['typing']
): [enableTyping: boolean, step: number, interval: number, suffix: React.ReactNode] => {
  return React.useMemo<
    [enableTyping: boolean, step: number, interval: number, suffix: React.ReactNode]
  >(() => {
    //如果typing为false，说明无需正在打字的效果
    if (!typing) {
      return [false, 0, 0, null];
    }
    let baseConfig: Required<TypingOption> = {
      step: 1,
      interval: 50,
      suffix: null,
    };

    //如果typing不是boolean，说明用户传入了自定义的配置
    if (typeof typing === 'object') {
      baseConfig = {
        ...baseConfig,
        ...typing,
      };
    }
    return [true, baseConfig.step, baseConfig.interval, baseConfig.suffix];
  }, [typing]);
};

export default useTypingConfig;
