"use client";

import { useActionState } from "react";
import { upsertExpense } from "@/lib/actions/expenses";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, TextAreaField, SubmitButton, FormError } from "@/components/form";

export function ExpenseForm({
  companyId,
  categories,
  orgUnits,
  defaultValues,
}: {
  companyId: string;
  categories: string[];
  orgUnits: { id: string; name: string }[];
  defaultValues?: {
    id: string;
    expense_date: string;
    amount: number;
    beneficiary: string | null;
    org_unit_id: string | null;
    payment_method: string | null;
    notes: string | null;
    category_name?: string;
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertExpense, undefined);

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Date"
          name="expense_date"
          type="date"
          required
          defaultValue={defaultValues?.expense_date ?? new Date().toISOString().slice(0, 10)}
        />
        <TextField
          label="Montant"
          name="amount"
          type="number"
          step="0.01"
          required
          defaultValue={defaultValues?.amount}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Catégorie <span className="text-red-500">*</span>
        </label>
        <input
          name="category_name"
          list="expense-categories"
          required
          defaultValue={defaultValues?.category_name}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
        <datalist id="expense-categories">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <TextField label="Bénéficiaire" name="beneficiary" defaultValue={defaultValues?.beneficiary ?? undefined} />
      <SelectField
        label="Service"
        name="org_unit_id"
        defaultValue={defaultValues?.org_unit_id ?? undefined}
        options={orgUnits.map((o) => ({ value: o.id, label: o.name }))}
      />
      <TextField
        label="Mode de règlement"
        name="payment_method"
        defaultValue={defaultValues?.payment_method ?? undefined}
      />
      <TextAreaField label="Observations" name="notes" defaultValue={defaultValues?.notes ?? undefined} />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer</SubmitButton>
    </form>
  );
}
