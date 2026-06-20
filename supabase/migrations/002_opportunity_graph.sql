-- 002_opportunity_graph.sql

CREATE TABLE public.opportunities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  organization_domain TEXT,
  logo_url TEXT,
  category TEXT NOT NULL,
  format TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Global',
  sectors TEXT[] DEFAULT '{}',
  audience TEXT DEFAULT '',
  summary TEXT NOT NULL,
  deadline DATE,
  start_date DATE,
  end_date DATE,
  value TEXT,
  cost TEXT NOT NULL DEFAULT 'Community',
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  action_label TEXT NOT NULL DEFAULT 'Review',
  tags TEXT[] DEFAULT '{}',
  trust_signal TEXT DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'watch',
  featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'candidate',
  discovered_by TEXT,
  confidence FLOAT,
  raw_data JSONB DEFAULT '{}',
  reviewed_at TIMESTAMPTZ,
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.opportunity_sync_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trigger TEXT NOT NULL DEFAULT 'manual',
  categories TEXT[] DEFAULT '{}',
  source_count INTEGER DEFAULT 0,
  candidate_count INTEGER DEFAULT 0,
  fetched_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]',
  mode TEXT NOT NULL DEFAULT 'review',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.opportunity_candidates (
  id TEXT PRIMARY KEY,
  sync_run_id UUID REFERENCES public.opportunity_sync_runs(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  organization_domain TEXT,
  logo_url TEXT,
  category TEXT NOT NULL,
  format TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Live web',
  summary TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  discovered_by TEXT,
  fetched_title TEXT,
  fetched_description TEXT,
  confidence FLOAT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new',
  payload JSONB DEFAULT '{}',
  first_seen_at TIMESTAMPTZ DEFAULT now(),
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_saved_opportunities (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id TEXT NOT NULL,
  notes TEXT,
  saved_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, opportunity_id)
);

CREATE TABLE public.calendar_preferences (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  default_view TEXT NOT NULL DEFAULT 'month',
  digest_frequency TEXT NOT NULL DEFAULT 'weekly',
  saved_deadline_window_days INTEGER NOT NULL DEFAULT 14,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.newsletter_subscriptions (
  email TEXT PRIMARY KEY,
  source TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT newsletter_email_is_lowercase CHECK (email = lower(email))
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_sync_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviewed opportunities readable" ON public.opportunities
  FOR SELECT USING (status = 'reviewed');

CREATE POLICY "own saved opportunities" ON public.user_saved_opportunities
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "own calendar preferences" ON public.calendar_preferences
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "newsletter public insert" ON public.newsletter_subscriptions
  FOR INSERT WITH CHECK (email = lower(email));

CREATE INDEX opportunity_candidates_category_idx ON public.opportunity_candidates(category);
CREATE INDEX opportunity_candidates_last_seen_idx ON public.opportunity_candidates(last_seen_at DESC);
CREATE INDEX opportunities_category_status_idx ON public.opportunities(category, status);
CREATE INDEX opportunities_last_seen_idx ON public.opportunities(last_seen_at DESC);
