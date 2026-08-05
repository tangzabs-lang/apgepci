"use client";

import { useActionState } from "react";
import { upsertSupplier } from "@/lib/actions/suppliers";
import type { ActionState } from "@/lib/actions/org";
import { TextField, TextAreaField, SubmitButton, FormError } from "@/components/form";

export function SupplierForm({
  companyId,
  defaultValues,
}: {
  companyId: string;
  defaultValues?: {
    id: string;
    code: string | null;
    name: string;
    address: string | null;
    products_supplied: string | null;
    conditions: string | null;
    lead_time_days: number | null;
    contacts: { phone?: string; email?: string } | null;
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertSupplier, undefined);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="grid grid-cols-2 gap-4">
        <TextField label="Code" name="code" defaultValue={defaultValues?.code ?? undefined} />
        <TextField
          label="Délai de livraison (jours)"
          name="lead_time_days"
          type="number"
          defaultValue={defaultValues?.lead_time_days ?? undefined}
        />
      </div>

      <TextField label="Raison sociale" name="name" required defaultValue={defaultValues?.name} />

      <div className="grid grid-cols-2 gap-4">
        <TextField label="Téléphone" name="phone" defaultValue={defaultValues?.contacts?.phone} />
        <TextField label="E-mail" name="email" type="email" defaultValue={defaultValues?.contacts?.email} />
      </div>

      <TextField label="Adresse" name="address" defaultValue={defaultValues?.address ?? undefined} />
      <TextAreaField
        label="Produits fournis"
        name="products_supplied"
        defaultValue={defaultValues?.products_supplied ?? undefined}
      />
      <TextAreaField label="Conditions" name="conditions" defaultValue={defaultValues?.conditions ?? undefined} />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
