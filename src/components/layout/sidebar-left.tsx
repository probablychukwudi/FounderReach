"use client";

import Link from "next/link";
import {
  Beaker,
  BriefcaseBusiness,
  Building2,
  FilePlus2,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  Link2,
  Plus,
  Settings2,
  UserRoundSearch,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn, formatScore } from "@/lib/utils";
import type { InstitutionStage, SourcePlatform } from "@/types";

const platformIcons: Record<SourcePlatform, React.ComponentType<{ className?: string }>> = {
  google_scholar: GraduationCap,
  researchgate: FlaskConical,
  nsf: Building2,
  nih: Beaker,
  academia: FilePlus2,
  linkedin: BriefcaseBusiness,
  custom: Link2,
};

const stageStyles: Record<InstitutionStage, string> = {
  matched: "bg-[#f0f0ec] text-ink-3",
  qualified: "bg-green-soft text-green",
  outreach_drafted: "bg-[#fff4df] text-[#8b5a00]",
  outreach_sent: "bg-green-soft text-green",
  booked: "bg-green-soft text-green",
};

const stageLabels: Record<InstitutionStage, string> = {
  matched: "Matched",
  qualified: "Qualified",
  outreach_drafted: "Drafted",
  outreach_sent: "Sent",
  booked: "Booked",
};

export function SidebarLeft() {
  const pathname = usePathname();
  const sources = useAppStore((state) => state.sources);
  const institutions = useAppStore((state) => state.institutions);
  const selectedInstitutionId = useAppStore((state) => state.selectedInstitutionId);
  const toggleSource = useAppStore((state) => state.toggleSource);
  const addSource = useAppStore((state) => state.addSource);
  const addInstitution = useAppStore((state) => state.addInstitution);
  const setSelectedInstitutionId = useAppStore((state) => state.setSelectedInstitutionId);

  return (
    <aside className="border-r border-[#dadada] bg-surface px-4 py-5 xl:h-full xl:overflow-hidden xl:px-5">
      <div className="mx-auto flex h-full max-w-[257px] flex-col gap-4">
        <div className="shrink-0 px-1">
          <div className="text-[14px] font-bold text-ink">Sources &amp; Data</div>
          <p className="mt-2 text-[12px] leading-[18px] text-ink-2">
            Start with a live research stack, then add custom sources and institutions as the pipeline expands.
          </p>
        </div>

        <section className="min-h-0 shrink-0 rounded-[18px] border border-black/5 bg-[#f4efe8] shadow-[0px_8px_30px_rgba(15,19,17,0.06)] xl:basis-[42%]">
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-2">Active Platforms</div>
                <div className="mt-1 text-[11px] text-ink-3">Toggle what TinyFish scans by default.</div>
              </div>
              <button
                type="button"
                onClick={addSource}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-ink shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition hover:bg-[#fafafa]"
                aria-label="Add source"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="scrollbar-none flex-1 space-y-2 overflow-y-auto px-3 py-3">
              {sources.map((source) => {
                const Icon = platformIcons[source.platform] ?? UserRoundSearch;
                return (
                  <button
                    key={source.id}
                    type="button"
                    onClick={() => toggleSource(source.id)}
                    className={cn(
                      "w-full rounded-[14px] border px-3 py-3 text-left transition",
                      source.active
                        ? "border-[rgba(0,109,54,0.18)] bg-white shadow-[0px_2px_8px_rgba(15,19,17,0.05)]"
                        : "border-transparent bg-white/55 hover:bg-white",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 flex h-9 w-9 items-center justify-center rounded-[10px]",
                          source.active ? "bg-[rgba(74,222,128,0.16)] text-green" : "bg-[#ece8e0] text-ink-2",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-[13px] font-semibold text-ink">{source.label}</div>
                            <div className="mt-0.5 text-[11px] leading-[16px] text-ink-2">{source.subtitle}</div>
                          </div>
                          <span
                            className={cn(
                              "flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition",
                              source.active ? "bg-green" : "bg-[#d4d4d1]",
                            )}
                          >
                            <span
                              className={cn(
                                "h-4 w-4 rounded-full bg-white transition",
                                source.active ? "translate-x-4" : "",
                              )}
                            />
                          </span>
                        </div>
                        <div className="mt-2 text-[11px] leading-[16px] text-ink-3">{source.useCase}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="min-h-0 flex-1 rounded-[18px] border border-black/5 bg-[#f4efe8] shadow-[0px_8px_30px_rgba(15,19,17,0.06)]">
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-2">Institution List</div>
                <div className="mt-1 text-[11px] text-ink-3">Click any target to edit the research record.</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={addInstitution}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-ink shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition hover:bg-[#fafafa]"
                  aria-label="Add institution"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <Link href="/data" className="text-[11px] font-semibold text-green">
                  Edit
                </Link>
              </div>
            </div>

            <div className="scrollbar-none flex-1 space-y-3 overflow-y-auto px-3 py-3">
              {institutions.map((institution) => (
                <Link
                  key={institution.id}
                  href="/data"
                  onClick={() => setSelectedInstitutionId(institution.id)}
                  className={cn(
                    "block rounded-[14px] border px-3 py-3 transition",
                    selectedInstitutionId === institution.id || (pathname.startsWith("/data") && selectedInstitutionId === institution.id)
                      ? "border-[rgba(0,109,54,0.18)] bg-white shadow-[0px_2px_8px_rgba(15,19,17,0.06)]"
                      : "border-transparent bg-white/70 hover:bg-white",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-semibold text-ink">{institution.name}</div>
                      <div className="mt-1 text-[11px] leading-[16px] text-ink-2">{institution.description}</div>
                    </div>
                    <span className={cn("shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em]", stageStyles[institution.stage])}>
                      {stageLabels[institution.stage]}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-[6px] bg-[#ebe7de] px-2 py-1 text-[10px] uppercase tracking-[0.06em] text-ink-3">
                        {institution.focus}
                      </span>
                      <span className="rounded-[6px] bg-[#ebe7de] px-2 py-1 text-[10px] uppercase tracking-[0.06em] text-ink-3">
                        {formatScore(institution.relevanceScore)}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.06em] text-ink-3">
                      {institution.type.replaceAll("_", " ")}
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-ink-3">{institution.lastActivity}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-auto shrink-0 rounded-[16px] border border-black/5 bg-white px-3 py-2 shadow-[0px_4px_18px_rgba(15,19,17,0.05)]">
          <div className="space-y-1">
            <Link href="/profile" className="flex items-center gap-2 rounded-[10px] px-2 py-2 text-sm text-ink-2 transition hover:bg-surface">
              <Settings2 className="h-4 w-4" />
              Settings
            </Link>
            <Link href="/permissions" className="flex items-center gap-2 rounded-[10px] px-2 py-2 text-sm text-ink-2 transition hover:bg-surface">
              <HelpCircle className="h-4 w-4" />
              Help
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
