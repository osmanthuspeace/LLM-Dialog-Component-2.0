import type { Meta, StoryObj } from '@storybook/react';
import Bubble from '.';
import FileCard from './_utils/FileCard';

const meta = {
  title: '对话/Bubble',
  component: Bubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Bubble>;

export default meta;

type Story = StoryObj<typeof meta>;

// 基础用法
export const Basic: Story = {
  args: {
    content: '这是一条简单的消息',
  },
};

export const FileRender: Story = {
  args: {
    content: {
      name: 'hello_word.doc',
      size: 112,
      description: 'Hello World!',
    },
    messageRender: content => {
      return <FileCard file={content}></FileCard>;
    },
  },
};

// 完整Markdown示例
export const FullMarkdown: Story = {
  args: {
    content: `# Markdown 完整示例
## 1. 标题

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 2. 强调

*斜体文本* 或 _斜体文本_
**粗体文本** 或 __粗体文本__
***粗斜体文本*** 或 ___粗斜体文本___
~~删除线文本~~

## 3. 列表

### 无序列表
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2
- 项目3

### 有序列表
1. 第一项
2. 第二项
3. 第三项

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 未完成任务

## 4. 链接和图片

[链接文本](https://www.example.com)
![图片描述](https://via.placeholder.com/150)

## 5. 引用

> 这是一个引用
> 
> 这是引用的第二行

## 6. 代码

行内代码 \`const example = "hello world"\`

代码块：
\`\`\`javascript
function example() {
  console.log("Hello, world!");
  return true;
}
\`\`\`

## 7. 表格

| 表头1 | 表头2 | 表头3 |
| ----- | ----- | ----- |
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

## 8. 水平线

---

## 9. HTML标签

<span style="color:red">这是红色文本</span>
`,
  },
};
