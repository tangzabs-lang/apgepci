
import { LogoLink } from "@/components/logo";
import { Check } from "lucide-react";

const STEPS = [
  { number: 1, label: "Entreprise" },
  { number: 2, label: "Diagnostic" },
];

export function OnboardingShell({
  step,
  children,
}: {
  step: 1 | 2;
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell-bg flex flex-1 flex-col">
      <div className="border-b border-blue-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <LogoLink href="/" height={32} priority />

          <ol className="flex items-center gap-2 sm:gap-3">
            {STEPS.map((s, i) => {
              const state = s.number < step ? "done" : s.number === step ? "active" : "upcoming";
              return (
                <li key={s.number} className="flex items-center gap-2 sm:gap-3">
                  {i > 0 && (
                    <span
                      className={`h-px w-5 sm:w-10 ${
                        state === "upcoming" && s.number - 1 >= step
                          ? "bg-blue-100"
                          : "bg-blue-300"
                      }`}
                    />
                  )}
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        state === "done"
                          ? "bg-linear-to-br from-blue-600 to-blue-400 text-white shadow-[0_6px_14px_-6px_rgba(37,99,235,0.9)]"
                          : state === "active"
                            ? "border-2 border-blue-600 text-blue-700"
                            : "border border-slate-300 text-slate-400"
                      }`}
                    >
                      {state === "done" ? <Check className="h-3.5 w-3.5" /> : s.number}
                    </span>
                    <span
                      className={`hidden min-w-0 text-sm font-medium sm:inline ${
                        state === "upcoming"
                          ? "text-slate-400"
                          : "text-blue-700"
                      }`}
                    >
                      {s.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
