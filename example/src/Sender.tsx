import React, { useEffect, useState } from 'react';
import './Sender.css';

export interface SenderProps {
  inputValue: string;
  isReplying: boolean;
  onSubmit: (message: string) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel?: () => void;
}

export const Sender = ({
  inputValue,
  isReplying,
  onSubmit,
  onChange,
  onCancel,
}: SenderProps) => {
  const cursorStyle =
    inputValue === '' || isReplying
      ? { cursor: 'not-allowed' }
      : { cursor: 'pointer' };
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;

    onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      const target = e.target as HTMLTextAreaElement;

      e.preventDefault();
      if (!inputValue) return;
      onSubmit(inputValue);
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }
  };
  useEffect(() => {
    const textarea = document.querySelector(
      '.sender-textarea'
    ) as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [inputValue]);

  return (
    <>
      <form onSubmit={handleSubmit} className="sender-form">
        <textarea
          placeholder="发送消息"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          rows={1}
          className="sender-textarea"
        ></textarea>
        <button
          type="submit"
          disabled={!inputValue}
          className={`sender-submit-button ${inputValue === '' || isReplying ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          ⬆️
        </button>
      </form>
    </>
  );
};
