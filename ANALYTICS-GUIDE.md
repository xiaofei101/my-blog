# 📊 博客访问统计接入指南

## 推荐方案对比

| 方案 | 优点 | 缺点 | 适合 |
|------|------|------|------|
| **不蒜子** | 简单、无需配置 | 功能基础 | 个人博客 ✅ |
| **Google Analytics** | 功能强大、免费 | 国内访问慢 | 国际用户 |
| **百度统计** | 国内访问快 | 隐私问题 | 国内用户 |
| **Umami** | 开源、隐私友好 | 需自建 | 技术爱好者 |
| **Plausible** | 轻量、隐私友好 | 付费 | 专业博客 |

---

## 方案一：不蒜子（最简单）✅

### 特点
- ⚡ 无需注册
- 📝 只需添加 JS
- 📊 显示访问量

### 配置步骤

#### 1. 编辑主题文件

编辑 `themes/landscape/layout/_partial/head.ejs`：

```ejs
<!-- 不蒜子访问统计 -->
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

#### 2. 显示统计数字

在 `themes/landscape/layout/_partial/footer.ejs` 添加：

```ejs
<div class="busuanzi-count">
  <span id="busuanzi_container_site_pv">
    本站总访问量：<span id="busuanzi_value_site_pv"></span> 次
  </span>
  <span id="busuanzi_container_site_uv">
    本站访客数：<span id="busuanzi_value_site_uv"></span> 人
  </span>
</div>
```

#### 3. 添加样式

在 `themes/landscape/source/css/style.css` 添加：

```css
.busuanzi-count {
  text-align: center;
  margin-top: 20px;
  color: #999;
  font-size: 14px;
}

.busuanzi-count span {
  margin: 0 15px;
}
```

#### 4. 重新生成

```bash
hexo clean && hexo generate
vercel --prod
```

---

## 方案二：Google Analytics 4

### 特点
- 📈 详细数据分析
- 🌍 全球覆盖
- 💰 完全免费

### 配置步骤

#### 1. 注册 GA4

1. 访问 https://analytics.google.com/
2. 创建账号
3. 创建媒体资源（网站）
4. 获取测量 ID（格式：`G-XXXXXXXXXX`）

#### 2. 安装插件

```bash
npm install hexo-google-analytics --save
```

#### 3. 配置

编辑 `_config.yml`：

```yaml
google_analytics:
  tracking_id: "G-XXXXXXXXXX"
```

#### 4. 重新生成

```bash
hexo clean && hexo generate
vercel --prod
```

---

## 方案三：百度统计

### 特点
- 🇨🇳 国内访问快
- 📱 移动端分析
- 🔥 热搜分析

### 配置步骤

#### 1. 注册

1. 访问 https://tongji.baidu.com/
2. 创建网站
3. 获取站点 ID

#### 2. 添加代码

编辑 `themes/landscape/layout/_partial/head.ejs`：

```ejs
<!-- 百度统计 -->
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?你的站点 ID";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```

#### 3. 重新生成

```bash
hexo clean && hexo generate
vercel --prod
```

---

## 方案四：Umami（推荐进阶）

### 特点
- 🔒 隐私友好
- 🏠 自托管
- 📊 功能完整

### 配置步骤

#### 1. 部署 Umami

使用 Vercel 一键部署：

```bash
git clone https://github.com/umami-software/umami.git
cd umami
# 按照 Umami 文档配置数据库
```

或使用 Docker：

```bash
docker run -d \
  --name umami \
  -p 3000:3000 \
  ghcr.io/umami-software/umami:latest
```

#### 2. 创建网站

1. 访问 Umami 后台
2. 添加网站
3. 获取 Website ID

#### 3. 安装插件

```bash
npm install hexo-umami-analytics --save
```

#### 4. 配置

编辑 `_config.yml`：

```yaml
umami:
  enabled: true
  website_id: "xxx-xxx-xxx"
  host_url: "https://umami.example.com"
```

---

## 方案五：Plausible Analytics

### 特点
- 🎯 轻量（<1KB）
- 🔒 GDPR 合规
- 💰 付费（$9/月）

### 配置

```yaml
plausible:
  enabled: true
  domain: "my-blog-phi-gules.vercel.app"
  host: "https://plausible.io"
```

---

## 🎯 推荐配置

### 个人博客最佳实践

```yaml
# 同时使用多个统计
analytics:
  # 不蒜子 - 显示在页脚
  busuanzi:
    enabled: true
  
  # Google Analytics - 后台分析
  google_analytics:
    enabled: true
    tracking_id: "G-XXXXXXXXXX"
```

### 国内用户推荐

```yaml
analytics:
  # 不蒜子 - 简单统计
  busuanzi:
    enabled: true
  
  # 百度统计 - 详细分析
  baidu_tongji:
    enabled: true
    site_id: "xxxxxxxxxx"
```

---

## 📊 查看数据

### 不蒜子
直接在博客页脚查看实时数据

### Google Analytics
访问 https://analytics.google.com/

### 百度统计
访问 https://tongji.baidu.com/

### Umami
访问自建的 Umami 后台

---

## 🔧 快速接入（推荐不蒜子）

### 一键脚本

```bash
# 1. 编辑页脚
# themes/landscape/layout/_partial/footer.ejs

# 2. 添加不蒜子代码
echo '<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>' >> themes/landscape/layout/_partial/footer.ejs

echo '<div style="text-align:center;margin-top:20px;color:#999;font-size:14px">
  <span id="busuanzi_container_site_pv">PV:<span id="busuanzi_value_site_pv"></span></span> | 
  <span id="busuanzi_container_site_uv">UV:<span id="busuanzi_value_site_uv"></span></span>
</div>' >> themes/landscape/layout/_partial/footer.ejs

# 3. 重新生成
hexo clean && hexo generate

# 4. 部署
vercel --prod
```

---

## ✅ 验证

部署后访问博客，检查：
- [ ] 页脚显示访问量
- [ ] 数字正常增长
- [ ] 后台能看到数据

---

*选择适合你的方案，开始追踪博客数据吧！* 📈
