export interface TypingOption {
  /**
   * @default 1
   */
  step?: number; //一次性打印几个字符
  /**
   * @default 50
   */
  interval?: number; //打印间隔
  /**
   * @default null
   */
  suffix?: React.ReactNode; //打印的光标
}
export type AnyObject = Record<PropertyKey, any>;

export type BubbleContentType = React.ReactNode | AnyObject;

export interface BubbleProps<ContentType extends BubbleContentType = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content?: BubbleContentType;
  placement?: 'start' | 'end';
  loading?: boolean;
  typing?: boolean | TypingOption;
  messageRender?: (content: ContentType) => React.ReactNode;
  loadingRender?: () => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
