"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const lineSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.coerce.number().positive(),
  need_description: z.string().optional(),
});

const requestSchema = z.object({
  company_id: z.string().uuid(),
  org_unit_id: z.string().uuid().optional().or(z.literal("")),
  urgency: z.enum(["low", "normal", "high", "urgent"]),
  needed_date: z.string().optional(),
  lines: z.array(lineSchema).min(1, "Ajoutez au moins un article."),
});

export async function createPurchaseRequest(_prev: ActionState, formData: FormData): Promise<ActionState> {
  let lines;
  try {
    lines = JSON.parse(String(formData.get("lines_json") || "[]"));
  } catch {
    return { error: "Les lignes de la demande sont incomplètes. Vérifiez que chaque ligne a un article et une quantité." };
  }

  const parsed = requestSchema.safeParse({
    company_id: formData.get("company_id"),
    org_unit_id: formData.get("org_unit_id") || "",
    urgency: formData.get("urgency"),
    needed_date: formData.get("needed_date") || undefined,
    lines,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { lines: requestLines, org_unit_id, ...rest } = parsed.data;
  const reference = `DA-${Date.now()}`;

  const { data: request, error } = await supabase
    .from("purchase_requests")
    .insert({ ...rest, org_unit_id: org_unit_id || null, reference, requested_by: user?.id })
    .select("id")
    .single();
  if (error || !request) return { error: humanizeError(error) };

  await supabase.from("purchase_request_lines").insert(
    requestLines.map((l) => ({
      request_id: request.id,
      product_id: l.product_id,
      quantity: l.quantity,
      need_description: l.need_description || null,
    }))
  );

  revalidatePath("/purchasing/requests");
  redirect(`/purchasing/requests/${request.id}`);
}

export async function submitPurchaseRequest(id: string) {
  const supabase = await createClient();
  await supabase.from("purchase_requests").update({ status: "submitted" }).eq("id", id);
  revalidatePath(`/purchasing/requests/${id}`);
}

export async function decidePurchaseRequest(id: string, decision: "approved" | "rejected") {
  const supabase = await createClient();
  await supabase.from("purchase_requests").update({ status: decision }).eq("id", id);
  revalidatePath(`/purchasing/requests/${id}`);
}

export async function convertRequestToOrder(requestId: string, supplierId: string) {
  const supabase = await createClient();
  const { data: request } = await supabase
    .from("purchase_requests")
    .select("id, company_id, reference")
    .eq("id", requestId)
    .single();
  if (!request) return { error: "Cette demande d'achat est introuvable : elle a peut-être été supprimée." };

  const { data: lines } = await supabase
    .from("purchase_request_lines")
    .select("product_id, quantity")
    .eq("request_id", requestId);

  const { data: order, error } = await supabase
    .from("purchase_orders")
    .insert({
      company_id: request.company_id,
      reference: `CMD-${Date.now()}`,
      supplier_id: supplierId,
      request_id: request.id,
    })
    .select("id")
    .single();
  if (error || !order) return { error: humanizeError(error) };

  await supabase.from("purchase_order_lines").insert(
    (lines ?? []).map((l) => ({
      order_id: order.id,
      product_id: l.product_id,
      quantity: l.quantity,
      unit_price: 0,
    }))
  );
  await supabase.from("purchase_requests").update({ status: "converted" }).eq("id", requestId);

  revalidatePath("/purchasing/orders");
  redirect(`/purchasing/orders/${order.id}`);
}

export async function markOrderReceived(orderId: string) {
  const supabase = await createClient();
  await supabase.from("purchase_orders").update({ status: "received" }).eq("id", orderId);
  await supabase
    .from("purchase_requests")
    .update({ status: "received" })
    .eq(
      "id",
      (await supabase.from("purchase_orders").select("request_id").eq("id", orderId).single()).data
        ?.request_id ?? ""
    );
  revalidatePath(`/purchasing/orders/${orderId}`);
}
