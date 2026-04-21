"use client";

import { create } from "zustand";
import { demoActivityLog } from "@/lib/demo-data";
import type { ActivityLogItem, AgentRun } from "@/types";

interface AppState {
  notes: string;
  latestRun?: AgentRun;
  activity: ActivityLogItem[];
  composer: string;
  setComposer: (value: string) => void;
  setNotes: (value: string) => void;
  setLatestRun: (run: AgentRun) => void;
  pushActivity: (item: ActivityLogItem) => void;
}

export const useAppStore = create<AppState>((set) => ({
  notes:
    "Prioritize institutions with active funding and founder-accessible operators. Keep drafts concise and reference live evidence.",
  latestRun: undefined,
  activity: demoActivityLog,
  composer: "",
  setComposer: (composer) => set({ composer }),
  setNotes: (notes) => set({ notes }),
  setLatestRun: (latestRun) => set({ latestRun }),
  pushActivity: (item) =>
    set((state) => ({
      activity: [item, ...state.activity].slice(0, 12),
    })),
}));
