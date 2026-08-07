"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const prospectSchema = z.object({
  company_id: z.string().uuid(),
  name: z.string().min(1, "Nom requis."),
  origin: z.string().optional(),
  needs: z.string().optional(),
  potential: z.string().optional(),
  next_action: z.string().optional(),
  next_action_date: z.string().optional(),
});

export async function createProspect(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = prospectSchema.safeParse({
    company_id: formData.get("company_id"),
    name: formData.get("name"),
    origin: formData.get("origin") || undefined,
    needs: formData.get("needs") || undefined,
    potential: formData.get("potential") || undefined,
    next_action: formData.get("next_action") || undefined,
    next_action_date: formData.get("next_action_date") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("prospects").insert(parsed.data);
  if (error) return { error: humanizeError(error) };

  revalidatePath("/crm");
  redirect("/crm");
}

const opportunitySchema = z.object({
  company_id: z.string().uuid(),
  subject_type: z.enum(["prospect", "client"]),
  subject_id: z.string().uuid(),
  need: z.string().optional(),
  estimated_value: z.coerce.number().optional(),
  probability: z.coerce.number().int().min(0).max(100).optional(),
  stage: z.enum(["new", "qualification", "proposal", "negotiation", "won", "lost"]),
});

export async function createOpportunity(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = opportunitySchema.safeParse({
    company_id: formData.get("company_id"),
    subject_type: formData.get("subject_type"),
    subject_id: formData.get("subject_id"),
    need: formData.get("need") || undefined,
    estimated_value: formData.get("estimated_value") || undefined,
    probability: formData.get("probability") || undefined,
    stage: formData.get("stage") || "new",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("opportunities").insert(parsed.data);
  if (error) return { error: humanizeError(error) };

  revalidatePath("/crm");
  redirect("/crm");
}

const complaintSchema = z.object({
  company_id: z.string().uuid(),
  client_id: z.string().uuid().optional().or(z.literal("")),
  subject: z.string().min(1, "Objet requis."),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  deadline: z.string().optional(),
});

export async function createComplaint(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = complaintSchema.safeParse({
    company_id: formData.get("company_id"),
    client_id: formData.get("client_id") || "",
    subject: formData.get("subject"),
    priority: formData.get("priority") || "normal",
    deadline: formData.get("deadline") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { client_id, ...rest } = parsed.data;
  const { error } = await supabase.from("complaints").insert({ ...rest, client_id: client_id || null });
  if (error) return { error: humanizeError(error) };

  revalidatePath("/crm");
  redirect("/crm");
}

export async function closeComplaint(id: string, response: string) {
  const supabase = await createClient();
  await supabase
    .from("complaints")
    .update({ status: "closed", response, closed_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/crm");
}
