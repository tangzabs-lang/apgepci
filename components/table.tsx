import Link from "next/link";
import { Inbox, Pencil } from "lucide-react";

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  editHref,
  emptyMessage = "Aucune donnée pour le moment.",
}: {
  columns: { key: string; label: string; render?: (row: T) => React.ReactNode }[];
  rows: T[];
  editHref?: (row: T) => string;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 border-dashed px-6 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Inbox className="h-6 w-6" />
        </span>
        <p className="max-w-sm text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  const [first, ...rest] = columns;
  const cell = (c: (typeof columns)[number], row: T) =>
    c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "—");

  return (
    <>
      {/* Mobile : une carte par enregistrement, plus lisible qu'un tableau à faire défiler. */}
      <ul className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className="min-w-0 text-base font-bold text-slate-900">
                  {cell(first, row)}
                </span>
                {editHref && (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Pencil className="h-4 w-4" />
                  </span>
                )}
              </div>
              <dl className="mt-3 flex flex-col gap-2">
                {rest.map((c) => (
                  <div key={c.key} className="flex items-start justify-between gap-3">
                    <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {c.label}
                    </dt>
                    <dd className="min-w-0 text-right text-sm font-medium text-slate-700">
                      {cell(c, row)}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          );

          return (
            <li key={row.id} className="card p-4">
              {editHref ? (
                <Link href={editHref(row)} className="block">
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>

      <div className="card hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-linear-to-r from-blue-50 to-white">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap px-4 py-3 text-left text-[0.7rem] font-bold uppercase tracking-widest text-blue-900/70"
                >
                  {c.label}
                </th>
              ))}
              {editHref && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="group transition-colors hover:bg-blue-50/50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-sm text-slate-700">
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "—")}
                  </td>
                ))}
                {editHref && (
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={editHref(row)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100/70 hover:text-blue-700"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Modifier
                    </Link>
                  </td>
                )}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <span className="mb-2 block h-1 w-10 rounded-full bg-linear-to-r from-blue-600 to-blue-300 sm:w-12" />
        <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p>
        )}
      </div>
      {/* Sur mobile les actions passent en pleine largeur, côte à côte dès sm. */}
      {action && (
        <div className="flex flex-col gap-2 *:w-full [&_.btn]:w-full sm:flex-row sm:flex-wrap sm:items-center sm:*:w-auto sm:[&_.btn]:w-auto">
          {action}
        </div>
      )}
    </div>
  );
}

/** Intertitre de section : pastille bleue + libellé, utilisé sur les pages listes. */
export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`mb-3 flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 ${className}`}>
      <span className="h-4 w-1 rounded-full bg-linear-to-b from-blue-600 to-blue-300" />
      {children}
    </h2>
  );
}

/** Tuile d'indicateur : chiffre clé sur fond blanc, liseré bleu. */
export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="stat-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

const TONES: Record<string, string> = {
  default: "bg-slate-100 text-slate-700 ring-slate-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  yellow: "bg-amber-50 text-amber-700 ring-amber-200",
};

export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "blue" | "green" | "red" | "yellow";
}) {
  return (
    <span className={`chip ring-1 ring-inset ${TONES[tone]}`}>{children}</span>
  );
}

export function Card({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`card card-hover p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h2 className="text-base font-bold text-slate-900">{title}</h2>}
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
