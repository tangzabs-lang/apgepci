"use client";

import { toCsv } from "@/lib/csv";

export function ExportCsvButton<T extends Record<string, unknown>>({
  rows,
  columns,
  filename,
}: {
  rows: T[];
  columns: { key: keyof T & string; label: string }[];
  filename: string;
}) {
  function handleExport() {
    const csv = toCsv(rows, columns);
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      Exporter CSV
    </button>
  );
}
