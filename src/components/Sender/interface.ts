import React from 'react';

export interface SenderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> {
  /** 自定义按钮 */
  actions?:
    | React.ReactNode
    | ((
        oriNode: React.ReactNode,
        info: { components: any }
      ) => React.ReactNode);
  /** 样式类名 */
  classNames?: {
    root?: string;
    input?: string;
    actions?: string;
  };
  /** 自定义组件 */
  components?: Record<'input', React.ComponentType<any>>;
  /** 输入框默认值 */
  defaultValue?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 输入框占位符 */
  placeholder?: string;
  /** 是否让输入框只读 */
  readOnly?: boolean;
  /** 根元素样式类 */
  rootClassName?: string;
  /** 语义化定义样式 */
  styles?: {
    root?: React.CSSProperties;
    input?: React.CSSProperties;
    actions?: React.CSSProperties;
  };
  /** 输入框值 */
  value?: string;
  /** 点击发送按钮的回调 */
  onSubmit?: (message: string) => void;
  /** 输入框值改变的回调 */
  onChange?: (
    value: string,
    event?:
      | React.FormEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  /** 点击取消按钮的回调 */
  onCancel?: () => void;
  /** 文件上传回调 */
  onFileUpload?: (file: File) => void;
  /** 允许上传的文件类型 */
  acceptFileTypes?: string;
}

export interface SenderRef {
  /** 外层容器 */
  nativeElement: HTMLDivElement | null;
  /** 获取焦点 */
  focus: (option?: {
    preventScroll?: boolean;
    cursor?: 'start' | 'end' | 'all';
  }) => void;
  /** 取消焦点 */
  blur: () => void;
}
