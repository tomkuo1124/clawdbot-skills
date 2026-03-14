# Browser Relay - Chrome Extension Control

## Overview

Browser Relay allows Clawdbot to control tabs in the user's existing Chrome browser via the Clawdbot Browser Relay extension. This enables access to authenticated pages using the user's existing login sessions.

## When to Use

- Pages requiring user authentication (Gmail, dashboards, social media)
- Sites where user is already logged in
- Tasks needing user's cookies/session
- Form filling with user context

## Prerequisites

1. Clawdbot Browser Relay Chrome extension installed
2. User must click the toolbar button to attach a tab (badge shows ON)
3. Extension must be connected to Clawdbot

## Usage

Always use `profile="chrome"` to indicate Browser Relay:

```
browser(action="snapshot", profile="chrome")
browser(action="screenshot", profile="chrome")
```

### Common Actions

| Action | Description |
|--------|-------------|
| snapshot | Get page structure as accessibility tree |
| screenshot | Capture visible page as image |
| act | Perform click, type, or other interactions |
| navigate | Go to a URL |

## Workflow

1. Ask user to open target page in Chrome
2. User clicks Browser Relay toolbar button (badge turns ON)
3. Use browser tool with `profile="chrome"`
4. Interact with page via actions

## Examples

### Get page snapshot
```
browser(action="snapshot", profile="chrome")
```

### Click an element
```
browser(action="act", profile="chrome", request={"kind": "click", "ref": "button[Submit]"})
```

### Fill a form field
```
browser(action="act", profile="chrome", request={"kind": "type", "ref": "input[Email]", "text": "user@example.com"})
```

## Important Notes

- User must explicitly attach each tab (security feature)
- Extension badge shows connection status
- If no tab attached, prompt user to click toolbar button
- Works with user's existing sessions - no need to re-login

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "No tab connected" | Ask user to click Browser Relay toolbar button |
| Extension not found | Guide user to install from Chrome Web Store |
| Tab detached | User needs to re-attach via toolbar button |
