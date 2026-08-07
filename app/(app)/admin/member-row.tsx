"use client";

import { useTransition } from "react";
import { updateMemberRole, deactivateMember, reactivateMember } from "@/lib/actions/admin";
import { Badge } from "@/components/table";
import { statusLabel } from "@/lib/labels";

type MemberProps = {
  membershipId: string;
  fullName: string;
  roleId: string;
  roles: { id: string; name: string }[];
  status: string;
};

/** Carte membre : version mobile de la ligne de tableau. */
export function MemberCard({ membershipId, fullName, roleId, roles, status }: MemberProps) {
  const [pending, startTransition] = useTransition();

  return (
    <li className="card p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="min-w-0 text-base font-bold text-slate-900">{fullName}</span>
        <Badge tone={status === "active" ? "green" : "red"}>{statusLabel(status)}</Badge>
      </div>

      <label className="mt-3 block">
        <span className="field-label">Rôle</span>
        <select
          defaultValue={roleId}
          disabled={pending}
          onChange={(e) => startTransition(() => updateMemberRole(membershipId, e.target.value))}
          className="field-input mt-1"
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </label>

      {status === "active" ? (
        <button
          disabled={pending}
          onClick={() => startTransition(() => deactivateMember(membershipId))}
          className="btn btn-danger mt-3 w-full"
        >
          Suspendre
        </button>
      ) : (
        <button
          disabled={pending}
          onClick={() => startTransition(() => reactivateMember(membershipId))}
          className="btn btn-success mt-3 w-full"
        >
          Réactiver
        </button>
      )}
    </li>
  );
}

export function MemberRow({ membershipId, fullName, roleId, roles, status }: MemberProps) {
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
        <Badge tone={status === "active" ? "green" : "red"}>{statusLabel(status)}</Badge>
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
