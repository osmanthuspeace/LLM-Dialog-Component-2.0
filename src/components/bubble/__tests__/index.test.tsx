import Bubble from '../index';
import MarkdownRenderer from '../_utils/MarkdownRenderer';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';

describe('Bubble', () => {
  it('should render markdown content correctly', () => {
    const mdContent = '# Hello, World!';
    const messageRender = content => {
      return MarkdownRenderer({ mdContent: content });
    };

    render(<Bubble content={mdContent} messageRender={messageRender}></Bubble>);

    // 验证标题是否正确渲染
    expect(
      screen.getByRole('heading', { name: /Hello, World!/i })
    ).toBeInTheDocument();
  });

  it('Bubble support copy code', async () => {
    const mdContent = '```javascript\nconsole.log("Hello, World!");\n```';
    const messageRender = content => {
      return MarkdownRenderer({ mdContent: content });
    };

    render(<Bubble content={mdContent} messageRender={messageRender}></Bubble>);

    // 验证代码块是否正确渲染
    const codeElement = screen.getByRole('code');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement).toHaveClass('hljs');

    // 验证代码块是否存在copy按钮
    const copyButton = screen.getByRole('button', { name: /Copy/i });
    expect(copyButton).toBeInTheDocument();

    // 点击按钮， 是否显示为copied
    await copyButton.click();
    expect(screen.getByRole('button', { name: /Copied/i })).toBeInTheDocument();

    await waitFor(
      () => {
        expect(
          screen.getByRole('button', { name: /Copy/i })
        ).toBeInTheDocument();
      },
      { timeout: 3500 }
    );
  });

  it('Bubble support unknown code type', async () => {
    const mdContent = '```javascr\nconsole.log("Hello, World!");\n```';
    const messageRender = content => {
      return MarkdownRenderer({ mdContent: content });
    };

    render(<Bubble content={mdContent} messageRender={messageRender}></Bubble>);
    const code = screen.getByText(/console.log\("Hello, World!"\);/i);
    expect(code).toBeInTheDocument();
  });
});
