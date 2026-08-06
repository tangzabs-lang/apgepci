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
        className="w-40 field-input"
      />
      <button
        disabled={pending || !value}
        onClick={() =>
          startTransition(async () => {
            await addManualActual(forecastId, Number(value));
            setValue("");
          })
        }
        className="btn btn-primary"
      >
        Enregistrer la réalisation
      </button>
    </div>
  );
}
