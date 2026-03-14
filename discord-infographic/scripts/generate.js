/**
 * Discord Infographic Generator
 *
 * Flow:
 * 1. Read messages from /new marker via message_read
 * 2. Filter noise, keep substantive messages
 * 3. Summarize discussion
 * 4. Generate scene description prompt (gemini-2.0-flash)
 * 5. Generate infographic image (imagen-3.0-generate-002)
 * 6. Send image to channel via message_send
 */

import { GoogleGenAI } from '@google/genai';

// --- Configuration ---

const TEXT_MODEL = 'gemini-3-flash-preview';
const IMAGE_MODEL = 'gemini-3.1-flash-image-preview';

let client = null;

function getClient() {
  if (!client) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not set.');
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

// --- Message Filtering ---

/**
 * Filter messages: keep substantive content, discard noise.
 *
 * @param {Array<{author: string, content: string, isBot: boolean}>} messages
 * @returns {Array} Filtered messages
 */
export function filterMessages(messages) {
  return messages.filter((msg) => {
    const content = msg.content?.trim();
    if (!content) return false;

    // Filter out command messages
    if (/^[/!]/.test(content)) return false;

    // Filter out pure emoji (allow if mixed with text)
    if (/^[\p{Emoji}\s]+$/u.test(content) && content.length < 20) return false;

    // Filter out system messages
    if (msg.isSystem) return false;

    // Keep Tom's messages
    if (/湯姆|tom/i.test(msg.author)) return true;

    // For bot messages, filter out short confirmations
    if (msg.isBot) {
      const shortConfirmations = [
        'ok', 'got it', 'done', '好的', '收到', '了解',
        'sure', 'noted', '好', 'yes', '是',
      ];
      const lower = content.toLowerCase();
      if (shortConfirmations.some((c) => lower === c || lower === c + '。' || lower === c + '.')) {
        return false;
      }
      // Keep bot messages with substantive length
      return content.length > 30;
    }

    // Keep messages with questions, suggestions, conclusions, code
    if (/[？?]/.test(content)) return true;
    if (/```/.test(content)) return true;
    if (content.length > 20) return true;

    return false;
  });
}

// --- Summarization ---

/**
 * Summarize filtered messages into a discussion digest.
 *
 * @param {Array<{author: string, content: string}>} messages
 * @returns {Promise<string>} Summary text
 */
export async function summarizeMessages(messages) {
  const ai = getClient();

  const transcript = messages
    .map((m) => `${m.author}: ${m.content}`)
    .join('\n');

  const prompt = `以下是一段 Discord 討論對話，請用繁體中文整理成一份結構化的討論摘要。

要求：
1. 識別主要討論主題
2. 列出關鍵觀點和結論（2-5 個重點）
3. 標注重要數據、程式碼片段或技術細節
4. 總結最終結論或待辦事項

--- 對話記錄 ---
${transcript}
--- 對話結束 ---

只輸出摘要，不要加額外說明。`;

  const result = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// --- Infographic Prompt Generation ---

/**
 * Generate a scene description prompt for the infographic image.
 *
 * @param {string} summary - Discussion summary
 * @returns {Promise<string>} Scene description for image generation
 */
export async function generateScenePrompt(summary) {
  const ai = getClient();

  const prompt = `根據以下討論摘要，設計一張資訊圖表的場景描述。

--- 摘要 ---
${summary}
--- 摘要結束 ---

請輸出一段英文的圖片生成 prompt，描述一張資訊圖表：
1. 標題要反映討論主題
2. 分 2-4 個區塊，每個區塊對應一個重點
3. 使用具體的圖示（人物、物品、圖表）來表達每個重點
4. 包含關鍵數據或引用文字
5. 指定配色方案和整體風格

風格要求：modern infographic, clean layout, professional color palette, clear hierarchy, icon-based illustrations.

只輸出英文 prompt，不要加任何說明。`;

  const result = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// --- Image Generation ---

/**
 * Generate infographic image using Gemini multimodal.
 *
 * @param {string} scenePrompt - Scene description prompt
 * @returns {Promise<{imageBase64: string, mimeType: string}>}
 */
export async function generateImage(scenePrompt) {
  const ai = getClient();

  const enhancedPrompt = `Create a professional infographic poster:

${scenePrompt}

Style: modern flat design infographic, clean white background, professional color palette (blue, teal, orange accents), clear visual hierarchy, icon illustrations, data visualization elements, horizontal 16:9 layout.`;

  const result = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  const parts = result.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData) {
      return {
        imageBase64: part.inlineData.data,
        mimeType: part.inlineData.mimeType || 'image/png',
      };
    }
  }

  throw new Error('No image generated from Gemini API');
}

// --- Main Pipeline ---

/**
 * Full pipeline: messages → filter → summarize → prompt → image
 *
 * @param {Array<{author: string, content: string, isBot: boolean, isSystem: boolean}>} rawMessages
 * @returns {Promise<{summary: string, imageBase64: string, mimeType: string}>}
 */
export async function generateInfographic(rawMessages) {
  // Step 1: Filter messages
  const filtered = filterMessages(rawMessages);
  if (filtered.length === 0) {
    throw new Error('No substantive messages found after filtering.');
  }
  console.log(`[Infographic] ${rawMessages.length} messages → ${filtered.length} after filtering`);

  // Step 2: Summarize
  console.log('[Infographic] Generating summary...');
  const summary = await summarizeMessages(filtered);
  if (!summary) {
    throw new Error('Failed to generate summary.');
  }
  console.log(`[Infographic] Summary: ${summary.length} chars`);

  // Step 3: Generate scene prompt
  console.log('[Infographic] Generating scene prompt...');
  const scenePrompt = await generateScenePrompt(summary);
  if (!scenePrompt) {
    throw new Error('Failed to generate scene prompt.');
  }
  console.log(`[Infographic] Scene prompt: ${scenePrompt.length} chars`);

  // Step 4: Generate image
  console.log('[Infographic] Generating image via Imagen...');
  const { imageBase64, mimeType } = await generateImage(scenePrompt);
  console.log(`[Infographic] Image generated: ${Math.round(imageBase64.length / 1024)}KB`);

  return { summary, imageBase64, mimeType };
}

// --- CLI Helper Functions ---

import { readFileSync, writeFileSync } from 'fs';

/**
 * Read messages from stdin (for piped input)
 */
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Parse CLI arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,      // --input <file.json>
    output: null,     // --output <file.png>
    outputJson: null, // --output-json <file.json>
    test: false,      // --test (use mock data)
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) {
      options.input = args[++i];
    } else if (args[i] === '--output' && args[i + 1]) {
      options.output = args[++i];
    } else if (args[i] === '--output-json' && args[i + 1]) {
      options.outputJson = args[++i];
    } else if (args[i] === '--test') {
      options.test = true;
    }
  }

  return options;
}

// --- Standalone execution ---

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const options = parseArgs();

  // Mock data for testing
  const mockMessages = [
    { author: '湯姆', content: '我們來討論一下新的 API 架構設計', isBot: false, isSystem: false },
    { author: 'Bot', content: '好的', isBot: true, isSystem: false },
    { author: '湯姆', content: '主要需求是支援 REST 和 GraphQL 兩種接口，預計 QPS 在 1000 左右', isBot: false, isSystem: false },
    { author: 'Bot', content: '根據你的需求，建議使用 API Gateway 模式。可以用 Kong 或 AWS API Gateway 作為入口，後面接微服務。REST 和 GraphQL 可以共用同一套 resolver 層，減少重複邏輯。', isBot: true, isSystem: false },
    { author: '湯姆', content: '資料庫選型呢？PostgreSQL 還是 MongoDB？', isBot: false, isSystem: false },
    { author: 'Bot', content: '考慮到你有結構化的關聯資料和需要 ACID 事務，建議 PostgreSQL 為主資料庫。如果有需要高速讀取的快取場景，可以搭配 Redis。MongoDB 適合日誌或非結構化資料的輔助儲存。', isBot: true, isSystem: false },
  ];

  try {
    let messages;

    if (options.test) {
      // Use mock data
      console.error('[Infographic] Using test data...');
      messages = mockMessages;
    } else if (options.input) {
      // Read from file
      console.error(`[Infographic] Reading from ${options.input}...`);
      const content = readFileSync(options.input, 'utf8');
      messages = JSON.parse(content);
    } else if (!process.stdin.isTTY) {
      // Read from stdin (piped input)
      console.error('[Infographic] Reading from stdin...');
      const content = await readStdin();
      messages = JSON.parse(content);
    } else {
      // No input, use mock data
      console.error('[Infographic] No input provided, using test data...');
      messages = mockMessages;
    }

    const result = await generateInfographic(messages);

    // Output results
    if (options.output) {
      // Save image to file
      const buffer = Buffer.from(result.imageBase64, 'base64');
      writeFileSync(options.output, buffer);
      console.error(`[Infographic] Image saved to ${options.output}`);
    }

    if (options.outputJson) {
      // Save full result as JSON
      writeFileSync(options.outputJson, JSON.stringify(result, null, 2));
      console.error(`[Infographic] JSON saved to ${options.outputJson}`);
    }

    if (!options.output && !options.outputJson) {
      // Output JSON to stdout (for piping)
      console.log(JSON.stringify(result));
    }

    console.error('[Infographic] Done!');
    console.error(`  Summary length: ${result.summary.length}`);
    console.error(`  Image size: ${Math.round(result.imageBase64.length / 1024)}KB`);
  } catch (err) {
    console.error('[Infographic] Error:', err.message);
    process.exit(1);
  }
}
