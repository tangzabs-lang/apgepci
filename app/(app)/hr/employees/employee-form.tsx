"use client";

import { useActionState } from "react";
import { upsertEmployee } from "@/lib/actions/hr";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/form";

export function EmployeeForm({
  companyId,
  orgUnits,
  positions,
  sites,
  defaultValues,
}: {
  companyId: string;
  orgUnits: { id: string; name: string }[];
  positions: { id: string; title: string }[];
  sites: { id: string; name: string }[];
  defaultValues?: {
    id: string;
    matricule: string | null;
    first_name: string;
    last_name: string;
    hire_date: string | null;
    org_unit_id: string | null;
    position_id: string | null;
    site_id: string | null;
    contract_type: string | null;
    base_salary: number | null;
    phone: string | null;
    email: string | null;
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertEmployee, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Prénom" name="first_name" required defaultValue={defaultValues?.first_name} />
        <TextField label="Nom" name="last_name" required defaultValue={defaultValues?.last_name} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Matricule" name="matricule" defaultValue={defaultValues?.matricule ?? undefined} />
        <TextField
          label="Date d'embauche"
          name="hire_date"
          type="date"
          defaultValue={defaultValues?.hire_date ?? undefined}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Téléphone" name="phone" defaultValue={defaultValues?.phone ?? undefined} />
        <TextField label="E-mail" name="email" type="email" defaultValue={defaultValues?.email ?? undefined} />
      </div>

      <SelectField
        label="Service"
        name="org_unit_id"
        defaultValue={defaultValues?.org_unit_id ?? undefined}
        options={orgUnits.map((o) => ({ value: o.id, label: o.name }))}
      />
      <SelectField
        label="Poste"
        name="position_id"
        defaultValue={defaultValues?.position_id ?? undefined}
        options={positions.map((p) => ({ value: p.id, label: p.title }))}
      />
      <SelectField
        label="Site"
        name="site_id"
        defaultValue={defaultValues?.site_id ?? undefined}
        options={sites.map((s) => ({ value: s.id, label: s.name }))}
      />
      <SelectField
        label="Type de contrat"
        name="contract_type"
        defaultValue={defaultValues?.contract_type ?? undefined}
        options={[
          { value: "cdi", label: "CDI" },
          { value: "cdd", label: "CDD" },
          { value: "stage", label: "Stage" },
          { value: "prestataire", label: "Prestataire" },
          { value: "journalier", label: "Journalier" },
          { value: "autre", label: "Autre" },
        ]}
      />
      <TextField
        label="Salaire de base"
        name="base_salary"
        type="number"
        step="0.01"
        defaultValue={defaultValues?.base_salary ?? undefined}
      />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
