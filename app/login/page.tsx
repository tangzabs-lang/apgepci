"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, ArrowRight, BarChart3, Layers, Loader2, Mail, ShieldCheck } from "lucide-react";
import { login } from "@/lib/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField, TextField } from "@/components/auth/fields";

const PANEL_POINTS = [
  { icon: Layers, label: "Toute votre organisation centralisée en un seul espace" },
  { icon: BarChart3, label: "Prévisions, réalisations et écarts en un coup d'œil" },
  { icon: ShieldCheck, label: "Données séparées par entreprise et journal d'audit complet" },
];

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <AuthShell
      panelEyebrow="Espace entreprise"
      panelTitle="Toute votre entreprise, structurée et pilotée en un seul endroit."
      panelPoints={PANEL_POINTS}
      eyebrow="Connexion"
      title="Bon retour parmi nous"
      subtitle="Accédez à votre espace entreprise pour reprendre le pilotage de votre activité."
      footer={
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Pas encore de compte ?{" "}
          <Link
            href="/signup"
            className="font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
          >
            Créer un compte
          </Link>
        </p>
      }
    >
      <form action={action} className="flex flex-col gap-4">
        <TextField
          label="Adresse e-mail"
          name="email"
          type="email"
          icon={Mail}
          required
          autoComplete="email"
          placeholder="vous@entreprise.com"
        />
        <PasswordField label="Mot de passe" name="password" autoComplete="current-password" />

        {state?.error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0">{state.error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connexion...
            </>
          ) : (
            <>
              Se connecter
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
}
