import type { Meta, StoryObj } from '@storybook/react';
import Bubble from '.';
import FileCard from './_utils/FileCard';
import MarkdownRenderer from './_utils/MarkdownRenderer';

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
    content: 'Hello world!',
  },
};

export const Typing: Story = {
  args: {
    content: 'Hello World!',
    typing: true,
  },
};

export const CodeRender: Story = {
  args: {
    content: `### Python 实现
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # 标志位，用于优化，如果一趟中没有交换元素，说明数组已经有序
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


\`\`\`

### Java 实现
\`\`\`java
public class BubbleSort {
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
        return arr;
    }
}
\`\`\`

### C++ 实现
\`\`\`cpp
#include <iostream>
#include <vector>

std::vector<int> bubbleSort(std::vector<int> arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}
\`\`\`

### JavaScript 实现
\`\`\`javascript
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}
\`\`\`

### End
`,
    messageRender: content => {
      return MarkdownRenderer(content);
    },
  },
};

export const MarkdownRender: Story = {
  args: {
    content: `## MarkDown 效果及格式示例

**目录 (Table of Contents)**

[TOCM]

[TOC]

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")
## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")
### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")
#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")
##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")
###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")

#### 标题（用底线的形式）Heading (underline)

This is an H1
=============

This is an H2
-------------

### 字符效果和横线等

----

~~删除线~~ <s>删除线（开启识别HTML标签时）</s>
*斜体字*      _斜体字_
**粗体**  __粗体__
***粗斜体*** ___粗斜体___

上标：X<sub>2</sub>，下标：O<sup>2</sup>

**缩写(同HTML的abbr标签)**

> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启

The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.

### 引用 Blockquotes

> 引用文本 Blockquotes

引用的行内混合 Blockquotes

> 引用：如果想要插入空白换行\`即<br />标签\`，在插入处先键入两个以上的空格然后回车即可，[普通链接](http://localhost/)。

### 锚点与链接 Links

[普通链接](http://localhost/)

[普通链接带标题](http://localhost/ "普通链接带标题")

直接链接：<https: //github.com>

[锚点链接][anchor-id]

[anchor-id]: http://www.this-anchor-link.com/

[mailto:test.test@gmail.com](mailto:test.test@gmail.com)

GFM a-tail link @pandao  邮箱地址自动链接 test.test@gmail.com  www@vip.qq.com

> @pandao

### 多语言代码高亮 Codes

#### 行内代码 Inline code

执行命令：\`npm install marked\`

#### 缩进风格

即缩进四个空格，也做为实现类似 \`<pre>\` 预格式化文本 ( Preformatted Text ) 的功能。

    <?php
        echo "Hello world!";
    ?>

预格式化文本：

    | First Header  | Second Header |
    | ------------- | ------------- |
    | Content Cell  | Content Cell  |
    | Content Cell  | Content Cell  |

# 这是一个 Markdown 标题

这是一段 **加粗** 的文本，还有 *斜体* 文本。

- 列表项 1
- 列表项 2

[点击这里](https://www.example.com) 访问示例网站。

以下是使用不同编程语言实现冒泡排序算法的示例：

### Python 实现
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # 标志位，用于优化，如果一趟中没有交换元素，说明数组已经有序
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


\`\`\`

### Java 实现
\`\`\`java
public class BubbleSort {
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
        return arr;
    }
}
\`\`\`

### C++ 实现
\`\`\`cpp
#include <iostream>
#include <vector>

std::vector<int> bubbleSort(std::vector<int> arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}
\`\`\`

### JavaScript 实现
\`\`\`javascript
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}
\`\`\`


----

### 列表 Lists

#### 无序列表（减号）Unordered Lists (-)

- 列表一
- 列表二
- 列表三

#### 无序列表（星号）Unordered Lists (*)

* 列表一
* 列表二
* 列表三

#### 无序列表（加号和嵌套）Unordered Lists (+)

+ 列表一
+ 列表二
    + 列表二-1
    + 列表二-2
    + 列表二-3
+ 列表三
    * 列表一
    * 列表二
    * 列表三

#### 有序列表 Ordered Lists (-)

1. 第一行
2. 第二行
3. 第三行

#### GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2

----

#### 特殊符号 HTML Entities Codes

© &  ¨ ™ ¡ £
& < > ¥ € ® ± ¶ § ¦ ¯ « · 

X² Y³ ¾ ¼  ×  ÷   »

18ºC  "  '

### End
`,
    messageRender: content => {
      return MarkdownRenderer(content);
    },
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
