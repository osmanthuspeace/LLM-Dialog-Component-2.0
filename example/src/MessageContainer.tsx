import { forwardRef } from 'react';

export interface MessageContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const MessageContainerInternal = ({ children }: MessageContainerProps, ref) => {
  return (
    <div
      className="container"
      style={{
        maxHeight: '40%',
        overflow: 'auto',
        border: '1px solid black',
        borderRadius: '10px',
        margin: '50px',
        padding: '0 50px',
        position: 'relative',
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};
export const MessageContainer = forwardRef(MessageContainerInternal);
