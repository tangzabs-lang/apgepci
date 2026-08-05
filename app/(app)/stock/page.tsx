import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompany } from "@/lib/active-company";
import { DataTable, PageHeader, Badge } from "@/components/table";

export default async function StockPage() {
  const active = await getActiveCompany();
  if (!active) return null;
  const supabase = await createClient();

  const [{ data: warehouses }, { data: levels }, { data: thresholds }, { data: products }] = await Promise.all([
    supabase.from("warehouses").select("id, name, type, status").eq("company_id", active.company_id),
    supabase
      .from("stock_levels")
      .select("warehouse_id, product_id, quantity_on_hand, nearest_expiry")
      .eq("company_id", active.company_id),
    supabase.from("stock_thresholds").select("warehouse_id, product_id, min_quantity").eq("company_id", active.company_id),
    supabase.from("products").select("id, name").eq("company_id", active.company_id),
  ]);

  const thresholdMap = new Map(
    (thresholds ?? []).map((t) => [`${t.warehouse_id}:${t.product_id}`, t.min_quantity])
  );
  const productMap = new Map((products ?? []).map((p) => [p.id, p.name]));
  const warehouseMap = new Map((warehouses ?? []).map((w) => [w.id, w.name]));

  return (
    <div>
      <PageHeader
        title="Stock"
        description="Entrepôts, mouvements et niveaux de stock."
        action={
          <div className="flex gap-2">
            <Link
              href="/stock/warehouses/new"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              + Entrepôt
            </Link>
            <Link
              href="/stock/movements/new"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
            >
              + Mouvement
            </Link>
          </div>
        }
      />

      <h2 className="mb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Entrepôts</h2>
      <DataTable
        rows={warehouses ?? []}
        columns={[
          { key: "name", label: "Nom" },
          { key: "type", label: "Type" },
          {
            key: "status",
            label: "Statut",
            render: (r) => <Badge tone={r.status === "active" ? "green" : "default"}>{r.status}</Badge>,
          },
        ]}
      />

      <h2 className="mb-2 mt-8 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Niveaux de stock</h2>
      <DataTable
        rows={(levels ?? []).map((l, i) => ({ id: String(i), ...l }))}
        columns={[
          {
            key: "product",
            label: "Article",
            render: (r) => (r.product_id ? productMap.get(r.product_id) ?? "—" : "—"),
          },
          {
            key: "warehouse",
            label: "Entrepôt",
            render: (r) => (r.warehouse_id ? warehouseMap.get(r.warehouse_id) ?? "—" : "—"),
          },
          {
            key: "quantity_on_hand",
            label: "Quantité disponible",
            render: (r) => {
              const quantity = r.quantity_on_hand ?? 0;
              const min = thresholdMap.get(`${r.warehouse_id}:${r.product_id}`);
              const low = min != null && quantity < min;
              return (
                <span className={low ? "font-semibold text-red-600 dark:text-red-400" : ""}>
                  {quantity}
                  {low && " (seuil bas)"}
                </span>
              );
            },
          },
          { key: "nearest_expiry", label: "Expiration proche" },
        ]}
        emptyMessage="Aucun mouvement de stock enregistré."
      />
    </div>
  );
}
