import React, { useState, useRef } from 'react';
import './index.css';
import { SenderProps } from './interface';

const Sender: React.FC<SenderProps> = props => {
  const {
    classNames,
    components,
    defaultValue = '',
    disabled = false,
    loading = false,
    placeholder = '请输入消息...',
    readOnly = false,
    rootClassName,
    styles,
    value: propValue,
    onSubmit,
    onChange,
    onFileUpload,
    onCancel,
    acceptFileTypes = '*',
    actions,
    ...restProps
  } = props;

  const [value, setValue] = useState(
    propValue !== undefined ? propValue : defaultValue
  );
  const [isComposing, setIsComposing] = useState(false);
  const InputComponent = components?.input || 'textarea';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 处理受控与非受控模式
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (propValue === undefined) {
      setValue(newValue);
    }

    onChange?.(e);
  };

  // 处理提交
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (disabled || loading || !value?.trim()) return;
    onSubmit?.(value);
    if (propValue === undefined) {
      setValue('');
    }

    // 重置文本框高度
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled || loading) return;

    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 处理文件上传
  const handleFileButtonClick = () => {
    if (disabled || loading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload?.(files[0]);
      // 重置文件输入，以便可以再次选择同一文件
      e.target.value = '';
    }
  };

  // 渲染操作按钮
  const renderActions = () => {
    const defaultActions = (
      <>
        <div className="sender-actions-left">
          {onFileUpload && (
            <button
              type="button"
              className="sender-file-button"
              onClick={handleFileButtonClick}
              disabled={disabled || loading}
              title="上传文件"
            >
              📎
            </button>
          )}
        </div>
        <div className="sender-actions-right">
          {onCancel && (
            <button
              type="button"
              className="sender-button"
              onClick={onCancel}
              disabled={disabled || loading}
            >
              取消
            </button>
          )}
          <button
            type="button"
            className="sender-button sender-submit-button"
            onClick={() => handleSubmit()}
            disabled={disabled || loading || !value?.trim()}
          >
            {loading ? '发送中...' : '发送'}
          </button>
        </div>
      </>
    );

    if (typeof actions === 'function') {
      return actions(defaultActions, { components: {} });
    }

    return actions || defaultActions;
  };

  return (
    <div
      {...restProps}
      className={`sender-container ${rootClassName || ''} ${classNames?.root || ''}`}
      style={styles?.root}
    >
      <form onSubmit={handleSubmit} className="sender-input-area">
        <InputComponent
          ref={textareaRef}
          className={`sender-textarea ${classNames?.input || ''}`}
          value={propValue !== undefined ? propValue : value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={disabled ? '输入已禁用' : placeholder}
          style={styles?.input}
          rows={1}
        />

        <div
          className={`sender-actions ${classNames?.actions || ''}`}
          style={styles?.actions}
        >
          {renderActions()}
        </div>

        {/* 隐藏的文件输入 */}
        {onFileUpload && (
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptFileTypes}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        )}
      </form>
    </div>
  );
};

export default Sender;
