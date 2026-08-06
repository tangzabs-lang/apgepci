"use client";

import { useActionState } from "react";
import { upsertWarehouse } from "@/lib/actions/stock";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/form";

export function WarehouseForm({
  companyId,
  sites,
}: {
  companyId: string;
  sites: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertWarehouse, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      <TextField label="Nom" name="name" required />
      <SelectField
        label="Type"
        name="type"
        required
        defaultValue="magasin"
        options={[
          { value: "magasin", label: "Magasin" },
          { value: "depot", label: "Dépôt" },
          { value: "entrepot", label: "Entrepôt" },
          { value: "reserve", label: "Réserve" },
          { value: "emplacement", label: "Emplacement" },
          { value: "vehicule", label: "Véhicule" },
          { value: "temporaire", label: "Temporaire" },
        ]}
      />
      <SelectField label="Site" name="site_id" options={sites.map((s) => ({ value: s.id, label: s.name }))} />
      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
