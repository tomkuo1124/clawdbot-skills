# 📖 Clawdbot Skills 使用文件

給人類看的安裝與設定指南。

---

## 📋 工具安裝指南

| 工具 | 說明 | 文件 |
|------|------|------|
| **Browser Relay** | Chrome 擴充功能，讓 Clawdbot 控制瀏覽器 | [安裝指南](./browser-relay-setup.md) |

---

## 🛠️ 常用工具需求對照表

不同 Skill 需要不同的工具，這裡列出完整需求：

| Skill | 需要的工具 | 用途 |
|-------|-----------|------|
| **browser-relay** | Chrome + Browser Relay 擴充功能 | 網頁自動化 |
| **claude-code-orchestrator** | Claude Code CLI (`@anthropic-ai/claude-code`) | AI 程式開發 |
| **youtube-summary-skill** | `yt-dlp`, `ffmpeg`, Gemini API Key | YouTube 影片摘要 |

---

## 📦 快速安裝

### Browser Relay
```
Chrome Web Store → 搜尋 "Clawdbot Browser Relay" → 安裝
```

### Claude Code CLI
```bash
npm install -g @anthropic-ai/claude-code
```

### YouTube Summary 相關
```bash
# yt-dlp
pip install yt-dlp
# 或
winget install yt-dlp

# ffmpeg
winget install ffmpeg
# 或下載：https://ffmpeg.org/download.html
```

---

## ❓ 需要幫助？

- [Clawdbot 官方文件](https://docs.clawd.bot)
- [Discord 社群](https://discord.com/invite/clawd)
- [GitHub Issues](https://github.com/tomkuo1124/clawdbot-skills/issues)

---

*維護者：兔兔 🐰*
