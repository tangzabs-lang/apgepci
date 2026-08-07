"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { humanizeError } from "@/lib/errors";

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(1, { message: "Mot de passe requis." }),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Nom complet requis." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z
    .string()
    .min(8, { message: "8 caractères minimum." })
    .regex(/[a-zA-Z]/, { message: "Au moins une lettre." })
    .regex(/[0-9]/, { message: "Au moins un chiffre." }),
});

export type AuthFormState = { error?: string } | undefined;

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: humanizeError(error, "E-mail ou mot de passe incorrect. Vérifiez votre saisie.") };
  }

  redirect("/dashboard");
}

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.fullName } },
  });
  if (error) {
    return { error: humanizeError(error, "La création du compte n'a pas abouti. Réessayez.") };
  }

  // Confirmation d'e-mail activée : Supabase ne renvoie pas d'erreur pour une
  // adresse déjà inscrite (anti-énumération) mais laisse `identities` vide.
  if (data.user && data.user.identities?.length === 0) {
    return {
      error:
        "Un compte existe déjà avec cette adresse e-mail. Connectez-vous, ou utilisez « Mot de passe oublié » si vous l'avez perdu.",
    };
  }

  redirect("/onboarding");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
