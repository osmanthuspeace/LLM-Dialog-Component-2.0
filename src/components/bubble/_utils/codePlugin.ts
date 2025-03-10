import ClipboardJS from 'clipboard';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

const copyInnerHTML = `
  <span>Copy</span>
`;

const copiedInnerHTML = `
  <span>Copied!</span>
`;

const clipboard = new ClipboardJS(".copy-btn")

clipboard.on("success", e => {
  const trigger = e.trigger;

  e.clearSelection()
  trigger.innerHTML = copiedInnerHTML
  setTimeout(() => {
    trigger.innerHTML = copyInnerHTML;
  }, 3000)
})

// 自定义md-it插件：给代码添加copy按钮
const codePlugin = (md: MarkdownIt) => {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info.trim();
    const code = token.content;

    //转义一下，避免直接在对话页面中渲染出来
    const escapedCodeForAttr = md.utils.escapeHtml(code)
      .replace(/"/g, '&quot;');

    let highlightCode: string;
    if (lang && hljs.getLanguage(lang)) {
      try {
        highlightCode = hljs.highlight(code, { language: lang }).value;
      } catch (__) {
        highlightCode = md.utils.escapeHtml(code);
      }
    } else {
      highlightCode = md.utils.escapeHtml(code);
    }

    return `
      <div class="code-block">
        <div class="code-header">
          <span class="code-lang">${lang || 'plaintext'}</span>
          <button class="copy-btn" data-clipboard-text="${escapedCodeForAttr}">
            Copy
          </button>
        </div>
        <pre class="code-pre"><code class="hljs">${highlightCode}</code></pre>
      </div>
    `;
  };
};

export default codePlugin;