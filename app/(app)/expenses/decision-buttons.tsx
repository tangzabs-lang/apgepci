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
        className="rounded-md border border-green-300 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-50 disabled:opacity-60 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
      >
        Approuver
      </button>
      <button
        disabled={pending}
        onClick={() => startTransition(() => decideExpense(expenseId, "rejected"))}
        className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-60 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
      >
        Rejeter
      </button>
    </div>
  );
}
