# Self-hosted Browserless

## Overview

Browserless is a headless browser service that can be self-hosted via Docker. It offloads browser automation from the local machine, useful for high-volume or resource-intensive scraping tasks.

## When to Use

- High-volume web scraping (100+ pages)
- Resource-constrained local environment
- Scheduled/automated batch processing
- When local Playwright is too heavy

## When NOT to Use

- Quick one-off fetches → use web_fetch
- Auth-required pages → use Browser Relay
- Simple dynamic pages → use built-in browser tool
- No Docker environment available

## Setup

### Docker Compose

```yaml
version: '3'
services:
  browserless:
    image: browserless/chrome
    ports:
      - "3000:3000"
    environment:
      - MAX_CONCURRENT_SESSIONS=10
      - CONNECTION_TIMEOUT=60000
```

### Run

```bash
docker-compose up -d
```

## Integration with Clawdbot

Connect via `controlUrl` parameter:

```
browser(action="snapshot", target="custom", controlUrl="http://localhost:3000")
```

## API Endpoints

Browserless provides REST APIs:

| Endpoint | Description |
|----------|-------------|
| /content | Get page HTML |
| /screenshot | Capture screenshot |
| /pdf | Generate PDF |
| /scrape | Extract structured data |

## Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| MAX_CONCURRENT_SESSIONS | Parallel browser limit | 10 |
| CONNECTION_TIMEOUT | Session timeout (ms) | 60000 |
| PREBOOT_CHROME | Pre-launch browsers | false |
| KEEP_ALIVE | Keep browsers warm | false |

## Resource Management

- Monitor Docker container resources
- Set appropriate concurrency limits
- Implement queue for high-volume jobs
- Consider session pooling for efficiency

## Alternatives

- **Browserless.io Cloud**: Managed service with free tier
- **Cloudflare Browser Rendering**: Via Workers (limited free tier)
- **Puppeteer on separate server**: DIY solution

## Cost Analysis

| Option | Cost | Maintenance |
|--------|------|-------------|
| Self-hosted Browserless | Free (Docker) | High (you manage) |
| Browserless.io Cloud | Free tier available | Low (managed) |
| Cloudflare Workers | Free tier (limited) | Low |
