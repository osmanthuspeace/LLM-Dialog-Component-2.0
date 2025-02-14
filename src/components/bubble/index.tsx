import React, { CSSProperties } from 'react';
import Loading from './_utils/Loading';
import useTypedEffect from './hooks/useTypedEffect';
import useTypingConfig from './hooks/useTypingConfig';
import { BubbleProps } from './interface';
import './index.css';
const Bubble: React.ForwardRefRenderFunction<any, BubbleProps> = (props, ref) => {
  const {
    content,
    placement,
    loading = false,
    typing = false,
    messageRender,
    loadingRender,
    header,
    footer,
    children,
    ...restProps
  } = props;

  const prefixCls = 'bubble';

  // =========================== Typing ============================
  const [typingEnabled, typingStep, typingInterval, customSuffix] = useTypingConfig(typing);

  const [typedContent, isTyping] = useTypedEffect(
    content,
    typingEnabled,
    typingStep,
    typingInterval
  );

  // =========================== Content ============================
  const mergedContent = messageRender ? messageRender(typedContent as any) : typedContent;
  let contentNode: React.ReactNode;
  if (loading) {
    //如果正在等待响应且没有自定义加载渲染，则使用默认加载渲染（三个点的那个）
    contentNode = loadingRender ? loadingRender() : <Loading prefixCls={prefixCls} />;
  } else {
    contentNode = (
      <>
        {mergedContent}
        {isTyping && customSuffix}
        {/* 如果正在打字，就显示自定义的光标 */}
      </>
    );
  }

  let fullContent: React.ReactNode = <div className="temp-bubble-content">{contentNode}</div>;
  if (header || footer) {
    fullContent = (
      <div className={`${prefixCls}-content-wrapper`}>
        {header && <div>{header}</div>}
        {fullContent}
        {footer && <div>{footer}</div>}
      </div>
    );
  }
  const placementStyle: CSSProperties =
    placement === 'end' ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };

  return (
    <div {...restProps} ref={ref} className="temp-bubble-container" style={placementStyle}>
      {fullContent}
    </div>
  );
};
export default React.forwardRef(Bubble);
