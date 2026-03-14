---
name: claude-code-orchestrator
description: Orchestrate Claude Code for coding tasks via sub-agents. Use when user asks to write code, fix bugs, add features, refactor, or review PRs using Claude Code. Triggers on "用 Claude Code", "讓 Claude Code", "Claude Code 幫我", or any request to delegate coding work to Claude Code.
---

# Claude Code Orchestrator

Delegate coding tasks to Claude Code via sub-agents. Keep main session clean; let sub-agent handle all interaction.

## Decision Tree

```
User wants coding help?
├─ Simple question/explanation → Answer directly (don't use Claude Code)
├─ Quick edit (< 5 lines) → Do it yourself
└─ Substantial coding work → Use Claude Code via sub-agent
    ├─ Bug fix → template: fix-bug
    ├─ New feature → template: add-feature  
    ├─ Refactor → template: refactor
    └─ PR review → template: review
```

## Execution Protocol

### Step 1: Validate

```
✓ Project path exists and is a git repo
✓ Path is NOT ~/clawd/ or Clawdbot's workspace
✓ Task is clearly defined
```

### Step 2: Spawn Sub-agent

```
sessions_spawn:
  task: |
    你是 Claude Code 操作員。執行以下任務：
    
    **專案路徑**: {project_path}
    **任務類型**: {task_type}
    **任務描述**: {task_description}
    
    執行步驟：
    1. exec pty:true workdir:"{project_path}" background:true command:"claude '{prompt}'"
    2. 用 process action:log sessionId:XXX 監控進度
    3. 如果 Claude Code 問問題，用 process action:submit 回答
    4. 完成後回報：做了什麼改動、影響哪些檔案
    
    注意：
    - 不要自己寫程式碼，讓 Claude Code 做
    - 遇到錯誤先重試一次，再報告
  cleanup: delete
  runTimeoutSeconds: 600
```

### Step 3: Report

Sub-agent 完成後會自動 ping 回主 session，轉達結果給用戶。

## Prompt Templates

See [references/prompts.md](references/prompts.md) for task-specific prompt templates.

## Examples

See [references/examples.md](references/examples.md) for complete usage examples.

## Error Handling

| Error | Action |
|-------|--------|
| Claude Code hangs | process action:kill, retry once |
| Path not found | Ask user for correct path |
| Not a git repo | Suggest: `git init` or provide correct path |
| Permission denied | Check file permissions, report to user |
| Sub-agent timeout | Report partial progress, ask if should continue |

## Don'ts

- ❌ Run in ~/clawd/ (will read soul docs)
- ❌ Skip pty:true (Claude Code needs TTY)
- ❌ Let sub-agent write code itself (defeats the purpose)
- ❌ Spawn without validating path first
