# Claude Icon <img src="public/logo.webp" alt="Unlimited Claude Logo" width="160" />

### Free Self-Hosted Unlimited Claude AI

Powered by **@heyputer/puter.js**

<p align="center">
  <img src="public/logo.webp" alt="Unlimited Claude Logo" width="160" />
</p>

A free, self-hosted Claude-style AI chat interface with unlimited usage powered by Puter.js.  
Enjoy a modern UI, streaming responses, and developer-friendly artifact rendering — all without API costs.

---

## 🚀 Live Demo

🎥 **Demo Preview**  
[My link for the gif]

---

## ⚠️ Reached the quota?

No worries!  
Just click **Reset Quota** in the lower-left corner of the sidebar.

🖼️  
[link image here]

---

## 🚀 Features

- **100% Free Access**  
  Leverages the free tier of `@heyputer/puter.js` to interact with Claude at no cost.

- **Modern UI**  
  Clean, responsive interface inspired by the official Claude UI.  
  Includes **light & dark mode** using **Tailwind CSS v4+**.

- **Artifact Generation**  
  Automatically renders code blocks into beautiful, interactive artifact canvases with:

  - Syntax highlighting
  - Copy
  - Download
  - Paste-ready output

- **Streaming Responses**  
  Claude responses appear in real-time, just like the official experience.

- **Local Chat History**  
  Recent conversations are stored locally and cleared when the page refreshes.

---

## ❓ How It Works

This project uses the **Services API** from `@heyputer/puter.js`.

- The prompt flow is implemented from the **ChatInput** component to the **Message** component.
- Optimized for developers with:
  - Syntax-highlighted responses
  - Code-first rendering
  - Copy-paste ready outputs
- Responses are streamed live for a smooth, natural AI experience.

---

## 📦 Clone the Project

### ✅ Prerequisites

- **Node.js** installed on your local machine  
  _(Recommended: v20+)_

---

### 📥 Clone Repository

```bash
git clone https://github.com/alonzojoe/unlimited-claude-ai.git
```

### 📂 Install Dependencies

```bash
cd unlimited-claude-ai
npm install
```

### ▶️ Run the Project

```bash
npm run dev
```

### 🌐 Open in Browser

```bash
http://localhost:5173
```

## 🛠️ Tech Stack

- **Core**
  React, TypeScript, Tailwind CSS, Vite, HTML5, CSS3
- **API Integration**  
  @heyputer/puter.js
