# FounderReach Roadmap

## Opportunity Sync

- Apply `supabase/migrations/002_opportunity_graph.sql` in production.
- Add production values for `TINYFISH_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, and `FOUNDERREACH_BASE_URL`.
- Keep newly discovered opportunities in a review queue before publishing them to the main graph.
- Add freshness rules so one-off hackathons, grants, and events expire automatically after their deadlines.
- Store source metadata, confidence scores, and reviewer decisions for each imported opportunity.

## Discovery Sources

- Use TinyFish Search for discovery and TinyFish Fetch for clean source extraction.
- Prioritize official source pages when possible.
- Refresh GitHub Trending, Product Hunt launches, Hacker News search, and weekly founder/startup Reddit signals.
- Support public X search queries, watchlists, and pasted opportunity threads as discovery inputs.
- Classify imported opportunities as active, expired, evergreen, or watch-next-cohort before publishing.

## Founder Value

- Expand the startup incentives network across cloud, database, AI, banking, CRM, payments, and workspace tools.
- Add mentor, talent, and investor directory views with richer filtering.
- Add saved-source alerts for deadlines, new cohorts, geographic matches, and sector-specific opportunities.
- Let users export saved opportunities to calendar, CSV, and weekly email digests.

## Quality

- Add unit tests for opportunity normalization, deadline parsing, and source deduplication.
- Add integration tests for auth, saved opportunities, newsletter signup, and cron sync.
- Add source-quality scoring so stale, duplicated, or low-confidence entries stay out of the main feed.
