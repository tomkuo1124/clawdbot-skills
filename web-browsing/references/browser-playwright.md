# browser Tool - Playwright Integration

## Overview

Clawdbot's built-in `browser` tool uses Playwright for full browser automation. It runs a local headless browser capable of rendering JavaScript, interacting with dynamic content, and capturing screenshots.

## When to Use

- Single Page Applications (SPAs)
- JavaScript-rendered content
- Dynamic content loading
- Pages NOT requiring user authentication
- Automated interactions without login

## When NOT to Use

- Pages requiring user's login session → use Browser Relay
- Simple static pages → use web_fetch (faster)
- High-volume automation → consider Browserless

## Usage

### Basic Actions

```
browser(action="snapshot", targetUrl="https://example.com")
browser(action="screenshot", targetUrl="https://example.com")
browser(action="navigate", targetUrl="https://example.com")
```

### Interactive Actions

```
browser(action="act", request={"kind": "click", "ref": "button[Submit]"})
browser(action="act", request={"kind": "type", "ref": "input[Search]", "text": "query"})
```

## Common Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| action | string | snapshot, screenshot, navigate, act, etc. |
| targetUrl | string | URL to open |
| targetId | string | Tab ID for subsequent actions |
| profile | string | "clawd" for isolated browser (default) |

## Workflow Example

1. Open page and get snapshot
```
browser(action="snapshot", targetUrl="https://spa.example.com")
```

2. Use refs from snapshot to interact
```
browser(action="act", targetId="<from-step-1>", request={"kind": "click", "ref": "e12"})
```

3. Get updated snapshot after interaction
```
browser(action="snapshot", targetId="<from-step-1>")
```

## Actions Reference

| Action | Description |
|--------|-------------|
| snapshot | Get accessibility tree of page |
| screenshot | Capture page image |
| navigate | Go to URL |
| act | Perform interaction (click, type, etc.) |
| open | Open new tab |
| close | Close tab |
| tabs | List open tabs |

## Request Kinds (for act)

| Kind | Parameters | Description |
|------|------------|-------------|
| click | ref | Click element |
| type | ref, text | Type into element |
| press | key | Press keyboard key |
| hover | ref | Hover over element |
| select | ref, values | Select dropdown option |
| fill | fields | Fill multiple form fields |

## Resource Considerations

- Uses local CPU/memory for browser process
- Headless mode (no visible window)
- Each session spins up browser instance
- Close tabs when done to free resources

## Limitations

- No access to user's existing sessions/cookies
- Each session starts fresh (no persistent login)
- Local resource intensive for many concurrent pages
