"use client";

import Link from "next/link";
import { Bell, CalendarClock, Clock3, FileText, History, Shield, StickyNote, Users2 } from "lucide-react";
import { demoOutreach } from "@/lib/demo-data";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn, formatScore } from "@/lib/utils";

type RailProps = {
  pathname: string;
};

const upcomingEvents = [
  {
    title: "Stanford HAI Follow-up",
    detail: "Today, 2:00 PM",
    icon: "/assets/figma/dashboard/avatar-profile.png",
  },
  {
    title: "CMU Robotics Interview",
    detail: "Oct 17, 10:00 AM",
    icon: "/assets/figma/dashboard/avatar-profile.png",
  },
  {
    title: "Grant Proposal Draft",
    detail: "Oct 20, EOD",
    icon: "file",
  },
];

const systemActivity = [
  { title: "Logged in", subtitle: "Today, 09:41 AM", meta: "Mac OS, Chrome", tone: "success" },
  { title: "Updated Startup Profile", subtitle: "Yesterday, 04:20 PM", tone: "neutral" },
  { title: "Connected LinkedIn", subtitle: "Oct 12, 11:05 AM", tone: "neutral" },
];

const inboxUpdates = [
  {
    title: "Q3 Report Submission",
    detail: "Today, 5:00 PM",
    subdetail: "Client Sync: Alpha Tomorrow, 10:00 AM",
  },
];

function StatusDot({ tone = "neutral", ring = false }: { tone?: "success" | "warning" | "neutral"; ring?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-2.5 w-2.5 rounded-full",
        tone === "success" && "bg-green-dot",
        tone === "warning" && "bg-amber",
        tone === "neutral" && "bg-[#c6c6c6]",
        ring && "shadow-[0_0_0_4px_#eeeeee]",
      )}
    />
  );
}

function RailHeading({
  title,
  subtitle,
  icon: Icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-3.5 w-3.5 text-ink-3" /> : null}
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.06em] text-ink-2">{title}</h3>
        </div>
        {action}
      </div>
      {subtitle ? <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">{subtitle}</p> : null}
    </div>
  );
}

function DashboardRail() {
  const activity = useAppStore((state) => state.activity);
  const notes = useAppStore((state) => state.notes);
  const setNotes = useAppStore((state) => state.setNotes);
  const institutions = useAppStore((state) => state.institutions);
  const awaitingApproval = demoOutreach.slice(0, 2);
  const matchList = institutions.slice(0, 4).map((institution) => ({
    name: institution.name,
    role:
      institution.stage === "booked"
        ? "Booked"
        : institution.stage === "outreach_drafted"
          ? "Needs approval"
          : institution.stage === "outreach_sent"
            ? "Contacted"
            : "Matched",
    tone:
      institution.stage === "booked"
        ? "success"
        : institution.stage === "outreach_drafted"
          ? "warning"
          : institution.stage === "outreach_sent"
            ? "neutral"
            : "success",
  }));

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-black/5 px-4 pb-4 pt-4">
        <RailHeading title="Results" subtitle="Active Outreach" />
      </div>

      <div className="scrollbar-none flex-1 space-y-5 overflow-y-auto px-4 py-4">
        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex items-start gap-3">
            <Users2 className="mt-0.5 h-4 w-4 text-green" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-ink">Match List</div>
              <div className="mt-3 space-y-3">
                {matchList.map((match) => (
                  <div key={match.name} className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-medium leading-[16.5px] text-ink">{match.name}</div>
                      <div className="text-[11px] leading-[16.5px] text-ink-2">{match.role}</div>
                    </div>
                    <StatusDot tone={match.tone as "success" | "warning" | "neutral"} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <RailHeading title="Activity Log" icon={History} />
          <div className="mt-4 space-y-4 border-l border-[#dadada] pl-[18px]">
            {activity.slice(0, 4).map((item, index) => (
              <div key={item.id} className="relative">
                <div className="absolute left-[-21px] top-1">
                  <StatusDot tone={index === 0 ? "success" : "neutral"} ring />
                </div>
                <div className="text-[10px] uppercase tracking-[0.08em] text-ink-3">{item.timestamp}</div>
                <div className="mt-1 text-[11px] leading-[16.5px] text-ink-2">{item.action}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <RailHeading title="Notes" icon={StickyNote} />
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mt-3 min-h-[112px] w-full resize-none rounded-[8px] border border-[#e2e2e2] bg-[#f8f7f4] px-3 py-3 text-sm leading-6 text-ink outline-none"
          />
        </section>

        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <RailHeading title="Awaiting Approval" icon={Users2} />
          <div className="mt-4 space-y-3">
            {awaitingApproval.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[11px] font-medium text-ink">{item.subject}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.08em] text-ink-3">
                    {formatScore(
                      institutions.find((institution) => institution.id === item.institutionId)?.relevanceScore ?? 0.8,
                    )}{" "}
                    fit
                  </div>
                </div>
                <StatusDot tone="warning" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function PermissionsRail() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-black/5 px-4 pb-4 pt-4">
        <RailHeading title="Permissions" subtitle="Connection Health" icon={Shield} />
      </div>
      <div className="scrollbar-none flex-1 overflow-y-auto px-4 py-4">
        <div className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#d4f2dd] bg-[#f0fdf4]">
            <Shield className="h-4 w-4 text-green" />
          </div>
          <h2 className="mt-6 font-display text-[14px] font-bold text-ink">Connection Health</h2>
          <p className="mt-2 text-xs leading-5 text-ink-2">
            Real-time status of your active API integrations and rate limits.
          </p>
          <div className="mt-6 space-y-4">
            {[
              ["LinkedIn API", "98% uptime", "success"],
              ["Google Workspace", "100% uptime", "success"],
              ["X (Twitter) v2", "Offline", "neutral"],
            ].map(([label, value, tone]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <StatusDot tone={tone as "success" | "neutral"} />
                  <span className="text-xs font-medium text-ink">{label}</span>
                </div>
                <span className="text-[11px] text-ink-2">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-[#e2e2e2] pt-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-2">Daily Rate Limits</div>
            <div className="mt-3 space-y-4">
              {[
                ["LinkedIn Search", "142 / 300", 0.47],
                ["Gmail Sends", "45 / 500", 0.09],
              ].map(([label, value, progress]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-[11px] text-ink">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#e8e8e8]">
                    <div className="h-1.5 rounded-full bg-green" style={{ width: `${Number(progress) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileRail() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-black/5 px-4 pb-4 pt-4">
        <RailHeading title="Profile" subtitle="Security & Privacy" icon={Shield} />
      </div>
      <div className="scrollbar-none flex-1 space-y-6 overflow-y-auto px-4 py-4">
        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(26,28,28,0.05)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink">2FA Status</span>
              <span className="rounded-full bg-[rgba(74,222,128,0.2)] px-2 py-0.5 text-xs font-semibold text-ink">Enabled</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink">Password</span>
              <button className="text-xs font-semibold text-green">Update</button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink">Sessions</span>
              <span className="text-xs text-ink-2">2 Active</span>
            </div>
          </div>
        </section>

        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(26,28,28,0.05)]">
          <RailHeading title="System Activity" icon={Clock3} />
          <div className="mt-4 space-y-6 border-l-2 border-[#dadada] pl-[18px]">
            {systemActivity.map((item, index) => (
              <div key={item.title} className="relative">
                <div className="absolute left-[-21px] top-1">
                  <StatusDot tone={index === 0 ? "success" : "neutral"} ring />
                </div>
                <div className="text-sm font-medium text-ink">{item.title}</div>
                <div className="text-xs text-ink-2">{item.subtitle}</div>
                {item.meta ? <div className="mt-1 text-xs text-ink-2">{item.meta}</div> : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CalendarRail() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-black/5 px-4 pb-4 pt-4">
        <RailHeading title="Calendar" subtitle="Upcoming Events" icon={CalendarClock} />
      </div>
      <div className="scrollbar-none flex-1 space-y-6 overflow-y-auto px-4 py-4">
        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={event.title} className={cn("rounded-[12px] bg-[#f8f7f4] px-4 py-3", index === 0 && "border-l-[3px] border-green")}>
                <div className="flex items-center gap-3">
                  {event.icon === "file" ? (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f3f4]">
                      <FileText className="h-4 w-4 text-ink-3" />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={event.icon} alt="" className="h-9 w-9 rounded-full object-cover" />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-ink">{event.title}</div>
                    <div className="mt-1 text-[11px] text-ink-2">{event.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <RailHeading title="Activity Log" action={<Link href="/inbox" className="text-[11px] font-semibold text-ink-2">View All</Link>} />
          <div className="mt-4 space-y-4">
            {[
              "Event updated: Stanford HAI moved to 2:00 PM",
              "New event added: CMU Robotics Interview",
            ].map((item, index) => (
              <div key={item} className="flex gap-3">
                <div className="pt-1">
                  <StatusDot tone={index === 0 ? "success" : "neutral"} />
                </div>
                <div>
                  <div className="text-sm leading-5 text-ink">{item}</div>
                  <div className="mt-1 text-xs text-ink-2">{index === 0 ? "10 mins ago" : "2 hours ago"}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function InboxRail() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-black/5 px-4 pb-4 pt-4">
        <RailHeading title="Inbox" subtitle="Notification Settings" icon={Bell} />
      </div>
      <div className="scrollbar-none flex-1 space-y-6 overflow-y-auto px-4 py-4">
        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="space-y-4">
            {[
              ["Email Digests", true],
              ["Push Alerts", false],
              ["In-App Mentions", true],
            ].map(([label, enabled]) => (
              <div key={label as string} className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink-2">{label}</span>
                <span className={cn("flex h-5 w-8 items-center rounded-full p-0.5", enabled ? "bg-green" : "bg-[#d9d9d9]")}>
                  <span className={cn("h-4 w-4 rounded-full bg-white transition", enabled ? "translate-x-3" : "")} />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <RailHeading title="Upcoming Deadlines" />
          <div className="mt-4 space-y-3">
            {inboxUpdates.map((item) => (
              <div key={item.title} className="rounded-[12px] bg-[#f8f7f4] px-4 py-4">
                <div className="border-l-[3px] border-green pl-3">
                  <div className="text-xs font-semibold text-ink">{item.title}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-green">{item.detail}</div>
                  <div className="mt-2 text-[11px] text-ink-2">{item.subdetail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function WorkspaceRightRail({ pathname }: RailProps) {
  const content =
    pathname.startsWith("/permissions") ? (
      <PermissionsRail />
    ) : pathname.startsWith("/profile") ? (
      <ProfileRail />
    ) : pathname.startsWith("/calendar") ? (
      <CalendarRail />
    ) : pathname.startsWith("/inbox") ? (
      <InboxRail />
    ) : pathname.startsWith("/data") ? null : (
      <DashboardRail />
    );

  if (!content) return null;

  return (
    <aside className="border-l border-[#dadada] bg-surface px-4 py-5 xl:h-full xl:min-h-0 xl:overflow-hidden xl:px-5">
      <div className="mx-auto flex h-full max-w-[220px] min-h-0 flex-col rounded-[18px] border border-black/5 bg-[#f4efe8] shadow-[0px_8px_30px_rgba(15,19,17,0.06)]">
        {content}
      </div>
    </aside>
  );
}
