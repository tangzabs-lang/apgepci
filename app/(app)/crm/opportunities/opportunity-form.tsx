"use client";

import { useActionState } from "react";
import { createOpportunity } from "@/lib/actions/crm";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/form";

export function OpportunityForm({
  companyId,
  clients,
  prospects,
}: {
  companyId: string;
  clients: { id: string; name: string }[];
  prospects: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(createOpportunity, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />

      <SelectField
        label="Type de contact"
        name="subject_type"
        required
        defaultValue="client"
        options={[
          { value: "client", label: "Client existant" },
          { value: "prospect", label: "Prospect" },
        ]}
      />
      <SelectField
        label="Client"
        name="subject_id"
        required
        options={[...clients, ...prospects].map((c) => ({ value: c.id, label: c.name }))}
      />
      <TextField label="Besoin" name="need" />
      <TextField label="Valeur estimée" name="estimated_value" type="number" step="0.01" />
      <TextField label="Probabilité (%)" name="probability" type="number" />
      <SelectField
        label="Étape"
        name="stage"
        required
        defaultValue="new"
        options={[
          { value: "new", label: "Nouvelle" },
          { value: "qualification", label: "Qualification" },
          { value: "proposal", label: "Proposition" },
          { value: "negotiation", label: "Négociation" },
          { value: "won", label: "Gagnée" },
          { value: "lost", label: "Perdue" },
        ]}
      />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
