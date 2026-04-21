"use client";

import { create } from "zustand";
import { demoActivityLog, demoInstitutions, demoSources } from "@/lib/demo-data";
import type { ActivityLogItem, AgentRun, Institution, Source } from "@/types";

interface AppState {
  notes: string;
  latestRun?: AgentRun;
  activity: ActivityLogItem[];
  composer: string;
  sources: Source[];
  institutions: Institution[];
  selectedInstitutionId: string;
  setComposer: (value: string) => void;
  setNotes: (value: string) => void;
  setLatestRun: (run: AgentRun) => void;
  pushActivity: (item: ActivityLogItem) => void;
  setSelectedInstitutionId: (institutionId: string) => void;
  toggleSource: (sourceId: string) => void;
  addSource: () => void;
  updateInstitution: (institutionId: string, patch: Partial<Institution>) => void;
  addInstitution: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  notes:
    "Prioritize institutions with active funding and founder-accessible operators. Keep drafts concise and reference live evidence.",
  latestRun: undefined,
  activity: demoActivityLog,
  composer: "",
  sources: demoSources,
  institutions: demoInstitutions,
  selectedInstitutionId: demoInstitutions[0]?.id ?? "",
  setComposer: (composer) => set({ composer }),
  setNotes: (notes) => set({ notes }),
  setLatestRun: (latestRun) => set({ latestRun }),
  pushActivity: (item) =>
    set((state) => ({
      activity: [item, ...state.activity].slice(0, 12),
    })),
  setSelectedInstitutionId: (selectedInstitutionId) => set({ selectedInstitutionId }),
  toggleSource: (sourceId) =>
    set((state) => ({
      sources: state.sources.map((source) =>
        source.id === sourceId ? { ...source, active: !source.active } : source,
      ),
    })),
  addSource: () =>
    set((state) => {
      const count = state.sources.filter((source) => source.platform === "custom").length + 1;
      return {
        sources: [
          ...state.sources,
          {
            id: `source-custom-${count}`,
            platform: "custom",
            label: `Custom Source ${count}`,
            subtitle: "User-added website or directory",
            active: false,
            url: "https://example.com",
            useCase: "Add a niche research, grant, or operator surface specific to your thesis.",
          },
        ],
      };
    }),
  updateInstitution: (institutionId, patch) =>
    set((state) => ({
      institutions: state.institutions.map((institution) =>
        institution.id === institutionId ? { ...institution, ...patch } : institution,
      ),
    })),
  addInstitution: () =>
    set((state) => {
      const nextId = `institution-custom-${state.institutions.length + 1}`;
      return {
        institutions: [
          {
            id: nextId,
            sourceId: state.sources[0]?.id ?? "source-custom-1",
            name: "New Institution",
            type: "research_lab",
            focus: "New Focus",
            description: "Add a new institution, partner, or grant target to the list.",
            website: "https://example.com",
            location: "Remote",
            relevanceScore: 0.72,
            fundingRecency: "recent",
            collaborationHistory: false,
            stage: "matched",
            primaryContactId: "",
            lastActivity: "Added manually",
          },
          ...state.institutions,
        ],
        selectedInstitutionId: nextId,
      };
    }),
}));
