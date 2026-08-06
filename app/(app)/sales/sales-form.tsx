"use client";

import { useActionState, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { upsertSale } from "@/lib/actions/sales";
import type { ActionState } from "@/lib/actions/org";
import { TextField, SelectField, TextAreaField, SubmitButton, FormError } from "@/components/form";

type Product = { id: string; name: string; sale_price: number | null; tax_rate: number };
type Line = { product_id: string; quantity: number; unit_price: number; discount: number; tax_rate: number };

export function SalesForm({
  companyId,
  clients,
  salesReps,
  sites,
  products,
  defaultValues,
}: {
  companyId: string;
  clients: { id: string; name: string }[];
  salesReps: { id: string; label: string }[];
  sites: { id: string; name: string }[];
  products: Product[];
  defaultValues?: {
    id: string;
    sale_date: string;
    client_id: string | null;
    sales_rep_id: string | null;
    site_id: string | null;
    notes: string | null;
    lines: Line[];
  };
}) {
  const [state, action] = useActionState<ActionState, FormData>(upsertSale, undefined);
  const [lines, setLines] = useState<Line[]>(
    defaultValues?.lines?.length
      ? defaultValues.lines
      : [{ product_id: "", quantity: 1, unit_price: 0, discount: 0, tax_rate: 0 }]
  );

  const totals = useMemo(() => {
    let subtotal = 0,
      discount = 0,
      tax = 0;
    for (const l of lines) {
      const gross = l.quantity * l.unit_price;
      const afterDiscount = gross - l.discount;
      subtotal += gross;
      discount += l.discount;
      tax += (afterDiscount * l.tax_rate) / 100;
    }
    return { subtotal, discount, tax, total: subtotal - discount + tax };
  }, [lines]);

  function updateLine(index: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  }

  function onProductChange(index: number, productId: string) {
    const product = products.find((p) => p.id === productId);
    updateLine(index, {
      product_id: productId,
      unit_price: product?.sale_price ?? 0,
      tax_rate: product?.tax_rate ?? 0,
    });
  }

  return (
    <form action={action} className="card flex max-w-3xl flex-col gap-4 p-5 sm:p-6">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}
      <input type="hidden" name="lines_json" value={JSON.stringify(lines.filter((l) => l.product_id))} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TextField
          label="Date"
          name="sale_date"
          type="date"
          required
          defaultValue={defaultValues?.sale_date ?? new Date().toISOString().slice(0, 10)}
        />
        <SelectField
          label="Client"
          name="client_id"
          defaultValue={defaultValues?.client_id ?? undefined}
          options={clients.map((c) => ({ value: c.id, label: c.name }))}
        />
        <SelectField
          label="Commercial"
          name="sales_rep_id"
          defaultValue={defaultValues?.sales_rep_id ?? undefined}
          options={salesReps.map((s) => ({ value: s.id, label: s.label }))}
        />
        <SelectField
          label="Site"
          name="site_id"
          defaultValue={defaultValues?.site_id ?? undefined}
          options={sites.map((s) => ({ value: s.id, label: s.name }))}
        />
      </div>

      <div>
        <label className="field-label">Articles</label>
        {/* Une carte par ligne : saisissable au pouce, sans défilement horizontal. */}
        <ul className="mt-2 flex flex-col gap-3">
          {lines.map((line, i) => (
            <li key={i} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Ligne {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setLines((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label={`Retirer la ligne ${i + 1}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <select
                value={line.product_id}
                onChange={(e) => onProductChange(i, e.target.value)}
                aria-label="Article"
                className="field-input mt-2"
              >
                <option value="">Sélectionner un article...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <label className="min-w-0">
                  <span className="field-label">Quantité</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    value={line.quantity}
                    onChange={(e) => updateLine(i, { quantity: Number(e.target.value) })}
                    className="field-input mt-1"
                  />
                </label>
                <label className="min-w-0">
                  <span className="field-label">Prix unitaire</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    value={line.unit_price}
                    onChange={(e) => updateLine(i, { unit_price: Number(e.target.value) })}
                    className="field-input mt-1"
                  />
                </label>
                <label className="min-w-0">
                  <span className="field-label">Remise</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    value={line.discount}
                    onChange={(e) => updateLine(i, { discount: Number(e.target.value) })}
                    className="field-input mt-1"
                  />
                </label>
                <label className="min-w-0">
                  <span className="field-label">Taxe %</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    value={line.tax_rate}
                    onChange={(e) => updateLine(i, { tax_rate: Number(e.target.value) })}
                    className="field-input mt-1"
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() =>
            setLines((prev) => [...prev, { product_id: "", quantity: 1, unit_price: 0, discount: 0, tax_rate: 0 }])
          }
          className="btn btn-secondary mt-3 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Ajouter un article
        </button>
      </div>

      <div className="flex justify-end">
        <dl className="w-full space-y-1.5 rounded-2xl bg-blue-50/60 p-4 text-sm sm:w-64">
          <div className="flex justify-between">
            <dt className="text-slate-500">Sous-total</dt>
            <dd>{totals.subtotal.toLocaleString("fr-FR")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Remises</dt>
            <dd>-{totals.discount.toLocaleString("fr-FR")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Taxes</dt>
            <dd>{totals.tax.toLocaleString("fr-FR")}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-blue-200 pt-2">
            <dt className="font-bold uppercase tracking-wide text-slate-600">Total</dt>
            <dd className="text-lg font-bold text-blue-700">
              {totals.total.toLocaleString("fr-FR")}
            </dd>
          </div>
        </dl>
      </div>

      <TextAreaField label="Observations" name="notes" defaultValue={defaultValues?.notes ?? undefined} />

      <FormError message={state?.error} />
      <div className="form-actions">
        <SubmitButton>Enregistrer la vente</SubmitButton>
      </div>
    </form>
  );
}
