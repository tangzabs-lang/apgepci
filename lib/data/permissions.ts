import { createClient } from "@/lib/supabase/server";
import type { Enums } from "@/lib/database.types";

type PermissionAction = Enums<"permission_action">;

export async function getMyPermissions(companyId: string): Promise<Set<string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("company_users")
    .select("role:roles(role_permissions(module_key, action))")
    .eq("company_id", companyId)
    .eq("status", "active")
    .maybeSingle();

  const perms = new Set<string>();
  const role = data?.role as unknown as
    | { role_permissions: { module_key: string; action: PermissionAction }[] }
    | undefined;
  role?.role_permissions?.forEach((rp) => perms.add(`${rp.module_key}:${rp.action}`));
  return perms;
}

export function can(
  perms: Set<string>,
  module: string,
  action: PermissionAction
): boolean {
  return perms.has(`${module}:${action}`);
}
