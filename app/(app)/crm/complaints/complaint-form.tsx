"use client";

import { useActionState } from "react";
import { createComplaint } from "@/lib/actions/crm";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/form";

export function ComplaintForm({
  companyId,
  clients,
}: {
  companyId: string;
  clients: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(createComplaint, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      <SelectField label="Client" name="client_id" options={clients.map((c) => ({ value: c.id, label: c.name }))} />
      <TextField label="Objet" name="subject" required />
      <SelectField
        label="Priorité"
        name="priority"
        required
        defaultValue="normal"
        options={[
          { value: "low", label: "Faible" },
          { value: "normal", label: "Normale" },
          { value: "high", label: "Haute" },
          { value: "urgent", label: "Urgente" },
        ]}
      />
      <TextField label="Délai" name="deadline" type="date" />
      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
