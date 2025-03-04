# 💬 LLM Dialogue Component 2.0 | 让对话开发像聊天一样简单

**[🔥 实时对话 | 🎨 高度可定制 | ⚡️ 极致性能]**

一个专为**大语言模型对话场景**设计的 React 组件库，支持零配置开箱即用、企业级定制和超流畅交互体验。已通过 98% 核心功能测试验证，现开放 Beta 版体验！

---

## 🌟 核心亮点

### 🚀 **智能交互引擎**
| 功能                | 技术实现                              | 场景价值                 |
|---------------------|-------------------------------------|--------------------------|
| 逐字动态渲染         | `useTypedEffect` + 时间切片调度       | 模拟人类对话节奏         |
| 代码即对话           | 支持 Markdown + 170+语言高亮 + 一键复制 | 开发者友好协作           |
| 多模态扩展           | 文件卡片组件 + WebSocket 流式传输      | 支持图片/PDF 实时解析    |

### 🎮 **炫酷开发者体验**
```tsx
// 三步实现智能对话
<Bubble 
  content={response}
  typing={{ step: 25 }}  // 打字机效果
  messageRender={(text) => (           // 深度定制
    <YourMarkdownRenderer text={text} />
  )}
/>
```
🎯 快速开始
# 安装
```npm install llm-dialogue --save```
# 或
```yarn add llm-dialogue```