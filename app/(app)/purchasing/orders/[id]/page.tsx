import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DataTable, PageHeader, Badge } from "@/components/table";
import { ReceiveButton } from "./receive-button";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: order }, { data: lines }] = await Promise.all([
    supabase.from("purchase_orders").select("*, supplier:suppliers(name)").eq("id", id).single(),
    supabase
      .from("purchase_order_lines")
      .select("id, quantity, unit_price, product:products(name)")
      .eq("order_id", id),
  ]);

  if (!order) notFound();

  return (
    <div>
      <PageHeader
        title={`Commande ${order.reference}`}
        action={<Badge tone={order.status === "received" ? "green" : "default"}>{order.status}</Badge>}
      />
      <p className="text-sm text-slate-500">Fournisseur : {order.supplier?.name ?? "—"}</p>

      {order.status !== "received" && (
        <div className="mt-4">
          <ReceiveButton orderId={order.id} />
        </div>
      )}

      <div className="mt-6">
        <DataTable
          rows={lines ?? []}
          columns={[
            { key: "product", label: "Article", render: (r) => r.product?.name ?? "—" },
            { key: "quantity", label: "Quantité" },
            { key: "unit_price", label: "Prix unitaire", render: (r) => Number(r.unit_price).toLocaleString("fr-FR") },
          ]}
        />
      </div>
    </div>
  );
}
