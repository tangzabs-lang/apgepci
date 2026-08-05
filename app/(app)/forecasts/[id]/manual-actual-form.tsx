"use client";

import { useState, useTransition } from "react";
import { addManualActual } from "@/lib/actions/forecasts";

export function ManualActualForm({ forecastId }: { forecastId: string }) {
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Valeur réalisée"
        className="w-40 rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
      />
      <button
        disabled={pending || !value}
        onClick={() =>
          startTransition(async () => {
            await addManualActual(forecastId, Number(value));
            setValue("");
          })
        }
        className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
      >
        Enregistrer la réalisation
      </button>
    </div>
  );
}
