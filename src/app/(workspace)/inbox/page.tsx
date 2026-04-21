import Image from "next/image";

const notifications = [
  {
    title: "Agent Match Complete",
    body: "Voxel-Bot 42 has successfully matched with a tier-1 lead in the architectural space. Review pipeline for next steps.",
    time: "10M AGO",
    icon: "/assets/figma/dashboard/avatar-voxel.png",
    highlight: true,
  },
  {
    title: "Outreach Campaign Started",
    body: "Sarah initiated the Q3 founders outreach sequence to 142 prospects.",
    time: "2H AGO",
    icon: "/assets/figma/dashboard/avatar-profile.png",
    highlight: false,
  },
  {
    title: "System Maintenance",
    body: "Scheduled database optimization completed successfully. No downtime reported.",
    time: "YESTERDAY",
    icon: "system",
    highlight: false,
  },
];

export default function InboxPage() {
  return (
    <div className="px-8 py-10 xl:px-8 xl:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[60px] font-black leading-[0.95] tracking-[-0.05em] text-ink">Inbox</h1>
          <p className="mt-3 text-base text-ink-2">You have 3 new updates requiring attention.</p>
        </div>
        <button className="text-xs font-bold uppercase tracking-[0.08em] text-green">Mark All Read</button>
      </div>

      <div className="mt-12 max-w-[760px] space-y-5">
        {notifications.map((item) => (
          <div
            key={item.title}
            className={`rounded-[12px] bg-white px-4 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${item.highlight ? "border-l-[3px] border-green" : ""}`}
          >
            <div className="flex gap-4">
              {item.icon === "system" ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-surface text-ink-2">⊟</div>
              ) : (
                <Image src={item.icon} alt="" width={36} height={36} className="h-9 w-9 rounded-[8px] object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[30px] font-semibold tracking-[-0.04em] text-ink">{item.title}</div>
                  <div className="pt-1 text-xs font-semibold uppercase tracking-[0.04em] text-ink-2">{item.time}</div>
                </div>
                <p className="mt-2 max-w-[560px] text-base leading-7 text-ink-2">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
