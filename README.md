# FounderReach

FounderReach is a production rebuild of the platform as a Netlify-native Next.js application. It is designed around a TinyFish-first agent workflow for startup partnership intelligence:

1. `Match` scans live browser sources for institutions, grants, labs, and investors.
2. `Qualify` ranks the targets by fit, funding recency, and commercialization potential.
3. `Outreach` drafts specific founder messaging grounded in current source evidence.
4. `Book` moves warm paths into scheduling and calendar coordination.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Zustand
- Supabase SSR helpers and SQL migration scaffolding
- TinyFish browser automation client
- Resend client
- Google Calendar client
- Netlify deployment config

## Key routes

- `/`
- `/login`
- `/signup`
- `/step-1`
- `/step-2`
- `/step-3`
- `/complete`
- `/dashboard`
- `/calendar`
- `/inbox`
- `/data`
- `/profile`
- `/permissions`

## API surface

- `POST /api/agent/run`
- `GET /api/agent/status`
- `POST /api/agent/stop`
- `GET/POST /api/institutions`
- `GET/PATCH /api/institutions/[id]`
- `GET/POST /api/outreach`
- `GET/PATCH /api/outreach/[id]`
- `POST /api/outreach/[id]/approve`
- `POST /api/outreach/[id]/send`
- `GET/POST /api/bookings`
- `POST /api/webhooks/tinyfish`

## Local development

```bash
npm install
npm run dev
```

Create a local `.env.local` from `.env.example` before enabling live providers.

## Environment variables

See `.env.example` for the full set. The most important server-side keys are:

- `TINYFISH_API_KEY`
- `TINYFISH_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `CALCOM_API_KEY`

## Database

The initial Supabase schema lives at:

- `supabase/migrations/001_initial.sql`

## Deployment

This repository is intended for Netlify only. The project includes:

- `netlify.toml`
- `@netlify/plugin-nextjs`

The new repo should be linked to Netlify and deployed to `founderreach.app` after environment variables are set and the fresh secrets are rotated.
