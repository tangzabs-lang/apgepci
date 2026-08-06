"use client";

import { useState, useTransition } from "react";
import { updateSaleStatus } from "@/lib/actions/sales";

const NEXT_STEPS: Record<string, { to: string; label: string }[]> = {
  draft: [{ to: "pending", label: "Soumettre" }, { to: "cancelled", label: "Annuler" }],
  pending: [{ to: "validated", label: "Valider" }, { to: "cancelled", label: "Rejeter" }],
  validated: [
    { to: "delivered", label: "Marquer livrée" },
    { to: "partially_delivered", label: "Livraison partielle" },
    { to: "cancelled", label: "Annuler" },
  ],
  partially_delivered: [{ to: "delivered", label: "Marquer livrée" }],
  delivered: [{ to: "closed", label: "Clôturer" }],
};

export function StatusActions({ saleId, status }: { saleId: string; status: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const steps = NEXT_STEPS[status] ?? [];

  if (steps.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {steps.map((step) => (
        <button
          key={step.to}
          disabled={pending}
          onClick={() => {
            const reason =
              step.to === "cancelled" ? window.prompt("Motif de l'annulation ?") ?? undefined : undefined;
            startTransition(async () => {
              const result = await updateSaleStatus(saleId, step.to, reason);
              if (result?.error) setError(result.error);
            });
          }}
          className="btn btn-outline"
        >
          {step.label}
        </button>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
