"use client";

import { ExternalLink, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { formatOpportunityDate, getOpportunityDate, opportunities, opportunityCategories } from "@/lib/opportunities";

export default function DataPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return opportunities;

    return opportunities.filter((item) =>
      [
        item.title,
        item.organization,
        item.category,
        item.sourceName,
        item.summary,
        item.location,
        item.value,
        item.trustSignal,
        ...item.sectors,
        ...item.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div className="min-h-full bg-surface px-8 py-5 text-ink">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-green">
              <ShieldCheck className="h-4 w-4" />
              Source library
            </div>
            <h1 className="mt-2 text-[30px] font-semibold tracking-normal">Opportunity graph</h1>
            <p className="mt-2 max-w-[680px] text-[14px] leading-6 text-ink-2">
              Every item includes a source, trust note, category, modality, and founder-facing action.
            </p>
          </div>

          <label className="relative w-full max-w-[420px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sources, sectors, or organizations..."
              className="h-[45px] w-full rounded-[10px] border border-black/10 bg-white pl-10 pr-3 text-[14px] text-ink outline-none placeholder:text-ink-3 focus:border-green/35"
            />
          </label>
        </div>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {opportunityCategories.slice(1, 9).map((category) => (
            <div key={category.id} className="rounded-[12px] border border-black/5 bg-white px-4 py-4">
              <div className="text-[12px] text-ink-3">{category.label}</div>
              <div className="mt-2 text-[22px] font-semibold">
                {opportunities.filter((item) => item.category === category.id).length}
              </div>
              <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-ink-2">{category.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-5 overflow-hidden rounded-[14px] border border-black/5 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-collapse text-left text-[13px]">
              <thead className="bg-[#f4efe8] text-[11px] uppercase tracking-[0.06em] text-ink-3">
                <tr>
                  <th className="px-4 py-3 font-medium">Resource</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Timing</th>
                  <th className="px-4 py-3 font-medium">Access</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Trust note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fbfbf8]">
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium text-ink">{item.title}</div>
                      <div className="mt-1 max-w-[320px] text-ink-2">{item.summary}</div>
                    </td>
                    <td className="px-4 py-4 align-top capitalize text-ink-2">{item.category}</td>
                    <td className="px-4 py-4 align-top text-ink-2">{formatOpportunityDate(getOpportunityDate(item))}</td>
                    <td className="px-4 py-4 align-top text-ink-2">{item.cost}</td>
                    <td className="px-4 py-4 align-top">
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-green">
                        {item.sourceName}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="max-w-[320px] text-ink-2">{item.trustSignal}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
