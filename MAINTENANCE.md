# Hexo 博客日常维护脚本

## 每日检查清单

### 1. 检查 Hexo 生成
```bash
cd C:\Users\Lenovo\.openclaw\workspace\my-blog
hexo clean
hexo generate
```

### 2. 本地预览
```bash
hexo server
# 访问 http://localhost:4000
```

### 3. 提交到 GitHub
```bash
git add .
git commit -m "日常更新：$(date +%Y-%m-%d)"
git push origin main
```

### 4. 检查 Vercel 部署状态
访问：https://vercel.com/dashboard

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `hexo new post "标题"` | 创建新文章 |
| `hexo new page "页面名"` | 创建新页面 |
| `hexo generate` | 生成静态文件 |
| `hexo server` | 本地预览 |
| `hexo clean` | 清理缓存 |
| `hexo deploy` | 部署 |

---

## 内容计划

### 每周更新
- 周一：技术教程
- 周三：项目实战
- 周五：学习心得
- 周末：论文解读

### 每月总结
- 技术栈更新
- 项目进度回顾
- 下月计划

---

*最后更新：2026-03-10*
