export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: { key: keyof T & string; label: string }[]
): string {
  const escape = (value: unknown) => {
    const str = value == null ? "" : String(value);
    if (/[",\n;]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };

  const header = columns.map((c) => escape(c.label)).join(";");
  const lines = rows.map((row) => columns.map((c) => escape(row[c.key])).join(";"));
  return [header, ...lines].join("\n");
}
