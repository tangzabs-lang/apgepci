"use client";

import { useState, useTransition } from "react";
import { addManualActual } from "@/lib/actions/forecasts";

export function ManualActualForm({ forecastId }: { forecastId: string }) {
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Valeur réalisée"
        className="field-input sm:w-40"
      />
      <button
        disabled={pending || !value}
        onClick={() =>
          startTransition(async () => {
            await addManualActual(forecastId, Number(value));
            setValue("");
          })
        }
        className="btn btn-primary w-full sm:w-auto"
      >
        Enregistrer la réalisation
      </button>
    </div>
  );
}
