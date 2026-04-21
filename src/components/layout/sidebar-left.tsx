"use client";

import Link from "next/link";
import { HelpCircle, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { StatusDot } from "@/components/ui/status-dot";
import { demoInstitutions, demoSources } from "@/lib/demo-data";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/calendar", label: "Calendar" },
  { href: "/inbox", label: "Inbox" },
  { href: "/data", label: "Data List" },
  { href: "/profile", label: "Profile" },
  { href: "/permissions", label: "Permissions" },
];

export function SidebarLeft() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-black/5 bg-white/55 px-4 py-5">
      <div className="space-y-6">
        <Card className="p-4">
          <div className="eyebrow">Active Platforms</div>
          <div className="mt-4 space-y-3">
            {demoSources.map((source) => (
              <div key={source.id} className="rounded-[18px] bg-surface px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-display text-sm font-bold text-ink">{source.label}</div>
                    <div className="mt-1 text-xs leading-5 text-ink-3">{source.subtitle}</div>
                  </div>
                  <StatusDot tone={source.active ? "success" : "neutral"} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="eyebrow">Institution List</div>
            <Link href="/permissions" className="text-xs font-semibold text-green">
              Edit what agents see
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {demoInstitutions.map((institution) => (
              <div key={institution.id} className="rounded-[18px] border border-black/6 bg-white px-3 py-3">
                <div className="font-display text-sm font-bold text-ink">{institution.name}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Chip>{institution.type.replace("_", " ")}</Chip>
                  <Chip tone="success">{institution.focus}</Chip>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-[18px] px-4 py-3 font-display text-sm font-semibold transition ${active ? "bg-ink text-white" : "bg-white/65 text-ink hover:bg-white"}`}
              >
                {item.label}
                {active ? <StatusDot tone="success" /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex gap-2 text-sm text-ink-3">
          <Link href="/profile" className="flex flex-1 items-center justify-center gap-2 rounded-[18px] bg-white/65 px-3 py-3">
            <Settings2 className="h-4 w-4" />
            Settings
          </Link>
          <Link href="/" className="flex flex-1 items-center justify-center gap-2 rounded-[18px] bg-white/65 px-3 py-3">
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
        </div>
      </div>
    </aside>
  );
}
