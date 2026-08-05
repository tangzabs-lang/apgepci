"use client";

import { useActionState } from "react";
import { createForecast } from "@/lib/actions/forecasts";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/form";

export function ForecastForm({ companyId }: { companyId: string }) {
  const [state, action] = useActionState<ActionState, FormData>(createForecast, undefined);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <input type="hidden" name="company_id" value={companyId} />

      <SelectField
        label="Sujet"
        name="subject"
        required
        options={[
          { value: "sales", label: "Ventes" },
          { value: "purchases", label: "Achats" },
          { value: "expenses", label: "Dépenses" },
          { value: "production", label: "Production" },
          { value: "recruitment", label: "Recrutements" },
          { value: "stock", label: "Stock" },
          { value: "projects", label: "Projets" },
          { value: "markets", label: "Marchés" },
          { value: "revenue", label: "Chiffre d'affaires" },
          { value: "quantity", label: "Quantités" },
          { value: "commercial_objective", label: "Objectif commercial" },
        ]}
      />
      <SelectField
        label="Type de période"
        name="period_type"
        required
        defaultValue="monthly"
        options={[
          { value: "daily", label: "Jour" },
          { value: "weekly", label: "Semaine" },
          { value: "monthly", label: "Mois" },
          { value: "quarterly", label: "Trimestre" },
          { value: "biannual", label: "Semestre" },
          { value: "yearly", label: "Année" },
          { value: "custom", label: "Personnalisée" },
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField label="Début de période" name="period_start" type="date" required />
        <TextField label="Fin de période" name="period_end" type="date" required />
      </div>

      <TextField label="Valeur cible" name="target_value" type="number" step="0.01" required />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
