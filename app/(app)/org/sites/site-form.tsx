"use client";

import { useActionState } from "react";
import { upsertSite, type ActionState } from "@/lib/actions/org";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/form";

const TYPE_OPTIONS = [
  { value: "siege", label: "Siège" },
  { value: "agence", label: "Agence" },
  { value: "magasin", label: "Magasin" },
  { value: "entrepot", label: "Entrepôt" },
  { value: "atelier", label: "Atelier" },
  { value: "etablissement", label: "Établissement" },
  { value: "autre", label: "Autre" },
];

export function SiteForm({
  companyId,
  defaultValues,
}: {
  companyId: string;
  defaultValues?: {
    id: string;
    name: string;
    code: string | null;
    type: string;
    country: string | null;
    city: string | null;
    address: string | null;
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertSite, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <TextField label="Nom" name="name" required defaultValue={defaultValues?.name} />
      <TextField label="Code" name="code" defaultValue={defaultValues?.code ?? undefined} />
      <SelectField
        label="Type"
        name="type"
        required
        defaultValue={defaultValues?.type ?? "agence"}
        options={TYPE_OPTIONS}
      />
      <TextField label="Pays" name="country" defaultValue={defaultValues?.country ?? undefined} />
      <TextField label="Ville" name="city" defaultValue={defaultValues?.city ?? undefined} />
      <TextField label="Adresse" name="address" defaultValue={defaultValues?.address ?? undefined} />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
