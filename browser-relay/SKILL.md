---
name: browser-relay
description: Control Chrome browser tabs via Browser Relay extension. Use when user asks to view, interact with, or automate web pages that require login, JavaScript rendering, clicking, form filling, or screenshots. Triggers on "看這個網頁", "幫我操作", "截圖這頁", "填這個表單", or requests involving authenticated web pages.
---

# Browser Relay Skill

Control user's Chrome browser via the Clawdbot Browser Relay extension.

## Decision Tree

```
User wants to access a web page?
│
├─ Public content, no interaction needed
│  └─ Use web_fetch (faster, no extension needed)
│
├─ Needs login / authenticated session
│  └─ Use browser relay (uses user's session)
│
├─ Needs JavaScript rendering
│  └─ Use browser relay (full browser engine)
│
├─ Needs interaction (click, type, fill form)
│  └─ Use browser relay
│
└─ Needs screenshot
   └─ Use browser relay
```

## Prerequisites

Before using browser relay:

1. **Check if tab is attached**
   - Ask user: "請在 Chrome 開啟目標網頁，然後點擊工具列的 Clawdbot Browser Relay 圖示（讓 badge 亮起來）"
   
2. **Verify connection**
   ```
   browser action:"tabs" profile:"chrome"
   ```
   - If no tabs → guide user to attach
   - If tabs exist → proceed with operations

## Core Operations

### 1. Snapshot (View Page)

Get page structure as accessible tree:

```
browser action:"snapshot" profile:"chrome"
```

Options:
- `compact:true` — shorter output
- `interactive:true` — only interactive elements

### 2. Screenshot

Capture visual image:

```
browser action:"screenshot" profile:"chrome"
```

Options:
- `fullPage:true` — capture entire scrollable page

### 3. Click

```
browser action:"act" profile:"chrome" request:{kind:"click", ref:"<element_ref>"}
```

Get `ref` from snapshot output (e.g., `e12`, `button#submit`).

### 4. Type Text

```
browser action:"act" profile:"chrome" request:{kind:"type", ref:"<input_ref>", text:"Hello"}
```

### 5. Fill Form (Multiple Fields)

```
browser action:"act" profile:"chrome" request:{kind:"fill", fields:[
  {ref:"input#email", text:"user@example.com"},
  {ref:"input#password", text:"***"}
]}
```

### 6. Navigate

```
browser action:"navigate" profile:"chrome" targetUrl:"https://example.com"
```

### 7. Press Key

```
browser action:"act" profile:"chrome" request:{kind:"press", key:"Enter"}
```

## Workflow Pattern

Typical automation flow:

```
1. snapshot → see what's on page
2. act (click/type) → interact
3. snapshot → verify result
4. repeat as needed
```

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| No tabs connected | User hasn't attached tab | Guide: "請點擊 Browser Relay 圖示" |
| Element not found | Wrong ref or page changed | Re-snapshot, find correct ref |
| Action timeout | Page loading slowly | Wait, retry with longer timeout |
| Permission denied | Extension not installed | Guide to install extension |

## When NOT to Use

- Simple content fetching → `web_fetch` is faster
- API available → direct API call is more reliable
- No user interaction possible → can't attach tab

## Tips

1. **Always snapshot first** — understand page before acting
2. **Keep targetId** — use same targetId from snapshot for subsequent actions
3. **Use refs from snapshot** — element refs like `e12` come from snapshot output
4. **Confirm critical actions** — ask user before submitting forms with sensitive data

## Examples

See [references/examples.md](references/examples.md) for complete workflow examples.
