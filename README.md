# Clawdbot Skills

Shared skills for [Clawdbot](https://github.com/clawdbot/clawdbot) AI agent automation.

## 📦 Available Skills

| Skill | Description |
|-------|-------------|
| [browser-relay](./browser-relay/) | Control Chrome browser via Browser Relay extension |
| [claude-code-orchestrator](./claude-code-orchestrator/) | Orchestrate Claude Code for coding tasks via sub-agents |
| [youtube-summary-skill](./youtube-summary-skill.zip) | Summarize YouTube videos (download and extract) |

## 📖 Documentation (給人看的)

安裝指南、設定步驟、工具需求：**[docs/](./docs/)**

| 文件 | 說明 |
|------|------|
| [工具需求對照表](./docs/README.md) | 各 Skill 需要安裝的工具 |
| [Browser Relay 安裝指南](./docs/browser-relay-setup.md) | Chrome 擴充功能安裝步驟 |

## 🚀 How to Use

### Option 1: Clone to your workspace

```bash
cd ~/clawd/skills
git clone https://github.com/tomkuo1124/clawdbot-skills.git
```

### Option 2: Copy specific skills

```bash
# Clone the repo
git clone https://github.com/tomkuo1124/clawdbot-skills.git

# Copy the skill you need
cp -r clawdbot-skills/browser-relay ~/clawd/skills/
cp -r clawdbot-skills/claude-code-orchestrator ~/clawd/skills/
```

### Option 3: Git submodule (advanced)

```bash
cd ~/clawd
git submodule add https://github.com/tomkuo1124/clawdbot-skills.git skills/shared
```

## 📁 Structure

```
clawdbot-skills/
├── README.md
├── docs/                         # 📖 給人看的文件
│   ├── README.md                 # 工具需求對照表
│   └── browser-relay-setup.md    # Browser Relay 安裝指南
├── browser-relay/                # 🤖 給 AI 的 Skill
│   ├── SKILL.md
│   └── references/
│       └── examples.md
├── claude-code-orchestrator/
│   ├── SKILL.md
│   └── references/
│       ├── prompts.md
│       └── examples.md
└── youtube-summary-skill.zip
```

## 🤝 Contributing

Feel free to add new skills or improve existing ones!

1. Fork this repo
2. Add your skill folder with `SKILL.md`
3. Update README.md with your skill
4. Open a PR

## 📝 License

MIT
