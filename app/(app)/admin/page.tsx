import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader } from "@/components/table";
import { InviteForm } from "./invite-form";
import { MemberRow } from "./member-row";

export default async function AdminPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: members }, { data: roles }] = await Promise.all([
    supabase
      .from("company_users")
      .select("id, status, role_id, profile:profiles(full_name), role:roles(name)")
      .eq("company_id", active.company_id),
    supabase.from("roles").select("id, key, name").eq("company_id", active.company_id).order("name"),
  ]);

  return (
    <div>
      <PageHeader title="Administration" description="Utilisateurs, rôles et permissions de l'entreprise." />

      <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Ajouter un utilisateur</h2>
      <InviteForm companyId={active.company_id} roles={(roles ?? []).map((r) => ({ key: r.key, name: r.name }))} />

      <h2 className="mb-2 mt-8 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Membres de l&apos;entreprise</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr className="text-left text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
              <th className="px-4 py-2">Utilisateur</th>
              <th className="px-4 py-2">Rôle</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
            {(members ?? []).map((m) => (
              <MemberRow
                key={m.id}
                membershipId={m.id}
                fullName={m.profile?.full_name ?? "Utilisateur"}
                roleId={m.role_id}
                roles={roles ?? []}
                status={m.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
