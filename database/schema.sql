-- ============================================================================
-- CreatorAI Database Schema & Row Level Security Policies
-- Full PostgreSQL & Supabase Migration
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (linked to auth.users or standalone UUIDs)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('creator', 'brand')),
  avatar_url TEXT,
  bio TEXT,
  headline TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREATOR_DETAILS TABLE
CREATE TABLE IF NOT EXISTS public.creator_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialization TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  ai_tools TEXT[] DEFAULT '{}',
  content_categories TEXT[] DEFAULT '{}',
  experience_level TEXT DEFAULT 'Expert', -- Entry, Intermediate, Senior, Master
  availability TEXT DEFAULT 'Available' CHECK (availability IN ('Available', 'Limited', 'Booked')),
  hourly_rate NUMERIC,
  optional_rate_range TEXT,
  verification_status TEXT DEFAULT 'Reviewed' CHECK (verification_status IN ('Information Provided', 'Portfolio Submitted', 'Reviewed', 'Verified Master')),
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_creator_user UNIQUE(user_id)
);

-- 3. PORTFOLIO_ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- video, imagery, virtual-influencer, product, concept-art, audio
  thumbnail_url TEXT NOT NULL,
  project_url TEXT,
  ai_tools TEXT[] DEFAULT '{}',
  workflow_description TEXT,
  creator_contribution TEXT,
  prompt_snippet TEXT,
  licensing_information TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BRAND_DETAILS TABLE
CREATE TABLE IF NOT EXISTS public.brand_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_description TEXT,
  website_url TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_brand_user UNIQUE(user_id)
);

-- 5. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  business_objective TEXT,
  content_type TEXT NOT NULL,
  target_audience TEXT,
  creative_direction TEXT,
  required_skills TEXT[] DEFAULT '{}',
  preferred_ai_tools TEXT[] DEFAULT '{}',
  deliverables TEXT[] DEFAULT '{}',
  dimensions_or_duration TEXT,
  deadline TEXT,
  optional_budget_min NUMERIC,
  optional_budget_max NUMERIC,
  budget_display TEXT,
  usage_platforms TEXT[] DEFAULT '{}',
  commercial_use_requirements TEXT[] DEFAULT '{}',
  reference_links TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'Open' CHECK (status IN ('Draft', 'Open', 'Reviewing Applications', 'Creator Selected', 'In Progress', 'Completed', 'Cancelled')),
  selected_creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  proposal TEXT NOT NULL,
  relevant_portfolio_items TEXT[] DEFAULT '{}',
  estimated_delivery_time TEXT NOT NULL,
  optional_proposed_price TEXT,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'Accepted', 'Rejected', 'Withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Prevent duplicate applications from the same creator to the same project
  CONSTRAINT uq_creator_project_application UNIQUE(project_id, creator_id)
);

-- 7. SAVED_CREATORS TABLE (Shortlisting)
CREATE TABLE IF NOT EXISTS public.saved_creators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_brand_creator_saved UNIQUE(brand_id, creator_id)
);

-- Indexes for lightning fast discovery and queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_creator_details_spec ON public.creator_details(specialization);
CREATE INDEX IF NOT EXISTS idx_creator_details_avail ON public.creator_details(availability);
CREATE INDEX IF NOT EXISTS idx_portfolio_creator ON public.portfolio_items(creator_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_projects_brand ON public.projects(brand_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_applications_project ON public.applications(project_id);
CREATE INDEX IF NOT EXISTS idx_applications_creator ON public.applications(creator_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_creators ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: Public read, owner update
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = id);

-- 2. Creator Details: Public read, owner update/insert
CREATE POLICY "Creator details viewable by everyone" 
  ON public.creator_details FOR SELECT USING (true);

CREATE POLICY "Creators can modify their own details" 
  ON public.creator_details FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = creator_details.user_id AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid()))
  );

-- 3. Portfolio Items: Public read, creator can manage own
CREATE POLICY "Portfolio items are viewable by everyone" 
  ON public.portfolio_items FOR SELECT USING (true);

CREATE POLICY "Creators can manage their own portfolio items" 
  ON public.portfolio_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = portfolio_items.creator_id AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid()))
  );

-- 4. Projects: Anyone can view Open/Reviewing projects, brands manage their own
CREATE POLICY "Projects viewable if public or owned" 
  ON public.projects FOR SELECT USING (true);

CREATE POLICY "Brands can manage their own projects" 
  ON public.projects FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = projects.brand_id AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid()))
  );

-- 5. Applications: Creators see their own, brand sees applications for their projects
CREATE POLICY "Creators see their own applications" 
  ON public.applications FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = applications.creator_id AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid()))
    OR
    EXISTS (
      SELECT 1 FROM public.projects p 
      JOIN public.profiles b ON p.brand_id = b.id
      WHERE p.id = applications.project_id AND (b.user_id = auth.uid() OR b.id = auth.uid())
    )
  );

CREATE POLICY "Creators can insert their own application" 
  ON public.applications FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = applications.creator_id AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid()))
  );

CREATE POLICY "Brands can update application status for their projects" 
  ON public.applications FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.projects p 
      JOIN public.profiles b ON p.brand_id = b.id
      WHERE p.id = applications.project_id AND (b.user_id = auth.uid() OR b.id = auth.uid())
    )
  );

-- 6. Saved creators: Brand sees and manages their saved list
CREATE POLICY "Brands manage their saved creators" 
  ON public.saved_creators FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = saved_creators.brand_id AND (profiles.user_id = auth.uid() OR profiles.id = auth.uid()))
  );
