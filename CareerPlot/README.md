# CareerPilot – AI Placement & Interview Copilot

CareerPilot is an AI-powered placement assistant built for the Gappy AI Hackathon. It utilizes Agentic AI workflows to provide personalized placement guidance from start to finish.

## Features

- **Resume Analyzer**: Extracts skills, calculates ATS score, and suggests improvements.
- **Job Match**: Compares skills against preferred roles to calculate hiring probability.
- **Career Roadmap**: Generates a 30-day personalized learning plan based on weak areas.
- **Interview Coach**: Interactive AI mock interviews with real-time feedback and scoring.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **AI**: Gemini API, custom Lemma-style Agent Orchestration

## Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- Gemini API Key

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd CareerPlot
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   
   # Copy env file
   cp .env.example .env
   # Add your GEMINI_API_KEY and MONGODB_URI to .env
   
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerpilot
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

## Folder Structure

```
CareerPilot-AI/
├── frontend/
│   ├── src/
│   │   ├── components/ (Sidebar, Header, Layout)
│   │   ├── pages/ (Dashboard, LandingPage, ResumeUpload, etc.)
│   │   ├── services/ (API integration)
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── agents/ (Resume Analyzer, Interview Coach, etc.)
│   │   ├── controllers/ (Auth, Resume, Interview, Dashboard)
│   │   ├── lemma/ (Workflow Engine Mock)
│   │   ├── models/ (Mongoose Schemas)
│   │   ├── routes/ (Express API Routes)
│   │   ├── utils/ (Gemini, PDF Parser)
│   │   └── index.js
│   └── package.json
└── README.md
```

## Future Improvements

- Voice-based mock interviews using Web Speech API.
- AI-generated PDF resume and cover letter builder.
- GitHub and LinkedIn Profile Analyzer.
- Company-specific interview preparation generation.

## Deployment

- **Frontend**: Deploy `frontend/dist` on Vercel or Netlify. Make sure to set `VITE_API_URL` to your deployed backend URL.
- **Backend**: Deploy on Render or Heroku. Set environment variables accordingly. Make sure the `uploads/` directory is writable or switch to cloud storage for PDFs.
