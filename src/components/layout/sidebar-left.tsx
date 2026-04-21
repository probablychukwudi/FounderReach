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
  Settings2,
  UserRoundSearch,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { demoInstitutions, demoSources } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const platformIcons = {
  google_scholar: GraduationCap,
  researchgate: FlaskConical,
  nsf: Building2,
  nih: Beaker,
  academia: FilePlus2,
  linkedin: BriefcaseBusiness,
};

export function SidebarLeft() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-[#dadada] bg-surface px-4 py-6 xl:min-h-[calc(100vh-64px)] xl:overflow-y-auto">
      <div className="mx-auto flex h-full max-w-[257px] flex-col">
        <section className="pb-4">
          <h2 className="font-display text-[14px] font-bold text-ink">Sources &amp; Data</h2>
          <div className="px-2 pt-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-ink-2">Active Platforms</div>
          </div>
          <div className="mt-2 space-y-1">
            {demoSources.map((source) => {
              const Icon = platformIcons[source.platform] ?? UserRoundSearch;
              return (
                <div key={source.id} className="flex items-center gap-2 rounded-[6px] px-2 py-1.5">
                  <Icon className="h-3.5 w-3.5 text-ink-2" />
                  <span className="min-w-0 flex-1 text-xs font-medium text-ink">{source.label}</span>
                  <span className={cn("h-1.5 w-1.5 rounded-full", source.active ? "bg-green-dot" : "bg-[#c6c6c6]")} />
                </div>
              );
            })}
          </div>
          <Link
            href="/permissions"
            className="mt-2 flex items-center gap-2 rounded-[6px] border border-dashed border-[rgba(3,3,3,0.3)] px-3 py-2 text-xs font-medium text-ink-2"
          >
            <FilePlus2 className="h-3.5 w-3.5" />
            Add source...
          </Link>
        </section>

        <div className="flex-1" />

        <section className="border-t border-[#dadada] pt-6">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.02em] text-ink-2">Institution List</div>
            <Link href="/data" className="text-[11px] font-semibold text-green">
              Edit
            </Link>
          </div>
          <div className="mt-3 space-y-3">
            {demoInstitutions.map((institution) => (
              <Link
                key={institution.id}
                href="/data"
                className={cn(
                  "block rounded-[6px] border border-[rgba(188,202,187,0.1)] bg-white px-[13px] py-[13px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]",
                  pathname.startsWith("/data") && institution.name === "MIT Media Lab" && "border-l-[3px] border-l-green",
                )}
              >
                <div className="text-xs font-bold text-ink">{institution.name}</div>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-ink-2">{institution.type.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}</span>
                  <span className="rounded-[4px] bg-surface px-1.5 py-0.5 text-[10px] text-ink-3">{institution.focus}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/permissions"
            className="mt-3 flex items-center gap-2 rounded-[6px] border border-dashed border-[rgba(3,3,3,0.3)] px-3 py-2 text-xs font-medium text-ink-2"
          >
            <FilePlus2 className="h-3.5 w-3.5" />
            Add source...
          </Link>
        </section>

        <div className="mt-6 border-t border-[#dadada] pt-4">
          <div className="space-y-2">
            <Link href="/profile" className="flex items-center gap-2 py-2 text-sm text-ink-2">
              <Settings2 className="h-5 w-5" />
              Settings
            </Link>
            <Link href="/permissions" className="flex items-center gap-2 py-2 text-sm text-ink-2">
              <HelpCircle className="h-5 w-5" />
              Help
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
