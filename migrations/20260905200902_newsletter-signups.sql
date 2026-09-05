-- Newsletter signups backing the footer email capture.
-- Anyone may insert their own email; only the admin can read the list.

CREATE TABLE public.newsletter_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "newsletter public insert" ON public.newsletter_signups
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "newsletter admin all" ON public.newsletter_signups
  FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));

GRANT INSERT ON public.newsletter_signups TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_signups TO authenticated;
