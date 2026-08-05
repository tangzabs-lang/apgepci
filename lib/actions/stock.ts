"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";

const warehouseSchema = z.object({
  company_id: z.string().uuid(),
  name: z.string().min(1, "Nom requis."),
  type: z.enum(["magasin", "depot", "entrepot", "reserve", "emplacement", "vehicule", "temporaire"]),
  site_id: z.string().uuid().optional().or(z.literal("")),
});

export async function upsertWarehouse(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = warehouseSchema.safeParse({
    company_id: formData.get("company_id"),
    name: formData.get("name"),
    type: formData.get("type"),
    site_id: formData.get("site_id") || "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { site_id, ...rest } = parsed.data;
  const payload = { ...rest, site_id: site_id || null };

  const { error } = id
    ? await supabase.from("warehouses").update(payload).eq("id", id)
    : await supabase.from("warehouses").insert(payload);

  if (error) return { error: error.message };
  revalidatePath("/stock");
  redirect("/stock");
}

const movementSchema = z.object({
  company_id: z.string().uuid(),
  warehouse_id: z.string().uuid(),
  product_id: z.string().uuid(),
  movement_type: z.enum([
    "entry", "exit", "transfer", "return", "correction", "loss", "breakage",
    "consumption", "production", "inventory",
  ]),
  quantity: z.coerce.number().positive(),
  lot_number: z.string().optional(),
  expiry_date: z.string().optional(),
  notes: z.string().optional(),
});

export async function createStockMovement(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = movementSchema.safeParse({
    company_id: formData.get("company_id"),
    warehouse_id: formData.get("warehouse_id"),
    product_id: formData.get("product_id"),
    movement_type: formData.get("movement_type"),
    quantity: formData.get("quantity"),
    lot_number: formData.get("lot_number") || undefined,
    expiry_date: formData.get("expiry_date") || undefined,
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("stock_movements")
    .insert({ ...parsed.data, performed_by: user?.id });

  if (error) return { error: error.message };
  revalidatePath("/stock");
  redirect("/stock");
}
