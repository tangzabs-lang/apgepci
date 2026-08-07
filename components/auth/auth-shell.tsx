import { LogoLink } from "@/components/logo";

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
      <LogoLink href="/" height={40} priority className="self-center" />

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm py-8">
          {/* En-tête centré ; les champs restent alignés à gauche, plus lisibles à la saisie. */}
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {eyebrow}
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
