import React from 'react';
import './App.css';
export interface Conversation {
  key: string;
  title: string;
  timestamp?: number;
  group?: string;
}
export type MenuProps =
  | ((value: Conversation) => React.ReactNode)
  | React.ReactNode;
export interface ConversationsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  conversations?: Conversation[];
  defaultActiveKey?: Conversation['key'];
  activeKey?: Conversation['key'];
  onActiveChange?: (value: string) => void;
  groupable?: boolean;
  menu?: MenuProps;
}

export const Conversations = (props: ConversationsProps) => {
  const {
    children,
    conversations = [],
    defaultActiveKey,
    activeKey,
    onActiveChange,
    groupable,
    menu,
    ...rest
  } = props;

  const [innerActiveKey, setInnerActiveKey] = React.useState(defaultActiveKey);

  React.useEffect(() => {
    if (activeKey) {
      setInnerActiveKey(activeKey);
    }
  }, [activeKey]);
  const handleClick = (info: Conversation) => {
    setInnerActiveKey(info.key);
    onActiveChange?.(info.key);
  };
  return (
    <ul {...rest}>
      {children}
      {conversations.map(conversation => {
        return (
          <ConversationItem
            key={conversation.key}
            info={conversation}
            menu={menu}
            active={innerActiveKey === conversation.key}
            onClick={handleClick}
          />
        );
      })}
    </ul>
  );
};
export interface ConversationsItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
  info: Conversation;
  menu?: MenuProps;
  active?: boolean;
  onClick?: (info: Conversation) => void;
}
const ConversationItem = (props: ConversationsItemProps) => {
  const { info, menu, active, onClick, ...rest } = props;
  const handleClick = () => {
    onClick?.(info);
  };
  return (
    <li
      {...rest}
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: active ? 'lightblue' : '',
        borderRadius: '10px',
      }}
      className="conversation-item"
      onClick={handleClick}
    >
      {info.title}
    </li>
  );
};
