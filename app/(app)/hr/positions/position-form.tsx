"use client";

import { useActionState } from "react";
import { upsertPosition } from "@/lib/actions/hr";
import type { ActionState } from "@/lib/actions/org";
import { TextField, TextAreaField, SelectField, SubmitButton, FormError } from "@/components/form";

export function PositionForm({
  companyId,
  orgUnits,
}: {
  companyId: string;
  orgUnits: { id: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertPosition, undefined);

  return (
    <form action={action} className="card flex max-w-2xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      <TextField label="Intitulé du poste" name="title" required />
      <SelectField label="Service" name="org_unit_id" options={orgUnits.map((o) => ({ value: o.id, label: o.name }))} />
      <TextField label="Effectif prévu" name="headcount" type="number" defaultValue={1} />
      <TextAreaField label="Mission" name="mission" />
      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
