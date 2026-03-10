/**
 * 多通道通知发送器
 * 支持：飞书、钉钉、企业微信、Telegram、Discord、Slack、邮件、微信
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 加载配置
const configPath = path.join(__dirname, 'notifications.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

/**
 * 发送通知
 * @param {string} type - 'success' | 'failure'
 * @param {object} data - 模板变量 {title, url, time, error}
 */
async function sendNotification(type, data) {
  const rules = config.rules[`on${type.charAt(0).toUpperCase() + type.slice(1)}`];
  if (!rules || !rules.enabled) {
    console.log(`通知规则未启用：on${type}`);
    return;
  }

  const channels = rules.channels;
  const promises = channels.map(channelId => {
    const channel = config.channels[channelId];
    if (!channel || !channel.enabled) return Promise.resolve();
    
    return sendToChannel(channelId, channel, type, data);
  });

  await Promise.allSettled(promises);
}

/**
 * 发送到指定渠道
 */
async function sendToChannel(channelId, channel, type, data) {
  try {
    const template = channel.templates[type];
    const message = renderTemplate(template, data);

    switch (channel.type) {
      case 'webhook':
        await sendWebhook(channelId, channel.config, message);
        break;
      case 'bot':
        await sendBot(channelId, channel.config, message);
        break;
      case 'smtp':
        await sendEmail(channelId, channel.config, message);
        break;
      case 'api':
        await sendApi(channelId, channel.config, message);
        break;
    }

    console.log(`✅ 通知已发送：${channel.name}`);
  } catch (error) {
    console.error(`❌ 通知发送失败 (${channel.name}):`, error.message);
  }
}

/**
 * 渲染模板
 */
function renderTemplate(template, data) {
  let rendered = JSON.stringify(template);
  
  Object.entries(data).forEach(([key, value]) => {
    rendered = rendered.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  });
  
  // 特殊变量
  rendered = rendered.replace('{time}', new Date().toLocaleString('zh-CN'));
  rendered = rendered.replace('{isoTime}', new Date().toISOString());
  
  return JSON.parse(rendered);
}

/**
 * 发送 Webhook 通知（飞书、钉钉、企业微信、Discord、Slack）
 */
async function sendWebhook(channelId, config, message) {
  const webhookUrl = config.webhook;
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(message);
    
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    const req = https.request(webhookUrl, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) resolve();
        else reject(new Error(`HTTP ${res.statusCode}`));
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * 发送 Bot 通知（Telegram）
 */
async function sendBot(channelId, config, message) {
  const { token, chatId } = config;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: chatId,
      text: message.text,
      parse_mode: config.parseMode
    });

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const result = JSON.parse(body);
        if (result.ok) resolve();
        else reject(new Error(result.description));
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * 发送邮件通知
 */
async function sendEmail(channelId, config, message) {
  // 使用 nodemailer 发送邮件
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport(config.smtp);
  
  await transporter.sendMail({
    from: config.from,
    to: config.to.join(','),
    subject: message.subject,
    html: message.html
  });
}

/**
 * 发送 API 通知（ServerChan 等）
 */
async function sendApi(channelId, config, message) {
  if (config.provider === 'serverchan') {
    const url = `https://sctapi.ftqq.com/${config.sendKey}.send`;
    
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams({
        title: message.title,
        desp: message.desp
      });

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      const req = https.request(url, options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const result = JSON.parse(body);
          if (result.code === 0) resolve();
          else reject(new Error(result.message));
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
}

// 导出函数
module.exports = { sendNotification };

// 测试
if (require.main === module) {
  // 测试成功通知
  sendNotification('success', {
    title: '测试文章标题',
    url: 'https://my-blog-phi-gules.vercel.app',
    error: ''
  }).then(() => {
    console.log('测试完成');
  });
}
