const Loading = ({ prefixCls }: { prefixCls: string }) => {
  return (
    <span className={`${prefixCls}-dot`}>
      <i className={`${prefixCls}-dot-item`} key={`item-${1}`} />
      <i className={`${prefixCls}-dot-item`} key={`item-${2}`} />
      <i className={`${prefixCls}-dot-item`} key={`item-${3}`} />
    </span>
  );
};
export default Loading;
