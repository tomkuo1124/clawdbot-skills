---
name: discord-infographic
description: Generate infographic from Discord conversation. Reads messages from /new marker, summarizes discussion, generates an illustrated infographic via Gemini, and sends it to the channel. Triggers on "生成資訊圖表", "做資訊圖表", "generate infographic", "畫圖表".
---

# Discord Infographic Skill

Read Discord conversation history, summarize the discussion, and generate an illustrated infographic using Gemini AI.

## Trigger Words

- `生成資訊圖表`
- `做資訊圖表`
- `generate infographic`
- `畫圖表`

## Execution Steps

When triggered, follow these steps:

### Step 1: Read Messages

Use `message read` to fetch recent messages from the channel:

```
message read --channel discord --limit 50
```

Find the last `/new` marker and collect all messages after it.

### Step 2: Prepare Message Data

Format messages as JSON array for the generate script:

```javascript
[
  { "author": "湯姆", "content": "訊息內容", "isBot": false, "isSystem": false },
  { "author": "Bot_Vibrance", "content": "回覆內容", "isBot": true, "isSystem": false }
]
```

### Step 3: Run Generate Script

Execute the generate script with messages as input:

```bash
cd C:\Users\kuoto\clawd\skills\clawdbot-skills\discord-infographic
node scripts/generate.js
```

The script will output:
- `summary`: Discussion summary text
- `imageBase64`: Base64-encoded PNG image
- `mimeType`: Image MIME type

### Step 4: Send Image to Channel

Save the base64 image to a temp file and send via `message send`:

```
message send --channel discord --filePath /tmp/infographic.png --caption "📊 討論摘要資訊圖表"
```

## Models Used

| Purpose | Model |
|---------|-------|
| Text summarization & prompt | `gemini-3-flash-preview` |
| Image generation | `gemini-3.1-flash-image-preview` |

## Message Filtering Rules

**Keep:**
- Messages from Tom (湯姆)
- Bot messages with substantive answers (>30 chars)
- Questions, suggestions, conclusions
- Code snippets and technical discussions

**Filter out:**
- System messages (join/leave/pin notifications)
- Bot short confirmations ("OK", "Got it", "Done", "收到", "了解")
- Pure emoji reactions (<20 chars, only emoji)
- Command messages (starting with `/` or `!`)

## Prerequisites

- `GOOGLE_API_KEY` environment variable set
- Bot must have message read/send permissions in the channel

## File Structure

```
discord-infographic/
├── SKILL.md           # This file
├── package.json       # Dependencies (@google/genai)
└── scripts/
    └── generate.js    # Main pipeline (filter → summarize → prompt → image)
```

## API Functions (generate.js)

| Function | Description |
|----------|-------------|
| `filterMessages(messages)` | Filter noise, keep substantive content |
| `summarizeMessages(messages)` | Generate discussion summary |
| `generateScenePrompt(summary)` | Create image generation prompt |
| `generateImage(prompt)` | Generate infographic via Gemini |
| `generateInfographic(rawMessages)` | Full pipeline |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Google AI API key for Gemini |
