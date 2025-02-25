import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Sender from './index';

const meta: Meta<typeof Sender> = {
  title: '输入框/Sender',
  component: Sender,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sender>;

// 基础用法
export const Basic: Story = {
  args: {
    defaultValue: '',
    placeholder: '请输入消息...',
    onSubmit: message => console.log('提交消息:', message),
  },
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: '400px' }}>
        <Sender
          value={value}
          onChange={newValue => setValue(newValue)}
          onSubmit={message => {
            console.log('提交消息:', message);
            setValue('');
          }}
        />
        <div style={{ marginTop: '10px' }}>当前输入: {value}</div>
      </div>
    );
  },
};

// 自定义按钮
export const CustomActions: Story = {
  render: () => {
    return (
      <div style={{ width: '400px' }}>
        <Sender
          actions={defaultButton => (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => console.log('自定义按钮点击')}
              >
                自定义按钮
              </button>
              {defaultButton}
            </div>
          )}
          onSubmit={message => console.log('提交消息:', message)}
        />
      </div>
    );
  },
};

// 文件上传
export const FileUpload: Story = {
  render: () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    return (
      <div
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div>
          <h3>带文件上传</h3>
          <Sender
            onSubmit={message => console.log('提交消息:', message)}
            onFileUpload={file => {
              console.log('上传文件:', file);
              setUploadedFile(file);
            }}
            acceptFileTypes="image/*,.pdf,.doc,.docx"
          />
          {uploadedFile && (
            <div style={{ marginTop: '10px' }}>
              已上传文件: {uploadedFile.name} (
              {Math.round(uploadedFile.size / 1024)} KB)
            </div>
          )}
        </div>
        <div>
          <h3>不带文件上传</h3>
          <Sender onSubmit={message => console.log('提交消息:', message)} />
        </div>
      </div>
    );
  },
};

// 状态展示
export const States: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (message: string) => {
      setIsLoading(true);
      console.log('提交消息:', message);

      // 模拟异步操作
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <div
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div>
          <h3>加载状态</h3>
          <Sender
            loading={isLoading}
            onSubmit={handleSubmit}
            onFileUpload={file => console.log('上传文件:', file)}
          />
        </div>
        <div>
          <h3>禁用状态</h3>
          <Sender
            disabled={true}
            onSubmit={message => console.log('提交消息:', message)}
            onFileUpload={file => console.log('上传文件:', file)}
          />
        </div>
        <div>
          <h3>只读状态</h3>
          <Sender
            readOnly={true}
            defaultValue="这是一个只读的输入框"
            onSubmit={message => console.log('提交消息:', message)}
            onFileUpload={file => console.log('上传文件:', file)}
          />
        </div>
      </div>
    );
  },
};
