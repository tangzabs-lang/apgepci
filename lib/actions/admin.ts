"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const inviteSchema = z.object({
  company_id: z.string().uuid(),
  email: z.string().email("E-mail invalide."),
  role_key: z.string().min(1, "Rôle requis."),
});

export async function inviteUser(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = inviteSchema.safeParse({
    company_id: formData.get("company_id"),
    email: formData.get("email"),
    role_key: formData.get("role_key"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.rpc("invite_user_by_email", {
    p_company_id: parsed.data.company_id,
    p_email: parsed.data.email,
    p_role_key: parsed.data.role_key,
  });

  if (error) return { error: humanizeError(error) };

  revalidatePath("/admin");
  return undefined;
}

export async function updateMemberRole(membershipId: string, roleId: string) {
  const supabase = await createClient();
  await supabase.from("company_users").update({ role_id: roleId }).eq("id", membershipId);
  revalidatePath("/admin");
}

export async function deactivateMember(membershipId: string) {
  const supabase = await createClient();
  await supabase.from("company_users").update({ status: "suspended" }).eq("id", membershipId);
  revalidatePath("/admin");
}

export async function reactivateMember(membershipId: string) {
  const supabase = await createClient();
  await supabase.from("company_users").update({ status: "active" }).eq("id", membershipId);
  revalidatePath("/admin");
}
