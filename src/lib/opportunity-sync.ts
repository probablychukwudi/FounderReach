import { fetchTinyFishUrls, searchTinyFish, type TinyFishSearchResult } from "@/lib/tinyfish/client";
import { getDomainFromUrl, getLogoUrlForDomain } from "@/lib/logos";
import type { OpportunityCategory, OpportunityFormat, OpportunitySyncCandidate } from "@/types";

export type OpportunitySyncSource = {
  id: string;
  category: OpportunityCategory;
  label: string;
  query: string;
  location?: string;
  channel?: "web" | "x" | "github" | "product_hunt" | "reddit" | "hacker_news";
};

export const opportunitySyncSources: OpportunitySyncSource[] = [
  {
    id: "hackathons",
    category: "hackathon",
    label: "Active hackathons",
    query: "active startup hackathons 2026 application deadline prize online founders",
  },
  {
    id: "x-hackathons",
    category: "hackathon",
    label: "X: Hackathon posts",
    query: 'site:x.com hackathon apply register deadline prize founders builders 2026',
    channel: "x",
  },
  {
    id: "accelerators",
    category: "accelerator",
    label: "Accelerators",
    query: "startup accelerators applications open 2026 founders deadline",
  },
  {
    id: "tracked-accelerators",
    category: "accelerator",
    label: "Tracked accelerator watchlist",
    query:
      "Sequoia Arc a16z speedrun South Park Commons Neo Residency Entrepreneur First The Bridge startup accelerator applications 2026 founders",
  },
  {
    id: "x-accelerators",
    category: "accelerator",
    label: "X: Accelerator posts",
    query: 'site:x.com accelerator applications open founders deadline cohort 2026 startup',
    channel: "x",
  },
  {
    id: "events",
    category: "conference",
    label: "Upcoming founder events",
    query: "startup founder conference events 2026 applications pitch competition",
  },
  {
    id: "x-events",
    category: "conference",
    label: "X: Founder event posts",
    query: 'site:x.com startup founder event conference summit apply register builders 2026',
    channel: "x",
  },
  {
    id: "funding",
    category: "funding",
    label: "Non-dilutive funding",
    query: "startup grants non-dilutive funding credits founders applications open",
    location: "US",
  },
  {
    id: "fellowships",
    category: "fellowship",
    label: "Founder and AI fellowships",
    query:
      "founder fellowship applications open 2026 Z Fellows Anthropic Fellows Blue Ridge Labs a16z Build startup builders",
  },
  {
    id: "incentives",
    category: "incentive",
    label: "Startup incentives and credits",
    query:
      "startup credits incentives AWS Google Cloud Microsoft Vercel Cloudflare Neon ElevenLabs MongoDB HubSpot Stripe Notion apply",
  },
  {
    id: "x-funding",
    category: "funding",
    label: "X: Grant and funding posts",
    query: 'site:x.com startup grant non-dilutive funding apply deadline founders 2026',
    channel: "x",
  },
  {
    id: "launch",
    category: "launch",
    label: "Launch channels",
    query: "startup launch channels product launch communities Product Hunt Hacker News founders",
  },
  {
    id: "product-hunt-launches",
    category: "launch",
    label: "Product Hunt launches",
    query: "site:producthunt.com/products AI SaaS developer tool startup launched Product Hunt newest",
    channel: "product_hunt",
  },
  {
    id: "x-launch",
    category: "launch",
    label: "X: Launch channel posts",
    query: 'site:x.com startup launch Product Hunt Show HN launch channels builders founders',
    channel: "x",
  },
  {
    id: "talent",
    category: "talent",
    label: "Talent and interns",
    query: "startup intern hiring new grad founder talent programs university 2026",
  },
  {
    id: "remote-startup-talent",
    category: "talent",
    label: "Remote startup talent boards",
    query: "startup jobs remote internships new grad hiring founders Wellfound We Work Remotely YC startups",
  },
  {
    id: "x-talent",
    category: "talent",
    label: "X: Talent posts",
    query: 'site:x.com startup hiring intern new grad fellowship builders remote 2026',
    channel: "x",
  },
  {
    id: "investors",
    category: "investor",
    label: "Investor network",
    query: "startup investor directory seed investors sector specific founders",
  },
  {
    id: "investor-directories",
    category: "investor",
    label: "Investor directories",
    query: "OpenVC NFX Signal investor database startup fundraising Web3 crypto seed investors founders",
  },
  {
    id: "x-investors",
    category: "investor",
    label: "X: Investor posts",
    query: 'site:x.com investors founders seed preseed sectors AI fintech climate startup',
    channel: "x",
  },
  {
    id: "github-trending",
    category: "news",
    label: "GitHub trending repositories",
    query: "site:github.com/trending trending repositories AI developer tools startups this week",
    channel: "github",
  },
  {
    id: "reddit-founder-signals",
    category: "forum",
    label: "Reddit founder signals",
    query:
      "site:reddit.com/r/startups OR site:reddit.com/r/SaaS OR site:reddit.com/r/Entrepreneur founder startup launch pricing feedback top week",
    channel: "reddit",
  },
  {
    id: "hacker-news-signals",
    category: "news",
    label: "Hacker News founder signals",
    query: "site:news.ycombinator.com Show HN Ask HN startup developer tool launch AI founders",
    channel: "hacker_news",
  },
  {
    id: "forums",
    category: "forum",
    label: "Founder forums",
    query: "founder community forum startup builders online founders",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function getSiteName(result: TinyFishSearchResult) {
  return result.site_name ?? getDomainFromUrl(result.url) ?? "Live web";
}

function inferFormat(text: string): OpportunityFormat {
  const value = text.toLowerCase();
  if (value.includes("in-person") || value.includes("san francisco") || value.includes("new york")) return "In-person";
  if (value.includes("hybrid")) return "Hybrid";
  if (value.includes("remote")) return "Remote";
  if (value.includes("global")) return "Global";
  if (value.includes("directory")) return "Directory";
  return "Online";
}

function buildCandidate(source: OpportunitySyncSource, result: TinyFishSearchResult): OpportunitySyncCandidate {
  const domain = getDomainFromUrl(result.url);
  const title = result.title.replace(/\s+/g, " ").trim();
  const summary = result.snippet?.replace(/\s+/g, " ").trim() || "Discovered by TinyFish search. Fetch enrichment can add a fuller summary.";

  return {
    id: `${source.id}-${slugify(title || result.url)}`,
    title,
    organization: getSiteName(result),
    organizationDomain: domain,
    logoUrl: getLogoUrlForDomain(domain),
    category: source.category,
    format: inferFormat(`${title} ${summary}`),
    location: "Live web",
    summary,
    sourceName: getSiteName(result),
    sourceUrl: result.url,
    discoveredBy: source.label,
    confidence: Math.max(0.35, 1 - (result.position - 1) * 0.08),
  };
}

export function getOpportunitySyncPlan(categoryIds?: OpportunityCategory[]) {
  const selected = categoryIds?.length
    ? opportunitySyncSources.filter((source) => categoryIds.includes(source.category))
    : opportunitySyncSources;

  return selected.map((source) => ({
    id: source.id,
    category: source.category,
    label: source.label,
    query: source.query,
    location: source.location,
    channel: source.channel ?? "web",
  }));
}

export async function syncOpportunitiesWithTinyFish({
  categoryIds,
  limitPerSource = 5,
  fetchTopUrls = true,
}: {
  categoryIds?: OpportunityCategory[];
  limitPerSource?: number;
  fetchTopUrls?: boolean;
}) {
  const sources = categoryIds?.length
    ? opportunitySyncSources.filter((source) => categoryIds.includes(source.category))
    : opportunitySyncSources;

  const searchResponses = await Promise.all(
    sources.map(async (source) => ({
      source,
      response: await searchTinyFish({
        query: source.query,
        location: source.location,
      }),
    })),
  );

  const seenUrls = new Set<string>();
  const candidates = searchResponses.flatMap(({ source, response }) =>
    response.results
      .filter((result) => {
        if (seenUrls.has(result.url)) return false;
        seenUrls.add(result.url);
        return true;
      })
      .slice(0, limitPerSource)
      .map((result) => buildCandidate(source, result)),
  );

  if (!fetchTopUrls || !candidates.length) {
    return {
      candidates,
      fetched: [],
      errors: [],
    };
  }

  const fetchResponse = await fetchTinyFishUrls({
    urls: candidates.slice(0, 10).map((candidate) => candidate.sourceUrl),
    format: "markdown",
    ttl: 0,
  });
  const fetchedByUrl = new Map(fetchResponse.results.map((result) => [result.url, result]));

  return {
    candidates: candidates.map((candidate) => {
      const fetched = fetchedByUrl.get(candidate.sourceUrl);
      return {
        ...candidate,
        fetchedTitle: fetched?.title,
        fetchedDescription: fetched?.description,
        summary: fetched?.description || candidate.summary,
      };
    }),
    fetched: fetchResponse.results,
    errors: fetchResponse.errors ?? [],
  };
}
