import type { Meta, StoryObj } from '@storybook/react';
import ConversationsComponent from '.';
import type { Conversation } from './interface';

const meta = {
  title: '会话列表/Conversations',
  component: ConversationsComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConversationsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟数据
const mockItems: Conversation[] = [
  {
    key: '1',
    title: 'Monorepo包配置与管理指南',
    lastMessage: 'Package Configuration for Monorepo',
    timestamp: Date.now(),
    group: '今天',
  },
  {
    key: '2',
    title: '前端开发规范文档',
    lastMessage: 'Frontend Development Guidelines',
    timestamp: Date.now() - 3600000,
    group: '今天',
  },
  {
    key: '3',
    title: '项目架构设计方案',
    lastMessage: 'Project Architecture Design',
    timestamp: Date.now() - 86400000 * 3,
    group: '3 天内',
  },
  {
    key: '4',
    title: '组件库开发计划',
    lastMessage: 'Component Library Development Plan',
    timestamp: Date.now() - 86400000 * 5,
    group: '7 天内',
  },
];

// 默认示例 - 分组显示
export const Default: Story = {
  args: {
    items: mockItems,
    menu: {
      items: [
        {
          key: 'rename',
          label: '重命名',
          onClick: () => console.log('重命名对话'),
        },
        {
          key: 'delete',
          label: '删除',
          onClick: () => console.log('删除对话'),
        },
      ],
    },
    groupable: true,
    style: {
      width: '300px',
      height: '600px',
      backgroundColor: '#f5f5f5',
    },
  },
};

// 选中状态
export const WithActive: Story = {
  args: {
    items: mockItems,
    activeKey: '1',
    menu: (conversation: Conversation) => ({
      items: [
        {
          key: 'rename',
          label: '重命名',
          onClick: () => console.log('重命名对话:', conversation.title),
        },
        {
          key: 'delete',
          label: '删除',
          onClick: () => console.log('删除对话:', conversation.title),
        },
      ],
    }),
    onActiveChange: (key: string) => console.log('选中对话:', key),
    groupable: {
      groupTitleRender: (group: string) => `${group}的会话`,
    },
    style: {
      width: '300px',
      height: '600px',
      backgroundColor: '#f5f5f5',
    },
  },
};
