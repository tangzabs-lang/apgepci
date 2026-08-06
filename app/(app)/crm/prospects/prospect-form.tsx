"use client";

import { useActionState } from "react";
import { createProspect } from "@/lib/actions/crm";
import type { ActionState } from "@/lib/actions/org";
import { TextField, TextAreaField, SubmitButton, FormError } from "@/components/form";

export function ProspectForm({ companyId }: { companyId: string }) {
  const [state, action] = useActionState<ActionState, FormData>(createProspect, undefined);
  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      <TextField label="Nom" name="name" required />
      <TextField label="Origine" name="origin" />
      <TextAreaField label="Besoins" name="needs" />
      <TextField label="Potentiel" name="potential" />
      <TextField label="Prochaine action" name="next_action" />
      <TextField label="Date de la prochaine action" name="next_action_date" type="date" />
      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
