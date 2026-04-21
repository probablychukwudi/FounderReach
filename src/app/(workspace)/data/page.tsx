import { ChevronDown, Link2, Plus, Search, SlidersHorizontal } from "lucide-react";

const institutionRows = [
  {
    name: "Apex Ventures",
    type: "VC",
    subtitle: "Early-stage B2B SaaS focused fund.",
    tags: ["Seed", "Series A"],
    active: true,
  },
  {
    name: "Summit Capital",
    type: "PE",
    subtitle: "Growth equity for established tech firms.",
    tags: ["Growth"],
    active: false,
  },
  {
    name: "Nexus Angel Network",
    type: "Angel",
    subtitle: "Syndicate focusing on deep tech and AI.",
    tags: ["Pre-Seed", "Seed"],
    active: false,
  },
];

export default function DataPage() {
  return (
    <div className="px-6 py-6 xl:px-0 xl:py-0">
      <div className="border-b border-[#e9e9e9] px-4 pb-4 xl:px-6 xl:pt-4">
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
                defaultValue=""
                placeholder="Search institutions..."
                className="h-10 w-[220px] rounded-[8px] bg-surface px-10 text-sm text-ink outline-none placeholder:text-ink-3"
              />
            </div>
            <button className="flex items-center gap-2 rounded-[8px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] px-4 py-2.5 text-sm font-semibold text-white">
              <Plus className="h-4 w-4" />
              New
            </button>
          </div>
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-128px)] xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-r border-[#e9e9e9] bg-white">
          <div className="divide-y divide-[#e9e9e9]">
            {institutionRows.map((row) => (
              <div key={row.name} className={`px-4 py-4 ${row.active ? "border-l-[3px] border-l-green bg-white" : "bg-white"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[22px] font-semibold tracking-[-0.03em] text-ink">{row.name}</div>
                    <div className="mt-1 text-sm text-ink-2">{row.subtitle}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {row.tags.map((tag) => (
                        <span key={tag} className="rounded-[4px] bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.04em] text-ink-3">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.04em] text-ink-2">{row.type}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="bg-[#fafafa] px-6 py-6 xl:px-6 xl:py-6">
          <div className="mx-auto max-w-[760px] rounded-[12px] bg-white px-6 py-6 shadow-card">
            <div className="flex items-center justify-between gap-4 border-b border-[#ededed] pb-4">
              <h2 className="text-[40px] font-bold tracking-[-0.04em] text-ink">Edit Institution</h2>
              <div className="flex items-center gap-4">
                <button className="text-sm text-ink-2">Cancel</button>
                <button className="rounded-[8px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] px-5 py-2.5 text-sm font-semibold text-white">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Institution Name</label>
                <input defaultValue="Apex Ventures" className="mt-2 h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Type</label>
                  <div className="relative mt-2">
                    <input defaultValue="Venture Capital" className="h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
                    <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Focus Area</label>
                  <input defaultValue="B2B SaaS" className="mt-2 h-9 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Website URL</label>
                <div className="mt-2 flex h-9 items-center gap-2 rounded-[6px] bg-surface px-3 text-sm text-ink">
                  <Link2 className="h-4 w-4 text-ink-2" />
                  https://apexventures.example.com
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Description / Notes</label>
                <textarea
                  defaultValue="Early-stage B2B SaaS focused fund. Recently raised fund III ($50M). Looking for technical founders."
                  className="mt-2 min-h-[112px] w-full rounded-[6px] bg-surface px-3 py-3 text-sm leading-6 text-ink outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 text-xs text-ink-2">
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                Last updated 2 hours ago by System
              </div>
              <button className="text-sm text-[#d11212]">Delete Record</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
