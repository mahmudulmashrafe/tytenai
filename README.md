# ⚡ Tyten AI — Autonomous Enterprise Multi-Agent Intelligence

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-success.svg)](https://pages.github.com/)
[![Runtime: Bun](https://img.shields.io/badge/Runtime-Bun_1.4+-fbf0df.svg?logo=bun)](https://bun.sh)
[![Architecture: Multi--Agent](https://img.shields.io/badge/Architecture-BFT--Swarm_v3-00f0ff.svg)](#platform-architecture)

> **Autonomous Enterprise Intelligence at Planetary Scale.**  
> Tyten AI orchestrates fleets of sovereign neural agents that reason, plan, execute, and verify mission-critical engineering and operational workloads with Byzantine consensus and mathematical reliability.

---

## 🌟 Key Features

- **🧠 Byzantine Deliberative Consensus**: Multi-agent quorum voting suppresses hallucinations to < 0.02% by enforcing test-driven logical verification before mutation.
- **🔒 Air-Gapped MicroVM Sandboxes**: Agents write, compile, and execute code within isolated, ephemeral microVM enclaves with strict egress policies and cryptographic attestation.
- **⚡ Real-Time Vector Memory Fabric**: High-throughput shared memory indexing billions of enterprise tokens across repos, schemas, and telemetry with sub-5ms retrieval.
- **🎮 Interactive Swarm Fleet Simulator**: Live in-browser playground demonstrating multi-agent workflows (Incident Remediation, Zero-Downtime Data Migrations, CVE Auto-Patching).
- **📊 Dynamic ROI Model**: Interactive engineering cost calculator modeled on actual enterprise workloads.
- **💻 Developer-First SDKs**: Idiomatic bindings for Python, TypeScript, and REST/cURL.
- **🌓 Adaptive Theme Engine**: Native Dark Cyber / Light Obsidian design with interactive neural particle constellation canvas.
- **🚀 Zero-Dependency Deployment**: Ready for GitHub Pages, Vercel, Netlify, or any static host.

---

## 📂 Project Structure

```bash
Tyten Ai/
├── index.html                   # Core semantic landing page & component layout
├── scripts/
│   └── dev-server.js            # Multi-runtime dev server (Bun & Node.js)
├── vercel.json                  # Vercel zero-config static hosting configuration
├── package.json                 # Scripts and package metadata
├── .gitignore                   # Git exclusion configuration
├── README.md                    # Repository documentation
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── css/
│   ├── style.css                # Design system, CSS variables, typography, layouts
│   └── animations.css           # Keyframe animations, glow pulses, marquee tickers
├── js/
│   ├── main.js                  # Theme toggler, ROI calculator, FAQ accordion, modals
│   ├── canvas-bg.js             # Interactive neural particle constellation canvas
│   └── agent-simulator.js       # Interactive multi-agent workflow DAG simulator
└── assets/
    └── favicon.svg              # Brand vector logo mark
```

---

## 🚀 Quickstart & Local Development

You can run Tyten AI locally with either **Bun**, **Node.js**, or standard **Python**:

### Option 1: Using Bun or Node.js
```bash
# Start local server with Bun
bun scripts/dev-server.js

# Or with Node.js
node scripts/dev-server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using Python
```bash
# Launch built-in HTTP server
python3 -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐙 Adding and Pushing to GitHub

Follow these steps to push this project to your GitHub account:

### 1. Initialize Git and Commit
```bash
# Initialize git repository
git init -b main

# Stage all files
git add .

# Create the initial commit
git commit -m "feat: initial commit of Tyten AI enterprise website"
```

### 2. Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name the repository: `tyten-ai` (or `tyten-ai-website`).
3. Leave "Initialize with a README" **unchecked** (we already have one).
4. Click **Create repository**.

### 3. Connect and Push
```bash
# Add your GitHub repository remote (replace <YOUR_USERNAME> with your GitHub username)
git remote add origin https://github.com/<YOUR_USERNAME>/tyten-ai.git

# Push to main branch
git push -u origin main
```

*(If you use SSH: `git remote add origin git@github.com:<YOUR_USERNAME>/tyten-ai.git`)*

### 4. Enable GitHub Pages (Optional 1-Click Hosting)
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) will automatically deploy your live site whenever you push to `main`!

---

## 🛡️ Architecture & Security
- **Data Sovereignty**: Zero customer data retained for training.
- **Compliance**: SOC-2 Type II, HIPAA, and ISO-27001 ready.
- **Runtime Enclaves**: WebAssembly and MicroVM sandbox boundaries.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
