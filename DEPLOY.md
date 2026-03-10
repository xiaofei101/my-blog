# Vercel 部署指南

## 🚀 快速部署

### 方式 1：Vercel CLI（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署
cd C:\Users\Lenovo\.openclaw\workspace\my-blog
vercel --prod
```

### 方式 2：Vercel 官网

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库 `xiaofei101/my-blog`
3. 配置构建设置：
   - **Build Command**: `hexo generate`
   - **Output Directory**: `public`
   - **Install Command**: `npm install`
4. 点击 Deploy

### 方式 3：GitHub Actions（自动部署）

已在 `.github/workflows/deploy.yml` 配置自动部署。

需要在 Vercel 获取以下 Secrets：
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## 📝 部署后配置

### 自定义域名（可选）

1. 在 Vercel 项目设置中添加域名
2. 配置 DNS 记录

### 环境变量

无需特殊环境变量。

---

## ✅ 验证部署

部署完成后访问：
- **生产环境**: https://my-blog-xiaofei101.vercel.app
- **预览环境**: （每次 PR 自动生成）

---

## 🔧 故障排查

### 构建失败

```bash
# 本地测试构建
hexo clean
hexo generate
```

### 部署后页面空白

检查 `vercel.json` 配置是否正确。

---

*最后更新：2026-03-10*
