import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function AuthShell({
  panelEyebrow,
  panelTitle,
  panelPoints,
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  panelEyebrow: string;
  panelTitle: string;
  panelPoints: { icon: LucideIcon; label: string }[];
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 bg-white">
      {/* Branding panel — desktop only, kept off mobile to stay lean */}
      <div className="panel-gradient relative hidden w-[42%] shrink-0 flex-col justify-between overflow-hidden px-10 py-10 lg:flex xl:w-[38%]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.28), transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.18), transparent 40%)",
          }}
        />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-black text-blue-600">
              A
            </span>
            <span className="text-base font-semibold tracking-tight text-white">APGEPCI</span>
          </Link>
        </div>

        <div className="relative">
          <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-50">
            {panelEyebrow}
          </span>
          <h2 className="mt-5 max-w-sm text-2xl font-bold leading-snug text-white">
            {panelTitle}
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {panelPoints.map((point) => (
              <li key={point.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <point.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 text-sm text-blue-50/90">{point.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-blue-100/70">
          © {new Date().getFullYear()} APGEPCI. Chaque entreprise reste propriétaire de ses données.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col bg-linear-to-b from-white to-blue-50/40 px-4 py-8 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start lg:hidden"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-blue-400 text-xs font-black text-white">
            A
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            APGEPCI
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm py-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {eyebrow}
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
