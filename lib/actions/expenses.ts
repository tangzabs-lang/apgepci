"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";

const expenseSchema = z.object({
  company_id: z.string().uuid(),
  expense_date: z.string().min(1),
  category_name: z.string().min(1, "Catégorie requise."),
  amount: z.coerce.number().positive("Montant invalide."),
  beneficiary: z.string().optional(),
  org_unit_id: z.string().uuid().optional().or(z.literal("")),
  payment_method: z.string().optional(),
  notes: z.string().optional(),
});

async function findOrCreateExpenseCategory(
  supabase: Awaited<ReturnType<typeof createClient>>,
  companyId: string,
  name: string
) {
  const { data: existing } = await supabase
    .from("expense_categories")
    .select("id")
    .eq("company_id", companyId)
    .eq("name", name)
    .is("parent_id", null)
    .maybeSingle();
  if (existing) return existing.id;
  const { data: created } = await supabase
    .from("expense_categories")
    .insert({ company_id: companyId, name })
    .select("id")
    .single();
  return created?.id ?? null;
}

export async function upsertExpense(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const parsed = expenseSchema.safeParse({
    company_id: formData.get("company_id"),
    expense_date: formData.get("expense_date"),
    category_name: formData.get("category_name"),
    amount: formData.get("amount"),
    beneficiary: formData.get("beneficiary") || undefined,
    org_unit_id: formData.get("org_unit_id") || "",
    payment_method: formData.get("payment_method") || undefined,
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { category_name, org_unit_id, ...rest } = parsed.data;
  const category_id = await findOrCreateExpenseCategory(supabase, parsed.data.company_id, category_name);

  const payload = { ...rest, category_id, org_unit_id: org_unit_id || null };

  if (id) {
    const { error } = await supabase.from("expenses").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const reference = `DEP-${Date.now()}`;
    const { error } = await supabase
      .from("expenses")
      .insert({ ...payload, reference, status: "requested" });
    if (error) return { error: error.message };
  }

  revalidatePath("/expenses");
  redirect("/expenses");
}

export async function decideExpense(expenseId: string, decision: "approved" | "rejected") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: expense } = await supabase
    .from("expenses")
    .select("company_id, status")
    .eq("id", expenseId)
    .single();

  await supabase
    .from("expenses")
    .update({
      status: decision,
      approved_by: user?.id,
      approved_at: new Date().toISOString(),
    })
    .eq("id", expenseId);

  if (expense) {
    await supabase.rpc("write_audit_log", {
      p_company_id: expense.company_id,
      p_action: `expense_${decision}`,
      p_module: "expenses",
      p_entity_table: "expenses",
      p_entity_id: expenseId,
      p_before: { status: expense.status },
      p_after: { status: decision },
      p_risk_level: "normal",
    });
  }

  revalidatePath("/expenses");
}
