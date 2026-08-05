import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserCompanies() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_users")
    .select("company_id, scope_level, role:roles(key, name), company:companies(id, name, trade_name, status)")
    .eq("status", "active");

  if (error) throw error;
  return data ?? [];
}

export async function getActiveCompanyId(preferredId?: string | null) {
  const companies = await getUserCompanies();
  if (companies.length === 0) return null;
  if (preferredId && companies.some((c) => c.company_id === preferredId)) {
    return preferredId;
  }
  return companies[0].company_id;
}
