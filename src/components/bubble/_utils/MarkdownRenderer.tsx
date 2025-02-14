import MarkdownIt from 'markdown-it';
import { useMemo } from 'react';

const MarkdownRenderer: React.FC<{ mdContent: string }> = ({ mdContent }) => {
  const md = useMemo(() => new MarkdownIt({ html: true, breaks: true }), []);
  const html = useMemo(() => md.render(mdContent), [mdContent]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
export default MarkdownRenderer;
