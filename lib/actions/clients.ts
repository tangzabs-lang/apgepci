"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";

const clientSchema = z.object({
  company_id: z.string().uuid(),
  code: z.string().optional(),
  client_type: z.enum(["individual", "company"]),
  name: z.string().min(1, "Nom requis."),
  contact_name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  sales_rep_id: z.string().uuid().optional().or(z.literal("")),
  category_name: z.string().optional(),
  notes: z.string().optional(),
});

export async function upsertClient(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = clientSchema.safeParse({
    company_id: formData.get("company_id"),
    code: formData.get("code") || undefined,
    client_type: formData.get("client_type"),
    name: formData.get("name"),
    contact_name: formData.get("contact_name") || undefined,
    phone: formData.get("phone") || undefined,
    email: formData.get("email") || "",
    address: formData.get("address") || undefined,
    city: formData.get("city") || undefined,
    sales_rep_id: formData.get("sales_rep_id") || "",
    category_name: formData.get("category_name") || undefined,
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { category_name, sales_rep_id, ...rest } = parsed.data;

  let category_id: string | undefined;
  if (category_name) {
    const { data: existing } = await supabase
      .from("client_categories")
      .select("id")
      .eq("company_id", parsed.data.company_id)
      .eq("name", category_name)
      .maybeSingle();
    category_id = existing?.id;
    if (!category_id) {
      const { data: created } = await supabase
        .from("client_categories")
        .insert({ company_id: parsed.data.company_id, name: category_name })
        .select("id")
        .single();
      category_id = created?.id;
    }
  }

  const payload = { ...rest, sales_rep_id: sales_rep_id || null, category_id: category_id ?? null };

  const { error } = id
    ? await supabase.from("clients").update(payload).eq("id", id)
    : await supabase.from("clients").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/clients");
  redirect("/clients");
}

export async function archiveClient(id: string) {
  const supabase = await createClient();
  await supabase.from("clients").update({ status: "archived" }).eq("id", id);
  revalidatePath("/clients");
}
