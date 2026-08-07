"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";

/** Avatar de l'utilisateur ouvrant un menu : identité et déconnexion. */
export function UserMenu({ userEmail }: { userEmail: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initials = userEmail.slice(0, 2).toUpperCase();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menu utilisateur"
        title={userEmail}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-blue-400 text-xs font-bold text-white transition-shadow hover:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] ${
          open ? "shadow-[0_0_0_4px_rgba(37,99,235,0.2)]" : ""
        }`}
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_20px_45px_-20px_rgba(15,23,42,0.35)]"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-400">
              Connecté en tant que
            </p>
            <p className="mt-1 truncate text-sm font-medium text-slate-700" title={userEmail}>
              {userEmail}
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              role="menuitem"
              className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Déconnexion
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
