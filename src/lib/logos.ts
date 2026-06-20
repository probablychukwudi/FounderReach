import type { Opportunity } from "@/types";

export const knownOrganizationDomains: Record<string, string> = {
  "XPRIZE x Google": "xprize.org",
  Tether: "tether.io",
  LaunchHacks: "launchhacks.tech",
  "Sui Foundation": "sui.io",
  "Slack x Salesforce x Devpost": "slack.com",
  RevenueCat: "revenuecat.com",
  "RAISE Summit": "raisesummit.com",
  "Google Cloud": "cloud.google.com",
  "Microsoft for Startups": "microsoft.com",
  Cloudflare: "cloudflare.com",
  Vercel: "vercel.com",
  Neon: "neon.com",
  ElevenLabs: "elevenlabs.io",
  MongoDB: "mongodb.com",
  Mercury: "mercury.com",
  HubSpot: "hubspot.com",
  Stripe: "stripe.com",
  Notion: "notion.com",
  DigitalOcean: "digitalocean.com",
  GitHub: "github.com",
  Reddit: "reddit.com",
  "Hacker News / Algolia": "hn.algolia.com",
  "Y Combinator": "ycombinator.com",
  Techstars: "techstars.com",
  "Google for Startups": "startup.google.com",
  "Sequoia Capital": "sequoiacap.com",
  "a16z speedrun": "a16z.com",
  "South Park Commons": "southparkcommons.com",
  Neo: "neo.com",
  "Interior Northeast I-Corps Hub": "in-icorps.org",
  "Entrepreneur First": "joinef.com",
  "Z Fellows": "zfellows.com",
  Anthropic: "anthropic.com",
  "a16z Build": "a16z.com",
  "Blue Ridge Labs": "robinhood.org",
  BackersStage: "backersstage.com",
  "1517 Fund": "1517fund.com",
  "Amazon Web Services": "aws.amazon.com",
  "U.S. National Science Foundation": "nsf.gov",
  "TechCrunch": "techcrunch.com",
  "Web Summit": "websummit.com",
  Slush: "slush.org",
  "Startup World Cup": "startupworldcup.io",
  OpenAI: "openai.com",
  "Product Hunt": "producthunt.com",
  "Hacker News": "ycombinator.com",
  "GitHub Education": "education.github.com",
  Wellfound: "wellfound.com",
  "We Work Remotely": "weworkremotely.com",
  OpenVC: "openvc.app",
  "NFX Signal": "signal.nfx.com",
  "FounderReach": "founderreach.app",
};

export function getDomainFromUrl(url?: string) {
  if (!url) return undefined;

  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname || undefined;
  } catch {
    return undefined;
  }
}

export function getLogoUrlForDomain(domain?: string, size = 64) {
  if (!domain) return undefined;

  const normalized = domain.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

  if (token) {
    return `https://img.logo.dev/${encodeURIComponent(normalized)}?token=${encodeURIComponent(token)}&size=${size}&format=png&fallback=404`;
  }

  return undefined;
}

export function getOpportunityLogoDomain(opportunity: Pick<Opportunity, "organization" | "organizationDomain" | "sourceUrl">) {
  return opportunity.organizationDomain ?? knownOrganizationDomains[opportunity.organization] ?? getDomainFromUrl(opportunity.sourceUrl);
}

export function getOpportunityLogoUrl(opportunity: Pick<Opportunity, "organization" | "organizationDomain" | "logoUrl" | "sourceUrl">, size = 64) {
  return opportunity.logoUrl ?? getLogoUrlForDomain(getOpportunityLogoDomain(opportunity), size);
}

export function getOrganizationInitials(name: string) {
  const words = name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) return "FR";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}
