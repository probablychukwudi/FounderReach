-- 001_initial.sql

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  startup_name TEXT,
  startup_description TEXT,
  startup_stage TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.institutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  source_id UUID REFERENCES public.sources(id),
  name TEXT NOT NULL,
  type TEXT,
  focus TEXT,
  description TEXT,
  website TEXT,
  location TEXT,
  relevance_score FLOAT,
  funding_recency TEXT,
  collaboration_history BOOLEAN DEFAULT false,
  stage TEXT DEFAULT 'matched',
  raw_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  name TEXT,
  role TEXT,
  email TEXT,
  linkedin_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.outreach (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id),
  subject TEXT,
  body TEXT,
  status TEXT DEFAULT 'draft',
  approved_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  resend_message_id TEXT,
  thread_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  outreach_id UUID REFERENCES public.outreach(id),
  institution_id UUID REFERENCES public.institutions(id),
  contact_id UUID REFERENCES public.contacts(id),
  title TEXT,
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 30,
  google_event_id TEXT,
  cal_booking_uid TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.agent_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  startup_context TEXT,
  stage TEXT,
  status TEXT DEFAULT 'queued',
  tinyfish_session_id TEXT,
  institutions_found INTEGER DEFAULT 0,
  institutions_qualified INTEGER DEFAULT 0,
  drafts_created INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  run_id UUID REFERENCES public.agent_runs(id),
  timestamp TIMESTAMPTZ DEFAULT now(),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}'
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own data" ON public.profiles FOR ALL USING (id = auth.uid());
CREATE POLICY "own data" ON public.sources FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own data" ON public.institutions FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own data" ON public.outreach FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own data" ON public.bookings FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own data" ON public.agent_runs FOR ALL USING (user_id = auth.uid());
CREATE POLICY "own data" ON public.activity_log FOR ALL USING (user_id = auth.uid());

CREATE POLICY "via institution" ON public.contacts FOR ALL
  USING (institution_id IN (SELECT id FROM public.institutions WHERE user_id = auth.uid()));

ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_log;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_runs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.institutions;
