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
          className="btn btn-outline"
        >
          Soumettre
        </button>
      )}
      {status === "submitted" && (
        <>
          <button
            disabled={pending}
            onClick={() => startTransition(() => decidePurchaseRequest(requestId, "approved"))}
            className="rounded-md border border-green-300 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-50"
          >
            Approuver
          </button>
          <button
            disabled={pending}
            onClick={() => startTransition(() => decidePurchaseRequest(requestId, "rejected"))}
            className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
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
            className="field-input"
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
            className="btn btn-primary"
          >
            Transformer en commande
          </button>
        </div>
      )}
    </div>
  );
}
