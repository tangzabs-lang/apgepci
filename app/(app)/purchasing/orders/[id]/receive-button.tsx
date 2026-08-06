"use client";

import { useTransition } from "react";
import { markOrderReceived } from "@/lib/actions/purchasing";

export function ReceiveButton({ orderId }: { orderId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => markOrderReceived(orderId))}
      className="rounded-md border border-green-300 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-50 disabled:opacity-60"
    >
      Marquer comme reçue
    </button>
  );
}
