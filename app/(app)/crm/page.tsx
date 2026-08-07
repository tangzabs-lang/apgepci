import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge, SectionTitle } from "@/components/table";
import { statusLabel, stageLabel, priorityLabel } from "@/lib/labels";

export default async function CrmPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: prospects }, { data: opportunities }, { data: complaints }] = await Promise.all([
    supabase.from("prospects").select("id, name, origin, potential, status").eq("company_id", active.company_id),
    supabase
      .from("opportunities")
      .select("id, need, estimated_value, probability, stage")
      .eq("company_id", active.company_id),
    supabase
      .from("complaints")
      .select("id, subject, priority, status, client:clients(name)")
      .eq("company_id", active.company_id),
  ]);

  return (
    <div>
      <PageHeader
        title="Relation client (CRM)"
        description="Prospects, opportunités et réclamations."
        action={
          <div className="flex gap-2">
            <Link href="/crm/prospects/new" className="btn btn-outline">
              + Prospect
            </Link>
            <Link href="/crm/opportunities/new" className="btn btn-outline">
              + Opportunité
            </Link>
            <Link href="/crm/complaints/new" className="btn btn-primary">
              + Réclamation
            </Link>
          </div>
        }
      />

      <SectionTitle>Prospects</SectionTitle>
      <DataTable
        rows={prospects ?? []}
        columns={[
          { key: "name", label: "Nom" },
          { key: "origin", label: "Origine" },
          { key: "potential", label: "Potentiel" },
          { key: "status", label: "Statut", render: (r) => <Badge>{statusLabel(r.status)}</Badge> },
        ]}
      />

      <SectionTitle className="mt-10">Opportunités</SectionTitle>
      <DataTable
        rows={opportunities ?? []}
        columns={[
          { key: "need", label: "Besoin" },
          { key: "estimated_value", label: "Valeur estimée", render: (r) => (r.estimated_value ? Number(r.estimated_value).toLocaleString("fr-FR") : "—") },
          { key: "probability", label: "Probabilité (%)" },
          { key: "stage", label: "Étape", render: (r) => <Badge tone="blue">{stageLabel(r.stage)}</Badge> },
        ]}
      />

      <SectionTitle className="mt-10">Réclamations</SectionTitle>
      <DataTable
        rows={complaints ?? []}
        columns={[
          { key: "subject", label: "Objet" },
          { key: "client", label: "Client", render: (r) => r.client?.name ?? "—" },
          { key: "priority", label: "Priorité", render: (r) => priorityLabel(r.priority) },
          {
            key: "status",
            label: "Statut",
            render: (r) => <Badge tone={r.status === "closed" ? "green" : "yellow"}>{statusLabel(r.status)}</Badge>,
          },
        ]}
      />
    </div>
  );
}
