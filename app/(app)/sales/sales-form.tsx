"use client";

import { useActionState, useMemo, useState } from "react";
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
    <form action={action} className="flex max-w-3xl flex-col gap-4">
      <input type="hidden" name="company_id" value={companyId} />
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}
      <input type="hidden" name="lines_json" value={JSON.stringify(lines.filter((l) => l.product_id))} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Articles</label>
        <div className="mt-2 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr className="text-left text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                <th className="px-3 py-2">Article</th>
                <th className="px-3 py-2">Quantité</th>
                <th className="px-3 py-2">Prix unitaire</th>
                <th className="px-3 py-2">Remise</th>
                <th className="px-3 py-2">Taxe %</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {lines.map((line, i) => (
                <tr key={i}>
                  <td className="p-2">
                    <select
                      value={line.product_id}
                      onChange={(e) => onProductChange(i, e.target.value)}
                      className="w-48 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    >
                      <option value="">Sélectionner...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={line.quantity}
                      onChange={(e) => updateLine(i, { quantity: Number(e.target.value) })}
                      className="w-24 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={line.unit_price}
                      onChange={(e) => updateLine(i, { unit_price: Number(e.target.value) })}
                      className="w-28 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={line.discount}
                      onChange={(e) => updateLine(i, { discount: Number(e.target.value) })}
                      className="w-24 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={line.tax_rate}
                      onChange={(e) => updateLine(i, { tax_rate: Number(e.target.value) })}
                      className="w-20 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => setLines((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-sm text-red-600 hover:underline dark:text-red-400"
                    >
                      Retirer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={() =>
            setLines((prev) => [...prev, { product_id: "", quantity: 1, unit_price: 0, discount: 0, tax_rate: 0 }])
          }
          className="mt-2 text-sm font-medium text-zinc-900 underline dark:text-zinc-50"
        >
          + Ajouter un article
        </button>
      </div>

      <div className="flex justify-end">
        <dl className="w-64 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">Sous-total</dt>
            <dd>{totals.subtotal.toLocaleString("fr-FR")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">Remises</dt>
            <dd>-{totals.discount.toLocaleString("fr-FR")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">Taxes</dt>
            <dd>{totals.tax.toLocaleString("fr-FR")}</dd>
          </div>
          <div className="flex justify-between border-t border-zinc-200 pt-1 font-semibold dark:border-zinc-800">
            <dt>Total</dt>
            <dd>{totals.total.toLocaleString("fr-FR")}</dd>
          </div>
        </dl>
      </div>

      <TextAreaField label="Observations" name="notes" defaultValue={defaultValues?.notes ?? undefined} />

      <FormError message={state?.error} />
      <SubmitButton>Enregistrer la vente</SubmitButton>
    </form>
  );
}
