import Link from "next/link";

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
      <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
              >
                {c.label}
              </th>
            ))}
            {editHref && <th className="px-4 py-2" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "—")}
                </td>
              ))}
              {editHref && (
                <td className="px-4 py-2 text-right">
                  <Link
                    href={editHref(row)}
                    className="text-sm font-medium text-zinc-900 underline dark:text-zinc-50"
                  >
                    Modifier
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "green" | "red" | "yellow" }) {
  const tones: Record<string, string> = {
    default: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
