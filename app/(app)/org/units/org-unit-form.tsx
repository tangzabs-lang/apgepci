"use client";

import { useActionState } from "react";
import { upsertOrgUnit, type ActionState } from "@/lib/actions/org";
import { TextField, TextAreaField, SelectField, SubmitButton, FormError } from "@/components/form";

const TYPE_OPTIONS = [
  { value: "direction_generale", label: "Direction générale" },
  { value: "direction", label: "Direction" },
  { value: "departement", label: "Département" },
  { value: "service", label: "Service" },
  { value: "unite", label: "Unité" },
  { value: "agence", label: "Agence" },
  { value: "magasin", label: "Magasin" },
  { value: "atelier", label: "Atelier" },
  { value: "etablissement", label: "Établissement" },
  { value: "equipe", label: "Équipe" },
  { value: "poste", label: "Poste" },
];

export function OrgUnitForm({
  companyId,
  sites,
  units,
  defaultValues,
}: {
  companyId: string;
  sites: { id: string; name: string }[];
  units: { id: string; name: string }[];
  defaultValues?: {
    id: string;
    name: string;
    code: string | null;
    type: string;
    parent_id: string | null;
    site_id: string | null;
    mission: string | null;
    objectives: string | null;
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertOrgUnit, undefined);

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
        defaultValue={defaultValues?.type ?? "service"}
        options={TYPE_OPTIONS}
      />
      <SelectField
        label="Rattachée à"
        name="parent_id"
        defaultValue={defaultValues?.parent_id ?? undefined}
        options={units
          .filter((u) => u.id !== defaultValues?.id)
          .map((u) => ({ value: u.id, label: u.name }))}
      />
      <SelectField
        label="Site"
        name="site_id"
        defaultValue={defaultValues?.site_id ?? undefined}
        options={sites.map((s) => ({ value: s.id, label: s.name }))}
      />
      <TextAreaField label="Mission" name="mission" defaultValue={defaultValues?.mission ?? undefined} />
      <TextAreaField
        label="Objectifs"
        name="objectives"
        defaultValue={defaultValues?.objectives ?? undefined}
      />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
