/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Link2, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn, formatScore } from "@/lib/utils";
import type { Institution, InstitutionStage } from "@/types";

const typeOptions: Institution["type"][] = ["research_lab", "institute", "grant", "vc", "lab"];
const stageOptions: InstitutionStage[] = ["matched", "qualified", "outreach_drafted", "outreach_sent", "booked"];
const fundingOptions: Institution["fundingRecency"][] = ["active", "recent", "stale"];

const typeLabels: Record<Institution["type"], string> = {
  research_lab: "Research Lab",
  institute: "Institute",
  grant: "Grant",
  vc: "VC",
  lab: "Lab",
};

const stageLabels: Record<InstitutionStage, string> = {
  matched: "Matched",
  qualified: "Qualified",
  outreach_drafted: "Drafted",
  outreach_sent: "Sent",
  booked: "Booked",
};

export default function DataPage() {
  const institutions = useAppStore((state) => state.institutions);
  const selectedInstitutionId = useAppStore((state) => state.selectedInstitutionId);
  const setSelectedInstitutionId = useAppStore((state) => state.setSelectedInstitutionId);
  const updateInstitution = useAppStore((state) => state.updateInstitution);
  const addInstitution = useAppStore((state) => state.addInstitution);
  const [query, setQuery] = useState("");

  const filteredInstitutions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return institutions;
    return institutions.filter((institution) =>
      [institution.name, institution.focus, institution.description, institution.location, institution.type]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [institutions, query]);

  const selectedInstitution =
    institutions.find((institution) => institution.id === selectedInstitutionId) ?? institutions[0] ?? null;
  const [draft, setDraft] = useState<Institution | null>(selectedInstitution);

  useEffect(() => {
    if (!selectedInstitution) return;
    setDraft(selectedInstitution);
  }, [selectedInstitution]);

  if (!selectedInstitution || !draft) {
    return null;
  }

  return (
    <div className="h-full bg-[#f5f1ea] px-5 py-6 xl:px-8 xl:py-6">
      <div className="mx-auto flex h-full max-w-[1400px] min-h-0 flex-col overflow-hidden rounded-[28px] border border-[rgba(188,202,187,0.24)] bg-[rgba(255,255,255,0.68)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm">
        <div className="border-b border-[#e9e9e9] px-4 pb-4 pt-5 xl:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-[18px] font-bold text-ink">Institution List</h1>
              <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Source Data</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-ink-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search institutions..."
                  className="h-10 w-[220px] rounded-[8px] bg-surface px-10 text-sm text-ink outline-none placeholder:text-ink-3"
                />
              </div>
              <button
                type="button"
                onClick={addInstitution}
                className="flex items-center gap-2 rounded-[8px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                New
              </button>
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="min-h-0 border-r border-[#e9e9e9] bg-white">
            <div className="scrollbar-none h-full overflow-y-auto divide-y divide-[#e9e9e9]">
              {filteredInstitutions.map((institution) => (
                <button
                  key={institution.id}
                  type="button"
                  onClick={() => setSelectedInstitutionId(institution.id)}
                  className={cn(
                    "block w-full px-4 py-4 text-left transition",
                    institution.id === selectedInstitution.id ? "border-l-[3px] border-l-green bg-white" : "bg-white hover:bg-[#faf9f7]",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[20px] font-semibold tracking-[-0.03em] text-ink">{institution.name}</div>
                      <div className="mt-1 text-sm text-ink-2">{institution.description}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-[4px] bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.04em] text-ink-3">
                          {institution.focus}
                        </span>
                        <span className="rounded-[4px] bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.04em] text-ink-3">
                          {formatScore(institution.relevanceScore)}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-[0.04em] text-ink-2">{typeLabels[institution.type]}</span>
                  </div>
                  <div className="mt-2 text-xs text-ink-3">{institution.lastActivity}</div>
                </button>
              ))}
            </div>
          </aside>

          <section className="min-h-0 bg-[#faf8f4] px-6 py-6 xl:px-6 xl:py-6">
            <div className="scrollbar-none h-full overflow-y-auto">
              <div className="mx-auto max-w-[760px] rounded-[12px] bg-white px-6 py-6 shadow-card">
                <div className="flex items-center justify-between gap-4 border-b border-[#ededed] pb-4">
                  <div>
                    <h2 className="text-[34px] font-bold tracking-[-0.04em] text-ink">Edit Institution</h2>
                    <div className="mt-2 text-sm text-ink-2">
                      Update the target profile, scoring details, and messaging context the agents use downstream.
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setDraft(selectedInstitution)}
                      className="text-sm text-ink-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => updateInstitution(selectedInstitution.id, draft)}
                      className="rounded-[8px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Institution Name</label>
                    <input
                      value={draft.name}
                      onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                      className="mt-2 h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Type</label>
                      <div className="relative mt-2">
                        <select
                          value={draft.type}
                          onChange={(event) => setDraft({ ...draft, type: event.target.value as Institution["type"] })}
                          className="h-9 w-full appearance-none rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                        >
                          {typeOptions.map((option) => (
                            <option key={option} value={option}>
                              {typeLabels[option]}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Focus Area</label>
                      <input
                        value={draft.focus}
                        onChange={(event) => setDraft({ ...draft, focus: event.target.value })}
                        className="mt-2 h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Stage</label>
                      <div className="relative mt-2">
                        <select
                          value={draft.stage}
                          onChange={(event) => setDraft({ ...draft, stage: event.target.value as InstitutionStage })}
                          className="h-9 w-full appearance-none rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                        >
                          {stageOptions.map((option) => (
                            <option key={option} value={option}>
                              {stageLabels[option]}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Funding Recency</label>
                      <div className="relative mt-2">
                        <select
                          value={draft.fundingRecency}
                          onChange={(event) =>
                            setDraft({
                              ...draft,
                              fundingRecency: event.target.value as Institution["fundingRecency"],
                            })
                          }
                          className="h-9 w-full appearance-none rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                        >
                          {fundingOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Website URL</label>
                      <div className="mt-2 flex h-9 items-center gap-2 rounded-[6px] bg-surface px-3 text-sm text-ink">
                        <Link2 className="h-4 w-4 text-ink-2" />
                        <input
                          value={draft.website}
                          onChange={(event) => setDraft({ ...draft, website: event.target.value })}
                          className="h-full w-full bg-transparent text-sm text-ink outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Location</label>
                      <input
                        value={draft.location}
                        onChange={(event) => setDraft({ ...draft, location: event.target.value })}
                        className="mt-2 h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Relevance Score</label>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.01"
                        value={draft.relevanceScore}
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            relevanceScore: Number(event.target.value || draft.relevanceScore),
                          })
                        }
                        className="mt-2 h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full rounded-[12px] bg-[#f8f7f4] px-4 py-3">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                          Current fit score
                        </div>
                        <div className="mt-2 text-[28px] font-bold tracking-[-0.04em] text-ink">
                          {formatScore(draft.relevanceScore)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Description / Notes</label>
                    <textarea
                      value={draft.description}
                      onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                      className="mt-2 min-h-[112px] w-full rounded-[6px] bg-surface px-3 py-3 text-sm leading-6 text-ink outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Last Activity</label>
                    <input
                      value={draft.lastActivity}
                      onChange={(event) => setDraft({ ...draft, lastActivity: event.target.value })}
                      className="mt-2 h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none"
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 text-xs text-ink-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-3.5 w-3.5" />
                    Last updated in the FounderReach studio. Changes here feed the live agent pipeline.
                  </div>
                  <button className="text-sm text-[#d11212]">Delete Record</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
