"use client";

import { useActionState } from "react";
import { inviteUser } from "@/lib/actions/admin";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/form";

export function InviteForm({
  companyId,
  roles,
}: {
  companyId: string;
  roles: { key: string; name: string }[];
}) {
  const [state, action] = useActionState<ActionState, FormData>(inviteUser, undefined);

  return (
    <form action={action} className="card flex max-w-xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      <TextField label="E-mail de l'utilisateur (déjà inscrit sur APGEPCI)" name="email" type="email" required />
      <SelectField
        label="Rôle"
        name="role_key"
        required
        options={roles.map((r) => ({ value: r.key, label: r.name }))}
      />
      <FormError message={state?.error} />
      <SubmitButton>Ajouter à l&apos;entreprise</SubmitButton>
    </form>
  );
}
