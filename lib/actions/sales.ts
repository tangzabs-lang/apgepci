"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const lineSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.coerce.number().positive(),
  unit_price: z.coerce.number().min(0),
  discount: z.coerce.number().min(0).default(0),
  tax_rate: z.coerce.number().min(0).default(0),
});

const saleSchema = z.object({
  company_id: z.string().uuid(),
  sale_date: z.string().min(1),
  client_id: z.string().uuid().optional().or(z.literal("")),
  sales_rep_id: z.string().uuid().optional().or(z.literal("")),
  site_id: z.string().uuid().optional().or(z.literal("")),
  notes: z.string().optional(),
  lines: z.array(lineSchema).min(1, "Ajoutez au moins un article."),
});

function computeTotals(lines: z.infer<typeof lineSchema>[]) {
  let subtotal = 0;
  let discountTotal = 0;
  let taxTotal = 0;
  for (const line of lines) {
    const gross = line.quantity * line.unit_price;
    const afterDiscount = gross - line.discount;
    const tax = (afterDiscount * line.tax_rate) / 100;
    subtotal += gross;
    discountTotal += line.discount;
    taxTotal += tax;
  }
  const total = subtotal - discountTotal + taxTotal;
  return { subtotal, discountTotal, taxTotal, total };
}

export async function upsertSale(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  let lines;
  try {
    lines = JSON.parse(String(formData.get("lines_json") || "[]"));
  } catch {
    return { error: "Les lignes de la vente sont incomplètes. Vérifiez que chaque ligne a un article, une quantité et un prix." };
  }

  const parsed = saleSchema.safeParse({
    company_id: formData.get("company_id"),
    sale_date: formData.get("sale_date"),
    client_id: formData.get("client_id") || "",
    sales_rep_id: formData.get("sales_rep_id") || "",
    site_id: formData.get("site_id") || "",
    notes: formData.get("notes") || undefined,
    lines,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { lines: saleLines, client_id, sales_rep_id, site_id, ...rest } = parsed.data;
  const totals = computeTotals(saleLines);

  const payload = {
    ...rest,
    client_id: client_id || null,
    sales_rep_id: sales_rep_id || null,
    site_id: site_id || null,
    subtotal: totals.subtotal,
    discount_total: totals.discountTotal,
    tax_total: totals.taxTotal,
    total: totals.total,
  };

  let saleId = id;
  if (id) {
    const { error } = await supabase.from("sales").update(payload).eq("id", id);
    if (error) return { error: humanizeError(error) };
    await supabase.from("sale_lines").delete().eq("sale_id", id);
  } else {
    const reference = `VTE-${Date.now()}`;
    const { data: created, error } = await supabase
      .from("sales")
      .insert({ ...payload, reference })
      .select("id")
      .single();
    if (error || !created) return { error: humanizeError(error) };
    saleId = created.id;
  }

  if (!saleId) return { error: "L'enregistrement de la vente n'a pas abouti. Réessayez dans un instant." };

  const lineRows = saleLines.map((line) => {
    const gross = line.quantity * line.unit_price;
    const afterDiscount = gross - line.discount;
    const tax = (afterDiscount * line.tax_rate) / 100;
    return {
      sale_id: saleId as string,
      product_id: line.product_id,
      quantity: line.quantity,
      unit_price: line.unit_price,
      discount: line.discount,
      tax_rate: line.tax_rate,
      line_total: afterDiscount + tax,
    };
  });
  await supabase.from("sale_lines").insert(lineRows);

  revalidatePath("/sales");
  redirect(`/sales/${saleId}`);
}

const STATUS_TRANSITIONS: Record<string, string[]> = {
  draft: ["pending", "cancelled"],
  pending: ["validated", "cancelled"],
  validated: ["delivered", "partially_delivered", "cancelled"],
  partially_delivered: ["delivered", "cancelled"],
  delivered: ["closed"],
  cancelled: [],
  closed: [],
};

export async function updateSaleStatus(saleId: string, toStatus: string, reason?: string) {
  const supabase = await createClient();
  const { data: sale } = await supabase.from("sales").select("status, company_id").eq("id", saleId).single();
  if (!sale) return { error: "Cette vente est introuvable : elle a peut-être été supprimée." };
  if (!STATUS_TRANSITIONS[sale.status]?.includes(toStatus)) {
    return { error: `Transition ${sale.status} → ${toStatus} non autorisée.` };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const updates: {
    status: string;
    validated_by?: string;
    validated_at?: string;
    cancel_reason?: string | null;
  } = { status: toStatus };
  if (toStatus === "validated") {
    updates.validated_by = user?.id;
    updates.validated_at = new Date().toISOString();
  }
  if (toStatus === "cancelled") {
    updates.cancel_reason = reason ?? null;
  }

  await supabase.from("sales").update(updates).eq("id", saleId);
  await supabase.from("sale_status_history").insert({
    sale_id: saleId,
    from_status: sale.status,
    to_status: toStatus,
    reason: reason ?? null,
    changed_by: user?.id,
  });
  await supabase.rpc("write_audit_log", {
    p_company_id: sale.company_id,
    p_action: `sale_${toStatus}`,
    p_module: "sales",
    p_entity_table: "sales",
    p_entity_id: saleId,
    p_before: { status: sale.status },
    p_after: { status: toStatus },
    p_reason: reason,
    p_risk_level: toStatus === "cancelled" ? "high" : "normal",
  });

  revalidatePath(`/sales/${saleId}`);
  revalidatePath("/sales");
}
