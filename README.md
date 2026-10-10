# CreatorAI — AI-Powered Content Creator Marketplace

> *"From Creative Ideas to the Right AI Creator."*

CreatorAI is an enterprise-grade full-stack marketplace connecting brands and creative agencies with verified generative AI creators across video diffusion (Runway, Kling, Luma), generative fashion imagery (Midjourney, Flux.1), virtual influencers, photorealistic packshots, and synthetic audio.

---

## 📁 Repository Structure

The repository is modularly organized into dedicated directories for frontend, backend, database, and legacy components:

```
AI-Content-Creator-Marketplace/
├── frontend/                     # Modern React 19 + TypeScript + Vite + Tailwind CSS SPA
│   ├── src/                      # Source code (Components, Pages, Context, Services, Data, Types)
│   ├── index.html                # Vite HTML entry point
│   ├── vite.config.ts            # Vite build & dev server config with proxy
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.js        # Custom design tokens, dark palette & typography
│   ├── postcss.config.js         # PostCSS plugins
│   ├── package.json              # Frontend dependencies and scripts
│   └── .env.example              # Frontend environment configuration template
│
├── backend/                      # Node.js API server & serverless endpoints
│   ├── index.js                  # Standalone secure HTTP API server
│   ├── api/                      # Serverless route handlers (e.g., generate-brief.ts)
│   ├── package.json              # Backend scripts and metadata
│   └── .env.example              # Server environment variables (port, Gemini API key)
│
├── database/                     # PostgreSQL & Supabase database architecture
│   ├── schema.sql                # Complete schema, tables, triggers, and RLS policies
│   ├── seed.sql                  # Production seed data (creators, portfolios, briefs)
│   └── README.md                 # Database setup and execution instructions
│
├── legacy-vanilla/               # Original vanilla JS prototype
│   ├── index.html                # Prototype HTML
│   ├── app.js                    # Prototype logic
│   ├── data.js                   # Prototype mock data
│   ├── styles.css                # Prototype CSS
│   └── README.md                 # Legacy documentation
│
├── package.json                  # Root monorepo orchestrator (npm run dev, build, start)
├── .gitignore                    # Git ignore file (node_modules, dist, .env)
└── README.md                     # Comprehensive project documentation
```

---

## 🚀 Live Demonstration Flow (End-to-End User Journey)

Judges can test the complete production workflow immediately without configuring third-party accounts:
1. **Brand Ideates**: Open **AI Brief Assistant** (`/ai-brief-builder`), input a raw idea (e.g., *"20s high-octane cyberpunk video ad for Apex Volt energy drink with fast camera zooms for TikTok"*), or click an instant concept preset.
2. **AI Structures Brief**: The secure AI engine parses the prompt into technical prompt specs, 9:16 format dimensions, required skills (*Runway Gen-3, Kling, 4K Upscaling*), benchmark budget, and commercial questions.
3. **Publish Brief**: Click *"Use This Brief in Project Form"* -> review the live card preview -> click *"Publish Brief & Match Creators"*.
4. **AI-Assisted Creator Matching**: The platform calculates explainable compatibility scores using our transparent weighted algorithm (**Skills 40%**, **Specialization 25%**, **Content Type 20%**, **AI Tools 15%**) and displays ranking with detailed rationale.
5. **Inspect Portfolios**: Open creator profiles (e.g., *Elena Rostova*), inspect real ComfyUI/Runway diffusion workflows, prompt snippets, and commercial clearance warranties.
6. **Creator Applies**: Switch role to *Elena* via the top demo bar, browse open projects (`/explore-projects`), and submit a proposal quote and delivery timeline with duplicate application protection.
7. **Brand Reviews & Selects**: Switch back to *Apex Volt*, review the proposal on the project detail page (`/projects/:id`), click *"Accept & Select Creator"*.
8. **Lifecycle Management**: Track the project through all milestones (*Draft -> Open -> Reviewing -> Creator Selected -> In Progress -> Completed*) on `/project-management`.

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Location |
|---|---|---|
| **Frontend** | React 19, Vite 6, TypeScript 5.7, React Router 7, Tailwind CSS, Lucide Icons | `frontend/` |
| **Backend / Server** | Node.js standalone server, Vercel Serverless Function, Vite API proxy | `backend/` |
| **Database & Auth** | Supabase PostgreSQL, Row Level Security (RLS) policies, mock database fallback | `database/` |
| **AI Integration** | Google Gemini 1.5 Flash API with deterministic fallback heuristics | `backend/` & `frontend/` |
| **Security** | Zero client-side API key leakage; commercial copyright clearance verification | `backend/` |

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js v18+ (tested on Node 20 & 22)
- npm v9+

### 2. Quickstart (Root Commands)
From the repository root, you can control both frontend and backend:

```bash
# Start frontend development server (http://localhost:5173)
npm run dev

# Start backend server (http://localhost:3001)
npm run dev:backend

# Build frontend for production
npm run build
```

### 3. Running Frontend Directly
```bash
cd frontend
npm install
npm run dev
```

### 4. Running Backend Directly
```bash
cd backend
npm start
```

---

## 🗄️ Database Setup

The database schema and seeds are located in `/database`:
1. Open your Supabase console or PostgreSQL client.
2. Execute `database/schema.sql` to generate all tables, enums, triggers, and Row Level Security (RLS) rules.
3. Execute `database/seed.sql` to populate sample verified creators, portfolios, and commercial projects.

---

## 🔐 AI Configuration & Fallback Engine

- **Private Key Isolation**: Private keys (`GEMINI_API_KEY`) reside exclusively in `backend/.env` and are never exposed to browser clients.
- **Deterministic Zero-Key Mode**: If no Gemini API key is configured, CreatorAI automatically engages its built-in deterministic heuristic engine. Judges can evaluate full AI brief structuring and portfolio enhancement without entering an external API key!

---

## 📋 Hackathon Evaluation Criteria & Feature Mapping

- **Creator Profiles & AI Portfolios (30% Weight)**: Verified badges, workflow inspection modal, prompt logs, ComfyUI parameters, commercial IP warranties.
- **Brief Definition & AI Assistant (20% Weight)**: 12-field structured brief builder, live card preview, natural language to JSON prompt breakdown.
- **Discovery, Search & AI Matching (25% Weight)**: Multi-facet filters, tool-based filtering, explainable 4-tier weighted compatibility matching.
- **UX & Design Aesthetics (15% Weight)**: Modern dark UI (`#080a10`), Plus Jakarta Sans typography, micro-interactions, responsive mobile layout.
- **Presentation & Demo (10% Weight)**: Pre-seeded data, top role-switching bar, end-to-end interactive lifecycle.
