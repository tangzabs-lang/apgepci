"use client";

import { useActionState, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Layers,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";
import type { CompanyFormState } from "@/lib/actions/companies";
import { Section } from "@/components/onboarding/section";

type Sector = { id: string; key: string; name: string };
type Step = 1 | 2;

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/5";

const STEP_LABELS: Record<Step, string> = {
  1: "Votre entreprise",
  2: "Activité & secteur",
};

export function OnboardingForm({
  sectors,
  action,
}: {
  sectors: Sector[];
  action: (state: CompanyFormState, formData: FormData) => Promise<CompanyFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [step, setStep] = useState<Step>(1);
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  function goToStep(next: Step) {
    if (next === 2) {
      const nameInput = formRef.current?.querySelector<HTMLInputElement>('input[name="name"]');
      if (nameInput && !nameInput.reportValidity()) {
        nameInput.focus();
        return;
      }
    }
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <form ref={formRef} action={formAction} className="mt-8 flex flex-col gap-5">
      <div ref={topRef} className="scroll-mt-24">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          <span>Étape {step} sur 2</span>
          <span className="text-zinc-900 dark:text-zinc-50">{STEP_LABELS[step]}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
          <div
            className="h-full rounded-full bg-zinc-900 transition-all duration-300 ease-out dark:bg-white"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <div className={`flex flex-col gap-5 ${step === 1 ? "" : "hidden"}`} aria-hidden={step !== 1}>
        <Section icon={Building2} title="Identité de l'entreprise" description="Sa raison sociale et son identité légale.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Raison sociale" name="name" required placeholder="Ex. Établissements Koffi SARL" />
            <Field label="Nom commercial" name="trade_name" placeholder="Nom utilisé au quotidien" />
            <Field label="Forme juridique" name="legal_form" placeholder="SARL, SA, entreprise individuelle..." />
            <Field label="Date de création" name="founded_date" type="date" />
          </div>
        </Section>

        <Section icon={MapPin} title="Localisation" description="Où votre entreprise est-elle implantée ?">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Pays" name="country" placeholder="Côte d'Ivoire" />
            <Field label="Ville" name="city" placeholder="Abidjan" />
            <Field label="Adresse" name="address" className="sm:col-span-2" placeholder="Adresse complète" />
          </div>
        </Section>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => goToStep(2)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 sm:w-auto dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Continuer
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={`flex flex-col gap-5 ${step === 2 ? "" : "hidden"}`} aria-hidden={step !== 2}>
        <Section icon={Users} title="Taille & fonctionnement" description="Pour calibrer le niveau de détail proposé.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nombre d'employés" name="employees_count_declared" type="number" placeholder="0" />
            <Field label="Nombre de sites" name="sites_count_declared" type="number" placeholder="1" />

            <SelectField label="Taille estimée" name="size_estimate">
              <option value="tpe">Très petite entreprise (1-10)</option>
              <option value="pme">Petite / moyenne entreprise (11-100)</option>
              <option value="grande">Grande entreprise (100+)</option>
            </SelectField>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Devise" name="currency" defaultValue="XOF" />
              <Field label="Langue" name="language" defaultValue="fr" />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Description de l&apos;activité
              </label>
              <textarea
                name="activity_description"
                rows={3}
                placeholder="Décrivez brièvement ce que fait votre entreprise..."
                className={fieldClass}
              />
            </div>
          </div>
        </Section>

        <Section icon={Layers} title="Secteur d'activité" description="Utilisé pour recommander des modèles adaptés.">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Secteur principal <span className="text-red-500">*</span>
              </label>
              <select name="primary_sector_id" required className={fieldClass}>
                <option value="">Sélectionner un secteur...</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Secteurs secondaires
              </label>
              <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                Facultatif — sélectionnez toutes les activités additionnelles concernées.
              </p>
              <div className="mt-1.5 grid max-h-48 grid-cols-1 gap-1 overflow-y-auto rounded-lg border border-zinc-300 p-2 sm:grid-cols-2 dark:border-zinc-700">
                {sectors.map((s) => (
                  <label
                    key={s.id}
                    className="flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  >
                    <input
                      type="checkbox"
                      name="secondary_sector_ids"
                      value={s.id}
                      className="h-4 w-4 shrink-0 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
                    />
                    <span className="min-w-0 truncate">{s.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {state?.error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0">{state.error}</span>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:opacity-60 sm:w-auto dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Création...
              </>
            ) : (
              <>
                Continuer vers le diagnostic
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <select name={name} className={fieldClass}>
        {children}
      </select>
    </div>
  );
}
