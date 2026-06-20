"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import { AuthStateBridge } from "@/components/auth/auth-state-bridge";
import { SidebarLeft } from "@/components/layout/sidebar-left";
import { OpportunityHydrator } from "@/components/opportunities/opportunity-hydrator";
import { cn } from "@/lib/utils";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    };
    const originalOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-surface text-ink xl:grid xl:h-screen xl:grid-cols-[288px_minmax(0,1fr)] xl:overflow-hidden">
      <AuthStateBridge />
      <OpportunityHydrator />
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#dadada] bg-surface/95 px-3 backdrop-blur xl:hidden">
        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-black/10 bg-white text-ink transition hover:bg-[#f7f4eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/35"
        >
          <Menu aria-hidden="true" className="h-5 w-5" />
        </button>
        <FounderReachLogo compact wordmarkClassName="font-semibold tracking-normal text-ink" />
        <div aria-hidden="true" className="h-10 w-10" />
      </header>

      <div
        aria-hidden={!mobileSidebarOpen}
        className={cn(
          "fixed inset-0 z-50 xl:hidden",
          mobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/30 transition-opacity duration-200",
            mobileSidebarOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-label="FounderReach navigation"
          aria-modal="true"
          className={cn(
            "absolute left-0 top-0 h-full w-[min(86vw,320px)] transform bg-surface shadow-[18px_0_42px_rgba(15,19,17,0.18)] transition-transform duration-200 ease-out",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-12 items-center justify-between border-b border-black/5 px-3">
            <span className="text-[13px] font-medium text-ink-2">Navigate</span>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] text-ink-3 transition hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/35"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <SidebarLeft
            className="h-[calc(100%-48px)] border-r-0"
            onNavigate={() => setMobileSidebarOpen(false)}
          />
        </div>
      </div>

      <SidebarLeft className="hidden xl:block" />
      <main className="min-w-0 bg-surface xl:h-screen xl:overflow-y-auto">{children}</main>
    </div>
  );
}
