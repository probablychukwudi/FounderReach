"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { StatusDot } from "@/components/ui/status-dot";
import { demoBookings, demoContacts, demoInstitutions, demoOutreach } from "@/lib/demo-data";
import { useAppStore } from "@/lib/store/useAppStore";

export function SidebarRight() {
  const activity = useAppStore((state) => state.activity);
  const notes = useAppStore((state) => state.notes);
  const setNotes = useAppStore((state) => state.setNotes);

  return (
    <aside className="border-l border-black/5 bg-white/55 px-4 py-5">
      <div className="space-y-4">
        <Card className="p-4">
          <div className="eyebrow">Results</div>
          <div className="mt-4 space-y-3">
            {demoInstitutions.slice(0, 4).map((institution) => {
              const contact = demoContacts.find((item) => item.id === institution.primaryContactId);
              const booking = demoBookings.find((item) => item.institutionId === institution.id);
              return (
                <div key={institution.id} className="rounded-[18px] bg-surface px-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-sm font-bold text-ink">{institution.name}</div>
                      <div className="mt-1 text-xs leading-5 text-ink-3">
                        {contact?.role ?? "Primary contact"} · {institution.focus}
                      </div>
                    </div>
                    <StatusDot
                      tone={
                        booking?.status === "confirmed"
                          ? "success"
                          : institution.stage === "outreach_sent"
                            ? "warning"
                            : "neutral"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-4">
          <div className="eyebrow">Activity Log</div>
          <div className="mt-4 space-y-4">
            {activity.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="mt-1 flex flex-col items-center">
                  <StatusDot tone="success" />
                  <div className="mt-2 h-full w-px bg-sage/60" />
                </div>
                <div className="pb-3">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                    {item.timestamp}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-ink-2">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="eyebrow">Notes</div>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mt-4 min-h-[120px] w-full rounded-[18px] border border-black/6 bg-surface px-4 py-3 text-sm leading-6 text-ink outline-none"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="eyebrow">Awaiting Approval</div>
            <Link href="/inbox" className="text-xs font-semibold text-green">
              Open Inbox
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {demoOutreach
              .filter((item) => item.status === "pending_approval")
              .map((item) => {
                const institution = demoInstitutions.find((institutionItem) => institutionItem.id === item.institutionId);
                return (
                  <div key={item.id} className="rounded-[18px] bg-surface px-3 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-sm font-bold text-ink">{institution?.name}</div>
                        <div className="mt-1 text-xs text-ink-3">{item.subject}</div>
                      </div>
                      <Chip tone="amber">Pending</Chip>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        <Card className="p-4">
          <div className="eyebrow">Next Meeting</div>
          {demoBookings[0] ? (
            <div className="mt-4 rounded-[18px] bg-surface px-4 py-4">
              <div className="font-display text-base font-bold text-ink">{demoBookings[0].title}</div>
              <div className="mt-2 text-sm leading-6 text-ink-2">
                {format(new Date(demoBookings[0].scheduledAt), "EEEE, MMM d · h:mm a")}
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </aside>
  );
}
