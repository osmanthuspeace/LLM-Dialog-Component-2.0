import React from 'react';
import type {
  Conversation,
  ConversationsProps,
  MenuProps,
  GroupInfo,
} from './interface';
import './index.css';

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [visible, setVisible] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // 添加点击外部关闭菜单的处理
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-wrapper" ref={menuRef}>
      <button
        className="menu-button"
        onClick={e => {
          e.stopPropagation();
          setVisible(!visible);
        }}
      >
        ⋮
      </button>
      <div className={`menu-dropdown ${visible ? 'visible' : ''}`}>
        {items.map(item => (
          <div
            key={item.key}
            className="menu-item"
            onClick={e => {
              e.stopPropagation();
              item.onClick?.();
              setVisible(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const Conversations: React.ForwardRefRenderFunction<
  HTMLUListElement,
  ConversationsProps
> = (
  {
    items = [],
    activeKey,
    defaultActiveKey,
    onActiveChange,
    menu,
    groupable,
    styles = {},
    classNames: customClassNames = {},
    className,
    style,
    ...restProps
  },
  ref
) => {
  // 处理选中状态
  const [mergedActiveKey, setMergedActiveKey] =
    React.useState(defaultActiveKey);
  const activeKeyValue = activeKey || mergedActiveKey;

  // 处理分组
  const groupedItems = React.useMemo<GroupInfo[]>(() => {
    if (!groupable) {
      return [{ data: items }];
    }

    const groups: Record<string, Conversation[]> = {};
    items.forEach(item => {
      const group = item.group || '其他';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
    });

    return Object.entries(groups).map(([name, data]) => ({
      name,
      data,
      title:
        typeof groupable === 'object' && groupable.groupTitleRender
          ? groupable.groupTitleRender(name)
          : name,
    }));
  }, [items, groupable]);

  // 处理点击事件
  const handleItemClick = (item: Conversation) => {
    setMergedActiveKey(item.key);
    onActiveChange?.(item.key);
  };

  const renderMenu = (item: Conversation) => {
    const menuProps = typeof menu === 'function' ? menu(item) : menu;
    return menuProps?.items?.length ? (
      <div className="menu-wrapper">
        <Menu items={menuProps.items} />
      </div>
    ) : null;
  };

  return (
    <ul
      {...restProps}
      ref={ref}
      className={`conversations-container ${className || ''}`}
      style={style}
    >
      {groupedItems.map((group, groupIndex) => {
        const conversationItems = group.data.map(item => (
          <li
            key={item.key}
            className={`conversation-item ${activeKeyValue === item.key ? 'active' : ''} ${customClassNames.item || ''}`}
            style={styles.item}
            onClick={() => handleItemClick(item)}
          >
            <div className="conversation-content">
              <h3 className="conversation-title">{item.title}</h3>
              {item.lastMessage && (
                <p className="conversation-message">{item.lastMessage}</p>
              )}
            </div>
            {menu && renderMenu(item)}
          </li>
        ));

        return groupable ? (
          <li
            key={group.name || `group-${groupIndex}`}
            className="conversation-group-wrapper"
          >
            {group.name && (
              <div className="conversation-group">{group.title}</div>
            )}
            <ul className="conversation-list">{conversationItems}</ul>
          </li>
        ) : (
          conversationItems
        );
      })}
    </ul>
  );
};

export type { Conversation };
export default React.forwardRef(Conversations);
