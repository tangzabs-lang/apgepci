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
  "field-input mt-1.5";

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
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-blue-400 text-white shadow-[0_12px_24px_-12px_rgba(37,99,235,0.9)]">
          <ClipboardList className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Questionnaire de diagnostic initial
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
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
            <p className="text-xs text-slate-400">
              Vous pourrez revenir modifier ces réponses à tout moment.
            </p>
            <button
              type="submit"
              className="btn btn-primary w-full px-6 py-3 sm:w-auto"
            >
              Enregistrer le diagnostic
            </button>
          </div>
        </form>

        {isCompleted && (
          <div className="card mt-8 overflow-hidden">
            <div className="border-b border-blue-100 bg-linear-to-r from-blue-50 to-white px-6 py-5">
              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="min-w-0 text-xs font-semibold uppercase tracking-wide">
                  Synthèse du diagnostic
                </span>
              </div>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                {diagnostic.recommended_modules.length} modules recommandés pour votre entreprise
              </h2>
            </div>

            <div className="px-6 py-5">
              <ul className="flex flex-wrap gap-2">
                {diagnostic.recommended_modules.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-1.5 rounded-sm bg-linear-to-r from-blue-600 to-blue-500 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <Check className="h-3 w-3 shrink-0" />
                    {MODULE_LABELS[m] ?? m}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                {diagnostic.status === "validated" ? (
                  <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <Check className="h-4 w-4 shrink-0" />
                    Diagnostic validé
                  </p>
                ) : (
                  <form action={validateAction}>
                    <button
                      type="submit"
                      className="btn btn-outline"
                    >
                      Valider le diagnostic
                    </button>
                  </form>
                )}

                <Link
                  href="/dashboard"
                  className="btn btn-primary"
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
    <label className="flex min-w-0 cursor-pointer items-start gap-3 rounded-md border border-slate-200 p-3.5 transition-colors hover:border-slate-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-slate-300 text-transparent peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0 text-sm text-slate-700">{label}</span>
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
      <label className="field-label">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={2} className={fieldClass} />
    </div>
  );
}
