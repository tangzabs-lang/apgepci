import Link from "next/link";
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
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
              A
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-zinc-900 sm:inline dark:text-zinc-50">
              APGEPCI
            </span>
          </Link>

          <ol className="flex items-center gap-2 sm:gap-3">
            {STEPS.map((s, i) => {
              const state = s.number < step ? "done" : s.number === step ? "active" : "upcoming";
              return (
                <li key={s.number} className="flex items-center gap-2 sm:gap-3">
                  {i > 0 && (
                    <span
                      className={`h-px w-5 sm:w-10 ${
                        state === "upcoming" && s.number - 1 >= step
                          ? "bg-zinc-200 dark:bg-zinc-800"
                          : "bg-zinc-300 dark:bg-zinc-700"
                      }`}
                    />
                  )}
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        state === "done"
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                          : state === "active"
                            ? "border-2 border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
                            : "border border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
                      }`}
                    >
                      {state === "done" ? <Check className="h-3.5 w-3.5" /> : s.number}
                    </span>
                    <span
                      className={`hidden min-w-0 text-sm font-medium sm:inline ${
                        state === "upcoming"
                          ? "text-zinc-400 dark:text-zinc-600"
                          : "text-zinc-900 dark:text-zinc-50"
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
