import { fireEvent, render, screen } from '@testing-library/react';
import FileCard from '../_utils/FileCard';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// 忽略iconfont文件的导入，否则测试时会报错
vi.mock('../_utils/iconfont.js', () => {
  return {
    default: {},
  };
});

describe('FileCard', () => {
  it('render default file', () => {
    render(
      <FileCard file={{ uid: '123', name: 'HelloWorld.csh', size: 1426743 }} />
    );
    expect(screen.getByText('HelloWorld.csh')).toBeInTheDocument();
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
    render(
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
    const imgElement = screen.getByRole('img');

    expect(imgElement.src).toBe(imgUrl);
  });

  it('render image without show', () => {
    const imgUrl = 'https://example.com/test-image.jpg';
    render(
      <FileCard
        file={{
          uid: '123',
          name: 'HelloWorld.png',
          size: 1426743,
          url: imgUrl,
        }}
      ></FileCard>
    );
    const imgElements = screen.queryAllByRole('img');
    const hasTarget = imgElements.some(img => img.src === imgUrl);
    expect(hasTarget).toBe(false);
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
