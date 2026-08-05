"use client";

import { useActionState } from "react";
import { upsertProduct } from "@/lib/actions/catalog";
import type { ActionState } from "@/lib/actions/org";
import { TextField, TextAreaField, SelectField, SubmitButton, FormError } from "@/components/form";

export function ProductForm({
  companyId,
  categories,
  units,
  suppliers,
  defaultValues,
}: {
  companyId: string;
  categories: string[];
  units: string[];
  suppliers: { id: string; name: string }[];
  defaultValues?: {
    id: string;
    code: string | null;
    name: string;
    description: string | null;
    kind: string;
    purchase_price: number | null;
    cost: number | null;
    sale_price: number | null;
    tax_rate: number;
    primary_supplier_id: string | null;
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertProduct, undefined);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="grid grid-cols-2 gap-4">
        <TextField label="Code" name="code" defaultValue={defaultValues?.code ?? undefined} />
        <SelectField
          label="Type"
          name="kind"
          required
          defaultValue={defaultValues?.kind ?? "product"}
          options={[
            { value: "product", label: "Produit" },
            { value: "service", label: "Service" },
            { value: "market", label: "Marché" },
          ]}
        />
      </div>

      <TextField label="Désignation" name="name" required defaultValue={defaultValues?.name} />
      <TextAreaField label="Description" name="description" defaultValue={defaultValues?.description ?? undefined} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Catégorie</label>
          <input
            name="category_name"
            list="product-categories"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
          <datalist id="product-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Unité</label>
          <input
            name="unit_symbol"
            list="units"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            placeholder="pièce, kg, litre..."
          />
          <datalist id="units">
            {units.map((u) => (
              <option key={u} value={u} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Prix d'achat"
          name="purchase_price"
          type="number"
          step="0.01"
          defaultValue={defaultValues?.purchase_price ?? undefined}
        />
        <TextField label="Coût" name="cost" type="number" step="0.01" defaultValue={defaultValues?.cost ?? undefined} />
        <TextField
          label="Prix de vente"
          name="sale_price"
          type="number"
          step="0.01"
          defaultValue={defaultValues?.sale_price ?? undefined}
        />
      </div>

      <TextField
        label="Taux applicable (%)"
        name="tax_rate"
        type="number"
        step="0.01"
        defaultValue={defaultValues?.tax_rate ?? 0}
      />

      <SelectField
        label="Fournisseur principal"
        name="primary_supplier_id"
        defaultValue={defaultValues?.primary_supplier_id ?? undefined}
        options={suppliers.map((s) => ({ value: s.id, label: s.name }))}
      />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
