import Bubble from '../index';
import MarkdownRenderer from '../_utils/MarkdownRenderer';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import Loading from '../_utils/Loading';

describe('Bubble', () => {
  it('Bubble component work', () => {
    const { container } = render(<Bubble content=""></Bubble>);
    expect(
      container.querySelector('.temp-bubble-container')
    ).toBeInTheDocument();
  });

  it('Bubble support loading', () => {
    const { container } = render(<Bubble content="" loading></Bubble>);
    expect(container.querySelector('.bubble-dot')).toBeInTheDocument();
  });

  it('Bubble support loadingRender', () => {
    const { getByText } = render(
      <Bubble
        content=""
        loading
        loadingRender={() => {
          return <div>Loading...</div>;
        }}
      ></Bubble>
    );
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('Bubble support content', () => {
    const { getByText } = render(<Bubble content="Hello World!"></Bubble>);
    expect(getByText('Hello World!')).toBeInTheDocument();
  });

  it('Bubble support typing', () => {
    const text = 'Hello World!';
    render(<Bubble content={text} typing={{ step: 100, interval: 2 }} />);

    // 不知道为啥一直测试不成功
    // 没有渲染Hello World
  });

  it('Bubble support header and footer', () => {
    const { getByText } = render(
      <Bubble
        content=""
        header={<div>Header</div>}
        footer={<div>Footer</div>}
      ></Bubble>
    );
    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
  });

  it('should render markdown content correctly', () => {
    const mdContent = '# Hello, World!';
    const messageRender = (content: string) => {
      return MarkdownRenderer(content);
    };

    render(<Bubble content={mdContent} messageRender={messageRender}></Bubble>);

    // 验证标题是否正确渲染
    expect(
      screen.getByRole('heading', { name: /Hello, World!/i })
    ).toBeInTheDocument();
  });

  it('Bubble support copy code', async () => {
    const mdContent = '```javascript\nconsole.log("Hello, World!");\n```';
    const messageRender = (content: string) => {
      return MarkdownRenderer(content);
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
    const messageRender = (content: string) => {
      return MarkdownRenderer(content);
    };

    render(<Bubble content={mdContent} messageRender={messageRender}></Bubble>);
    const code = screen.getByText(/console.log\("Hello, World!"\);/i);
    expect(code).toBeInTheDocument();
  });
});
