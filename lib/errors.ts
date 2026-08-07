/**
 * Traduction des erreurs techniques (Supabase Auth, PostgreSQL, réseau) en
 * messages compréhensibles, en français, orientés « quoi faire maintenant ».
 * Aucun message brut de la base ou du fournisseur d'authentification ne doit
 * remonter jusqu'à l'utilisateur.
 */

const FALLBACK = "L'opération n'a pas abouti. Réessayez dans un instant.";

/** Erreurs d'authentification, reconnues par code puis par message. */
const AUTH_BY_CODE: Record<string, string> = {
  user_already_exists:
    "Un compte existe déjà avec cette adresse e-mail. Connectez-vous, ou utilisez « Mot de passe oublié » si vous l'avez perdu.",
  email_exists:
    "Un compte existe déjà avec cette adresse e-mail. Connectez-vous, ou utilisez « Mot de passe oublié » si vous l'avez perdu.",
  invalid_credentials: "E-mail ou mot de passe incorrect. Vérifiez votre saisie.",
  email_not_confirmed:
    "Votre adresse e-mail n'est pas encore confirmée. Ouvrez le lien de confirmation que nous vous avons envoyé.",
  weak_password:
    "Mot de passe trop simple. Utilisez au moins 8 caractères, avec des lettres et des chiffres.",
  over_email_send_rate_limit:
    "Trop d'e-mails envoyés à cette adresse. Patientez quelques minutes avant de réessayer.",
  over_request_rate_limit:
    "Trop de tentatives en peu de temps. Patientez une minute avant de réessayer.",
  same_password: "Le nouveau mot de passe doit être différent de l'ancien.",
  session_expired: "Votre session a expiré. Reconnectez-vous pour continuer.",
  signup_disabled: "Les inscriptions sont momentanément fermées.",
  validation_failed: "Certaines informations saisies sont invalides. Vérifiez le formulaire.",
};

const AUTH_BY_MESSAGE: [RegExp, string][] = [
  [/user already registered|already registered|already exists/i, AUTH_BY_CODE.user_already_exists],
  [/invalid login credentials/i, AUTH_BY_CODE.invalid_credentials],
  [/email not confirmed/i, AUTH_BY_CODE.email_not_confirmed],
  [/password should be at least/i, "Mot de passe trop court : 8 caractères minimum."],
  [/password.*(weak|pwned|compromis)/i, AUTH_BY_CODE.weak_password],
  [/unable to validate email address|invalid format/i, "Adresse e-mail invalide."],
  [/for security purposes.*after (\d+) seconds?/i, "Trop de tentatives. Patientez quelques secondes avant de réessayer."],
  [/rate limit|too many requests/i, AUTH_BY_CODE.over_request_rate_limit],
  [/jwt expired|invalid refresh token|session.*expired/i, AUTH_BY_CODE.session_expired],
  [/signups? not allowed|signup.*disabled/i, AUTH_BY_CODE.signup_disabled],
];

/** Erreurs PostgreSQL / PostgREST, reconnues par code SQLSTATE. */
const DB_BY_CODE: Record<string, string> = {
  "23505":
    "Cet enregistrement existe déjà : un code, une référence ou un e-mail identique est déjà utilisé.",
  "23503":
    "Cet élément est rattaché à d'autres données. Détachez-les d'abord, ou choisissez une autre valeur.",
  "23502": "Un champ obligatoire est vide. Complétez le formulaire avant d'enregistrer.",
  "23514": "Une valeur saisie n'est pas autorisée pour ce champ.",
  "22P02": "Le format d'une valeur est incorrect (nombre, date ou identifiant).",
  "22003": "Un montant ou une quantité dépasse la valeur maximale autorisée.",
  "22007": "Le format d'une date est incorrect.",
  "40001": "Plusieurs modifications simultanées sont entrées en conflit. Réessayez.",
  "42501": "Vous n'avez pas les droits nécessaires pour effectuer cette action.",
  "57014": "L'opération a été trop longue et a été interrompue. Réduisez la période demandée.",
  PGRST116: "Élément introuvable : il a peut-être été supprimé entre-temps.",
  PGRST301: "Votre session a expiré. Reconnectez-vous pour continuer.",
};

const DB_BY_MESSAGE: [RegExp, string][] = [
  [/row-level security|violates row-level/i, DB_BY_CODE["42501"]],
  [/duplicate key|unique constraint/i, DB_BY_CODE["23505"]],
  [/foreign key constraint/i, DB_BY_CODE["23503"]],
  [/null value in column/i, DB_BY_CODE["23502"]],
  [/fetch failed|network|econnrefused|timeout/i,
   "Connexion au serveur impossible. Vérifiez votre connexion internet, puis réessayez."],
];

function readError(error: unknown): { code?: string; message?: string } {
  if (!error) return {};
  if (typeof error === "string") return { message: error };
  if (typeof error !== "object") return {};
  const e = error as { code?: unknown; message?: unknown };
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
}

/**
 * Message utilisateur pour une erreur donnée.
 * @param fallback message affiché si l'erreur n'est pas reconnue.
 */
export function humanizeError(error: unknown, fallback: string = FALLBACK): string {
  const { code, message } = readError(error);

  if (code && AUTH_BY_CODE[code]) return AUTH_BY_CODE[code];
  if (code && DB_BY_CODE[code]) return DB_BY_CODE[code];

  if (message) {
    for (const [pattern, text] of AUTH_BY_MESSAGE) if (pattern.test(message)) return text;
    for (const [pattern, text] of DB_BY_MESSAGE) if (pattern.test(message)) return text;
  }

  return fallback;
}
