import { Linkedin, Mail, Search, Send, ShieldCheck } from "lucide-react";

const permissionSections = [
  {
    title: "Social & Professional Networks",
    rows: [
      {
        name: "LinkedIn API",
        status: "Active",
        subtitle: "Connected as alice@founderreach.com",
        scopes: ["Read", "Search", "Write (Post)"],
        usage: "Used by: Outreach Agent",
        icon: <Linkedin className="h-4 w-4 text-[#0a66c2]" />,
        enabled: true,
      },
      {
        name: "X (Twitter) v2",
        status: "Read Only",
        subtitle: "Not connected",
        scopes: [],
        usage: "No active agents",
        icon: <span className="text-sm font-bold text-ink">𝕏</span>,
        enabled: false,
      },
    ],
  },
  {
    title: "Communication & Scheduling",
    rows: [
      {
        name: "Google Workspace",
        status: "Active",
        subtitle: "Connected as team@founderreach.com",
        scopes: ["Read Mail", "Send Mail", "Manage Calendar"],
        usage: "Used by: Booking Agent, Outreach Agent",
        icon: <Mail className="h-4 w-4 text-[#ff5f56]" />,
        enabled: true,
      },
      {
        name: "Microsoft 365",
        status: "Full Access Required",
        subtitle: "Not connected",
        scopes: [],
        usage: "No active agents",
        icon: <Send className="h-4 w-4 text-[#3b82f6]" />,
        enabled: false,
      },
    ],
  },
];

export default function PermissionsPage() {
  return (
    <div className="px-6 py-8 xl:px-14 xl:py-8">
      <div className="max-w-[720px]">
        <div className="text-[14px] font-bold text-ink">Platform Permissions</div>
        <p className="mt-2 text-[18px] leading-[1.45] text-ink-2">
          Manage external integration access levels for your automated agents. Configure scopes and enable/disable connections.
        </p>
      </div>

      <div className="mt-10 max-w-[640px] space-y-8">
        {permissionSections.map((section) => (
          <section key={section.title}>
            <h2 className="border-b border-[#dadada] pb-3 text-[28px] font-bold tracking-[-0.03em] text-ink">{section.title}</h2>
            <div className="mt-3 overflow-hidden rounded-[12px] border border-[#dadada] bg-white">
              {section.rows.map((row, index) => (
                <div key={row.name} className={`flex items-start gap-4 px-5 py-5 ${index !== section.rows.length - 1 ? "border-b border-[#e9e9e9]" : ""}`}>
                  <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-[4px] border border-[#d9e3e8] bg-[#edf6ff]">
                    {row.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-[22px] font-semibold tracking-[-0.03em] text-ink">{row.name}</div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${row.status === "Active" ? "bg-[rgba(74,222,128,0.2)] text-green" : "bg-[#f3f3f4] text-ink-3"}`}>
                        {row.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-ink-2">{row.subtitle}</div>
                    {row.scopes.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {row.scopes.map((scope) => (
                          <span key={scope} className="rounded-[4px] bg-[#eef3ef] px-2 py-1 text-[11px] text-ink-2">
                            {scope}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-3 text-xs text-ink-2">{row.usage}</div>
                  </div>
                  <button
                    type="button"
                    className={`mt-2 flex h-6 w-10 items-center rounded-full p-0.5 ${row.enabled ? "bg-green" : "bg-[#d9d9d9]"}`}
                  >
                    <span className={`h-5 w-5 rounded-full bg-white transition ${row.enabled ? "translate-x-4" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
