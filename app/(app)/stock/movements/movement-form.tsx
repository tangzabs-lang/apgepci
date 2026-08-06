"use client";

import { useActionState } from "react";
import { createStockMovement } from "@/lib/actions/stock";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, TextAreaField, SubmitButton, FormError } from "@/components/form";

const MOVEMENT_TYPES = [
  { value: "entry", label: "Entrée" },
  { value: "exit", label: "Sortie" },
  { value: "transfer", label: "Transfert" },
  { value: "return", label: "Retour" },
  { value: "correction", label: "Correction" },
  { value: "loss", label: "Perte" },
  { value: "breakage", label: "Casse" },
  { value: "consumption", label: "Consommation" },
  { value: "production", label: "Production" },
  { value: "inventory", label: "Inventaire" },
];

export function MovementForm({
  companyId,
  warehouses,
  products,
}: {
  companyId: string;
  warehouses: { id: string; name: string }[];
  products: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(createStockMovement, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />

      <SelectField
        label="Entrepôt"
        name="warehouse_id"
        required
        options={warehouses.map((w) => ({ value: w.id, label: w.name }))}
      />
      <SelectField
        label="Article"
        name="product_id"
        required
        options={products.map((p) => ({ value: p.id, label: p.name }))}
      />
      <SelectField label="Type de mouvement" name="movement_type" required options={MOVEMENT_TYPES} />
      <TextField label="Quantité" name="quantity" type="number" step="0.001" required />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Numéro de lot" name="lot_number" />
        <TextField label="Date d'expiration" name="expiry_date" type="date" />
      </div>

      <TextAreaField label="Observations" name="notes" />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer le mouvement</SubmitButton>
    </form>
  );
}
