import React from 'react';

/** 菜单项数据结构 */
export interface MenuItem {
  key: string;
  label: React.ReactNode;
  onClick?: () => void;
}

/** 菜单属性 */
export interface MenuProps {
  items: MenuItem[];
}

/** 会话数据结构 */
export interface Conversation {
  /** 唯一标识 */
  key: string;
  /** 会话标题 */
  title: string;
  /** 最后一条消息 */
  lastMessage?: string;
  /** 时间戳 */
  timestamp: number;
  /** 分组 */
  group?: string;
}

/** 分组信息 */
export interface GroupInfo {
  /** 分组名称 */
  name?: string;
  /** 分组数据 */
  data: Conversation[];
  /** 分组标题 */
  title?: React.ReactNode;
}

/** 分组配置 */
export interface Groupable {
  /** 自定义分组标题渲染 */
  groupTitleRender?: (group: string) => React.ReactNode;
}

/** Conversations 组件属性 */
export interface ConversationsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  /** 会话列表数据源 */
  items?: Conversation[];
  /** 当前选中的值 */
  activeKey?: string;
  /** 默认选中值 */
  defaultActiveKey?: string;
  /** 选中变更回调 */
  onActiveChange?: (value: string) => void;
  /** 会话操作菜单 */
  menu?: MenuProps | ((value: Conversation) => MenuProps);
  /** 是否支持分组 */
  groupable?: boolean | Groupable;
  /** 语义化结构样式 */
  styles?: {
    item?: React.CSSProperties;
  };
  /** 语义化结构类名 */
  classNames?: {
    item?: string;
  };
}

/** 会话菜单项数据结构 */
export interface ConversationMenuItem {
  /** 唯一标识 */
  key: string;
  /** 菜单项显示内容 */
  label: React.ReactNode;
  /** 点击回调 */
  onClick?: () => void;
}

/** 时间格式化函数类型 */
export type TimeFormatter = (timestamp: number) => string;

/** 菜单点击处理函数类型 */
export type MenuClickHandler = (
  e: React.MouseEvent,
  menuItem: ConversationMenuItem
) => void;

/** 渲染函数类型 */
export type RenderFunction<T> = (item: T) => React.ReactNode;
