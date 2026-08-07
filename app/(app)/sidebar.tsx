"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Boxes,
  Building2,
  ClipboardList,
  FileText,
  FolderKanban,
  Gauge,
  Headset,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Receipt,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  UsersRound,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import { MODULE_NAV } from "@/lib/modules";
import { Logo } from "@/components/logo";

const ICONS: Record<string, LucideIcon> = {
  dashboards: LayoutDashboard,
  org: Building2,
  clients: Users,
  catalog: Boxes,
  sales: ShoppingCart,
  expenses: Receipt,
  forecasts: Gauge,
  hr: UsersRound,
  purchasing: ClipboardList,
  stock: Warehouse,
  crm: Headset,
  projects: FolderKanban,
  logistics: Truck,
  reports: FileText,
  documents: FileText,
  audit: ShieldCheck,
  admin: Settings2,
};

/** Libellés courts pour la barre d'onglets mobile. */
const SHORT_LABELS: Record<string, string> = {
  dashboards: "Bord",
  sales: "Ventes",
  clients: "Clients",
  expenses: "Dépenses",
  stock: "Stock",
  purchasing: "Achats",
  crm: "CRM",
};

const GROUPS: { title: string; keys: string[] }[] = [
  { title: "Pilotage", keys: ["dashboards", "forecasts", "reports"] },
  { title: "Activité", keys: ["clients", "catalog", "sales", "crm", "projects"] },
  { title: "Opérations", keys: ["purchasing", "stock", "logistics", "expenses"] },
  { title: "Organisation", keys: ["org", "hr", "documents", "audit", "admin"] },
];

function useVisibleItems(permissions: string[]) {
  const permSet = new Set(permissions);
  return MODULE_NAV.filter(
    (item) => item.key === "dashboards" || permSet.has(`${item.key}:view`)
  );
}

function NavLink({
  item,
  isActive,
  collapsed,
  onNavigate,
}: {
  item: { key: string; href: string; label: string };
  isActive: boolean;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const Icon = ICONS[item.key] ?? Sparkles;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={`group relative flex items-center gap-3 rounded-md py-2.5 text-sm font-medium transition-all ${
        collapsed ? "justify-center px-0" : "px-3"
      } ${
        isActive
          ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.55)]"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm transition-colors ${
          isActive
            ? "bg-white/20 text-white"
            : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      {!collapsed && <span className="min-w-0 truncate">{item.label}</span>}
    </Link>
  );
}

function NavList({
  permissions,
  collapsed,
  onNavigate,
}: {
  permissions: string[];
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = useVisibleItems(permissions);
  const byKey = new Map(items.map((i) => [i.key, i]));

  return (
    <nav
      className={`flex flex-1 flex-col overflow-y-auto pb-4 ${
        collapsed ? "gap-3 px-2" : "gap-6 px-3"
      }`}
    >
      {GROUPS.map((group) => ({
        group,
        groupItems: group.keys.map((k) => byKey.get(k)).filter(Boolean) as typeof items,
      }))
        .filter(({ groupItems }) => groupItems.length > 0)
        .map(({ group, groupItems }, index) => (
          <div key={group.title}>
            {/* Replié : un filet remplace l'intitulé, illisible sur 4,5 rem. */}
            {collapsed ? (
              index > 0 && (
                <div aria-hidden className="mx-2 mb-3 border-t border-slate-200" />
              )
            ) : (
              <p className="px-3 pb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                {group.title}
              </p>
            )}
            <div className="flex flex-col gap-1">
              {groupItems.map((item) => (
                <NavLink
                  key={item.key}
                  item={item}
                  isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
    </nav>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link href="/dashboard" aria-label="APGEPCI — tableau de bord" className="inline-flex min-w-0">
      <Logo variant={collapsed ? "mark" : "lockup"} height={collapsed ? 36 : 30} priority />
    </Link>
  );
}

export function Sidebar({
  permissions,
  collapsed,
  onToggle,
}: {
  permissions: string[];
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-slate-200 bg-white py-5 transition-[width] duration-200 lg:flex ${
        collapsed ? "w-18" : "w-60"
      }`}
    >
      <div
        className={`flex items-center gap-2 px-3 pb-6 ${
          collapsed ? "flex-col" : "justify-between"
        }`}
      >
        <Brand collapsed={collapsed} />
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
          title={collapsed ? "Déplier le menu" : "Replier le menu"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>
      <NavList permissions={permissions} collapsed={collapsed} />
    </aside>
  );
}

function Drawer({
  permissions,
  onClose,
}: {
  permissions: string[];
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Rendu hors du header : son backdrop-filter crée un bloc conteneur qui
  // piégerait le tiroir « fixed » à l'intérieur de la barre supérieure.
  return createPortal(
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-white py-5 shadow-2xl">
        <div className="flex items-center justify-between pb-6 pr-3">
          <Brand />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <NavList permissions={permissions} onNavigate={onClose} />
      </div>
    </div>,
    document.body
  );
}

/** Bouton hamburger de la barre supérieure (mobile et tablette). */
export function MobileNav({ permissions }: { permissions: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-200 hover:text-blue-600 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && <Drawer permissions={permissions} onClose={() => setOpen(false)} />}
    </>
  );
}

/** Barre d'onglets basse : accès en un pouce aux modules les plus utilisés. */
export function MobileTabBar({ permissions }: { permissions: string[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = useVisibleItems(permissions);

  // Quatre raccourcis prioritaires parmi ceux autorisés, puis le menu complet.
  const preferred = ["dashboards", "sales", "clients", "expenses", "stock", "purchasing", "crm"];
  const byKey = new Map(items.map((i) => [i.key, i]));
  const tabs = preferred
    .map((k) => byKey.get(k))
    .filter(Boolean)
    .slice(0, 4) as typeof items;

  return (
    <>
      <nav className="tabbar" aria-label="Navigation principale">
        {tabs.map((item) => {
          const Icon = ICONS[item.key] ?? Sparkles;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.key}
              href={item.href}
              data-active={isActive}
              aria-current={isActive ? "page" : undefined}
              className="tabbar-item"
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{SHORT_LABELS[item.key] ?? item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="tabbar-item"
          aria-label="Tous les modules"
        >
          <Menu className="h-5 w-5 shrink-0" />
          <span>Menu</span>
        </button>
      </nav>

      {open && <Drawer permissions={permissions} onClose={() => setOpen(false)} />}
    </>
  );
}
