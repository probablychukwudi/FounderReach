import { CheckCircle2, Database, Globe2, Mail, ShieldCheck } from "lucide-react";

const sourceRows = [
  {
    name: "HackList",
    status: "Seeded",
    detail: "Active hackathons, bounties, grants, programs, and jobs scraped into the initial graph.",
    scope: "Read public listings",
    icon: <Globe2 className="h-4 w-4 text-green" />,
  },
  {
    name: "Official program pages",
    status: "Verified",
    detail: "YC, Techstars, AWS, NSF, TechCrunch, Web Summit, Slush, Product Hunt, Hacker News.",
    scope: "Source links only",
    icon: <ShieldCheck className="h-4 w-4 text-green" />,
  },
  {
    name: "Community submissions",
    status: "Pending",
    detail: "Future queue for founder-submitted accelerators, events, fellowships, and campus hiring channels.",
    scope: "Review before publish",
    icon: <Mail className="h-4 w-4 text-[#8b5a00]" />,
  },
];

export default function PermissionsPage() {
  return (
    <div className="min-h-full bg-surface px-8 py-5 text-ink">
      <div className="mx-auto max-w-[900px]">
        <div className="border-b border-black/5 pb-5">
          <div className="flex items-center gap-2 text-[13px] text-green">
            <Database className="h-4 w-4" />
            Help & trust
          </div>
          <h1 className="mt-2 text-[30px] font-semibold tracking-normal">Source permissions</h1>
          <p className="mt-2 max-w-[680px] text-[14px] leading-6 text-ink-2">
            FounderReach is free-first and source-visible. Every resource should show where it came from and why a founder can trust it.
          </p>
        </div>

        <section className="mt-5 overflow-hidden rounded-[14px] border border-black/5 bg-white">
          {sourceRows.map((row, index) => (
            <div key={row.name} className={`flex gap-4 px-4 py-4 ${index !== sourceRows.length - 1 ? "border-b border-black/5" : ""}`}>
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-green-soft">{row.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[17px] font-semibold">{row.name}</h2>
                  <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1 text-[11px] text-green">{row.status}</span>
                </div>
                <p className="mt-2 text-[13px] leading-5 text-ink-2">{row.detail}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-[7px] bg-green-soft px-2 py-1 text-[12px] text-green">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {row.scope}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
