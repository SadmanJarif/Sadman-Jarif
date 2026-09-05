# Sadman Mubassir Jarif — Personal Platform + Admin Console

Modern, premium personal brand platform built with **Next.js 16 + React 19 + Tailwind CSS v4**,
backed by **InsForge** (Postgres, Auth, Storage).
Dark, futuristic, minimal — AI-startup aesthetic with glassmorphism, gradient glows, and scroll-reveal animations.

## Run locally (port 3001)

```bash
npm install
npm run dev
```

Open http://localhost:3001

## Admin console

The site is fully manageable from **http://localhost:3001/admin** — no code edits needed.

**First-time setup** (one time only):

1. Visit `/admin/setup` and create the owner account (only `sadmanmubassir@gmail.com` can register).
2. Enter the 6-digit verification code emailed to you.
3. Log in at `/admin/login` from then on.

After setup, tell your agent to lock public signups
(`disable_signup` via `insforge.toml` + `config apply`) so no one else can register.

**What the console manages:** dashboard stats + recent activity, CRUD with draft/publish for
projects, blog posts, experience, education, skills, certifications, ECA, research, updates,
journey, goals, now/uses pages, ideas + build log, media library (uploads, copy URL, delete),
navigation (add/reorder/hide), homepage sections (enable/reorder), per-page SEO with search
previews, site settings (hero, about, vision, contact, socials, footer), and an activity log.
Every save revalidates the public site automatically.

## Backend (InsForge)

- Project **sadman-portfolio**, region **ap-southeast**.
- Schema + RLS live in `migrations/` (public reads published content; all writes admin-only
  via `public.is_admin()`; storage bucket `media` is public-read, admin-write).
- Seed/update content: `node scripts/seed-cms.ts` (reads the admin key from
  `.insforge/project.json`, never committed).
- Shared clients: `src/lib/insforge.ts` (public anon), `src/lib/cms.ts` (DB-first content
  getters with static fallback), `src/lib/admin/*` (auth guard, generic CRUD, media, settings).
- Keys live in `.env.local` (gitignored). Never hardcode or commit keys.

## Run locally (port 3001)

```bash
npm install
npm run dev
```

Open http://localhost:3001

## Build

```bash
npm run build
npm start
```

## Pages (16)

| Route | Page |
|---|---|
| `/` | Home — hero, Currently strip, all core sections, lab teaser, stats, goals preview, updates |
| `/about` | Deeper story, drives, philosophy (Learn→Build→Experiment→Improve→Share), strengths, interests |
| `/journey` | Interactive milestone timeline |
| `/work` | Experience deep-dives + freelance work |
| `/projects` | Filterable showcase (AI/Software/Web/Mobile/SaaS/Experiments/Business) |
| `/projects/[slug]` | Full case study per project |
| `/ai-lab` | AI experiments workbench |
| `/ventures` | Entrepreneurship: ideas exploring + build-in-public log |
| `/learning` | Learning tracks (Completed / Learning / Next) |
| `/writing` | Blog with filtering + featured article |
| `/writing/[slug]` | Article reading experience + progress bar + related |
| `/research` | Searchable knowledge-base archive |
| `/eca` | Leadership & extracurriculars (did → why → learned → impact) |
| `/resume` | Online resume + print-to-PDF download |
| `/uses` | My setup / tools |
| `/goals` | Current / 1-year / long-term roadmap |
| `/now` | /now status page (update `NOW_DATA.updated` in `src/data/site.ts`) |
| `/contact` | Personal contact with topic picker + form |

## Content — where to edit

- `src/data/portfolio.ts` — nav, socials, homepage project/skill/writing cards
- `src/data/projects.ts` — full project case studies (add new projects here)
- `src/data/writing.ts` — blog posts (add `POSTS` entries; pages generate automatically)
- `src/data/site.ts` — journey, experience, learning, ECA, research, lab, ideas, goals, now, uses, updates, resume
- Contact email: search `hello@sadmanjarif.dev` in `src/app/contact/page.tsx`, `src/components/Contact.tsx`, `src/data/portfolio.ts`

## Design system

- `src/app/globals.css` — gradients, glass, reveal animations, buttons
- `src/components/` — Header (with More menu), Footer sitemap, PageHero, BackToTop, Reveal, Bits (CountUp, ReadingProgress, CopyLink)
- Fonts: Sora (display) + Inter (body) via Google Fonts in `layout.tsx`
