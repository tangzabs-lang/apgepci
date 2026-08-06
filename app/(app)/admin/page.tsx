import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { PageHeader, SectionTitle } from "@/components/table";
import { InviteForm } from "./invite-form";
import { MemberCard, MemberRow } from "./member-row";

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

      <SectionTitle>Ajouter un utilisateur</SectionTitle>
      <InviteForm companyId={active.company_id} roles={(roles ?? []).map((r) => ({ key: r.key, name: r.name }))} />

      <SectionTitle className="mt-10">Membres de l&apos;entreprise</SectionTitle>
      <ul className="flex flex-col gap-3 md:hidden">
        {(members ?? []).map((m) => (
          <MemberCard
            key={m.id}
            membershipId={m.id}
            fullName={m.profile?.full_name ?? "Utilisateur"}
            roleId={m.role_id}
            roles={roles ?? []}
            status={m.status}
          />
        ))}
      </ul>

      <div className="card hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-linear-to-r from-blue-50 to-white">
            <tr className="border-b border-slate-200 text-left text-[0.7rem] font-bold uppercase tracking-widest text-blue-900/70">
              <th className="whitespace-nowrap px-4 py-3">Utilisateur</th>
              <th className="whitespace-nowrap px-4 py-3">Rôle</th>
              <th className="whitespace-nowrap px-4 py-3">Statut</th>
              <th className="whitespace-nowrap px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
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
