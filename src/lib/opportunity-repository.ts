import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Opportunity, OpportunityCategory, OpportunityFormat, OpportunitySyncCandidate } from "@/types";

type OpportunityRow = {
  id: string;
  title: string;
  organization: string;
  organization_domain: string | null;
  logo_url: string | null;
  category: OpportunityCategory;
  format: OpportunityFormat;
  location: string | null;
  sectors: string[] | null;
  audience: string | null;
  summary: string;
  deadline: string | null;
  start_date: string | null;
  end_date: string | null;
  value: string | null;
  cost: Opportunity["cost"];
  source_name: string;
  source_url: string;
  action_label: string | null;
  tags: string[] | null;
  trust_signal: string | null;
  priority: Opportunity["priority"];
  featured: boolean | null;
};

type OpportunitySyncPlanItem = {
  id: string;
  category: OpportunityCategory;
  label: string;
};

export type PersistenceResult =
  | {
      ok: true;
      syncRunId?: string;
      candidatesStored: number;
      opportunitiesPublished: number;
    }
  | {
      ok: false;
      reason: "missing-service-role-key" | "supabase-write-failed";
      message: string;
    };

function getSupabaseReadClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function compact<T>(values: Array<T | null | undefined | false>) {
  return values.filter(Boolean) as T[];
}

function toOpportunity(row: OpportunityRow): Opportunity {
  return {
    id: row.id,
    title: row.title,
    organization: row.organization,
    organizationDomain: row.organization_domain ?? undefined,
    logoUrl: row.logo_url ?? undefined,
    category: row.category,
    format: row.format,
    location: row.location ?? "Global",
    sectors: row.sectors ?? [],
    audience: row.audience ?? "Founders looking for relevant programs, capital, distribution, or talent.",
    summary: row.summary,
    deadline: row.deadline ?? undefined,
    startDate: row.start_date ?? undefined,
    endDate: row.end_date ?? undefined,
    value: row.value ?? undefined,
    cost: row.cost,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    actionLabel: row.action_label ?? "Review",
    tags: row.tags ?? [],
    trustSignal: row.trust_signal ?? "Imported from the FounderReach live opportunity graph.",
    priority: row.priority,
    featured: Boolean(row.featured),
  };
}

function toOpportunityRow(item: Opportunity, status = "reviewed") {
  const now = new Date().toISOString();

  return {
    id: item.id,
    title: item.title,
    organization: item.organization,
    organization_domain: item.organizationDomain ?? null,
    logo_url: item.logoUrl ?? null,
    category: item.category,
    format: item.format,
    location: item.location,
    sectors: item.sectors,
    audience: item.audience,
    summary: item.summary,
    deadline: item.deadline ?? null,
    start_date: item.startDate ?? null,
    end_date: item.endDate ?? null,
    value: item.value ?? null,
    cost: item.cost,
    source_name: item.sourceName,
    source_url: item.sourceUrl,
    action_label: item.actionLabel,
    tags: item.tags,
    trust_signal: item.trustSignal,
    priority: item.priority,
    featured: item.featured ?? false,
    status,
    reviewed_at: status === "reviewed" ? now : null,
    last_seen_at: now,
    updated_at: now,
    raw_data: item,
  };
}

export function opportunityFromCandidate(candidate: OpportunitySyncCandidate): Opportunity {
  const categoryLabel = candidate.category.replace("-", " ");
  const discoveredAt = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    id: candidate.id,
    title: candidate.title || candidate.sourceUrl,
    organization: candidate.organization || candidate.sourceName,
    organizationDomain: candidate.organizationDomain,
    logoUrl: candidate.logoUrl,
    category: candidate.category,
    format: candidate.format,
    location: candidate.location || "Live web",
    sectors: compact([categoryLabel, "Live web"]),
    audience: `Founders tracking ${categoryLabel} opportunities and ecosystem signals.`,
    summary: candidate.fetchedDescription || candidate.summary || "Discovered by TinyFish search.",
    value: candidate.category === "incentive" ? "Startup credits or perks" : undefined,
    cost: candidate.category === "funding" ? "Non-dilutive" : "Community",
    sourceName: candidate.sourceName,
    sourceUrl: candidate.sourceUrl,
    actionLabel: candidate.category === "news" || candidate.category === "forum" ? "Read" : "Review",
    tags: compact(["TinyFish", candidate.discoveredBy, candidate.category]),
    trustSignal: `Discovered by TinyFish on ${discoveredAt}. Review the source before applying or sharing.`,
    priority: candidate.confidence >= 0.65 ? "watch" : "watch",
  };
}

export function mergeOpportunities(seedItems: Opportunity[], persistedItems: Opportunity[]) {
  const byId = new Map(seedItems.map((item) => [item.id, item]));

  for (const item of persistedItems) {
    byId.set(item.id, item);
  }

  return Array.from(byId.values());
}

export async function getReviewedOpportunities() {
  const supabase = getSupabaseReadClient();

  if (!supabase) {
    return {
      mode: "static" as const,
      items: [],
      warning: "Supabase is not configured for server-side opportunity reads.",
    };
  }

  const { data, error } = await supabase
    .from("opportunities")
    .select(
      "id,title,organization,organization_domain,logo_url,category,format,location,sectors,audience,summary,deadline,start_date,end_date,value,cost,source_name,source_url,action_label,tags,trust_signal,priority,featured",
    )
    .eq("status", "reviewed")
    .order("featured", { ascending: false })
    .order("last_seen_at", { ascending: false })
    .limit(250);

  if (error) {
    return {
      mode: "static" as const,
      items: [],
      warning: error.message,
    };
  }

  return {
    mode: "supabase" as const,
    items: ((data ?? []) as OpportunityRow[]).map(toOpportunity),
    warning: undefined,
  };
}

export async function persistOpportunitySyncRun({
  plan,
  candidates,
  fetched,
  errors,
  trigger = "manual",
  publish = false,
}: {
  plan: OpportunitySyncPlanItem[];
  candidates: OpportunitySyncCandidate[];
  fetched: unknown[];
  errors: unknown[];
  trigger?: string;
  publish?: boolean;
}): Promise<PersistenceResult> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false,
      reason: "missing-service-role-key",
      message: "Add SUPABASE_SERVICE_ROLE_KEY to persist sync runs and publish reviewed opportunities.",
    };
  }

  const now = new Date().toISOString();

  try {
    const { data: syncRun, error: syncRunError } = await supabase
      .from("opportunity_sync_runs")
      .insert({
        trigger,
        categories: Array.from(new Set(plan.map((item) => item.category))),
        source_count: plan.length,
        candidate_count: candidates.length,
        fetched_count: fetched.length,
        error_count: errors.length,
        errors,
        mode: publish ? "publish" : "review",
      })
      .select("id")
      .single();

    if (syncRunError) throw syncRunError;

    const candidateRows = candidates.map((candidate) => ({
      id: candidate.id,
      sync_run_id: syncRun?.id ?? null,
      title: candidate.title || candidate.sourceUrl,
      organization: candidate.organization || candidate.sourceName,
      organization_domain: candidate.organizationDomain ?? null,
      logo_url: candidate.logoUrl ?? null,
      category: candidate.category,
      format: candidate.format,
      location: candidate.location || "Live web",
      summary: candidate.summary,
      source_name: candidate.sourceName,
      source_url: candidate.sourceUrl,
      discovered_by: candidate.discoveredBy,
      fetched_title: candidate.fetchedTitle ?? null,
      fetched_description: candidate.fetchedDescription ?? null,
      confidence: candidate.confidence,
      payload: candidate,
      last_seen_at: now,
      updated_at: now,
    }));

    if (candidateRows.length) {
      const { error: candidatesError } = await supabase
        .from("opportunity_candidates")
        .upsert(candidateRows, { onConflict: "id" });

      if (candidatesError) throw candidatesError;
    }

    let opportunitiesPublished = 0;

    if (publish && candidates.length) {
      const opportunityRows = candidates
        .filter((candidate) => candidate.confidence >= 0.35)
        .map((candidate) => toOpportunityRow(opportunityFromCandidate(candidate)));

      if (opportunityRows.length) {
        const { error: opportunitiesError } = await supabase
          .from("opportunities")
          .upsert(opportunityRows, { onConflict: "id" });

        if (opportunitiesError) throw opportunitiesError;
        opportunitiesPublished = opportunityRows.length;
      }
    }

    return {
      ok: true,
      syncRunId: syncRun?.id,
      candidatesStored: candidateRows.length,
      opportunitiesPublished,
    };
  } catch (error) {
    return {
      ok: false,
      reason: "supabase-write-failed",
      message: error instanceof Error ? error.message : "Could not persist the opportunity sync run.",
    };
  }
}
