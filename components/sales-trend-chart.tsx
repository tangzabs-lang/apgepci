"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const nf = new Intl.NumberFormat("fr-FR");

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #dbeafe",
  boxShadow: "0 12px 28px -12px rgba(30,64,175,0.35)",
  fontSize: 12,
  padding: "8px 12px",
} as const;

const axisTick = { fill: "var(--chart-muted)", fontSize: 12 } as const;

/** Courbe des ventes mensuelles — visuel principal du tableau de bord. */
export function SalesTrendChart({ data }: { data: { month: string; total: number }[] }) {
  return (
    <div className="h-56 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-series-1)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--chart-series-1)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="4 4" />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "var(--chart-axis)" }}
            tickLine={false}
            tick={axisTick}
            dy={6}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            width={56}
            tickFormatter={(v) => nf.format(Number(v))}
          />
          <Tooltip
            cursor={{ stroke: "var(--chart-series-2)", strokeWidth: 1 }}
            formatter={(value) => [nf.format(Number(value ?? 0)), "Ventes"]}
            contentStyle={tooltipStyle}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="var(--chart-series-1)"
            strokeWidth={2.5}
            fill="url(#salesFill)"
            dot={{ r: 3, fill: "#fff", stroke: "var(--chart-series-1)", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Comparatif ventes / dépenses par mois. */
export function SalesExpensesChart({
  data,
}: {
  data: { month: string; sales: number; expenses: number }[];
}) {
  return (
    <div className="h-56 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="4 4" />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "var(--chart-axis)" }}
            tickLine={false}
            tick={axisTick}
            dy={6}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            width={56}
            tickFormatter={(v) => nf.format(Number(v))}
          />
          <Tooltip
            cursor={{ fill: "rgba(37,99,235,0.06)" }}
            formatter={(value, name) => [
              nf.format(Number(value ?? 0)),
              name === "sales" ? "Ventes" : "Dépenses",
            ]}
            contentStyle={tooltipStyle}
          />
          <Legend
            formatter={(value) => (
              <span className="text-xs font-medium text-slate-500">
                {value === "sales" ? "Ventes" : "Dépenses"}
              </span>
            )}
          />
          <Bar dataKey="sales" fill="var(--chart-series-1)" radius={[6, 6, 0, 0]} maxBarSize={26} />
          <Bar dataKey="expenses" fill="#bfdbfe" radius={[6, 6, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Classement horizontal (top clients, top articles…). */
export function RankingChart({ data }: { data: { label: string; value: number }[] }) {
  const palette = ["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];
  return (
    <div className="h-56 w-full sm:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke="var(--chart-grid)" strokeDasharray="4 4" />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            tickFormatter={(v) => nf.format(Number(v))}
          />
          <YAxis
            type="category"
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            width={110}
          />
          <Tooltip
            cursor={{ fill: "rgba(37,99,235,0.06)" }}
            formatter={(value) => nf.format(Number(value ?? 0))}
            contentStyle={tooltipStyle}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
