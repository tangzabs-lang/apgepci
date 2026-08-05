"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MODULE_NAV } from "@/lib/modules";

export function Sidebar({ permissions }: { permissions: string[] }) {
  const pathname = usePathname();
  const permSet = new Set(permissions);

  const items = MODULE_NAV.filter(
    (item) => item.key === "dashboards" || permSet.has(`${item.key}:view`)
  );

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex">
      <div className="mb-6 px-2">
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">APGEPCI</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
