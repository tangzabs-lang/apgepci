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
    <tr className="transition-colors hover:bg-blue-50/50">
      <td className="px-4 py-3 text-sm font-semibold text-slate-800">{fullName}</td>
      <td className="px-4 py-3 text-sm text-slate-700">
        <select
          defaultValue={roleId}
          disabled={pending}
          onChange={(e) => startTransition(() => updateMemberRole(membershipId, e.target.value))}
          className="field-input"
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        <Badge tone={status === "active" ? "green" : "red"}>{status}</Badge>
      </td>
      <td className="px-4 py-3 text-right">
        {status === "active" ? (
          <button
            disabled={pending}
            onClick={() => startTransition(() => deactivateMember(membershipId))}
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            Suspendre
          </button>
        ) : (
          <button
            disabled={pending}
            onClick={() => startTransition(() => reactivateMember(membershipId))}
            className="text-sm font-semibold text-emerald-600 hover:underline"
          >
            Réactiver
          </button>
        )}
      </td>
    </tr>
  );
}
