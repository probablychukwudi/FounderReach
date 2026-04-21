import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { demoInstitutions } from "@/lib/demo-data";

export default function DataPage() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-black/6 px-6 py-5">
        <div className="eyebrow">Data List</div>
        <h1 className="mt-3 text-[40px] font-black text-ink">Institutions</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-surface">
            <tr className="text-left font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Focus</th>
              <th className="px-6 py-4">Relevance</th>
              <th className="px-6 py-4">Stage</th>
              <th className="px-6 py-4">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {demoInstitutions.map((institution) => (
              <tr key={institution.id} className="border-t border-black/6 bg-white/80">
                <td className="px-6 py-5">
                  <div className="font-display text-base font-bold text-ink">{institution.name}</div>
                  <div className="mt-1 text-sm text-ink-3">{institution.location}</div>
                </td>
                <td className="px-6 py-5 text-sm text-ink-2">{institution.type}</td>
                <td className="px-6 py-5"><Chip tone="success">{institution.focus}</Chip></td>
                <td className="px-6 py-5 text-sm text-ink-2">{Math.round(institution.relevanceScore * 100)}%</td>
                <td className="px-6 py-5"><Chip>{institution.stage.replaceAll("_", " ")}</Chip></td>
                <td className="px-6 py-5 text-sm text-ink-2">{institution.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
