---
title: ExecuteAI
emoji: ⚡
colorFrom: purple
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
---

# ExecuteAI ⚡️

> **Turn messy meetings and overflowing inboxes into clear, trackable actions.**

ExecuteAI is an advanced AI-powered assistant designed to silently monitor your business communications—Google Meet calls, Zoom, and Gmail—extracting action items, commitments, and hidden promises.

This repository serves the production React frontend from Django templates and static files. All app routes (`/`, `/onboarding`, `/dashboard`, `/meetings`, `/tasks`, `/calendar`, `/analytics`, `/integrations`, `/settings`, `/help`) are handled by Django's SPA catch-all and React Router.

## Local development

### Frontend

```bash
cd frontend
npm install
npm run build:django   # builds Vite and copies into backend/templates + backend/static
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open `http://127.0.0.1:8000`.

## Hugging Face Space

Docker image runs Gunicorn on port `7860`. Configure secrets and variables in the Space settings (not in git).
