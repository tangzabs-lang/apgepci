"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "apgepci:sidebar-collapsed";

let listeners: (() => void)[] = [];

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

function getSnapshot() {
  return localStorage.getItem(KEY) === "1";
}

/** Toujours déplié au rendu serveur : localStorage n'y est pas lisible. */
function getServerSnapshot() {
  return false;
}

/** État replié de la barre latérale, mémorisé d'une session à l'autre. */
export function useSidebarCollapsed(): [boolean, () => void] {
  const collapsed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    localStorage.setItem(KEY, collapsed ? "0" : "1");
    for (const listener of listeners) listener();
  }, [collapsed]);

  return [collapsed, toggle];
}
