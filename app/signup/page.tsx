"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, ArrowRight, Loader2, Mail, User } from "lucide-react";
import { signup } from "@/lib/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField, TextField } from "@/components/auth/fields";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <AuthShell
      eyebrow="Inscription"
      title="Créer votre compte APGEPCI"
      subtitle="Vous pourrez ensuite décrire votre entreprise et créer son espace dédié."
      footer={
        <p className="text-center text-sm text-slate-500">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      }
    >
      <form action={action} className="flex flex-col gap-4">
        <TextField
          label="Nom complet"
          name="fullName"
          icon={User}
          required
          autoComplete="name"
          placeholder="Amina Koffi"
        />
        <TextField
          label="Adresse e-mail"
          name="email"
          type="email"
          icon={Mail}
          required
          autoComplete="email"
          placeholder="vous@entreprise.com"
        />
        <PasswordField
          label="Mot de passe"
          name="password"
          autoComplete="new-password"
          helperText="8 caractères minimum, avec au moins une lettre et un chiffre."
        />

        {state?.error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
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
              Création...
            </>
          ) : (
            <>
              Créer mon compte
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-slate-400">
          En créant un compte, vous acceptez que vos données soient traitées pour la gestion de
          votre espace entreprise.
        </p>
      </form>
    </AuthShell>
  );
}
