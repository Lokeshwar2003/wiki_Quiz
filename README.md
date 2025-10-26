# Wiki-to-Quiz

Wiki-to-Quiz converts Wikipedia articles into short quizzes (questions + answers) using a FastAPI backend and a React + Vite frontend.

## What this repo contains

- `backend/` — FastAPI app that scrapes articles and generates quizzes, stores history in a local DB.
- `frontend/` — Vite + React UI to generate quizzes and view history.
- `start.ps1` — PowerShell script to start both backend and frontend concurrently (Windows).

## Quick start (development)

Prerequisites
- Node 16+ and npm
- Python 3.9+ and pip
- (Optional) A virtual environment for Python

Backend
```powershell
# from repo root
cd backend
# (optional) create and activate venv
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt  # if you have one, or:
# install minimal deps
pip install fastapi uvicorn sqlalchemy
# start backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Frontend
```powershell
cd frontend
npm install
npm run dev
# open http://127.0.0.1:5173
```

Start both (Windows)
```powershell
# From project root
./start.ps1
```

## Production / static build
```powershell
cd frontend
npm run build
# serve contents of frontend/dist using any static server, e.g.:
python -m http.server 5173 --directory dist
```

## Useful URLs
- Frontend UI: http://127.0.0.1:5173/
- FastAPI docs: http://127.0.0.1:8000/docs#/ 
- API endpoints:
  - POST `/generate_quiz` — Accepts JSON `{"url": "https://en.wikipedia.org/wiki/Albert_Einstein"}`
  - GET `/history` — Returns saved quizzes
  - GET `/quiz/{quiz_id}` — Retrieve specific quiz

## Sample Wikipedia URLs (for testing)
- https://en.wikipedia.org/wiki/Albert_Einstein
- https://en.wikipedia.org/wiki/World_War_II
- https://en.wikipedia.org/wiki/Artificial_intelligence

## Notes
- If you store this repo in OneDrive, file syncing may sometimes interfere with watches (Vite/SQLLite). Consider moving the project out of OneDrive if you see file lock issues.
- If `git push` fails due to authentication, configure a personal access token or SSH key for GitHub.

## Contributing
PRs welcome. Please open issues for bugs or feature requests.

---
Generated and committed by local developer workflow.