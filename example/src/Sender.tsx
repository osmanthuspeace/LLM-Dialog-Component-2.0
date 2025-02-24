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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '400px',
          position: 'absolute',
          bottom: '0px',
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
          style={{
            flex: '1',
            height: '20px',
            fontSize: '16px',
            padding: '10px 40px 10px 10px',
            outline: 'none',
            border: '1px solid grey',
            borderRadius: 'calc(infinity * 1px)',
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
