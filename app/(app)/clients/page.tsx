import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { ExportCsvButton } from "@/components/export-csv-button";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  let query = supabase
    .from("clients")
    .select("id, code, name, phone, email, city, status, client_type")
    .eq("company_id", active.company_id)
    .neq("status", "archived")
    .order("created_at", { ascending: false });

  if (q) query = query.ilike("name", `%${q}%`);

  const { data: clients } = await query;

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Fiches clients, historique et segmentation."
        action={
          <div className="flex gap-2">
            <ExportCsvButton
              rows={clients ?? []}
              filename="clients"
              columns={[
                { key: "code", label: "Code" },
                { key: "name", label: "Nom" },
                { key: "phone", label: "Téléphone" },
                { key: "email", label: "E-mail" },
                { key: "city", label: "Ville" },
                { key: "status", label: "Statut" },
              ]}
            />
            <Link
              href="/clients/new"
              className="btn btn-primary"
            >
              + Nouveau client
            </Link>
          </div>
        }
      />

      <form className="mb-4">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Rechercher un client..."
          className="field-input max-w-sm"
        />
      </form>

      <DataTable
        rows={clients ?? []}
        editHref={(row) => `/clients/${row.id}`}
        columns={[
          { key: "code", label: "Code" },
          { key: "name", label: "Nom" },
          { key: "phone", label: "Téléphone" },
          { key: "city", label: "Ville" },
          {
            key: "status",
            label: "Statut",
            render: (r) => <Badge tone={r.status === "active" ? "green" : "default"}>{r.status}</Badge>,
          },
        ]}
      />
    </div>
  );
}
