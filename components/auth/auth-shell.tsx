import Link from "next/link";

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-white px-4 py-8 sm:px-6 sm:py-10">
      <Link href="/" className="inline-flex items-center gap-2 self-start">
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
  );
}
