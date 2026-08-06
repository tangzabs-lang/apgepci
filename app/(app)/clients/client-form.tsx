"use client";

import { useActionState } from "react";
import { upsertClient } from "@/lib/actions/clients";
import type { ActionState } from "@/lib/actions/org";
import { TextField, TextAreaField, SelectField, SubmitButton, FormError } from "@/components/form";

export function ClientForm({
  companyId,
  salesReps,
  categories,
  defaultValues,
}: {
  companyId: string;
  salesReps: { id: string; label: string }[];
  categories: string[];
  defaultValues?: {
    id: string;
    code: string | null;
    client_type: string;
    name: string;
    contact_name: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    city: string | null;
    sales_rep_id: string | null;
    notes: string | null;
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertClient, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Code client" name="code" defaultValue={defaultValues?.code ?? undefined} />
        <SelectField
          label="Type"
          name="client_type"
          required
          defaultValue={defaultValues?.client_type ?? "individual"}
          options={[
            { value: "individual", label: "Particulier" },
            { value: "company", label: "Entreprise" },
          ]}
        />
      </div>

      <TextField label="Nom / Raison sociale" name="name" required defaultValue={defaultValues?.name} />
      <TextField
        label="Contact principal"
        name="contact_name"
        defaultValue={defaultValues?.contact_name ?? undefined}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Téléphone" name="phone" defaultValue={defaultValues?.phone ?? undefined} />
        <TextField label="E-mail" name="email" type="email" defaultValue={defaultValues?.email ?? undefined} />
      </div>

      <TextField label="Adresse" name="address" defaultValue={defaultValues?.address ?? undefined} />
      <TextField label="Ville" name="city" defaultValue={defaultValues?.city ?? undefined} />

      <SelectField
        label="Commercial responsable"
        name="sales_rep_id"
        defaultValue={defaultValues?.sales_rep_id ?? undefined}
        options={salesReps.map((s) => ({ value: s.id, label: s.label }))}
      />

      <div>
        <label className="field-label">Catégorie</label>
        <input
          name="category_name"
          list="client-categories"
          className="field-input mt-1.5"
          placeholder="Nouvelle catégorie ou existante"
        />
        <datalist id="client-categories">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <TextAreaField label="Notes" name="notes" defaultValue={defaultValues?.notes ?? undefined} />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
