"use client";

import Link from "next/link";
import { Bell, CalendarClock, Clock3, FileText, History, Shield, StickyNote, Users2 } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn } from "@/lib/utils";

type RailProps = {
  pathname: string;
};

const dashboardMatches = [
  { name: "MIT Media Lab", role: "Lab Director", tone: "success" },
  { name: "Stanford HAI", role: "Program Officer", tone: "warning" },
  { name: "NSF Grant Program", role: "Program Officer", tone: "neutral" },
  { name: "CMU Robotics", role: "Professor", tone: "success" },
];

const upcomingEvents = [
  {
    title: "Stanford HAI Follow-up",
    detail: "Today, 2:00 PM",
    tone: "success",
    icon: "/assets/figma/dashboard/avatar-profile.png",
  },
  {
    title: "CMU Robotics Interview",
    detail: "Oct 17, 10:00 AM",
    tone: "neutral",
    icon: "/assets/figma/dashboard/avatar-profile.png",
  },
  {
    title: "Grant Proposal Draft",
    detail: "Oct 20, EOD",
    tone: "neutral",
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

  return (
    <div className="space-y-6">
      <section className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
        <RailHeading title="Results" subtitle="Active Outreach" />
        <div className="mt-4 rounded-[8px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex items-start gap-3 px-4 py-4">
            <Users2 className="mt-0.5 h-4 w-4 text-green" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-ink">Match List</div>
              <div className="mt-3 space-y-3">
                {dashboardMatches.map((match) => (
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
        </div>
      </section>

      <section className="px-4">
        <RailHeading title="Activity Log" icon={History} />
        <div className="mt-4 space-y-4 border-l-2 border-[#dadada] pl-[18px]">
          {activity.slice(0, 3).map((item, index) => (
            <div key={item.id} className="relative">
              <StatusDot tone={index === 0 ? "success" : "neutral"} ring />
              <div className="absolute left-[-21px] top-1">
                <StatusDot tone={index === 0 ? "success" : "neutral"} ring />
              </div>
              <div className="text-sm font-medium text-ink">{item.action}</div>
              <div className="mt-1 text-xs text-ink-2">{item.timestamp}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4">
        <RailHeading title="Notes" icon={StickyNote} />
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="mt-3 min-h-[88px] w-full resize-none rounded-[8px] border border-[#e2e2e2] bg-white px-3 py-3 text-sm leading-6 text-ink outline-none"
        />
      </section>

      <section className="rounded-[8px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
        <RailHeading title="Awaiting Approval" icon={Users2} />
        <div className="mt-4 space-y-3">
          {[
            { name: "MIT Media Lab Email", tone: "warning" },
            { name: "Stanford HAI Email", tone: "warning" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-medium text-ink">{item.name}</span>
              <StatusDot tone={item.tone as "warning"} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PermissionsRail() {
  return (
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
  );
}

function ProfileRail() {
  return (
    <div className="space-y-8">
      <section>
        <RailHeading title="Security & Privacy" icon={Shield} />
        <div className="mt-4 rounded-[8px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(26,28,28,0.05)]">
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
        </div>
      </section>

      <section>
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
  );
}

function CalendarRail() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="font-display text-[20px] font-bold text-ink">Upcoming Events</h3>
        <div className="mt-4 space-y-3">
          {upcomingEvents.map((event, index) => (
            <div key={event.title} className={cn("rounded-[12px] bg-white px-4 py-3 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]", index === 0 && "border-l-[3px] border-green")}>
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

      <section>
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
  );
}

function InboxRail() {
  return (
    <div className="space-y-8">
      <section>
        <RailHeading title="Notification Settings" />
        <div className="mt-4 space-y-4">
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

      <section>
        <RailHeading title="Upcoming Deadlines" />
        <div className="mt-4 space-y-3">
          {inboxUpdates.map((item) => (
            <div key={item.title} className="rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
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
    <aside className="border-l border-[#dadada] bg-surface px-6 py-6 xl:min-h-[calc(100vh-64px)] xl:overflow-y-auto">
      {content}
    </aside>
  );
}
