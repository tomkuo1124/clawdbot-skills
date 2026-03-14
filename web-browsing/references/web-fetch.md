# web_fetch - Lightweight HTTP Fetcher

## Overview

`web_fetch` is Clawdbot's built-in tool for fetching and extracting readable content from URLs. It converts HTML pages to markdown or plain text without needing a browser.

## When to Use

- Static pages (articles, documentation, blog posts)
- API responses
- Pages that don't require JavaScript rendering
- Quick content retrieval

## When NOT to Use

- Single Page Applications (SPAs)
- JavaScript-rendered content
- Pages requiring login/authentication
- Interactive forms

## Usage

```
web_fetch(url="https://example.com", extractMode="markdown")
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| url | string | required | HTTP or HTTPS URL to fetch |
| extractMode | "markdown" \| "text" | "markdown" | Output format |
| maxChars | number | optional | Truncate output length |

## Examples

### Fetch article as markdown
```
web_fetch(url="https://blog.example.com/post", extractMode="markdown")
```

### Fetch with character limit
```
web_fetch(url="https://docs.example.com/api", maxChars=5000)
```

## Limitations

- Cannot execute JavaScript
- Cannot handle dynamic content loading
- No cookie/session support
- May be blocked by some sites (no browser fingerprint)

## Fallback

If web_fetch returns incomplete or broken content, escalate to:
1. Browser Relay (if auth needed)
2. browser tool with Playwright (for JS rendering)
