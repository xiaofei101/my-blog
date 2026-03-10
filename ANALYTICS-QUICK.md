# 📊 访问统计快速接入

## 当前配置

- **主题**: Next
- **统计方案**: 不蒜子（已配置）+ Google Analytics（可选）

---

## ✅ 方案一：不蒜子（已启用）

### 配置位置

编辑 `themes/next/layout/_partials/footer.swig`

### 添加代码

在 `</div>` 前添加：

```swig
{% if theme.analytics.busuanzi.enabled %}
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<div class="busuanzi-count">
  <span id="busuanzi_container_site_pv">
    <i class="fa fa-eye"></i> 本站总访问量：<span id="busuanzi_value_site_pv"></span> 次
  </span>
  <span id="busuanzi_container_site_uv">
    <i class="fa fa-user"></i> 本站访客数：<span id="busuanzi_value_site_uv"></span> 人
  </span>
</div>
{% endif %}
```

### 添加样式

编辑 `themes/next/source/css/_custom/custom.styl`：

```styl
.busuanzi-count
  text-align: center
  margin-top: 20px
  color: #999
  font-size: 14px
  
  span
    margin: 0 15px
    
  i
    margin-right: 5px
```

---

## 📈 方案二：Google Analytics 4

### 1. 获取 Tracking ID

1. 访问 https://analytics.google.com/
2. 创建账号和媒体资源
3. 获取测量 ID（格式：`G-XXXXXXXXXX`）

### 2. 安装插件

```bash
cd C:\Users\Lenovo\.openclaw\workspace\my-blog
npm install hexo-google-analytics --save
```

### 3. 配置

编辑 `_config.yml`：

```yaml
google_analytics:
  tracking_id: "G-XXXXXXXXXX"
```

### 4. 重新部署

```bash
hexo clean && hexo generate
vercel --prod
```

---

## 🇨🇳 方案三：百度统计

### 1. 获取站点 ID

1. 访问 https://tongji.baidu.com/
2. 创建网站
3. 获取站点 ID

### 2. 添加代码

编辑 `themes/next/layout/_partials/head.swig`，在 `<head>` 中添加：

```html
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

### 3. 重新部署

```bash
hexo clean && hexo generate
vercel --prod
```

---

## 🚀 快速接入（推荐）

### 一键接入不蒜子

```bash
# 1. 编辑页脚文件
# themes/next/layout/_partials/footer.swig

# 2. 在 </body> 前添加
echo '<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>' >> themes/next/layout/_partials/footer.swig

# 3. 添加显示代码
echo '<div style="text-align:center;margin-top:20px;color:#999;font-size:14px">
  <span id="busuanzi_container_site_pv">👁️ PV:<span id="busuanzi_value_site_pv"></span></span> | 
  <span id="busuanzi_container_site_uv">👤 UV:<span id="busuanzi_value_site_uv"></span></span>
</div>' >> themes/next/layout/_partials/footer.swig

# 4. 重新生成并部署
hexo clean && hexo generate
vercel --prod
```

---

## 📊 查看数据

| 方案 | 查看地址 |
|------|---------|
| 不蒜子 | 博客页脚直接显示 |
| Google Analytics | https://analytics.google.com/ |
| 百度统计 | https://tongji.baidu.com/ |

---

## ✅ 验证清单

部署后检查：
- [ ] 页脚显示访问量数字
- [ ] 刷新页面数字增长
- [ ] 后台能看到访问记录

---

*推荐先接入不蒜子，简单快速！* 📈
