# Clawdbot Skills

Shared skills for [Clawdbot](https://github.com/clawdbot/clawdbot) AI agent automation.

## 📦 Available Skills

| Skill | Description |
|-------|-------------|
| [browser-relay](./browser-relay/) | Control Chrome browser via Browser Relay extension |
| [claude-code-orchestrator](./claude-code-orchestrator/) | Orchestrate Claude Code for coding tasks via sub-agents |
| [youtube-summary-skill](./youtube-summary-skill.zip) | Summarize YouTube videos (download and extract) |

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
├── browser-relay/
│   ├── SKILL.md              # Decision tree + operations
│   └── references/
│       └── examples.md       # Workflow examples
├── claude-code-orchestrator/
│   ├── SKILL.md              # Orchestration protocol
│   └── references/
│       ├── prompts.md        # Task templates
│       └── examples.md       # Usage examples
└── youtube-summary-skill.zip # YouTube summarization
```

## 🤝 Contributing

Feel free to add new skills or improve existing ones!

1. Fork this repo
2. Add your skill folder with `SKILL.md`
3. Update README.md with your skill
4. Open a PR

## 📝 License

MIT
