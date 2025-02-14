import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { fn } from '@storybook/test';

const meta = {
  title: '对话/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messages: [
      {
        id: '1',
        role: 'user',
        content: '你好！',
        timestamp: '10:00',
      },
      {
        id: '2',
        role: 'assistant',
        content: '你好！我是 AI 助手，很高兴为你服务。',
        timestamp: '10:01',
      },
    ],
    onSend: fn(),
  },
};

export const LongConversation: Story = {
  args: {
    messages: [
      {
        id: '1',
        role: 'user',
        content: '你能帮我解释一下什么是 React 吗？',
        timestamp: '10:00',
      },
      {
        id: '2',
        role: 'assistant',
        content:
          'React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook 开发和维护，主要用于构建单页应用程序。React 的核心特性包括：虚拟 DOM、组件化开发、单向数据流等。',
        timestamp: '10:01',
      },
      {
        id: '3',
        role: 'user',
        content: '那 Vue 和 React 有什么区别？',
        timestamp: '10:02',
      },
      {
        id: '4',
        role: 'assistant',
        content:
          '虽然 Vue 和 React 都是现代前端框架，但它们有一些关键区别：1. 模板语法 vs JSX；2. 响应式系统的实现方式；3. 状态管理的方式；4. 学习曲线等。',
        timestamp: '10:03',
      },
    ],
    onSend: fn(),
  },
};
