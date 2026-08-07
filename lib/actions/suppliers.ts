"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const supplierSchema = z.object({
  company_id: z.string().uuid(),
  code: z.string().optional(),
  name: z.string().min(1, "Nom requis."),
  address: z.string().optional(),
  products_supplied: z.string().optional(),
  conditions: z.string().optional(),
  lead_time_days: z.coerce.number().int().optional(),
});

export async function upsertSupplier(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = supplierSchema.safeParse({
    company_id: formData.get("company_id"),
    code: formData.get("code") || undefined,
    name: formData.get("name"),
    address: formData.get("address") || undefined,
    products_supplied: formData.get("products_supplied") || undefined,
    conditions: formData.get("conditions") || undefined,
    lead_time_days: formData.get("lead_time_days") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const phone = formData.get("phone");
  const email = formData.get("email");
  const contacts = {
    phone: typeof phone === "string" && phone ? phone : undefined,
    email: typeof email === "string" && email ? email : undefined,
  };

  const supabase = await createClient();
  const payload = { ...parsed.data, contacts };
  const { error } = id
    ? await supabase.from("suppliers").update(payload).eq("id", id)
    : await supabase.from("suppliers").insert(payload);

  if (error) return { error: humanizeError(error) };

  revalidatePath("/purchasing/suppliers");
  redirect("/purchasing/suppliers");
}
