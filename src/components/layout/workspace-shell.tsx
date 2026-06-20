"use client";

import { AuthStateBridge } from "@/components/auth/auth-state-bridge";
import { SidebarLeft } from "@/components/layout/sidebar-left";
import { OpportunityHydrator } from "@/components/opportunities/opportunity-hydrator";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-ink xl:grid xl:h-screen xl:grid-cols-[288px_minmax(0,1fr)] xl:overflow-hidden">
      <AuthStateBridge />
      <OpportunityHydrator />
      <SidebarLeft />
      <main className="min-w-0 bg-surface xl:h-screen xl:overflow-y-auto">{children}</main>
    </div>
  );
}
