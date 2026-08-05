"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SalesTrendChart({ data }: { data: { month: string; total: number }[] }) {
  return (
    <div className="h-64 w-full rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="mb-2 text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
        Ventes des 6 derniers mois
      </p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "var(--chart-axis)" }}
            tickLine={false}
            tick={{ fill: "var(--chart-muted)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--chart-muted)", fontSize: 12 }}
            width={48}
          />
          <Tooltip
            formatter={(value) => Number(value ?? 0).toLocaleString("fr-FR")}
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
          />
          <Bar dataKey="total" fill="var(--chart-series-1)" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
