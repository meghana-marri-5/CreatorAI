# Database Schemas & Seed Data

This directory contains the PostgreSQL and Supabase database architecture for the **CreatorAI Marketplace**.

## Files Overview

- **`schema.sql`**: Full database schema definition:
  - Custom enum types (`user_role`, `project_status`, `proposal_status`, `creator_tier`, `content_category`)
  - Tables: `profiles`, `creator_profiles`, `portfolio_items`, `projects`, `proposals`, `shortlists`, `reviews`
  - Automated triggers (`update_updated_at_column`, auto-profile creation on auth signup)
  - Row-Level Security (RLS) policies enforcing client permissions and role-based data isolation
  - High-performance indexes for creator search, matching tags, and project listings

- **`seed.sql`**: Realistic production-grade seed data:
  - Verified AI creators across multiple disciplines (Video diffusion, ComfyUI, Fashion, Packshots, Virtual Influencers, Synthetic Audio)
  - Rich portfolio projects with prompt recipes, ComfyUI workflow metadata, and commercial IP clearances
  - Sample brand briefs and proposal submissions for immediate testing

## Setup Instructions

### Option 1: Supabase Web Console
1. Open your Supabase project dashboard at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Paste and run the contents of `schema.sql`.
4. Paste and run the contents of `seed.sql`.

### Option 2: Local / Docker Supabase CLI
```bash
supabase db reset
# or apply manually:
psql -h localhost -p 54322 -U postgres -d postgres -f database/schema.sql
psql -h localhost -p 54322 -U postgres -d postgres -f database/seed.sql
```
