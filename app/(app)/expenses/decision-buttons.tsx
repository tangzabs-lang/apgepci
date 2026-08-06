"use client";

import { useTransition } from "react";
import { decideExpense } from "@/lib/actions/expenses";

export function DecisionButtons({ expenseId, status }: { expenseId: string; status: string }) {
  const [pending, startTransition] = useTransition();
  if (status !== "requested" && status !== "pending_approval") return null;

  return (
    <div className="flex gap-2">
      <button
        disabled={pending}
        onClick={() => startTransition(() => decideExpense(expenseId, "approved"))}
        className="btn btn-success px-2.5 py-1 text-xs"
      >
        Approuver
      </button>
      <button
        disabled={pending}
        onClick={() => startTransition(() => decideExpense(expenseId, "rejected"))}
        className="btn btn-danger px-2.5 py-1 text-xs"
      >
        Rejeter
      </button>
    </div>
  );
}
