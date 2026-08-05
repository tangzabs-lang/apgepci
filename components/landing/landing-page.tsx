import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  History,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const PAIN_POINTS = [
  {
    title: "Informations dispersées",
    description:
      "Cahiers, fichiers Excel, WhatsApp, mémoire des responsables : les informations clés se perdent entre plusieurs supports.",
  },
  {
    title: "Doublons et erreurs de saisie",
    description:
      "Sans contrôle centralisé, les mêmes données sont ressaisies plusieurs fois, avec des écarts difficiles à détecter.",
  },
  {
    title: "Décisions retardées",
    description:
      "Sans historique fiable, impossible de comparer rapidement vos objectifs et vos résultats réels.",
  },
  {
    title: "Responsabilités floues",
    description:
      "Qui a saisi quoi, qui a validé quoi ? Sans traçabilité, il devient difficile d'identifier les responsabilités.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Décrivez votre entreprise",
    description:
      "Secteur d'activité, organigramme, services, sites : un diagnostic progressif comprend votre organisation, à votre rythme.",
  },
  {
    number: "02",
    title: "Choisissez votre modèle",
    description:
      "APGEPCI propose trois modèles adaptés — essentiel, opérationnel ou avancé — que vous pouvez comparer et personnaliser avant validation.",
  },
  {
    number: "03",
    title: "Centralisez vos données",
    description:
      "Clients, articles, ventes, achats, stock, RH : saisissez ou importez vos données dans des formulaires pensés pour votre métier.",
  },
  {
    number: "04",
    title: "Pilotez vos résultats",
    description:
      "Suivez prévisions, réalisations et écarts, générez vos rapports et exportez-les en PDF, Word ou Excel.",
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Clients & commerciaux",
    description: "Fiches clients complètes, segmentation, portefeuilles et suivi de la performance commerciale.",
  },
  {
    icon: ShoppingCart,
    title: "Ventes",
    description: "Enregistrement des ventes, statuts, analyses par article, client, commercial ou période.",
  },
  {
    icon: Wallet,
    title: "Dépenses & achats",
    description: "Catégories de dépenses, demandes d'achat, commandes fournisseurs et réceptions.",
  },
  {
    icon: Boxes,
    title: "Stock & inventaire",
    description: "Mouvements de stock, alertes de seuil, inventaires et écarts justifiés par site.",
  },
  {
    icon: TrendingUp,
    title: "Prévisions & écarts",
    description: "Objectifs par période, réalisations automatiques et analyse des écarts avec plans d'action.",
  },
  {
    icon: Briefcase,
    title: "Ressources humaines",
    description: "Fiches employés, fonctions, postes, effectifs par service et suivi des affectations.",
  },
  {
    icon: Network,
    title: "Projets & marchés",
    description: "Suivi d'avancement, budgets, dépenses, recettes et livrables de vos projets et contrats.",
  },
  {
    icon: BarChart3,
    title: "Rapports & tableaux de bord",
    description: "Requêtes, états personnalisés et tableaux de bord par métier, exportables en un clic.",
  },
];

const TIERS = [
  {
    name: "Essentiel",
    tagline: "Pour démarrer simplement",
    points: [
      "Informations indispensables uniquement",
      "Formulaires courts et rapides",
      "Relations et états de base",
      "Prise en main immédiate",
    ],
    highlighted: false,
  },
  {
    name: "Opérationnel",
    tagline: "Pour suivre précisément vos activités",
    points: [
      "Suivi détaillé avec statuts et historique",
      "Contrôles de cohérence renforcés",
      "États détaillés par période",
      "Responsabilités par service ou site",
    ],
    highlighted: true,
  },
  {
    name: "Avancé",
    tagline: "Pour piloter la performance",
    points: [
      "Objectifs, prévisions et réalisations",
      "Analyses comparatives et écarts",
      "Indicateurs et seuils d'alerte",
      "Tableaux de bord de pilotage",
    ],
    highlighted: false,
  },
];

const SECTORS = [
  "Commerce général",
  "Pharmacie",
  "Clinique & cabinet",
  "Garage & mécanique",
  "Quincaillerie",
  "Menuiserie",
  "Atelier de couture",
  "Imprimerie",
  "BTP",
  "Restauration",
  "Café & bar",
  "Hôtellerie",
  "Agriculture",
  "Aviculture & élevage",
  "Transport & transit",
  "Agence de voyage",
  "Centre de formation",
  "Établissement scolaire",
  "Import-export",
  "Distribution",
  "Sécurité & gardiennage",
  "Station-service",
  "Associations",
  "Salon de coiffure",
  "Habillement",
];

const TRUST_POINTS = [
  {
    icon: Building2,
    title: "Séparation stricte des données",
    description: "Chaque entreprise dispose de son propre espace. Aucune entreprise n'accède aux données d'une autre.",
  },
  {
    icon: Lock,
    title: "Rôles et droits d'accès",
    description: "Des permissions précises par module, par site ou par service : chacun ne voit que ce qui le concerne.",
  },
  {
    icon: History,
    title: "Journal d'audit complet",
    description: "Connexions, créations, modifications, validations : chaque action importante est tracée et consultable.",
  },
  {
    icon: ShieldCheck,
    title: "Données sensibles protégées",
    description: "Salaires, documents confidentiels, montants : accessibles uniquement aux utilisateurs autorisés.",
  },
];

export function LandingPage() {
  return (
    <main className="flex-1 bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
        >
          <div className="h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl sm:h-[42rem] sm:w-[42rem] dark:bg-blue-500/15" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0">Plateforme de gestion et de pilotage d&apos;entreprise</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
              Toute votre entreprise,{" "}
              <span className="text-blue-600 dark:text-blue-400">structurée et pilotée</span>{" "}
              en un seul endroit
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              APGEPCI centralise votre organisation, vos clients, vos ventes, vos achats,
              votre stock et vos équipes — puis vous aide à comparer vos objectifs à vos
              résultats, secteur par secteur.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Créer mon compte
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Se connecter
              </Link>
            </div>

            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
              Multi-entreprises · Multi-secteurs · Données séparées et sécurisées
            </p>
          </div>

          {/* Product preview mockup */}
          <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-2 shadow-2xl shadow-zinc-900/10 sm:rounded-2xl sm:p-3 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/40">
              <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center gap-1.5 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="ml-3 text-xs font-medium text-zinc-400 dark:text-zinc-600">
                    Tableau de bord — Ventes
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-6">
                  {[
                    { label: "Ventes du mois", value: "12,4M FCFA", tone: "text-blue-600 dark:text-blue-400" },
                    { label: "Objectif atteint", value: "87%", tone: "text-emerald-600 dark:text-emerald-400" },
                    { label: "Nouveaux clients", value: "34", tone: "text-zinc-900 dark:text-zinc-50" },
                    { label: "Écart budget", value: "-4%", tone: "text-amber-600 dark:text-amber-400" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-500">{kpi.label}</p>
                      <p className={`mt-1 text-lg font-semibold ${kpi.tone}`}>{kpi.value}</p>
                    </div>
                  ))}
                </div>
                <div className="hidden gap-3 px-6 pb-6 sm:flex">
                  <div className="flex h-32 flex-1 items-end gap-2 rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 rounded-sm bg-blue-500/70 dark:bg-blue-400/70"
                      />
                    ))}
                  </div>
                  <div className="flex w-48 flex-col gap-2 rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    {["Clients", "Articles", "Commerciaux"].map((row) => (
                      <div key={row} className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-500">{row}</span>
                        <span className="h-1.5 w-14 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                          <span className="block h-full w-2/3 rounded-full bg-blue-500 dark:bg-blue-400" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Vos informations méritent mieux qu&apos;un cahier ou un fichier Excel
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Beaucoup d&apos;entreprises gèrent encore leurs données dans plusieurs outils
              non connectés. Résultat : des informations perdues, des doublons et des
              décisions retardées.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {PAIN_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Comment ça marche
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              De la description de votre entreprise au pilotage de vos résultats, en
              quatre étapes.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.number} className="relative">
                <span className="text-3xl font-bold text-zinc-200 dark:text-zinc-800">
                  {step.number}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="fonctionnalites"
        className="scroll-mt-16 border-t border-zinc-100 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-900 dark:bg-zinc-900/40"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Un module pour chaque partie de votre activité
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Activez uniquement les modules dont vous avez besoin. Chacun reste relié
              aux autres pour éviter les ressaisies.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="modeles" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Trois modèles, pour aller à votre rythme
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Chaque module vous propose trois niveaux de gestion. Comparez-les,
              personnalisez-les, puis validez celui qui correspond à votre besoin.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  tier.highlighted
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-xl dark:border-white dark:bg-white dark:text-zinc-900"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Le plus choisi
                  </span>
                )}
                <h3
                  className={`text-lg font-semibold ${
                    tier.highlighted ? "" : "text-zinc-900 dark:text-zinc-50"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.highlighted
                      ? "text-zinc-300 dark:text-zinc-600"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {tier.tagline}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          tier.highlighted
                            ? "text-blue-400 dark:text-blue-600"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      />
                      <span
                        className={`min-w-0 ${
                          tier.highlighted
                            ? "text-zinc-100 dark:text-zinc-700"
                            : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section
        id="secteurs"
        className="scroll-mt-16 border-t border-zinc-100 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-900 dark:bg-zinc-900/40"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Pensé pour de nombreux secteurs d&apos;activité
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              APGEPCI adapte ses formulaires et ses rapports à votre métier, avec la
              possibilité d&apos;ajouter de nouveaux secteurs.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {SECTORS.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
              >
                {sector}
              </span>
            ))}
            <span className="rounded-full border border-dashed border-zinc-300 px-3.5 py-1.5 text-sm text-zinc-400 dark:border-zinc-700 dark:text-zinc-600">
              + d&apos;autres secteurs
            </span>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                Vos données restent les vôtres, et personne d&apos;autre ne les voit
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Séparation stricte par entreprise, rôles précis, journal d&apos;audit
                complet : la confidentialité et la traçabilité sont pensées dès la base.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TRUST_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data model callout */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-16 sm:py-24 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10 lg:grid-cols-3 lg:items-center dark:border-zinc-800 dark:bg-zinc-950">
            <div className="lg:col-span-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
                Des tables et des formulaires qui s&apos;adaptent à votre organisation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                Pour chaque besoin, APGEPCI propose entre cinq et sept tables prêtes à
                l&apos;emploi, que vous pouvez personnaliser : renommer un champ, ajouter
                une relation, définir un code automatique — sans connaissance technique.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: ClipboardCheck, label: "Import Excel & CSV assisté" },
                { icon: FileText, label: "Dictionnaire des données consultable" },
                { icon: Network, label: "Relations entre les informations" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <item.icon className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span className="min-w-0 text-zinc-700 dark:text-zinc-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-900 px-6 py-14 text-center sm:px-12 sm:py-20 dark:bg-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]"
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl dark:text-zinc-900">
                Prêt à structurer votre entreprise ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base dark:text-zinc-600">
                Créez votre espace, décrivez votre activité et laissez APGEPCI vous
                proposer un modèle de gestion adapté à votre secteur.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >
                  Créer mon compte gratuitement
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-800 dark:border-zinc-300 dark:text-zinc-700 dark:hover:bg-zinc-100"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
