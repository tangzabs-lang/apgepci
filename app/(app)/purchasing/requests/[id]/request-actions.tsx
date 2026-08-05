"use client";

import { useState, useTransition } from "react";
import {
  submitPurchaseRequest,
  decidePurchaseRequest,
  convertRequestToOrder,
} from "@/lib/actions/purchasing";

export function RequestActions({
  requestId,
  status,
  suppliers,
}: {
  requestId: string;
  status: string;
  suppliers: { id: string; name: string }[];
}) {
  const [pending, startTransition] = useTransition();
  const [supplierId, setSupplierId] = useState("");

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {status === "draft" && (
        <button
          disabled={pending}
          onClick={() => startTransition(() => submitPurchaseRequest(requestId))}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Soumettre
        </button>
      )}
      {status === "submitted" && (
        <>
          <button
            disabled={pending}
            onClick={() => startTransition(() => decidePurchaseRequest(requestId, "approved"))}
            className="rounded-md border border-green-300 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400"
          >
            Approuver
          </button>
          <button
            disabled={pending}
            onClick={() => startTransition(() => decidePurchaseRequest(requestId, "rejected"))}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400"
          >
            Rejeter
          </button>
        </>
      )}
      {status === "approved" && (
        <div className="flex items-center gap-2">
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="">Fournisseur...</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            disabled={pending || !supplierId}
            onClick={() =>
              startTransition(async () => {
                await convertRequestToOrder(requestId, supplierId);
              })
            }
            className="rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
          >
            Transformer en commande
          </button>
        </div>
      )}
    </div>
  );
}
