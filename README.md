# ExecuteAI ⚡️

> **Turn messy meetings and overflowing inboxes into clear, trackable actions.**

ExecuteAI is an advanced AI-powered assistant designed to silently monitor your business communications—Google Meet calls, Zoom, and Gmail—extracting action items, commitments, and hidden promises. It features an automated meeting bot, a centralized task management dashboard, and a sophisticated AI Sales Copilot.

---

## 🌟 Key Features

*   **🤖 Auto-Joining Meeting Bot:** A Playwright-powered bot that automatically joins Google Meet sessions, records audio, and provides real-time transcription.
*   **📧 Intelligent Inbox Sync:** Deep integration with Gmail to semantically analyze threads, aggregate contact intelligence, and extract pending tasks.
*   **✅ Centralized Task Engine:** Unified Kanban and list views for commitments. Prioritize, assign, and track completion of tasks derived from multiple sources.
*   **💬 Sales AI Copilot:** Built with the **Claude Agent SDK**. Features streaming responses, reasoning indicators, real-time tool use (email drafting, calendar lookups), and two-way voice communication via ElevenLabs.
*   **📊 Pipeline Analytics:** Visual dashboards mapping out commitment compliance, confident lead scores, and overdue follow-ups using Recharts.

---

## 🛠️ Tech Stack

**Frontend**
*   **Framework:** React 19 + Vite
*   **Styling:** Tailwind CSS v4
*   **Animations:** Framer Motion (`motion/react`)
*   **Icons & Charts:** Lucide React, Recharts
*   **Desktop Ready:** Packaged with Electron

**Backend**
*   **Core:** Django 5.0 + Django REST Framework
*   **Async & Real-time:** Django Channels (Daphne), Celery (In-memory broker for easy setup)
*   **Automation:** Playwright (Headless meeting bot)
*   **Audio/Media:** Pydub, FFmpeg

**AI Landscape**
*   **Agent Orchestration:** `claude-code-sdk` (Python Agent SDK)
*   **LLMs:** Featherless AI (GLM-5), Google Gemini 
*   **Voice/Speech:** ElevenLabs (TTS), OpenAI Whisper (STT)
*   **Embeddings/RAG:** Perplexity AI

---

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** (v18+ recommended)
2.  **Python** (v3.10+ recommended)
3.  **FFmpeg** (Required by Pydub for backend audio processing. Need to be in your system `PATH`)
4.  **PostgreSQL/SQLite** (Uses SQLite by default)

### 1. Backend Setup

Open a terminal and navigate to the `/backend` directory.

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers (for the Google Meet bot)
playwright install chromium

# Run migrations and setup the database
python manage.py migrate

# (Optional) Load demo users and meeting data
python load_demo_data.py
```

### 2. Environment Variables

Create a .env file in the backend directory:

```env
# Backend .env
DJANGO_ENV=development
BASE_URL=https://api.featherless.ai/v1
FEATHERAI_API_KEY=your_featherless_key
FEATHERAI_MODEL=zai-org/GLM-5

# Google API Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/gmail/auth/callback/

# Meeting Bot Credentials (Use a throwaway account!)
BOT_GOOGLE_EMAIL=your_bot_email@gmail.com
BOT_GOOGLE_PASSWORD=your_bot_password

# Integrations
ELEVENLABS_API_KEY=your_elevenlabs_key
OPENAI_API_KEY=your_openai_key

# Token Encryption
TOKEN_ENCRYPTION_KEY=generate_with_fernet
```

### 3. Running the Backend Services

You will need **two** terminal windows for the backend to run websockets and background tasks correctly:

**Terminal 1: Django/Daphne Server**
```bash
cd backend
source .venv/bin/activate
daphne -p 8000 core.asgi:application
```

**Terminal 2: Celery Worker**
```bash
cd backend
source .venv/bin/activate
# Uses memory:// broker configured in settings
celery -A core worker -l info 
```

### 4. Frontend Setup

Open a third terminal window for the React application:

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

> **Note:** The Vite config automatically proxies `/ws` and `/api` requests to `http://localhost:8000`, bypassing standard CORS issues and maintaining clean WebSocket upgrade headers.

Navigate to `http://localhost:5173` to view the application.

---

## 🏗️ Project Structure

*   api – Core Django app, database models, and REST endpoints.
*   authapi – Authentication, user models, and session management.
*   gmailapi – Integrations with Gmail, Claude Agent SDK AI service (agent_tools.py), and the Sales Copilot websocket streams.
*   meetings – Logic for the automated Playwright bot, audio recording pipelines, and meeting task extraction.
*   components – Modular UI elements (Tasks, Calendar, Modals, Integrations).
*   pages – Top-level application routes (Chat, Sales Agent, Auth).
*   electron – Wrappers for desktop application builds.

---

## 🤖 Building the Desktop App (Optional)

ExecuteAI can be bundled into a standalone desktop application using Electron:

```bash
cd frontend
npm run electron:build
```
*Outputs installers to `frontend/release/`.*

---

## 🛡️ Privacy & Security

ExecuteAI utilizes **end-to-end extraction**. Transcripts and raw emails are processed securely in memory and never submitted into shared model training pools. We strictly adhere to SOC2 and GDPR design principles, holding only the extracted, user-approved commitments. 

---

*Designed with Intentional Minimalism.*
