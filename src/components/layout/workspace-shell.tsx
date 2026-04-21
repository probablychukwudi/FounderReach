"use client";

import { Header } from "@/components/layout/header";
import { SidebarLeft } from "@/components/layout/sidebar-left";
import { SidebarRight } from "@/components/layout/sidebar-right";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 xl:grid-cols-shell">
        <SidebarLeft />
        <main className="min-w-0 px-5 py-5 lg:px-6">{children}</main>
        <SidebarRight />
      </div>
    </div>
  );
}
