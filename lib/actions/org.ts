"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const siteSchema = z.object({
  company_id: z.string().uuid(),
  name: z.string().min(1, "Nom requis."),
  code: z.string().optional(),
  type: z.enum(["siege", "agence", "magasin", "entrepot", "atelier", "etablissement", "autre"]),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

export type ActionState = { error?: string } | undefined;

export async function upsertSite(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = siteSchema.safeParse({
    company_id: formData.get("company_id"),
    name: formData.get("name"),
    code: formData.get("code") || undefined,
    type: formData.get("type"),
    country: formData.get("country") || undefined,
    city: formData.get("city") || undefined,
    address: formData.get("address") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("sites").update(parsed.data).eq("id", id)
    : await supabase.from("sites").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/org");
  redirect("/org");
}

const orgUnitSchema = z.object({
  company_id: z.string().uuid(),
  parent_id: z.string().uuid().optional().or(z.literal("")),
  site_id: z.string().uuid().optional().or(z.literal("")),
  name: z.string().min(1, "Nom requis."),
  code: z.string().optional(),
  type: z.enum([
    "direction_generale", "direction", "departement", "service", "unite",
    "agence", "magasin", "atelier", "etablissement", "equipe", "poste",
  ]),
  mission: z.string().optional(),
  objectives: z.string().optional(),
});

export async function upsertOrgUnit(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = orgUnitSchema.safeParse({
    company_id: formData.get("company_id"),
    parent_id: formData.get("parent_id") || "",
    site_id: formData.get("site_id") || "",
    name: formData.get("name"),
    code: formData.get("code") || undefined,
    type: formData.get("type"),
    mission: formData.get("mission") || undefined,
    objectives: formData.get("objectives") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const { parent_id, site_id, ...rest } = parsed.data;
  const payload = {
    ...rest,
    parent_id: parent_id || null,
    site_id: site_id || null,
  };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("org_units").update(payload).eq("id", id)
    : await supabase.from("org_units").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/org");
  redirect("/org");
}
