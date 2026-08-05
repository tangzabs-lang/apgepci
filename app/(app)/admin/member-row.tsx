"use client";

import { useTransition } from "react";
import { updateMemberRole, deactivateMember, reactivateMember } from "@/lib/actions/admin";
import { Badge } from "@/components/table";

export function MemberRow({
  membershipId,
  fullName,
  roleId,
  roles,
  status,
}: {
  membershipId: string;
  fullName: string;
  roleId: string;
  roles: { id: string; name: string }[];
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <tr>
      <td className="px-4 py-2 text-sm">{fullName}</td>
      <td className="px-4 py-2 text-sm">
        <select
          defaultValue={roleId}
          disabled={pending}
          onChange={(e) => startTransition(() => updateMemberRole(membershipId, e.target.value))}
          className="rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-2 text-sm">
        <Badge tone={status === "active" ? "green" : "red"}>{status}</Badge>
      </td>
      <td className="px-4 py-2 text-right">
        {status === "active" ? (
          <button
            disabled={pending}
            onClick={() => startTransition(() => deactivateMember(membershipId))}
            className="text-sm text-red-600 hover:underline dark:text-red-400"
          >
            Suspendre
          </button>
        ) : (
          <button
            disabled={pending}
            onClick={() => startTransition(() => reactivateMember(membershipId))}
            className="text-sm text-green-600 hover:underline dark:text-green-400"
          >
            Réactiver
          </button>
        )}
      </td>
    </tr>
  );
}
