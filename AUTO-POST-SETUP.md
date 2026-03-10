# 🤖 每日自动发布博客系统

## ✅ 已配置完成

你的博客现在支持**每日自动发布**功能！

---

## 📅 发布计划

| 星期 | 主题 | 自动生成 |
|------|------|---------|
| 周一 | 技术教程 | ✅ |
| 周二 | 工具分享 | ✅ |
| 周三 | 项目实战 | ✅ |
| 周四 | 论文解读 | ✅ |
| 周五 | 学习心得 | ✅ |
| 周六 | 周末随笔 | ✅ |
| 周日 | 周总结 | ✅ |

---

## ⏰ 自动化流程

```
每天 8:00 AM (Asia/Shanghai)
        ↓
1. 生成文章（根据星期主题）
        ↓
2. Hexo 构建静态文件
        ↓
3. Git 提交代码
        ↓
4. 推送到 GitHub
        ↓
5. Vercel 自动部署
        ↓
6. 飞书通知结果
```

---

## 📁 核心文件

| 文件 | 作用 |
|------|------|
| `.openclaw/generate-post.js` | 文章生成器 |
| `.openclaw/cron-daily-post.json` | 定时任务配置 |
| `.openclaw/auto-post.json` | 自动化工作流 |
| `CONTENT-CALENDAR.md` | 内容日历 |

---

## 🛠️ 手动操作

### 生成一篇文章
```bash
cd C:\Users\Lenovo\.openclaw\workspace\my-blog
node .openclaw/generate-post.js
```

### 发布到线上
```bash
hexo clean && hexo generate
git add . && git commit -m "New post"
git push origin main
vercel --prod
```

### 查看已生成文章
```bash
ls source/_posts/
```

---

## 📝 文章模板

系统内置 7 种模板：

1. **tutorial** - 技术教程（代码示例 + 最佳实践）
2. **tool** - 工具分享（功能介绍 + 使用教程）
3. **project** - 项目实战（开发记录 + 踩坑总结）
4. **paper** - 论文解读（核心方法 + 实验结果）
5. **learning** - 学习心得（收获 + 计划）
6. **casual** - 周末随笔（生活分享）
7. **weekly** - 周总结（复盘 + 计划）

---

## 🔔 通知配置

### 成功通知
```
✅ 博客发布成功
📝 标题：{文章标题}
🔗 链接：https://my-blog-phi-gules.vercel.app
```

### 失败通知
```
❌ 博客发布失败
⚠️ 错误：{错误信息}
请检查日志
```

---

## 📊 日志查看

日志位置：
```
C:\Users\Lenovo\.openclaw\workspace\my-blog\.openclaw\logs\daily-post.log
```

---

## 🎯 自定义内容

### 修改主题
编辑 `.openclaw/generate-post.js` 中的 `TOPICS` 对象。

### 添加模板
在 `TEMPLATES` 对象中添加新模板函数。

### 调整时间
修改 `.openclaw/cron-daily-post.json` 中的 cron 表达式。

---

## ✅ 当前状态

| 检查项 | 状态 |
|--------|------|
| 文章生成器 | ✅ 已安装 |
| 定时任务 | ✅ 已配置 |
| GitHub 推送 | ✅ 已测试 |
| Vercel 部署 | ✅ 已测试 |
| 第一篇生成 | ✅ 已完成 |

---

## 📈 已发布文章

1. Hello World - 我的博客开张了
2. OpenClaw 入门指南
3. VS Code 效率插件推荐（自动生成）

---

*系统已就绪，明天早上 8 点自动发布第一篇正式文章！* 🚀
