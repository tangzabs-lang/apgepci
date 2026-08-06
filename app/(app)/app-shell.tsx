"use client";

import { Sidebar } from "./sidebar";
import { useSidebarCollapsed } from "./use-sidebar-collapsed";

/**
 * Assemble la barre latérale fixe et la colonne de contenu. Le décalage à
 * gauche compense la largeur de la barre, sortie du flux.
 */
export function AppShell({
  permissions,
  children,
}: {
  permissions: string[];
  children: React.ReactNode;
}) {
  const [collapsed, toggle] = useSidebarCollapsed();

  return (
    <>
      <Sidebar permissions={permissions} collapsed={collapsed} onToggle={toggle} />
      <div
        className={`flex min-w-0 flex-1 flex-col transition-[padding] duration-200 ${
          collapsed ? "lg:pl-18" : "lg:pl-60"
        }`}
      >
        {children}
      </div>
    </>
  );
}
