import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { demoBookings, demoContacts, demoInstitutions } from "@/lib/demo-data";

const days = Array.from({ length: 35 }, (_, index) => index + 1);

export default function CalendarPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-6">
        <div className="eyebrow">Calendar</div>
        <h1 className="mt-3 text-[44px] font-black text-ink">Upcoming FounderReach meetings</h1>
        <div className="mt-8 grid grid-cols-7 gap-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="pb-2">
              {day}
            </div>
          ))}
          {days.map((day) => {
            const highlighted = [24, 28].includes(day);
            return (
              <div
                key={day}
                className={`flex aspect-square items-center justify-center rounded-[18px] text-sm ${highlighted ? "bg-green text-white" : "bg-white/70 text-ink"}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="eyebrow">Upcoming Bookings</div>
        <div className="mt-5 space-y-4">
          {demoBookings.map((booking) => {
            const institution = demoInstitutions.find((item) => item.id === booking.institutionId);
            const contact = demoContacts.find((item) => item.id === booking.contactId);
            return (
              <div key={booking.id} className="rounded-[22px] bg-surface px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-display text-lg font-bold text-ink">{institution?.name}</div>
                    <div className="mt-1 text-sm text-ink-3">{contact?.name} · {contact?.role}</div>
                  </div>
                  <Chip tone={booking.status === "confirmed" ? "success" : "amber"}>{booking.status}</Chip>
                </div>
                <div className="mt-4 text-sm leading-7 text-ink-2">
                  {format(new Date(booking.scheduledAt), "EEEE, MMM d · h:mm a")}
                </div>
                <a href={booking.meetingLink} className="mt-3 inline-flex text-sm font-semibold text-green">
                  Open meeting link
                </a>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
