-- CMS schema for sadman-portfolio admin dashboard.
-- Public content is world-readable (published-only where applicable);
-- all writes are restricted to the admin via public.is_admin().

-- ---------------------------------------------------------------- helpers
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = (SELECT auth.uid())
      AND email = 'sadmanmubassir@gmail.com'
  );
$$;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- ---------------------------------------------------------------- projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  overview TEXT NOT NULL DEFAULT '',
  problem TEXT NOT NULL DEFAULT '',
  idea TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  tech TEXT[] NOT NULL DEFAULT '{}',
  challenges TEXT NOT NULL DEFAULT '',
  learned TEXT NOT NULL DEFAULT '',
  future TEXT[] NOT NULL DEFAULT '{}',
  categories TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Experiment',
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  gradient TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '◆',
  year TEXT NOT NULL DEFAULT '',
  live_url TEXT NOT NULL DEFAULT '',
  github_url TEXT NOT NULL DEFAULT '',
  cover_url TEXT NOT NULL DEFAULT '',
  cover_key TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_projects_status ON public.projects (published, featured, sort);

-- ---------------------------------------------------------------- posts
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'AI',
  excerpt TEXT NOT NULL DEFAULT '',
  content JSONB NOT NULL DEFAULT '[]',
  cover_url TEXT NOT NULL DEFAULT '',
  cover_key TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  read_time TEXT NOT NULL DEFAULT '',
  seo_title TEXT NOT NULL DEFAULT '',
  seo_desc TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_posts_status ON public.posts (status, featured, sort);

-- ---------------------------------------------------------------- experience
CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org TEXT NOT NULL,
  role TEXT NOT NULL,
  place TEXT NOT NULL DEFAULT '',
  time TEXT NOT NULL DEFAULT '',
  start_date TEXT NOT NULL DEFAULT '',
  end_date TEXT NOT NULL DEFAULT '',
  current BOOLEAN NOT NULL DEFAULT false,
  summary TEXT NOT NULL DEFAULT '',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  tech TEXT[] NOT NULL DEFAULT '{}',
  learned TEXT NOT NULL DEFAULT '',
  impact TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- education
CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school TEXT NOT NULL,
  degree TEXT NOT NULL DEFAULT '',
  meta TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- skills
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  accent TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- certifications
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  org TEXT NOT NULL DEFAULT '',
  date_text TEXT NOT NULL DEFAULT '',
  credential_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- eca_activities
CREATE TABLE public.eca_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '◆',
  org TEXT NOT NULL DEFAULT '',
  position TEXT NOT NULL DEFAULT '',
  date_text TEXT NOT NULL DEFAULT '',
  did TEXT NOT NULL DEFAULT '',
  why TEXT NOT NULL DEFAULT '',
  learned TEXT NOT NULL DEFAULT '',
  impact TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- research_notes
CREATE TABLE public.research_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'Research Note',
  date_text TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  links TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_research_status ON public.research_notes (status, sort);

-- ---------------------------------------------------------------- site_updates
CREATE TABLE public.site_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_text TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- media
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  key TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  mime TEXT NOT NULL DEFAULT '',
  size_bytes BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- nav_items
CREATE TABLE public.nav_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'main',
  sort INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- homepage_sections
CREATE TABLE public.homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  sort INTEGER NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------- page_seo
CREATE TABLE public.page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  keywords TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT '',
  noindex BOOLEAN NOT NULL DEFAULT false
);

-- ---------------------------------------------------------------- site_settings
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- journey
CREATE TABLE public.journey_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  era TEXT NOT NULL,
  period TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- goals
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grp TEXT NOT NULL DEFAULT 'current',
  title TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_goals_grp ON public.goals (grp, sort);

-- ---------------------------------------------------------------- now page
CREATE TABLE public.now_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  text TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_now_section ON public.now_items (section, sort);

-- ---------------------------------------------------------------- uses page
CREATE TABLE public.uses_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_uses_section ON public.uses_items (section, sort);

-- ---------------------------------------------------------------- ideas + build log
CREATE TABLE public.ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL DEFAULT '',
  stage TEXT NOT NULL DEFAULT 'Idea',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.build_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_text TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------- activity log (admin only)
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_email TEXT NOT NULL DEFAULT '',
  action TEXT NOT NULL,
  entity TEXT NOT NULL DEFAULT '',
  entity_id TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_activity_created ON public.activity_log (created_at DESC);

-- ---------------------------------------------------------------- updated_at triggers
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_experience_updated BEFORE UPDATE ON public.experience
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_education_updated BEFORE UPDATE ON public.education
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_skills_updated BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_certifications_updated BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_eca_updated BEFORE UPDATE ON public.eca_activities
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_research_updated BEFORE UPDATE ON public.research_notes
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_journey_updated BEFORE UPDATE ON public.journey_milestones
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_goals_updated BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_now_updated BEFORE UPDATE ON public.now_items
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_uses_updated BEFORE UPDATE ON public.uses_items
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_ideas_updated BEFORE UPDATE ON public.ideas
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ---------------------------------------------------------------- RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eca_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.now_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uses_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Published-only public reads
CREATE POLICY "projects public read" ON public.projects
  FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "posts public read" ON public.posts
  FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "research public read" ON public.research_notes
  FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "nav public read" ON public.nav_items
  FOR SELECT TO anon, authenticated USING (visible = true);

-- Fully public reads (site content carries no secrets)
CREATE POLICY "experience public read" ON public.experience
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "education public read" ON public.education
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "skills public read" ON public.skills
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "certifications public read" ON public.certifications
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "eca public read" ON public.eca_activities
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "updates public read" ON public.site_updates
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "media public read" ON public.media
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "homepage public read" ON public.homepage_sections
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "seo public read" ON public.page_seo
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings public read" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "journey public read" ON public.journey_milestones
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "goals public read" ON public.goals
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "now public read" ON public.now_items
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "uses public read" ON public.uses_items
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "ideas public read" ON public.ideas
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "buildlog public read" ON public.build_log
  FOR SELECT TO anon, authenticated USING (true);

-- Admin full access on every table (no public policy on activity_log)
CREATE POLICY "projects admin all" ON public.projects
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "posts admin all" ON public.posts
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "experience admin all" ON public.experience
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "education admin all" ON public.education
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "skills admin all" ON public.skills
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "certifications admin all" ON public.certifications
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "eca admin all" ON public.eca_activities
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "research admin all" ON public.research_notes
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "updates admin all" ON public.site_updates
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "media admin all" ON public.media
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "nav admin all" ON public.nav_items
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "homepage admin all" ON public.homepage_sections
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "seo admin all" ON public.page_seo
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "settings admin all" ON public.site_settings
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "journey admin all" ON public.journey_milestones
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "goals admin all" ON public.goals
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "now admin all" ON public.now_items
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "uses admin all" ON public.uses_items
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "ideas admin all" ON public.ideas
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "buildlog admin all" ON public.build_log
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY "activity admin all" ON public.activity_log
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));

-- ---------------------------------------------------------------- grants
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT SELECT ON public.research_notes TO anon, authenticated;
GRANT SELECT ON public.nav_items TO anon, authenticated;
GRANT SELECT ON public.experience TO anon, authenticated;
GRANT SELECT ON public.education TO anon, authenticated;
GRANT SELECT ON public.skills TO anon, authenticated;
GRANT SELECT ON public.certifications TO anon, authenticated;
GRANT SELECT ON public.eca_activities TO anon, authenticated;
GRANT SELECT ON public.site_updates TO anon, authenticated;
GRANT SELECT ON public.media TO anon, authenticated;
GRANT SELECT ON public.homepage_sections TO anon, authenticated;
GRANT SELECT ON public.page_seo TO anon, authenticated;
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT SELECT ON public.journey_milestones TO anon, authenticated;
GRANT SELECT ON public.goals TO anon, authenticated;
GRANT SELECT ON public.now_items TO anon, authenticated;
GRANT SELECT ON public.uses_items TO anon, authenticated;
GRANT SELECT ON public.ideas TO anon, authenticated;
GRANT SELECT ON public.build_log TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.experience TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.education TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.certifications TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.eca_activities TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.research_notes TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_updates TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.media TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.nav_items TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.homepage_sections TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.page_seo TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.journey_milestones TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.goals TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.now_items TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.uses_items TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.ideas TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.build_log TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.activity_log TO authenticated;

-- ---------------------------------------------------------------- storage RLS (bucket: media, public read, admin write)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY media_public_read ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket = 'media');

CREATE POLICY media_admin_insert ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket = 'media' AND (SELECT public.is_admin()));

CREATE POLICY media_admin_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket = 'media' AND (SELECT public.is_admin()))
  WITH CHECK (bucket = 'media' AND (SELECT public.is_admin()));

CREATE POLICY media_admin_delete ON storage.objects
  FOR DELETE TO authenticated USING (bucket = 'media' AND (SELECT public.is_admin()));

GRANT SELECT ON storage.objects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON storage.objects TO authenticated;
GRANT USAGE ON SCHEMA storage TO anon, authenticated;
