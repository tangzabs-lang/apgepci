"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";

const positionSchema = z.object({
  company_id: z.string().uuid(),
  org_unit_id: z.string().uuid().optional().or(z.literal("")),
  title: z.string().min(1, "Titre requis."),
  mission: z.string().optional(),
  headcount: z.coerce.number().int().min(1).default(1),
});

export async function upsertPosition(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = positionSchema.safeParse({
    company_id: formData.get("company_id"),
    org_unit_id: formData.get("org_unit_id") || "",
    title: formData.get("title"),
    mission: formData.get("mission") || undefined,
    headcount: formData.get("headcount") || 1,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { org_unit_id, ...rest } = parsed.data;
  const payload = { ...rest, org_unit_id: org_unit_id || null };

  const { error } = id
    ? await supabase.from("positions").update(payload).eq("id", id)
    : await supabase.from("positions").insert(payload);

  if (error) return { error: error.message };
  revalidatePath("/hr");
  redirect("/hr");
}

const employeeSchema = z.object({
  company_id: z.string().uuid(),
  matricule: z.string().optional(),
  first_name: z.string().min(1, "Prénom requis."),
  last_name: z.string().min(1, "Nom requis."),
  hire_date: z.string().optional(),
  org_unit_id: z.string().uuid().optional().or(z.literal("")),
  position_id: z.string().uuid().optional().or(z.literal("")),
  site_id: z.string().uuid().optional().or(z.literal("")),
  contract_type: z.enum(["cdi", "cdd", "stage", "prestataire", "journalier", "autre"]).optional(),
  base_salary: z.coerce.number().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

export async function upsertEmployee(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = employeeSchema.safeParse({
    company_id: formData.get("company_id"),
    matricule: formData.get("matricule") || undefined,
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    hire_date: formData.get("hire_date") || undefined,
    org_unit_id: formData.get("org_unit_id") || "",
    position_id: formData.get("position_id") || "",
    site_id: formData.get("site_id") || "",
    contract_type: formData.get("contract_type") || undefined,
    base_salary: formData.get("base_salary") || undefined,
    phone: formData.get("phone") || undefined,
    email: formData.get("email") || "",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { org_unit_id, position_id, site_id, ...rest } = parsed.data;
  const payload = {
    ...rest,
    org_unit_id: org_unit_id || null,
    position_id: position_id || null,
    site_id: site_id || null,
  };

  const { error } = id
    ? await supabase.from("employees").update(payload).eq("id", id)
    : await supabase.from("employees").insert(payload);

  if (error) return { error: error.message };
  revalidatePath("/hr");
  redirect("/hr");
}
