"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const productSchema = z.object({
  company_id: z.string().uuid(),
  code: z.string().optional(),
  name: z.string().min(1, "Désignation requise."),
  description: z.string().optional(),
  kind: z.enum(["product", "service", "market"]),
  category_name: z.string().optional(),
  unit_symbol: z.string().optional(),
  purchase_price: z.coerce.number().optional(),
  cost: z.coerce.number().optional(),
  sale_price: z.coerce.number().optional(),
  tax_rate: z.coerce.number().default(0),
  primary_supplier_id: z.string().uuid().optional().or(z.literal("")),
});

async function findOrCreateByName(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: "product_categories",
  companyId: string,
  name: string
) {
  const { data: existing } = await supabase
    .from(table)
    .select("id")
    .eq("company_id", companyId)
    .eq("name", name)
    .maybeSingle();
  if (existing) return existing.id;
  const { data: created } = await supabase
    .from(table)
    .insert({ company_id: companyId, name })
    .select("id")
    .single();
  return created?.id ?? null;
}

async function findOrCreateUnit(
  supabase: Awaited<ReturnType<typeof createClient>>,
  companyId: string,
  symbol: string
) {
  const { data: existing } = await supabase
    .from("units_of_measure")
    .select("id")
    .eq("company_id", companyId)
    .eq("symbol", symbol)
    .maybeSingle();
  if (existing) return existing.id;
  const { data: created } = await supabase
    .from("units_of_measure")
    .insert({ company_id: companyId, symbol, name: symbol })
    .select("id")
    .single();
  return created?.id ?? null;
}

export async function upsertProduct(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = productSchema.safeParse({
    company_id: formData.get("company_id"),
    code: formData.get("code") || undefined,
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    kind: formData.get("kind"),
    category_name: formData.get("category_name") || undefined,
    unit_symbol: formData.get("unit_symbol") || undefined,
    purchase_price: formData.get("purchase_price") || undefined,
    cost: formData.get("cost") || undefined,
    sale_price: formData.get("sale_price") || undefined,
    tax_rate: formData.get("tax_rate") || 0,
    primary_supplier_id: formData.get("primary_supplier_id") || "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { category_name, unit_symbol, primary_supplier_id, ...rest } = parsed.data;

  const category_id = category_name
    ? await findOrCreateByName(supabase, "product_categories", parsed.data.company_id, category_name)
    : null;
  const unit_id = unit_symbol
    ? await findOrCreateUnit(supabase, parsed.data.company_id, unit_symbol)
    : null;

  const payload = {
    ...rest,
    category_id,
    unit_id,
    primary_supplier_id: primary_supplier_id || null,
  };

  const { error } = id
    ? await supabase.from("products").update(payload).eq("id", id)
    : await supabase.from("products").insert(payload);

  if (error) return { error: humanizeError(error) };

  revalidatePath("/catalog");
  redirect("/catalog");
}

export async function archiveProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").update({ status: "archived" }).eq("id", id);
  revalidatePath("/catalog");
}
