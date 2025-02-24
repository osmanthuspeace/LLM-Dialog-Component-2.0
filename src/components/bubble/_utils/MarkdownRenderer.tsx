import MarkdownIt from 'markdown-it';
import { useMemo } from 'react';
import codePlugin from './codePlugin';
import 'highlight.js/styles/vs2015.css';
import './MarkdownRenderer.css';

const MarkdownRenderer = (mdContent: string) => {

  const md = useMemo(() => {
    const parser = new MarkdownIt({
      html: true,
      breaks: true,
    });
    parser.use(codePlugin);
    return parser;
  }, []);

  const html = useMemo(() => md.render(mdContent), [mdContent]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
export default MarkdownRenderer;
