---
name: web-browsing
description: Choose the right web browsing method for Clawdbot. Use when needing to fetch web content, scrape pages, interact with websites, or automate browser tasks. Triggers on "抓網頁", "瀏覽網站", "網頁內容", "scrape", "browse", "fetch URL", or any web content retrieval request.
---

# Web Browsing - Method Selection Guide

## Quick Decision Tree

```
Need web content?
├── Static page (articles, docs, API responses)
│   └── Use: web_fetch (Priority 1)
│
├── Dynamic page (SPA, JS-rendered, interactive)
│   ├── Need login/auth session?
│   │   └── Use: Browser Relay (Priority 2)
│   └── No login needed?
│       └── Use: browser tool / Playwright (Priority 3)
│
└── Large-scale automation?
    └── Use: Self-hosted Browserless (Priority 4)
```

## Method Overview

| Priority | Method | Best For | Cost |
|----------|--------|----------|------|
| 1 | `web_fetch` | Static content, articles, APIs | Free, fastest |
| 2 | Browser Relay | Auth-required pages, user sessions | Free, uses existing Chrome |
| 3 | `browser` (Playwright) | Dynamic SPA, JS rendering | Free, local resources |
| 4 | Self-hosted Browserless | High-volume automation | Free (self-hosted) |

## Priority 1: web_fetch

**Use first for 90% of cases.**

```
web_fetch(url, extractMode="markdown")
```

- Fastest, lightest option
- Converts HTML to readable markdown
- No browser overhead
- ❌ Cannot handle JS-rendered content

See: [references/web-fetch.md](references/web-fetch.md)

## Priority 2: Browser Relay

**Use when user's login session is needed.**

- Controls user's existing Chrome browser
- Access authenticated pages (Gmail, dashboards, etc.)
- Requires Clawdbot Browser Relay extension
- User must attach tab via toolbar button

See: [references/browser-relay.md](references/browser-relay.md)

## Priority 3: browser tool (Playwright)

**Use for dynamic pages without auth requirements.**

```
browser(action="snapshot", targetUrl="https://example.com")
```

- Built into Clawdbot
- Full browser automation
- Handles SPAs, JS rendering
- ⚠️ Uses local system resources

See: [references/browser-playwright.md](references/browser-playwright.md)

## Priority 4: Self-hosted Browserless

**Use for high-volume automation.**

- Docker-based headless browser service
- Offloads browser load from local machine
- Requires setup and maintenance

See: [references/browserless.md](references/browserless.md)

## Selection Examples

| User Request | Method |
|--------------|--------|
| "抓這篇文章內容" | web_fetch |
| "幫我查我的 Gmail" | Browser Relay |
| "截圖這個網頁" (no login) | browser/Playwright |
| "每天自動抓 100 個頁面" | Browserless |
