import Sender from '../index';
import {
  cleanup,
  fireEvent,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

const onSubmit = vi.fn();
const onChange = vi.fn();
const onCancel = vi.fn();
let onFileUpload;

describe('Sender', () => {
  beforeEach(() => {
    onFileUpload = vi.fn();
  });

  it('Conversations component work', () => {
    const { container } = render(<Sender></Sender>);

    expect(container.querySelector('.sender-container')).toBeInTheDocument();
  });

  it('Conversations handle defaultValue', () => {
    const { getByText } = render(<Sender defaultValue="你好"></Sender>);
    expect(getByText('你好')).toBeInTheDocument();
  });

  it('Conversations handle disabled', () => {
    render(<Sender disabled={true}></Sender>);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('disabled');
  });

  it('Conversations handle loading', () => {
    const { getByText } = render(<Sender loading={true}></Sender>);
    expect(getByText('发送中...')).toBeInTheDocument();
  });

  it('Conversations handle placeholder', () => {
    render(<Sender placeholder="请输入内容"></Sender>);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', '请输入内容');
  });

  it('Conversations handle readOnly', () => {
    render(<Sender readOnly={true}></Sender>);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readOnly');
  });

  it('Conversations handle onSubmit', () => {
    const { container } = render(<Sender onSubmit={onSubmit}></Sender>);
    fireEvent.click(container.querySelector('.sender-button'));
    expect(onSubmit).not.toHaveBeenCalled();
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '这是测试内容' } });
    fireEvent.click(container.querySelector('.sender-button'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('Conversations handle onChange', () => {
    const { container } = render(<Sender onChange={onChange}></Sender>);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '这是测试内容' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('Conversations handle onFileUpload', async () => {
    const { container } = render(
      <Sender
        onFileUpload={onFileUpload}
        acceptFileTypes="image/*,.pdf,.doc,.docx"
      ></Sender>
    );
    const fileUploadBtn = container.querySelector('.sender-file-button');
    expect(fileUploadBtn).toBeInTheDocument();
    await userEvent.click(fileUploadBtn);

    const fileInput = container.querySelector('input[type="file"]');
    const file = new File(['file content'], 'test.png', { type: 'image/png' });
    // await userEvent.upload(fileUploadBtn, file);
    await userEvent.upload(fileInput, file);

    // 验证 onChange 是否被调用
    expect(onFileUpload).toHaveBeenCalled();

    // 验证传入的文件是否正确
    const uploadedFile = onFileUpload.mock.calls[0][0];
    expect(uploadedFile).toBe(file);
  });

  it('Conversations upload file without acceptFileTypes', async () => {
    const { container } = render(
      <Sender onFileUpload={onFileUpload} acceptFileTypes="image/*" />
    );

    // 找到上传文件的按钮并点击
    const fileButton = container.querySelector('.sender-file-button');
    await userEvent.click(fileButton);

    // 找到隐藏的 input[type="file"] 元素
    const fileInput = container.querySelector('input[type="file"]');

    // 创建一个不符合 accept 条件的文件（例如 PDF 文件）
    const file = new File(['file content'], 'test.pdf', {
      type: 'application/pdf',
    });

    // 模拟文件上传
    await userEvent.upload(fileInput, file);

    // 验证 onFileUpload 是否未被调用
    expect(onFileUpload).not.toHaveBeenCalled();
  });

  it('Conversations handle onCancel', async () => {
    const { getByText } = render(<Sender onCancel={onCancel}></Sender>);
    const btn = getByText('取消');
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(onCancel).toHaveBeenCalled();
  });

  it('Coversations handle click Enter', () => {
    const onSubmit = vi.fn();
    render(<Sender onSubmit={onSubmit} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '测试消息' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
    expect(onSubmit).toHaveBeenCalled();
    const submittedMessage = onSubmit.mock.calls[0][0];
    expect(submittedMessage).toBe('测试消息');
  });
});
