# Complete Examples

## Example 1: Fix a Bug

**User says:** "用 Claude Code 修 C:\Projects\webapp 裡的 login bug，用戶會被隨機登出"

**Clawdbot executes:**

```
sessions_spawn:
  task: |
    你是 Claude Code 操作員。執行以下任務：
    
    **專案路徑**: C:\Projects\webapp
    **任務類型**: fix-bug
    **任務描述**: 用戶會被隨機登出
    
    執行步驟：
    1. 執行：
       exec pty:true workdir:"C:\Projects\webapp" background:true command:"claude 'Fix the bug where users are getting randomly logged out. Check session handling, token expiration, and auth middleware. When completely finished, run: clawdbot gateway wake --text \"Done: Fixed random logout bug\" --mode now'"
    
    2. 用 process action:log sessionId:XXX 監控進度（每 30 秒檢查一次）
    
    3. 如果 Claude Code 問問題，根據情況用 process action:submit 回答
    
    4. 完成後回報：
       - 修改了哪些檔案
       - 問題的根本原因是什麼
       - 如何驗證修復
  cleanup: delete
  runTimeoutSeconds: 600
```

---

## Example 2: Add a Feature

**User says:** "讓 Claude Code 在 C:\Projects\api 加一個 rate limiting 功能"

**Clawdbot executes:**

```
sessions_spawn:
  task: |
    你是 Claude Code 操作員。執行以下任務：
    
    **專案路徑**: C:\Projects\api
    **任務類型**: add-feature
    **任務描述**: 加入 rate limiting 功能
    
    執行：
    exec pty:true workdir:"C:\Projects\api" background:true command:"claude 'Add rate limiting to the API. Requirements: (1) Limit to 100 requests per minute per IP, (2) Return 429 status when exceeded, (3) Add X-RateLimit-* headers, (4) Use in-memory store (Redis optional). When completely finished, run: clawdbot gateway wake --text \"Done: Added rate limiting\" --mode now'"
    
    監控並回報結果。
  cleanup: delete
  runTimeoutSeconds: 600
```

---

## Example 3: Refactor Code

**User says:** "用 Claude Code 重構 C:\Projects\app\src\utils，太亂了"

**Clawdbot executes:**

```
sessions_spawn:
  task: |
    你是 Claude Code 操作員。執行以下任務：
    
    **專案路徑**: C:\Projects\app
    **任務類型**: refactor
    **任務描述**: 重構 src/utils 資料夾
    
    執行：
    exec pty:true workdir:"C:\Projects\app" background:true command:"claude 'Refactor src/utils/ directory. Goals: (1) Group related functions into logical modules, (2) Remove duplicate code, (3) Add JSDoc comments, (4) Ensure all imports still work. Do not change function signatures or behavior. When completely finished, run: clawdbot gateway wake --text \"Done: Refactored utils\" --mode now'"
    
    監控並回報改動摘要。
  cleanup: delete
  runTimeoutSeconds: 600
```

---

## Example 4: Review a PR

**User says:** "讓 Claude Code review PR #42 在 C:\Projects\clawdbot-fork"

**Clawdbot executes:**

```
sessions_spawn:
  task: |
    你是 Claude Code 操作員。執行 PR review：
    
    **專案路徑**: C:\Projects\clawdbot-fork
    **任務類型**: review
    **PR**: #42
    
    步驟：
    1. 先 fetch PR：
       exec workdir:"C:\Projects\clawdbot-fork" command:"git fetch origin pull/42/head:pr-42 && git diff main...pr-42 > /tmp/pr-42.diff"
    
    2. 執行 review：
       exec pty:true workdir:"C:\Projects\clawdbot-fork" background:true command:"claude 'Review the changes in PR #42. Read the diff at /tmp/pr-42.diff. Check for: bugs, security issues, performance, code style. Output a structured review. When done, run: clawdbot gateway wake --text \"Done: PR #42 review complete\" --mode now'"
    
    3. 回報 review 結果
  cleanup: delete
  runTimeoutSeconds: 600
```

---

## Parallel Tasks (Advanced)

For multiple independent tasks, spawn multiple sub-agents:

```
# Task 1: Fix issue #78
sessions_spawn:
  label: "fix-78"
  task: "... Claude Code fix issue #78 in worktree /tmp/fix-78 ..."

# Task 2: Fix issue #99  
sessions_spawn:
  label: "fix-99"
  task: "... Claude Code fix issue #99 in worktree /tmp/fix-99 ..."

# Monitor both
sessions_list kinds:["spawn"]
```
