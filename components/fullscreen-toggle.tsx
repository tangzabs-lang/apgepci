"use client";

import { useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

/**
 * Bascule plein écran. Masqué si l'API n'est pas disponible (Safari iOS, par
 * exemple, n'autorise pas le plein écran sur le document).
 */
export function FullscreenToggle({ className = "" }: { className?: string }) {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setSupported(document.fullscreenEnabled);

    const onChange = () => setActive(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (!supported) return null;

  async function toggle() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Refus du navigateur (geste utilisateur manquant, politique de sécurité) :
      // rien à signaler, l'affichage reste inchangé.
    }
  }

  const label = active ? "Quitter le plein écran" : "Passer en plein écran";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:h-10 sm:w-10 ${className}`}
    >
      {active ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
    </button>
  );
}
