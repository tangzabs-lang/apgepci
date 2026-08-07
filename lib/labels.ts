/**
 * Libellés français des valeurs techniques stockées en base (statuts, étapes,
 * priorités, types). L'interface ne doit jamais afficher `pending_approval`
 * ou `partially_delivered` tel quel.
 */

const STATUS: Record<string, string> = {
  // cycle de vie générique
  draft: "Brouillon",
  active: "Actif",
  inactive: "Inactif",
  archived: "Archivé",
  trashed: "Corbeille",
  published: "Publié",
  tested: "Testé",
  in_review: "En révision",
  submitted: "Soumis",
  validated: "Validé",
  rejected: "Rejeté",
  completed: "Terminé",
  cancelled: "Annulé",
  closed: "Clôturé",
  suspended: "Suspendu",
  pending: "En attente",
  failed: "Échec",

  // ventes
  delivered: "Livré",
  partially_delivered: "Partiellement livré",

  // dépenses
  requested: "Demandée",
  pending_approval: "En attente de validation",
  approved: "Approuvée",
  paid: "Payée",

  // achats
  sent: "Envoyée",
  confirmed: "Confirmée",
  partially_received: "Partiellement reçue",
  received: "Reçue",
  converted: "Convertie en commande",

  // projets et tâches
  on_hold: "En pause",
  in_progress: "En cours",
  blocked: "Bloquée",
  done: "Terminée",
  open: "Ouverte",
  assigned: "Affectée",
  answered: "Répondue",
  commented: "Commentée",
  treated: "Traitée",
  postponed: "Reportée",
  reopened: "Rouverte",

  // RH
  on_leave: "En congé",
  departed: "Parti",

  // CRM — prospects
  new: "Nouveau",
  contacted: "Contacté",
  qualified: "Qualifié",
  lost: "Perdu",

  // logistique
  planned: "Planifiée",
  in_transit: "En transit",
  delayed: "Retardée",
  incident: "Incident",

  // inventaire et imports
  preparing: "En préparation",
  counting: "Comptage en cours",
  reviewing: "En révision",
  mapping: "Correspondance des colonnes",
  validating: "Vérification",
  previewing: "Prévisualisation",
  delegated: "Déléguée",
  accepted: "Acceptée",
};

const STAGE: Record<string, string> = {
  new: "Nouvelle",
  qualification: "Qualification",
  proposal: "Proposition",
  negotiation: "Négociation",
  won: "Gagnée",
  lost: "Perdue",
};

const PRIORITY: Record<string, string> = {
  low: "Basse",
  normal: "Normale",
  medium: "Moyenne",
  high: "Haute",
  urgent: "Urgente",
};

const RISK: Record<string, string> = {
  low: "Faible",
  normal: "Normal",
  medium: "Moyen",
  high: "Élevé",
};

/** Libellé d'un statut ; renvoie la valeur brute mise en forme si inconnue. */
export function statusLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return STATUS[value] ?? humanizeToken(value);
}

/** Libellé d'une étape d'opportunité commerciale. */
export function stageLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return STAGE[value] ?? humanizeToken(value);
}

/** Libellé d'une priorité ou d'un niveau d'urgence. */
export function priorityLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return PRIORITY[value] ?? humanizeToken(value);
}

/** Libellé d'un niveau de risque. */
export function riskLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return RISK[value] ?? humanizeToken(value);
}

/** Dernier recours : `pending_approval` → « Pending approval ». */
function humanizeToken(value: string): string {
  const spaced = value.replace(/[_-]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
