import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";

export default async function ProjectsPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, code, title, budget, status, client:clients(name)")
    .eq("company_id", active.company_id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHeader
        title="Projets & marchés"
        action={
          <Link href="/projects/new" className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
            + Nouveau projet
          </Link>
        }
      />
      <DataTable
        rows={projects ?? []}
        editHref={(row) => `/projects/${row.id}`}
        columns={[
          { key: "code", label: "Code" },
          { key: "title", label: "Intitulé" },
          { key: "client", label: "Client", render: (r) => r.client?.name ?? "—" },
          { key: "budget", label: "Budget", render: (r) => (r.budget ? Number(r.budget).toLocaleString("fr-FR") : "—") },
          { key: "status", label: "Statut", render: (r) => <Badge tone={r.status === "active" ? "green" : "default"}>{r.status}</Badge> },
        ]}
      />
    </div>
  );
}
