# 📬 博客通知渠道配置指南

## 当前支持的通知渠道

| 渠道 | 状态 | 适用场景 |
|------|------|---------|
| **飞书** | ✅ 已配置 | 团队协作 |
| 钉钉 | ⏸️ 可选 | 企业通知 |
| 企业微信 | ⏸️ 可选 | 公司内部 |
| 邮件 | ⏸️ 可选 | 个人通知 |
| Telegram | ⏸️ 可选 | 个人/群组 |
| Discord | ⏸️ 可选 | 社区通知 |
| Slack | ⏸️ 可选 | 团队协作 |
| 短信 | ⏸️ 可选 | 紧急通知 |
| 微信 | ⏸️ 可选 | 个人通知 |

---

## 方案一：钉钉通知

### 1. 创建机器人

1. 打开钉钉群 → 群设置 → 智能群助手
2. 添加机器人 → 自定义
3. 获取 Webhook URL

### 2. 配置通知

编辑 `.openclaw/cron-daily-post.json`：

```json
"notifications": {
  "dingtalk": {
    "enabled": true,
    "webhook": "https://oapi.dingtalk.com/robot/send?access_token=xxx",
    "secret": "SECxxx",
    "onSuccess": "✅ 博客发布成功\n📝 标题：{title}\n🔗 {url}",
    "onFailure": "❌ 博客发布失败\n⚠️ {error}"
  }
}
```

### 3. 测试

```bash
curl 'https://oapi.dingtalk.com/robot/send?access_token=xxx' \
  -H 'Content-Type: application/json' \
  -d '{"msgtype":"text","text":{"content":"测试通知"}}'
```

---

## 方案二：企业微信通知

### 1. 创建机器人

1. 打开企业微信群 → 群设置 → 添加群机器人
2. 获取 Webhook URL

### 2. 配置通知

```json
"notifications": {
  "wecom": {
    "enabled": true,
    "webhook": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx",
    "onSuccess": "✅ 博客发布成功\n📝 标题：{title}\n🔗 {url}",
    "onFailure": "❌ 博客发布失败\n⚠️ {error}"
  }
}
```

---

## 方案三：邮件通知

### 1. 配置 SMTP

编辑 `.openclaw/notifications.json`：

```json
"email": {
  "enabled": true,
  "smtp": {
    "host": "smtp.qq.com",
    "port": 465,
    "secure": true,
    "auth": {
      "user": "your-email@qq.com",
      "pass": "your-auth-code"
    }
  },
  "from": "your-email@qq.com",
  "to": ["receiver@email.com"]
}
```

### 2. 获取授权码

- QQ 邮箱：设置 → 账户 → 开启 SMTP → 获取授权码
- 163 邮箱：设置 → POP3/SMTP → 开启服务 → 获取授权码

### 3. 邮件模板

```json
"email": {
  "onSuccess": {
    "subject": "✅ 博客发布成功：{title}",
    "html": "<h1>博客发布成功</h1><p>标题：{title}</p><p>链接：<a href='{url}'>查看</a></p>"
  },
  "onFailure": {
    "subject": "❌ 博客发布失败",
    "html": "<h1>发布失败</h1><p>错误：{error}</p>"
  }
}
```

---

## 方案四：Telegram 通知

### 1. 创建 Bot

1. 打开 Telegram → 搜索 @BotFather
2. 发送 `/newbot` 创建机器人
3. 获取 Token

### 2. 获取 Chat ID

1. 搜索 @userinfobot
2. 发送任意消息获取 Chat ID

### 3. 配置通知

```json
"notifications": {
  "telegram": {
    "enabled": true,
    "token": "bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
    "chatId": "123456789",
    "onSuccess": "✅ 博客发布成功\n📝 标题：{title}\n🔗 {url}",
    "onFailure": "❌ 博客发布失败\n⚠️ {error}"
  }
}
```

---

## 方案五：Discord 通知

### 1. 创建 Webhook

1. Discord 群设置 → 集成 → Webhooks
2. 新建 Webhook
3. 复制 URL

### 2. 配置通知

```json
"notifications": {
  "discord": {
    "enabled": true,
    "webhook": "https://discord.com/api/webhooks/xxx/yyy",
    "onSuccess": {
      "embeds": [{
        "title": "✅ 博客发布成功",
        "description": "📝 标题：{title}",
        "url": "{url}",
        "color": 3066993
      }]
    },
    "onFailure": {
      "embeds": [{
        "title": "❌ 博客发布失败",
        "description": "⚠️ {error}",
        "color": 15158332
      }]
    }
  }
}
```

---

## 方案六：Slack 通知

### 1. 创建 Webhook

1. 访问 https://slack.com/apps/new/A0F7XDUAZ
2. 选择频道
3. 获取 Webhook URL

### 2. 配置通知

```json
"notifications": {
  "slack": {
    "enabled": true,
    "webhook": "https://hooks.slack.com/services/T00/B00/xxx",
    "channel": "#blog-updates",
    "username": "Blog Bot",
    "onSuccess": "✅ 博客发布成功\n📝 标题：{title}\n🔗 {url}",
    "onFailure": "❌ 博客发布失败\n⚠️ {error}"
  }
}
```

---

## 方案七：短信通知（紧急）

### 使用阿里云短信

```json
"notifications": {
  "sms": {
    "enabled": false,
    "provider": "aliyun",
    "accessKeyId": "xxx",
    "accessKeySecret": "xxx",
    "signName": "博客通知",
    "templateCode": "SMS_xxx",
    "phoneNumbers": ["13800138000"]
  }
}
```

---

## 方案八：微信通知

### 使用 ServerChan（推荐）

1. 访问 http://sc.ftqq.com/
2. 获取 SendKey
3. 关注公众号接收消息

```json
"notifications": {
  "wechat": {
    "enabled": true,
    "provider": "serverchan",
    "sendKey": "SCTxxx",
    "onSuccess": "博客发布成功：{title}",
    "onFailure": "博客发布失败：{error}"
  }
}
```

### 使用企业微信应用

```json
"notifications": {
  "wechat": {
    "enabled": true,
    "provider": "wecom-app",
    "corpId": "xxx",
    "agentId": "1000001",
    "secret": "xxx",
    "userId": "xxx"
  }
}
```

---

## 🎯 完整配置示例

```json
{
  "notifications": {
    "feishu": {
      "enabled": true,
      "webhook": "https://open.feishu.cn/open-apis/bot/v2/hook/xxx"
    },
    "dingtalk": {
      "enabled": true,
      "webhook": "https://oapi.dingtalk.com/robot/send?access_token=xxx"
    },
    "telegram": {
      "enabled": false,
      "token": "bot123456:xxx",
      "chatId": "123456789"
    },
    "email": {
      "enabled": false,
      "smtp": {
        "host": "smtp.qq.com",
        "port": 465,
        "auth": {
          "user": "xxx@qq.com",
          "pass": "xxx"
        }
      },
      "from": "xxx@qq.com",
      "to": ["xxx@email.com"]
    },
    "wechat": {
      "enabled": true,
      "provider": "serverchan",
      "sendKey": "SCTxxx"
    }
  },
  
  "notifyOn": {
    "success": true,
    "failure": true,
    "retry": true
  }
}
```

---

## 🔧 快速接入脚本

### 钉钉一键配置

```bash
# 1. 获取 Webhook（从钉钉群）
DINGTALK_WEBHOOK="https://oapi.dingtalk.com/robot/send?access_token=xxx"

# 2. 测试
curl "$DINGTALK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d '{"msgtype":"text","text":{"content":"博客通知测试"}}'
```

### Telegram 一键配置

```bash
# 1. 获取 Token 和 Chat ID
TELEGRAM_TOKEN="bot123456:xxx"
TELEGRAM_CHAT_ID="123456789"

# 2. 测试
curl -X POST "https://api.telegram.org/bot$TELEGRAM_TOKEN/sendMessage" \
  -d "chat_id=$TELEGRAM_CHAT_ID" \
  -d "text=博客通知测试"
```

---

## 📊 通知渠道对比

| 渠道 | 实时性 | 稳定性 | 成本 | 推荐度 |
|------|--------|--------|------|--------|
| 飞书 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ |
| 钉钉 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ |
| 企业微信 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ |
| Telegram | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐ |
| Discord | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐ |
| 邮件 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 免费 | ⭐⭐⭐ |
| 短信 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 付费 | ⭐⭐ |
| 微信 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐ |

---

## ✅ 推荐组合

### 个人博客
```
✅ 飞书/钉钉（主通知）
✅ ServerChan 微信（备用）
```

### 团队协作
```
✅ 飞书（主通知）
✅ 钉钉（备用）
✅ 邮件（日报）
```

### 紧急通知
```
✅ 飞书/钉钉（日常）
✅ 短信（失败时）
```

---

*选择适合你的通知渠道，不错过任何更新！* 📬
