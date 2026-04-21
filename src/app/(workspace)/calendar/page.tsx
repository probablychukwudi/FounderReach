const tabs = ["Venture Capital", "Research Partners", "Schedule & Milestones", "Talent"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = Array.from({ length: 35 }, (_, index) => index + 1);

const eventLookup: Record<number, { label: string; tone: "green" | "pink" | "black"; marker?: boolean }> = {
  5: { label: "Outreach: MIT Med...", tone: "green" },
  9: { label: "Grant Deadline: NSF", tone: "pink" },
  11: { label: "Follow-up: Stanford", tone: "green", marker: true },
  17: { label: "Candidate Interview", tone: "black" },
};

export default function CalendarPage() {
  return (
    <div className="px-6 py-6 xl:px-6 xl:py-4">
      <div className="flex flex-wrap items-center gap-6 border-b border-[#e2e2e2] pb-3">
        <h1 className="text-[18px] font-bold text-ink">Calendar</h1>
        <div className="flex flex-wrap gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-3 text-sm font-medium ${tab === "Schedule & Milestones" ? "border-b-2 border-green text-green" : "text-ink-2"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[12px] bg-white shadow-card">
        <div className="flex flex-col gap-4 border-b border-[#ededed] px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[14px] font-bold text-ink">October 2023</div>
            <button className="text-ink-2">‹</button>
            <button className="text-sm text-ink-2">Today</button>
            <button className="text-ink-2">›</button>
          </div>
          <div className="flex items-center gap-2 rounded-[8px] bg-surface px-2 py-1">
            {["Month", "Week", "Day"].map((mode, index) => (
              <button key={mode} className={`rounded-[6px] px-3 py-1 text-xs ${index === 0 ? "bg-white text-ink shadow-[0px_1px_2px_rgba(0,0,0,0.05)]" : "text-ink-2"}`}>
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-[#ededed] text-center text-[11px] font-medium uppercase tracking-[0.05em] text-ink-2">
          {weekDays.map((day) => (
            <div key={day} className="border-r border-[#ededed] px-2 py-3 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day) => {
            const event = eventLookup[day];
            return (
              <div key={day} className="relative h-[104px] border-b border-r border-[#ededed] px-2 py-2 last:border-r-0">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${event?.marker ? "bg-green text-white" : "text-ink-2"}`}>
                  {day}
                </div>
                {event ? (
                  <div
                    className={`mt-3 rounded-[4px] px-2 py-1 text-[10px] font-medium ${
                      event.tone === "green"
                        ? "border border-[#62d091] bg-[#e7fbef] text-green"
                        : event.tone === "pink"
                          ? "bg-[#ffe0e0] text-[#b42318]"
                          : "bg-[#2d2d2d] text-white"
                    }`}
                  >
                    {event.label}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
