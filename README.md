# CreatorAI — AI-Powered Content Creator Marketplace

> *"From Creative Ideas to the Right AI Creator."*

CreatorAI is a modern full-stack web application designed for a 24-hour student hackathon. It bridges brands and creative agencies with skilled, verified generative AI content creators across video diffusion, high-fashion imagery, virtual influencers, photorealistic product packshots, and synthetic audio.

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

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 19, Vite 6, TypeScript 5.7, React Router 7, Tailwind CSS, Lucide Icons |
| **Backend / Server** | Node.js standalone secure server (`server/index.js`), Vercel Serverless Function (`api/generate-brief.ts`), Vite server API middleware |
| **Database & Auth** | Supabase PostgreSQL, Row Level Security (RLS) policies, automatic localStorage mock database for offline hackathon demos |
| **AI Integration** | Google Gemini 1.5 Flash API with deterministic fallback heuristics (100% operational with or without an API key) |
| **Security** | Zero client-side API key leakage; commercial copyright clearance verification |

---

## 📋 Evaluation Criteria & Feature Mapping (100% Complete)

### 1. Creator Profiles & AI Portfolios (30% Weight) — ✅ Complete
- **Creator Profiles**: Display names, verified badges, headlines, locations, hourly rates, experience levels (*Master, Senior, Intermediate*), and detailed biographies.
- **Creator Profile Builder** (`/creator-profile-builder`): Form with live side-by-side card preview and instant updates.
- **AI Creator Portfolio Gallery** (`/creator-portfolio`): Full CRUD (Add, Edit, Delete, View) with category organization (*Video, Imagery, Virtual Influencers, Product Staging, Concept Art, Audio*).
- **Deep Workflow Transparency**: Each portfolio item includes prompt matrices, toolchains used, multi-phase production workflows, and commercial clearance warranties.
- **Portfolio Inspection Modal**: Modal displaying high-res previews, prompt logs, and technical notes.
- **Bonus — AI Portfolio Assistant** (`/portfolio-assistant`): AI tool helping creators polish project descriptions into client-ready commercial proposals.

### 2. Brief Definition & AI Assistant (20% Weight) — ✅ Complete
- **Structured Brief Builder** (`/create-brief`): Fields for business objective, content type, target audience, visual direction, required skills, preferred tools, deliverables, format dimensions, deadlines, budgets, and licensing terms.
- **Live Brief Preview**: Real-time sticky preview card updating as the user types.
- **Draft Saving**: Save drafts locally to resume editing anytime.
- **AI Brief Builder** (`/ai-brief-builder`): Converts messy natural language into structured JSON briefs with instant sample concept chips (*Energy Drink Commercial, Minimalist Lookbook, Organic Skincare, Sci-Fi Audio Drama*).
- **Transparent Fallback Mode**: Clearly indicates whether running in live Gemini API mode or local deterministic engine mode.

### 3. Discovery, Search & AI Matching (25% Weight) — ✅ Complete
- **Discover Creators** (`/discover-creators`): Real-time search by creator name, skill, specialization, AI tool, or keywords.
- **Multi-Filter Controls**: Filter by category, tool (*Runway, Midjourney, Flux.1, ComfyUI, etc.*), experience level, availability, and maximum hourly rate slider.
- **Sorting Controls**: Top rated, most completed projects, hourly rate (low-to-high / high-to-low), and alphabetical.
- **Shortlisting**: Bookmark creators to a dedicated shortlist directory (`/shortlist`).
- **Explainable Creator Matching** (`/ai-matching/:id`):
  - Required skill similarity: **40%**
  - Specialization similarity: **25%**
  - Content type similarity: **20%**
  - Preferred AI tool similarity: **15%**
  - Normalized 0–100 score with human-readable rationale badges explaining *why* the creator was recommended.

### 4. User Experience & Design Aesthetics (15% Weight) — ✅ Complete
- **Design Identity**: Dark navy background (`#080a10`), indigo/violet accents, glassmorphic cards, responsive typography (*Plus Jakarta Sans* & *JetBrains Mono*).
- **Navigation**: Role-aware navbar (*Guest*, *Creator*, *Brand*) with an instant demo switcher bar.
- **Accessibility & Responsiveness**: Mobile drawer menu, visible focus outlines, descriptive labels, and empty states with clear calls to action.
- **Duplicate Prevention**: Guard against submitting duplicate proposals to the same brief.

### 5. Presentation & Demo (10% Weight) — ✅ Complete
- 8 pre-seeded realistic AI creator profiles across 6 creative disciplines.
- 24 rich portfolio items with prompt snippets and workflows.
- 5 comprehensive project briefs with active proposals.
- One-click demo login buttons for instant role switching.

---

## 🗄️ Database Schema & Supabase RLS

The PostgreSQL schema and migration script is located in `supabase/schema.sql` and `supabase/seed.sql`:

```sql
-- Tables Created:
public.profiles            -- User profile, avatar, role (creator/brand)
public.creator_details     -- Specializations, skills, tools, rates, availability
public.portfolio_items     -- Commercial works, prompts, workflows, licensing
public.brand_details       -- Company name, industry, description
public.projects            -- Structured briefs, deliverables, budget, status
public.applications        -- Creator proposals, quotes, delivery days, status
public.saved_creators      -- Brand shortlisted bookmarks
```

### Row Level Security (RLS) Highlights:
- **Public Reads**: Public profiles, creator details, open projects, and portfolio items are readable by all users.
- **Creator Autonomy**: Creators can only insert, update, or delete their own portfolio items and applications.
- **Brand Ownership**: Brands can only edit their own briefs and update applicant statuses for projects they own.
- **Private Data Protection**: Internal proposals and contact settings are restricted to the owning brand and submitting creator.

---

## 🔐 AI Security & Environment Configuration

### Zero-Leakage Architecture:
- Client browser code **never** makes direct requests with private API keys.
- AI brief generation calls the server endpoint `/api/ai/generate-brief`.
- API keys are read from server environment variables (`GEMINI_API_KEY` or `AI_API_KEY`).
- When no API key is provided, the server/client automatically runs a deterministic fallback heuristics engine so judges never see an error!

### Setup `.env`:
Copy `.env.example` to `.env`:
```bash
# Optional: Supabase credentials (runs offline demo mode if omitted)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Server AI Key (runs deterministic engine if omitted)
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

---

## 💻 Local Setup & Development

### Prerequisites:
- Node.js v18+ (tested on Node v20/v24)
- npm v9+

### Installation:
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
http://localhost:5173
```

### Production Build & Preview:
```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview production bundle
npm run preview
```

### Optional Backend Server:
```bash
# Run standalone Node.js server
npm run server
```

---

## 🚀 Deployment Instructions

### Vercel:
1. Connect your GitHub repository to Vercel.
2. Set Build Command to `npm run build` and Output Directory to `dist`.
3. Add environment variables in Vercel Project Settings:
   - `GEMINI_API_KEY` (Optional)
   - `VITE_SUPABASE_URL` (Optional)
   - `VITE_SUPABASE_ANON_KEY` (Optional)
4. The serverless function in `/api/generate-brief.ts` will deploy automatically.

---

## 👥 Hackathon Team Notes & Completed Deliverables
- [x] Complete working web application with 16 pages/views.
- [x] Organized TypeScript frontend and modular services.
- [x] Supabase database schema (`supabase/schema.sql`) and sample seed (`supabase/seed.sql`).
- [x] Full Row Level Security (RLS) policies.
- [x] AI API integration via secure server-side function with transparent demo mode fallback.
- [x] Environment variable documentation (`.env.example`).
- [x] Production build validation passing with 0 errors.
