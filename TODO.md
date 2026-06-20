# FounderReach TODO

## Live Opportunity Sync

- Add `TINYFISH_API_KEY` to the runtime environment.
- Test `GET /api/opportunities/sync` and confirm TinyFish Search returns ranked results for hackathons, accelerators, events, funding, launch channels, talent, investors, and forums.
- Apply `supabase/migrations/002_opportunity_graph.sql` and add `SUPABASE_SERVICE_ROLE_KEY` so `/api/cron/opportunity-sync` can persist sync runs, candidates, and reviewed opportunities.
- Configure the hourly GitHub Actions job with `FOUNDERREACH_BASE_URL` and `CRON_SECRET` repository secrets.
- Add a review queue before publishing newly discovered opportunities into the main FounderReach graph.

## Logos

- Add `NEXT_PUBLIC_LOGO_DEV_TOKEN` if using Logo.dev for higher-quality brand logos.
- Keep favicon fallback enabled for sources without Logo.dev coverage.
- Store `organizationDomain` and `logoUrl` on reviewed opportunities so repeated logo lookup is cheap and stable.

## Better Data Sources

- Use TinyFish Search for discovery and TinyFish Fetch for clean page extraction.
- Use official pages as primary sources when possible.
- Treat public X search as a fast discovery channel for hackathons, accelerators, grants, events, talent, launch channels, and investor posts.
- Refresh GitHub Trending, Product Hunt daily launches, Hacker News search, and top weekly Reddit founder posts as market-signal sources.
- Maintain an incentives network for startup credits and discounts across cloud, database, AI, banking, CRM, payments, and workspace tools.
- Add a private X signal inbox for user-provided likes/bookmarks exports or pasted X text; private likes should not be scraped as if they were public web data.
- Let users maintain a watchlist of X accounts, lists, and search queries that FounderReach refreshes into the review queue.
- Import user-pasted opportunity threads into a review queue that classifies each item as active, expired, evergreen, or watch-next-cohort before publishing.
- Add source aging rules so April/May one-off hackathons do not stay in the live feed after their deadlines pass.
- Optional: use OpenAI API models for summarization, dedupe, categorization, and confidence scoring after TinyFish fetches the page text.
- Avoid using Codex itself as the production search layer; Codex is better suited for coding automation, review, and maintenance workflows.
