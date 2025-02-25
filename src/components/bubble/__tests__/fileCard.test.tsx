import { fireEvent, render, screen } from '@testing-library/react';
import FileCard from '../_utils/FileCard';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { userEvent } from '@storybook/test';

// 忽略iconfont文件的导入，否则测试时会报错
vi.mock('../_utils/iconfont.js', () => {
  return {
    default: {},
  };
});

describe('FileCard', () => {
  it('render default file', async () => {
    const { container } = render(
      <FileCard file={{ uid: '123', name: 'HelloWorld.csh', size: 1426743 }} />
    );

    const titleElement = screen.getByText('HelloWorld.csh');
    expect(titleElement).toBeInTheDocument();

    // 鼠标经过显示完整文件名
    const user = userEvent.setup();
    let isHover = false;
    titleElement.addEventListener('mouseover', () => {
      isHover = true;
    });
    titleElement.addEventListener('mouseout', () => {
      isHover = false;
    });

    expect(isHover).toBeFalsy();
    await user.hover(titleElement);
    expect(isHover).toBeTruthy();
    expect(container.querySelector('.tooltip')).toBeInTheDocument();
    await user.unhover(titleElement);
    expect(isHover).toBeFalsy();
    expect(container.querySelector('.tooltip')).not.toBeInTheDocument();
  });

  it('render file with status', () => {
    render(
      <FileCard
        file={{
          uid: '123',
          name: 'HelloWorld.csh',
          size: 1426743,
          status: 'uploading',
          percent: 34,
        }}
      ></FileCard>
    );
    expect(screen.getByText('34%')).toBeInTheDocument();
  });

  it('render file with size 0', () => {
    render(
      <FileCard
        file={{
          uid: '123',
          name: 'HelloWorld',
          size: 0,
        }}
      ></FileCard>
    );
    expect(screen.getByText(/0 B/i)).toBeInTheDocument();
  });

  it('render file with description', () => {
    render(
      <FileCard
        file={{
          uid: '123',
          name: 'HelloWorld.csh',
          size: 1426743,
          description: 'Hello World!',
        }}
      ></FileCard>
    );
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });

  it('render image', () => {
    const imgUrl = 'https://example.com/test-image.jpg';
    const { container } = render(
      <FileCard
        file={{
          uid: '123',
          name: 'HelloWorld.png',
          size: 1426743,
          url: imgUrl,
        }}
        showImg={true}
      ></FileCard>
    );
    const imgElement = container.querySelector('img');
    expect(imgElement?.src).toBe(imgUrl);
  });

  it('render image without show', () => {
    const imgUrl = 'https://example.com/test-image.jpg';
    const { container } = render(
      <FileCard
        file={{
          uid: '123',
          name: 'HelloWorld.png',
          size: 1426743,
          url: imgUrl,
        }}
      ></FileCard>
    );
    const imgElement = container.querySelector('img');
    // 断言 img 标签不存在或者 img 标签的 src 属性不等于指定的 url
    if (imgElement) {
      expect(imgElement.src).not.toBe(imgUrl);
    } else {
      expect(imgElement).toBeNull();
    }
  });

  it('should call onClick callback when clicked', () => {
    const mockOnClick = vi.fn(); // 模拟回调函数
    render(
      <FileCard
        file={{
          uid: '123',
          name: 'HelloWorld.ppt',
          size: 1426743,
        }}
        onClick={mockOnClick}
      ></FileCard>
    );
    const fileCardElement = screen.getByTestId('file-card');
    fireEvent.click(fileCardElement);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
