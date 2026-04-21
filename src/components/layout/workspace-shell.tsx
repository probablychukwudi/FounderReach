"use client";

import { Header } from "@/components/layout/header";
import { SidebarLeft } from "@/components/layout/sidebar-left";
import { WorkspaceRightRail } from "@/components/layout/workspace-right-rail";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showRightRail = !pathname.startsWith("/data");

  return (
    <div className="min-h-screen bg-white xl:h-screen xl:overflow-hidden">
      <Header />
      <div
        className={cn(
          "flex flex-col xl:h-[calc(100vh-64px)] xl:grid xl:overflow-hidden",
          showRightRail ? "xl:grid-cols-shell" : "xl:grid-cols-[297px_minmax(0,1fr)]",
        )}
      >
        <SidebarLeft />
        <main className="min-w-0 bg-white xl:h-full xl:overflow-y-auto">{children}</main>
        {showRightRail ? <WorkspaceRightRail pathname={pathname} /> : null}
      </div>
    </div>
  );
}
