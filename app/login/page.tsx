"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, ArrowRight, Loader2, Mail } from "lucide-react";
import { login } from "@/lib/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField, TextField } from "@/components/auth/fields";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <AuthShell
      eyebrow="Connexion"
      title="Bon retour parmi nous"
      subtitle="Accédez à votre espace entreprise pour reprendre le pilotage de votre activité."
      footer={
        <p className="text-center text-sm text-slate-500">
          Pas encore de compte ?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:underline"
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
          <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0">{state.error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 btn btn-primary py-3"
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
