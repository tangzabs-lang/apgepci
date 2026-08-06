import type { LucideIcon } from "lucide-react";

export function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card card-hover p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-blue-400 text-white shadow-[0_8px_18px_-10px_rgba(37,99,235,0.9)]">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-slate-900">{title}</h2>
          {description && (
            <p className="min-w-0 text-xs text-slate-500">{description}</p>
          )}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
