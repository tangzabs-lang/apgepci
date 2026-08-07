"use client";

import { useSyncExternalStore } from "react";
import { Maximize, Minimize } from "lucide-react";

function subscribeToFullscreen(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

const noopSubscribe = () => () => {};

/**
 * Bascule plein écran. Le bouton disparaît si l'API n'est pas disponible
 * (Safari iOS, par exemple, n'autorise pas le plein écran sur le document).
 */
export function FullscreenToggle({ className = "" }: { className?: string }) {
  const active = useSyncExternalStore(
    subscribeToFullscreen,
    () => Boolean(document.fullscreenElement),
    () => false
  );
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => document.fullscreenEnabled,
    () => false
  );

  if (!supported) return null;

  async function toggle() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Refus du navigateur (politique de sécurité, geste utilisateur manquant) :
      // l'affichage reste simplement inchangé.
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
