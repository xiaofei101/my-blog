# 📬 通知渠道快速配置

## 当前状态

✅ **多通道通知系统已就绪**

支持渠道：飞书、钉钉、企业微信、Telegram、Discord、Slack、邮件、微信

---

## 🚀 快速配置（3 步完成）

### 第 1 步：选择通知渠道

编辑 `.openclaw/notifications.json`，启用你需要的渠道：

```json
"channels": {
  "feishu": { "enabled": true },    // ✅ 已配置
  "dingtalk": { "enabled": false }, // 改为 true 启用
  "telegram": { "enabled": false }, // 改为 true 启用
  "email": { "enabled": false },    // 改为 true 启用
  "wechat": { "enabled": false }    // 改为 true 启用
}
```

### 第 2 步：填写配置信息

#### 飞书（已配置）
```json
"feishu": {
  "webhook": "https://open.feishu.cn/open-apis/bot/v2/hook/xxx"
}
```
**获取方式**：飞书群 → 群设置 → 机器人 → 添加机器人 → 自定义

#### 钉钉
```json
"dingtalk": {
  "webhook": "https://oapi.dingtalk.com/robot/send?access_token=xxx",
  "secret": "SECxxx"
}
```
**获取方式**：钉钉群 → 群设置 → 智能群助手 → 添加机器人 → 自定义

#### Telegram
```json
"telegram": {
  "token": "bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
  "chatId": "123456789"
}
```
**获取方式**：
1. @BotFather 创建机器人获取 Token
2. @userinfobot 获取 Chat ID

#### 邮件
```json
"email": {
  "smtp": {
    "host": "smtp.qq.com",
    "port": 465,
    "auth": {
      "user": "your-email@qq.com",
      "pass": "授权码"
    }
  }
}
```
**获取方式**：QQ 邮箱 → 设置 → 账户 → 开启 SMTP → 获取授权码

#### 微信（ServerChan）
```json
"wechat": {
  "sendKey": "SCTxxx"
}
```
**获取方式**：访问 http://sc.ftqq.com/ 获取 SendKey

### 第 3 步：测试通知

```bash
cd C:\Users\Lenovo\.openclaw\workspace\my-blog
node .openclaw/notifier.js
```

---

## 📋 配置检查清单

| 渠道 | 配置完成 | 测试通过 |
|------|---------|---------|
| 飞书 | ✅ | ⏳ |
| 钉钉 | ⏳ | ⏳ |
| 企业微信 | ⏳ | ⏳ |
| Telegram | ⏳ | ⏳ |
| Discord | ⏳ | ⏳ |
| Slack | ⏳ | ⏳ |
| 邮件 | ⏳ | ⏳ |
| 微信 | ⏳ | ⏳ |

---

## 🔔 通知规则配置

编辑 `.openclaw/notifications.json` 的 `rules` 部分：

```json
"rules": {
  "onSuccess": {
    "enabled": true,
    "channels": ["feishu", "wechat"]  // 成功时通知这些渠道
  },
  "onFailure": {
    "enabled": true,
    "channels": ["feishu", "dingtalk", "email"]  // 失败时通知这些渠道
  }
}
```

---

## 💡 推荐配置

### 个人博客
```json
{
  "onSuccess": {
    "channels": ["feishu"]
  },
  "onFailure": {
    "channels": ["feishu", "wechat"]
  }
}
```

### 团队协作
```json
{
  "onSuccess": {
    "channels": ["feishu", "dingtalk"]
  },
  "onFailure": {
    "channels": ["feishu", "dingtalk", "email"]
  }
}
```

### 高可用
```json
{
  "onSuccess": {
    "channels": ["feishu"]
  },
  "onFailure": {
    "channels": ["feishu", "dingtalk", "telegram", "email", "sms"]
  }
}
```

---

## 🧪 测试命令

### 测试单个渠道
```bash
# 测试飞书
node -e "const n=require('./.openclaw/notifier.js');n.sendNotification('success',{title:'测试',url:'https://example.com'})"
```

### 测试所有渠道
```bash
node .openclaw/notifier.js
```

---

## 📊 通知效果预览

### 飞书消息
```
✅ 博客发布成功

📝 标题：VS Code 效率插件推荐
🔗 链接：https://my-blog-phi-gules.vercel.app
⏰ 时间：2026-03-10 22:40:00
```

### 钉钉消息
```markdown
## ✅ 博客发布成功
- **标题**: VS Code 效率插件推荐
- **链接**: [查看文章](https://my-blog-phi-gules.vercel.app)
- **时间**: 2026-03-10 22:40:00
```

### Telegram 消息
```
✅ 博客发布成功

📝 标题：VS Code 效率插件推荐
🔗 链接：https://my-blog-phi-gules.vercel.app
⏰ 时间：2026-03-10 22:40:00
```

### 邮件主题
```
✅ 博客发布成功：VS Code 效率插件推荐
```

---

## ⚠️ 常见问题

### Q: 飞书机器人不发送消息？
A: 检查：
1. Webhook URL 是否正确
2. 机器人是否已添加到群
3. 群是否允许机器人发言

### Q: 邮件发送失败？
A: 检查：
1. SMTP 配置是否正确
2. 授权码是否有效
3. 防火墙是否拦截 465 端口

### Q: Telegram 收不到消息？
A: 检查：
1. Token 是否正确
2. Chat ID 是否正确
3. 是否已启动机器人对话

---

## 📚 相关文档

- `NOTIFICATIONS-GUIDE.md` - 完整配置指南
- `notifications.json` - 通知配置文件
- `notifier.js` - 通知发送器

---

*配置完成后，博客发布会自动通知你！* 📬
