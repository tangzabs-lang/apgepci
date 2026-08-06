import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("id, code, name, kind, sale_price, status, category:product_categories(name)")
    .eq("company_id", active.company_id)
    .neq("status", "archived")
    .order("created_at", { ascending: false });

  if (q) query = query.ilike("name", `%${q}%`);
  const { data: products } = await query;

  return (
    <div>
      <PageHeader
        title="Articles & services"
        description="Catalogue des produits, services et marchés."
        action={
          <Link
            href="/catalog/new"
            className="btn btn-primary"
          >
            + Nouvel article
          </Link>
        }
      />

      <form className="mb-4">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Rechercher un article..."
          className="field-input max-w-sm"
        />
      </form>

      <DataTable
        rows={products ?? []}
        editHref={(row) => `/catalog/${row.id}`}
        columns={[
          { key: "code", label: "Code" },
          { key: "name", label: "Désignation" },
          { key: "category", label: "Catégorie", render: (r) => r.category?.name ?? "—" },
          {
            key: "sale_price",
            label: "Prix de vente",
            render: (r) => (r.sale_price != null ? Number(r.sale_price).toLocaleString("fr-FR") : "—"),
          },
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
