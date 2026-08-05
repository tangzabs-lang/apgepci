import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Check,
  ClipboardList,
  FileText,
  Package,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { saveDiagnostic, validateDiagnostic } from "@/lib/actions/diagnostics";
import { MODULE_LABELS } from "@/lib/modules";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Section } from "@/components/onboarding/section";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/5";

export default async function DiagnosticPage({
  searchParams,
}: {
  searchParams: Promise<{ company?: string }>;
}) {
  const { company: companyId } = await searchParams;
  if (!companyId) redirect("/onboarding");

  const supabase = await createClient();
  const { data: diagnostic } = await supabase
    .from("company_diagnostics")
    .select("*")
    .eq("company_id", companyId)
    .single();

  if (!diagnostic) redirect("/onboarding");

  const answers = (diagnostic.answers ?? {}) as Record<string, boolean | string>;
  const isCompleted = diagnostic.status !== "draft";

  const saveAction = saveDiagnostic.bind(null, companyId);
  const validateAction = validateDiagnostic.bind(null, companyId);

  return (
    <OnboardingShell step={2}>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
          <ClipboardList className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Questionnaire de diagnostic initial
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Ces réponses permettent de recommander automatiquement les modules adaptés à votre
          activité. Vous pourrez les modifier à tout moment.
        </p>

        <form action={saveAction} className="mt-8 flex flex-col gap-5">
          <Section icon={ShoppingCart} title="Vente & production" description="Ce que votre entreprise vend ou fabrique.">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Toggle name="sells_products" label="Vend des produits" defaultChecked={!!answers.sells_products} />
              <Toggle name="sells_services" label="Vend des services" defaultChecked={!!answers.sells_services} />
              <Toggle
                name="produces_goods"
                label="Fabrique / transforme des produits"
                defaultChecked={!!answers.produces_goods}
              />
              <Toggle
                name="buys_from_suppliers"
                label="Achète régulièrement auprès de fournisseurs"
                defaultChecked={!!answers.buys_from_suppliers}
              />
              <Toggle name="manages_stock" label="Gère un stock" defaultChecked={!!answers.manages_stock} />
            </div>
          </Section>

          <Section icon={Package} title="Facturation & livraison" description="Comment vos ventes sont conclues.">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Toggle name="invoices_on_credit" label="Facture à crédit" defaultChecked={!!answers.invoices_on_credit} />
              <Toggle name="delivers_goods" label="Livre des marchandises" defaultChecked={!!answers.delivers_goods} />
              <Toggle
                name="has_multiple_sites"
                label="Dispose de plusieurs sites / agences"
                defaultChecked={!!answers.has_multiple_sites}
              />
            </div>
          </Section>

          <Section icon={Users} title="Équipe commerciale" description="Vendeurs, objectifs et commissions.">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Toggle
                name="has_sales_reps"
                label="Emploie des commerciaux / vendeurs"
                defaultChecked={!!answers.has_sales_reps}
              />
              <Toggle name="has_commissions" label="Verse des commissions" defaultChecked={!!answers.has_commissions} />
              <Toggle
                name="has_sales_objectives"
                label="Fixe des objectifs commerciaux"
                defaultChecked={!!answers.has_sales_objectives}
              />
            </div>
          </Section>

          <Section icon={Banknote} title="Organisation interne" description="Dépenses, équipe et projets.">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Toggle name="tracks_expenses" label="Suit ses dépenses" defaultChecked={!!answers.tracks_expenses} />
              <Toggle name="manages_employees" label="Gère des salariés" defaultChecked={!!answers.manages_employees} />
              <Toggle
                name="runs_projects_or_markets"
                label="Exécute des projets ou marchés"
                defaultChecked={!!answers.runs_projects_or_markets}
              />
            </div>
          </Section>

          <Section icon={FileText} title="Précisions" description="Facultatif, mais utile pour affiner nos recommandations.">
            <div className="flex flex-col gap-4">
              <TextArea
                name="current_tools"
                label="Documents / outils actuellement utilisés"
                defaultValue={String(answers.current_tools ?? "")}
              />
              <TextArea
                name="expected_reports"
                label="Rapports attendus"
                defaultValue={String(answers.expected_reports ?? "")}
              />
              <TextArea
                name="current_difficulties"
                label="Difficultés actuelles"
                defaultValue={String(answers.current_difficulties ?? "")}
              />
            </div>
          </Section>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Vous pourrez revenir modifier ces réponses à tout moment.
            </p>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Enregistrer le diagnostic
            </button>
          </div>
        </form>

        {isCompleted && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-5 dark:border-zinc-900 dark:bg-zinc-900/40">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="min-w-0 text-xs font-semibold uppercase tracking-wide">
                  Synthèse du diagnostic
                </span>
              </div>
              <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {diagnostic.recommended_modules.length} modules recommandés pour votre entreprise
              </h2>
            </div>

            <div className="px-6 py-5">
              <ul className="flex flex-wrap gap-2">
                {diagnostic.recommended_modules.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-zinc-900"
                  >
                    <Check className="h-3 w-3 shrink-0" />
                    {MODULE_LABELS[m] ?? m}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-900">
                {diagnostic.status === "validated" ? (
                  <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    <Check className="h-4 w-4 shrink-0" />
                    Diagnostic validé
                  </p>
                ) : (
                  <form action={validateAction}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                      Valider le diagnostic
                    </button>
                  </form>
                )}

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Accéder au tableau de bord
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </OnboardingShell>
  );
}

function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 p-3.5 transition-colors hover:border-zinc-300 has-[:checked]:border-zinc-900 has-[:checked]:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:has-[:checked]:border-zinc-100 dark:has-[:checked]:bg-zinc-900">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-zinc-300 text-transparent peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-checked:text-white dark:border-zinc-700 dark:peer-checked:border-zinc-100 dark:peer-checked:bg-zinc-100 dark:peer-checked:text-zinc-900">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0 text-sm text-zinc-700 dark:text-zinc-300">{label}</span>
    </label>
  );
}

function TextArea({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={2} className={fieldClass} />
    </div>
  );
}
