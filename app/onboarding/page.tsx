import { createClient } from "@/lib/supabase/server";
import { createCompany } from "@/lib/actions/companies";
import { OnboardingForm } from "./onboarding-form";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { Building2 } from "lucide-react";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: sectors } = await supabase
    .from("sectors")
    .select("id, key, name")
    .eq("is_active", true)
    .order("name");

  return (
    <OnboardingShell step={1}>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-blue-400 text-white shadow-[0_12px_24px_-12px_rgba(37,99,235,0.9)]">
          <Building2 className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Créer votre espace entreprise
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
          Ces informations permettent à APGEPCI d&apos;adapter les modules et les modèles de
          gestion proposés à votre activité. Vous pourrez les modifier à tout moment.
        </p>

        <OnboardingForm sectors={sectors ?? []} action={createCompany} />
      </div>
    </OnboardingShell>
  );
}
