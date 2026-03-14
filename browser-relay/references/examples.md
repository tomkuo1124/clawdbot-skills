# Browser Relay Examples

## Example 1: Read Page Content

**User:** "幫我看這個網頁上寫什麼"

**Flow:**
```
1. Check tab attached
   browser action:"tabs" profile:"chrome"

2. If no tabs:
   "請在 Chrome 開啟網頁，點擊工具列的 Clawdbot Browser Relay 圖示"

3. Get page content
   browser action:"snapshot" profile:"chrome" compact:true

4. Summarize content for user
```

---

## Example 2: Fill a Form

**User:** "幫我填這個表單，名字是 Tom，email 是 tom@example.com"

**Flow:**
```
1. Snapshot to find form fields
   browser action:"snapshot" profile:"chrome" interactive:true

2. Identify field refs (e.g., e5 = name input, e8 = email input)

3. Fill the form
   browser action:"act" profile:"chrome" request:{
     kind:"fill",
     fields:[
       {ref:"e5", text:"Tom"},
       {ref:"e8", text:"tom@example.com"}
     ]
   }

4. Snapshot to verify
   browser action:"snapshot" profile:"chrome"

5. Ask user: "表單已填好，要送出嗎？"

6. If yes, click submit
   browser action:"act" profile:"chrome" request:{kind:"click", ref:"e12"}
```

---

## Example 3: Screenshot for Analysis

**User:** "截圖這個頁面給我看"

**Flow:**
```
1. Take screenshot
   browser action:"screenshot" profile:"chrome" fullPage:true

2. Return image to user
```

---

## Example 4: Login Automation

**User:** "幫我登入這個網站"

**Flow:**
```
1. Snapshot login page
   browser action:"snapshot" profile:"chrome"

2. Find username/password fields and login button

3. Ask user for credentials (DO NOT store)
   "請提供登入帳號和密碼"

4. Fill and submit
   browser action:"act" profile:"chrome" request:{
     kind:"fill",
     fields:[
       {ref:"e3", text:"<username>"},
       {ref:"e5", text:"<password>"}
     ]
   }
   browser action:"act" profile:"chrome" request:{kind:"click", ref:"e7"}

5. Snapshot to verify login success
```

---

## Example 5: Multi-step Workflow

**User:** "幫我在這個網站下單"

**Flow:**
```
1. Snapshot current page
2. Navigate through pages (click, fill, next)
3. Snapshot each step to verify
4. At final confirmation, show summary to user
5. Only submit after user confirms
```

---

## Example 6: Extract Data from Table

**User:** "把這個表格的資料抓下來"

**Flow:**
```
1. Snapshot page
   browser action:"snapshot" profile:"chrome"

2. Parse table structure from snapshot

3. Format data as markdown/CSV for user
```

---

## Common Patterns

### Wait for Page Load

After navigation or action, snapshot again to see updated content:
```
browser action:"act" profile:"chrome" request:{kind:"click", ref:"e5"}
# Page may reload/update
browser action:"snapshot" profile:"chrome"
```

### Handle Dynamic Content

Some content loads via JavaScript. Snapshot may need retry:
```
browser action:"snapshot" profile:"chrome"
# If content missing, wait a moment
browser action:"act" profile:"chrome" request:{kind:"wait", timeMs:2000}
browser action:"snapshot" profile:"chrome"
```

### Dropdown Selection

```
browser action:"act" profile:"chrome" request:{
  kind:"select",
  ref:"e10",
  values:["option-value"]
}
```
