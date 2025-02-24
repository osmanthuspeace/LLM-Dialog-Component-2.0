import React, { useState } from 'react';

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
    target.style.height = `${target.scrollHeight - 20}px`;

    onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      onSubmit(inputValue);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '400px',
          position: 'absolute',
          bottom: '10px',
          margin: 'auto 0',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <textarea
          placeholder="发送消息"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          rows={1}
          style={{
            flex: '1',
            fontSize: '16px',
            padding: '10px 50px 10px 10px',
            outline: 'none',
            border: '1px solid grey',
            borderRadius: '20px',
            resize: 'none',
          }}
        ></textarea>
        <button
          type="submit"
          disabled={!inputValue}
          style={{
            ...cursorStyle,
            position: 'absolute',
            right: '20px',
            outline: 'none',
            border: 'none',
            height: '24px',
            width: '24px',
            padding: '0',
            backgroundColor: '#00B8DB',
            borderRadius: 'calc(infinity * 1px)',
          }}
        >
          ⬆️
        </button>
      </form>
    </>
  );
};
