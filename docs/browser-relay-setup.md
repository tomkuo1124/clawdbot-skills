# Browser Relay 安裝與設定指南

讓 Clawdbot 能夠控制你的 Chrome 瀏覽器，實現網頁自動化。

---

## 📋 需求

| 項目 | 說明 |
|------|------|
| **Chrome 瀏覽器** | 需要 Chrome（不支援 Firefox/Safari） |
| **Clawdbot Browser Relay 擴充功能** | Chrome 擴充功能 |
| **Clawdbot Gateway** | 需要先設定好 Clawdbot |

---

## 🚀 安裝步驟

### 步驟 1：安裝 Chrome 擴充功能

1. 開啟 Chrome 瀏覽器
2. 前往 Chrome Web Store 搜尋 **"Clawdbot Browser Relay"**
   - 或直接訪問：[Clawdbot Browser Relay](https://chrome.google.com/webstore/detail/clawdbot-browser-relay)
3. 點擊「**加到 Chrome**」
4. 確認安裝

### 步驟 2：設定擴充功能

1. 點擊 Chrome 工具列的 🧩 圖示
2. 找到 **Clawdbot Browser Relay**
3. 點擊 📌 釘選，讓它顯示在工具列

### 步驟 3：連接 Clawdbot Gateway

1. 點擊工具列的 Clawdbot Browser Relay 圖示
2. 輸入 Gateway URL（通常是 `http://localhost:3000` 或你的設定）
3. 點擊「**Connect**」
4. 看到 ✅ 連線成功即可

---

## 🔌 使用方式

### 讓 Clawdbot 看到網頁

1. 在 Chrome 開啟你想讓 Clawdbot 操作的網頁
2. 點擊工具列的 **Clawdbot Browser Relay** 圖示
3. 圖示會變亮（badge ON）表示已連接
4. 現在對 Clawdbot 說「幫我看這個網頁」或「幫我填這個表單」

### 取消連接

- 再次點擊圖示，badge 會關閉
- 或關閉該分頁

---

## ✅ 確認安裝成功

對 Clawdbot 說：

> 「你能看到我的 Chrome 嗎？」

如果設定正確，Clawdbot 會告訴你目前連接的分頁資訊。

---

## ❓ 常見問題

### Q: 擴充功能圖示沒有出現？

1. 點擊 Chrome 工具列的 🧩 圖示
2. 找到 Clawdbot Browser Relay
3. 點擊 📌 釘選

### Q: 連接失敗？

1. 確認 Clawdbot Gateway 正在運行
2. 確認 Gateway URL 正確
3. 檢查防火牆設定

### Q: Clawdbot 說「沒有連接的分頁」？

1. 在目標網頁點擊擴充功能圖示
2. 確認 badge 是亮的（ON 狀態）
3. 等待 1-2 秒讓連接建立

### Q: 操作沒有反應？

1. 頁面可能還在載入，等一下再試
2. 確認元素存在（頁面可能已經更新）
3. 某些網站有防自動化機制

---

## 🔒 安全注意事項

- **Browser Relay 使用你的瀏覽器 session**
  - Clawdbot 可以看到你登入的網站
  - 可以代替你操作（點擊、填表、送出）

- **建議做法**
  - 只在需要時開啟連接
  - 敏感操作前確認 Clawdbot 的行動
  - 不使用時關閉連接

- **Clawdbot 會做的事**
  - 執行你明確要求的操作
  - 在送出表單前詢問確認

---

## 📚 相關資源

- [Browser Relay Skill（給 AI）](../browser-relay/SKILL.md)
- [Clawdbot 官方文件](https://docs.clawd.bot)
- [Clawdbot Discord 社群](https://discord.com/invite/clawd)

---

*最後更新：2026-03-14*
