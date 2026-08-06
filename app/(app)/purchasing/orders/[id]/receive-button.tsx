"use client";

import { useTransition } from "react";
import { markOrderReceived } from "@/lib/actions/purchasing";

export function ReceiveButton({ orderId }: { orderId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => markOrderReceived(orderId))}
      className="btn btn-success disabled:opacity-60"
    >
      Marquer comme reçue
    </button>
  );
}
