"use client";

import { useActionState, useState } from "react";
import { createPurchaseRequest } from "@/lib/actions/purchasing";
import type { ActionState } from "@/lib/actions/org";
import { SelectField, TextField, SubmitButton, FormError } from "@/components/form";

type Line = { product_id: string; quantity: number; need_description: string };

export function RequestForm({
  companyId,
  orgUnits,
  products,
}: {
  companyId: string;
  orgUnits: { id: string; name: string }[];
  products: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(createPurchaseRequest, undefined);
  const [lines, setLines] = useState<Line[]>([{ product_id: "", quantity: 1, need_description: "" }]);

  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <input type="hidden" name="company_id" value={companyId} />
      <input
        type="hidden"
        name="lines_json"
        value={JSON.stringify(lines.filter((l) => l.product_id))}
      />

      <div className="grid grid-cols-3 gap-4">
        <SelectField
          label="Service demandeur"
          name="org_unit_id"
          options={orgUnits.map((o) => ({ value: o.id, label: o.name }))}
        />
        <SelectField
          label="Urgence"
          name="urgency"
          required
          defaultValue="normal"
          options={[
            { value: "low", label: "Faible" },
            { value: "normal", label: "Normale" },
            { value: "high", label: "Haute" },
            { value: "urgent", label: "Urgente" },
          ]}
        />
        <TextField label="Date souhaitée" name="needed_date" type="date" />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Articles</label>
        <div className="mt-2 flex flex-col gap-2">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <select
                value={line.product_id}
                onChange={(e) =>
                  setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, product_id: e.target.value } : l)))
                }
                className="flex-1 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                <option value="">Article...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                value={line.quantity}
                onChange={(e) =>
                  setLines((prev) =>
                    prev.map((l, idx) => (idx === i ? { ...l, quantity: Number(e.target.value) } : l))
                  )
                }
                className="w-24 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
              <button
                type="button"
                onClick={() => setLines((prev) => prev.filter((_, idx) => idx !== i))}
                className="text-sm text-red-600 hover:underline dark:text-red-400"
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLines((prev) => [...prev, { product_id: "", quantity: 1, need_description: "" }])}
          className="mt-2 text-sm font-medium text-zinc-900 underline dark:text-zinc-50"
        >
          + Ajouter un article
        </button>
      </div>

      <FormError message={state?.error} />
      <SubmitButton>Créer la demande</SubmitButton>
    </form>
  );
}
