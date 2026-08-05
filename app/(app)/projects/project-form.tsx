"use client";

import { useActionState } from "react";
import { createProject } from "@/lib/actions/projects";
import type { ActionState } from "@/lib/actions/org";
import { TextField, TextAreaField, SelectField, SubmitButton, FormError } from "@/components/form";

export function ProjectForm({
  companyId,
  clients,
}: {
  companyId: string;
  clients: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(createProject, undefined);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <input type="hidden" name="company_id" value={companyId} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Code" name="code" />
        <TextField label="Budget" name="budget" type="number" step="0.01" />
      </div>
      <TextField label="Intitulé" name="title" required />
      <SelectField label="Client" name="client_id" options={clients.map((c) => ({ value: c.id, label: c.name }))} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Date de début" name="start_date" type="date" />
        <TextField label="Date de fin" name="end_date" type="date" />
      </div>
      <TextAreaField label="Objectifs" name="objectives" />
      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
