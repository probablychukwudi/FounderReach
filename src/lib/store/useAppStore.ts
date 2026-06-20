"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { demoActivityLog, demoInstitutions, demoSources } from "@/lib/demo-data";
import { opportunities } from "@/lib/opportunities";
import type {
  ActivityLogItem,
  AgentRun,
  CalendarPreferences,
  FounderAccount,
  Institution,
  Opportunity,
  OpportunityCategory,
  Source,
} from "@/types";

interface AppState {
  notes: string;
  latestRun?: AgentRun;
  activity: ActivityLogItem[];
  composer: string;
  sources: Source[];
  institutions: Institution[];
  account?: FounderAccount;
  selectedInstitutionId: string;
  opportunities: Opportunity[];
  selectedOpportunityId: string;
  selectedCategory: OpportunityCategory | "all";
  opportunityQuery: string;
  savedOpportunityIds: string[];
  calendarPreferences: CalendarPreferences;
  setComposer: (value: string) => void;
  setNotes: (value: string) => void;
  setLatestRun: (run: AgentRun) => void;
  setAccount: (account: FounderAccount) => void;
  clearAccount: () => void;
  pushActivity: (item: ActivityLogItem) => void;
  setOpportunities: (items: Opportunity[]) => void;
  setSelectedInstitutionId: (institutionId: string) => void;
  setSelectedOpportunityId: (opportunityId: string) => void;
  setSelectedCategory: (category: OpportunityCategory | "all") => void;
  setOpportunityQuery: (query: string) => void;
  setSavedOpportunityIds: (opportunityIds: string[]) => void;
  toggleSavedOpportunity: (opportunityId: string) => void;
  setCalendarPreferences: (preferences: CalendarPreferences) => void;
  toggleSource: (sourceId: string) => void;
  addSource: () => void;
  updateInstitution: (institutionId: string, patch: Partial<Institution>) => void;
  addInstitution: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      notes:
        "Prioritize institutions with active funding and founder-accessible operators. Keep drafts concise and reference live evidence.",
      latestRun: undefined,
      activity: demoActivityLog,
      composer: "",
      sources: demoSources,
      institutions: demoInstitutions,
      account: undefined,
      selectedInstitutionId: demoInstitutions[0]?.id ?? "",
      opportunities,
      selectedOpportunityId: opportunities.find((item) => item.id === "qvac-edge-ai")?.id ?? opportunities[0]?.id ?? "",
      selectedCategory: "all",
      opportunityQuery: "",
      savedOpportunityIds: ["yc-fall-2026", "aws-activate", "product-hunt-launch"],
      calendarPreferences: {
        timezone: "America/New_York",
        defaultView: "month",
        digestFrequency: "weekly",
        savedDeadlineWindowDays: 14,
      },
      setComposer: (composer) => set({ composer }),
      setNotes: (notes) => set({ notes }),
      setLatestRun: (latestRun) => set({ latestRun }),
      setAccount: (account) => set({ account }),
      clearAccount: () => set({ account: undefined }),
      pushActivity: (item) =>
        set((state) => ({
          activity: [item, ...state.activity].slice(0, 12),
        })),
      setOpportunities: (nextOpportunities) =>
        set((state) => ({
          opportunities: nextOpportunities,
          selectedOpportunityId: nextOpportunities.some((item) => item.id === state.selectedOpportunityId)
            ? state.selectedOpportunityId
            : nextOpportunities[0]?.id ?? "",
        })),
      setSelectedInstitutionId: (selectedInstitutionId) => set({ selectedInstitutionId }),
      setSelectedOpportunityId: (selectedOpportunityId) => set({ selectedOpportunityId }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setOpportunityQuery: (opportunityQuery) => set({ opportunityQuery }),
      setSavedOpportunityIds: (savedOpportunityIds) => set({ savedOpportunityIds }),
      toggleSavedOpportunity: (opportunityId) =>
        set((state) => ({
          savedOpportunityIds: state.savedOpportunityIds.includes(opportunityId)
            ? state.savedOpportunityIds.filter((id) => id !== opportunityId)
            : [opportunityId, ...state.savedOpportunityIds],
        })),
      setCalendarPreferences: (calendarPreferences) => set({ calendarPreferences }),
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
    }),
    {
      name: "founderreach-workspace",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        account: state.account,
        notes: state.notes,
        composer: state.composer,
        selectedInstitutionId: state.selectedInstitutionId,
        selectedOpportunityId: state.selectedOpportunityId,
        selectedCategory: state.selectedCategory,
        opportunityQuery: state.opportunityQuery,
        savedOpportunityIds: state.savedOpportunityIds,
        calendarPreferences: state.calendarPreferences,
      }),
    },
  ),
);
