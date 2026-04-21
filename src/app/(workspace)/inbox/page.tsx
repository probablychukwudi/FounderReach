import { demoContacts, demoInstitutions, demoOutreach } from "@/lib/demo-data";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

export default function InboxPage() {
  const selectedThread = demoOutreach[0];
  const institution = demoInstitutions.find((item) => item.id === selectedThread.institutionId);
  const contact = demoContacts.find((item) => item.id === selectedThread.contactId);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
      <Card className="p-4">
        <div className="eyebrow">Inbox</div>
        <div className="mt-4 space-y-3">
          {demoOutreach.map((thread) => {
            const threadInstitution = demoInstitutions.find((item) => item.id === thread.institutionId);
            const threadContact = demoContacts.find((item) => item.id === thread.contactId);
            return (
              <div key={thread.id} className="rounded-[20px] bg-surface px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-display text-base font-bold text-ink">{threadInstitution?.name}</div>
                    <div className="mt-1 text-sm text-ink-3">{threadContact?.name}</div>
                  </div>
                  <Chip tone={thread.status === "pending_approval" ? "amber" : "success"}>{thread.status}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="eyebrow">Email Thread</div>
        <h1 className="mt-3 text-[36px] font-black text-ink">{institution?.name}</h1>
        <div className="mt-3 text-sm text-ink-3">{contact?.name} · {contact?.email}</div>
        <div className="mt-6 rounded-[24px] bg-surface px-5 py-5">
          <div className="font-display text-lg font-bold text-ink">{selectedThread.subject}</div>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-ink-2">{selectedThread.body}</p>
        </div>
      </Card>
    </div>
  );
}
