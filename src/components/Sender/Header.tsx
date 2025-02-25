import React, { useState } from 'react';
import './index.css';

interface HeaderProps {
  children?: React.ReactNode;
  closable?: boolean;
  forceRender?: boolean;
  open?: boolean;
  title?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  children,
  closable = true,
  forceRender = false,
  open,
  title,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(open !== undefined ? open : false);

  // 处理受控与非受控模式
  const handleOpenChange = (newOpen: boolean) => {
    if (open === undefined) {
      setIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <div className="sender-header-component">
      <div
        className="sender-header-title"
        onClick={() => handleOpenChange(!isOpen)}
      >
        {title}
        {closable && (
          <button
            className="sender-header-close"
            onClick={e => {
              e.stopPropagation();
              handleOpenChange(false);
            }}
          >
            关闭
          </button>
        )}
      </div>

      {(isOpen || open || forceRender) && (
        <div
          className={`sender-header-content ${isOpen || open ? 'visible' : 'hidden'}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Header;
