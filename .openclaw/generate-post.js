/**
 * 每日博客文章生成器
 * 根据星期几和主题模板自动生成博客文章
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 星期几对应的主题
const TOPICS = {
  1: { category: '技术教程', tags: ['教程', '技术'], template: 'tutorial' },
  2: { category: '工具分享', tags: ['工具', '效率'], template: 'tool' },
  3: { category: '项目实战', tags: ['项目', '实战'], template: 'project' },
  4: { category: '论文解读', tags: ['论文', '研究'], template: 'paper' },
  5: { category: '学习心得', tags: ['学习', '心得'], template: 'learning' },
  6: { category: '周末随笔', tags: ['随笔', '生活'], template: 'casual' },
  0: { category: '周总结', tags: ['总结', '周报'], template: 'weekly' }
};

// 文章模板库
const TEMPLATES = {
  tutorial: (date, topic) => `---
title: ${topic} - 技术教程
date: ${date}
tags: [教程，技术，${topic}]
categories: [技术教程]
---

# ${topic} 技术教程

> 本文介绍${topic}的核心概念和实用技巧。

## 📚 什么是${topic}？

${topic}是现代开发中不可或缺的技术...

## 🚀 快速开始

### 1. 环境准备

\`\`\`bash
npm install example-package
\`\`\`

### 2. 基础配置

\`\`\`javascript
const config = {
  // 配置项
};
\`\`\`

### 3. 实战示例

\`\`\`javascript
// 示例代码
function example() {
  console.log('Hello ${topic}!');
}
\`\`\`

## 💡 最佳实践

1. **性能优化** - 注意...
2. **代码规范** - 遵循...
3. **错误处理** - 考虑...

## 🔗 相关资源

- [官方文档](https://example.com)
- [GitHub 仓库](https://github.com/example)

---

*欢迎在评论区分享你的经验！*
`,

  tool: (date, tool) => `---
title: 效率工具推荐 - ${tool}
date: ${date}
tags: [工具，效率，${tool}]
categories: [工具分享]
---

# 效率工具推荐：${tool}

> 发现并分享提升开发效率的利器。

## 🛠️ 工具介绍

${tool} 是一款...

## ✨ 核心功能

- 功能 1：描述
- 功能 2：描述
- 功能 3：描述

## 📖 使用教程

### 安装

\`\`\`bash
# 安装命令
\`\`\`

### 配置

\`\`\`json
{
  "key": "value"
}
\`\`\`

### 使用示例

\`\`\`bash
# 使用命令
\`\`\`

## 💭 使用心得

**优点：**
- 轻量快速
- 易于上手

**不足：**
- 文档待完善

## 🔗 链接

- [官网](https://example.com)
- [GitHub](https://github.com/example)

---

*你有哪些效率工具推荐？欢迎留言！*
`,

  project: (date, project) => `---
title: 项目实战 - ${project}
date: ${date}
tags: [项目，实战，${project}]
categories: [项目实战]
---

# 项目实战：${project}

> 记录真实项目的开发过程和经验教训。

## 📋 项目背景

为什么做这个项目...

## 🏗️ 技术选型

| 技术 | 用途 | 选型理由 |
|------|------|---------|
| React | 前端框架 | 生态丰富 |
| Node.js | 后端 | 全栈 JS |

## 🚀 核心功能

1. 功能模块 A
2. 功能模块 B
3. 功能模块 C

## 💻 关键代码

\`\`\`javascript
// 核心逻辑
class Project {
  constructor() {
    this.init();
  }
}
\`\`\`

## 🐛 遇到的问题

### 问题 1
**原因：** ...
**解决：** ...

### 问题 2
**原因：** ...
**解决：** ...

## 📊 项目成果

- 性能提升 X%
- 代码量减少 Y%

## 🔗 项目地址

- [GitHub](https://github.com/example)
- [在线演示](https://example.com)

---

*项目持续更新中，欢迎 Star！*
`,

  paper: (date, title) => `---
title: 论文解读 - ${title}
date: ${date}
tags: [论文，研究，AI]
categories: [论文解读]
---

# 论文解读：${title}

> 深入解读前沿技术论文。

## 📄 论文信息

- **标题：** ${title}
- **作者：** Research Team
- **机构：** University/Company
- **发表：** Conference/Journal 2026

## 🎯 研究问题

这篇论文要解决什么问题...

## 💡 核心方法

### 方法概述

论文提出了...

### 技术细节

\`\`\`
算法伪代码或公式
\`\`\`

## 📊 实验结果

| 方法 | 指标 A | 指标 B |
|------|--------|--------|
| Baseline | 80.5 | 75.2 |
| Ours | **85.3** | **80.1** |

## 🔍 创新点

1. **创新 1** - 描述
2. **创新 2** - 描述
3. **创新 3** - 描述

## 💭 思考与启发

**优点：**
- 方法新颖
- 效果显著

**局限：**
- 计算成本高
- 数据依赖强

## 🔗 相关链接

- [论文原文](https://arxiv.org/example)
- [代码实现](https://github.com/example)

---

*对论文有疑问？欢迎讨论！*
`,

  learning: (date, topic) => `---
title: 学习心得 - ${topic}
date: ${date}
tags: [学习，心得，${topic}]
categories: [学习心得]
---

# 学习心得：${topic}

> 记录学习过程中的收获和感悟。

## 📖 学习内容

最近在学${topic}...

## 💡 主要收获

### 收获 1

之前以为... 实际上...

### 收获 2

发现了一个有趣的现象...

### 收获 3

总结出一个规律...

## 🚧 遇到的困难

1. **困难 1** - 如何克服
2. **困难 2** - 解决方案

## 🎯 下一步计划

- [ ] 深入学习 X
- [ ] 实践项目 Y
- [ ] 分享输出 Z

## 📚 推荐资源

- 📖 书籍：《XXX》
- 🎥 视频：XXX 教程
- 📝 文章：XXX 博客

---

*学习路上，一起进步！*
`,

  casual: (date, topic) => `---
title: 周末随笔 - ${topic}
date: ${date}
tags: [随笔，生活，${topic}]
categories: [周末随笔]
---

# 周末随笔：${topic}

> 记录生活中的点滴。

## 🌤️ 本周印象

这周发生了...

## 💭 一些想法

关于工作、生活、学习...

## 📸 精彩瞬间

- 读了一本好书
- 看了一部好电影
- 完成了一个小目标

## 🎯 下周计划

- 工作目标
- 学习计划
- 生活安排

---

*生活不止眼前的代码，还有诗和远方。*
`,

  weekly: (date, week) => `---
title: 周总结 - 第${week}周
date: ${date}
tags: [总结，周报]
categories: [周总结]
---

# 周总结 - 第${week}周

> 一周工作与学习的复盘。

## 📊 本周概览

| 维度 | 完成情况 | 备注 |
|------|---------|------|
| 工作 | ⭐⭐⭐⭐ | 完成 X 项目 |
| 学习 | ⭐⭐⭐ | 学习 Y 技术 |
| 健康 | ⭐⭐⭐⭐ | 运动 3 次 |
| 博客 | ⭐⭐⭐⭐⭐ | 发布 5 篇 |

## ✅ 已完成

- [x] 任务 1
- [x] 任务 2
- [x] 任务 3

## ⏳ 进行中

- [ ] 任务 A - 50%
- [ ] 任务 B - 30%

## 📝 学习记录

### 新技术
- 学习了 X
- 了解了 Y

### 阅读
- 书籍：《XXX》
- 文章：XXX

## 🐛 问题与反思

**问题：** ...
**反思：** ...
**改进：** ...

## 🎯 下周计划

1. **工作重点** - ...
2. **学习目标** - ...
3. **健康计划** - ...

---

*持续改进，每天进步 1%！*
`
};

// 获取当前日期和星期
const now = new Date();
const dayOfWeek = now.getDay();
const dateStr = now.toISOString().replace('T', ' ').substring(0, 19);
const weekNum = getWeekNumber(now);

// 获取今日主题
const todayTopic = TOPICS[dayOfWeek];

// 生成文章标题（根据星期几）
const titles = {
  1: ['React Hooks 深度解析', 'TypeScript 高级技巧', 'Node.js 性能优化'],
  2: ['VS Code 效率插件推荐', '终端工具对比评测', 'Git 工作流最佳实践'],
  3: ['从零搭建博客系统', '电商项目实战记录', 'OpenClaw 自动化实践'],
  4: ['Transformer 论文精读', '大模型技术演进', '强化学习最新进展'],
  5: ['三个月学习总结', '转行前端的心路', '技术成长路线规划'],
  6: ['我的书房改造', '周末读书分享', '程序员的健康生活'],
  0: ['第 X 周总结', '本周技术回顾', '下周计划安排']
};

const titleList = titles[dayOfWeek];
const title = titleList[Math.floor(Math.random() * titleList.length)].replace('X', weekNum);

// 选择模板生成内容
const template = TEMPLATES[todayTopic.template];
const content = template(dateStr, title);

// 生成文件名
const fileName = path.join(
  __dirname,
  '..',
  'source',
  '_posts',
  `${dateStr.substring(0, 10)}-${title.replace(/\s+/g, '-')}.md`
);

// 写入文件
fs.writeFileSync(fileName, content, 'utf8');

console.log(`✅ 已生成文章：${fileName}`);
console.log(`📝 标题：${title}`);
console.log(`📁 分类：${todayTopic.category}`);
console.log(`🏷️  标签：${todayTopic.tags.join(', ')}`);

// 辅助函数：计算周数
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
