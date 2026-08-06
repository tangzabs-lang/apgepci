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
    <main className="flex-1 bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
        >
          <div className="h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl sm:h-[42rem] sm:w-[42rem]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0">Plateforme de gestion et de pilotage d&apos;entreprise</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Toute votre entreprise,{" "}
              <span className="text-blue-600">structurée et pilotée</span>{" "}
              en un seul endroit
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              APGEPCI centralise votre organisation, vos clients, vos ventes, vos achats,
              votre stock et vos équipes — puis vous aide à comparer vos objectifs à vos
              résultats, secteur par secteur.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="btn btn-primary px-6 py-3.5 text-base"
              >
                Créer mon compte
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="btn btn-outline px-6 py-3.5 text-base"
              >
                Se connecter
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Multi-entreprises · Multi-secteurs · Données séparées et sécurisées
            </p>
          </div>

          {/* Product preview mockup */}
          <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
            <div className="rounded-2xl border border-blue-100 bg-white/70 p-2 shadow-[0_40px_80px_-40px_rgba(30,64,175,0.55)] backdrop-blur sm:p-3">
              <div className="rounded-lg border border-slate-200 bg-white">
                <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                  <span className="ml-3 text-xs font-medium text-slate-400">
                    Tableau de bord — Ventes
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-6">
                  {[
                    { label: "Ventes du mois", value: "12,4M FCFA", tone: "text-blue-600" },
                    { label: "Objectif atteint", value: "87%", tone: "text-emerald-600" },
                    { label: "Nouveaux clients", value: "34", tone: "text-slate-900" },
                    { label: "Écart budget", value: "-4%", tone: "text-amber-600" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-xl border border-blue-100 bg-blue-50/60 p-3"
                    >
                      <p className="text-[11px] text-slate-500">{kpi.label}</p>
                      <p className={`mt-1 text-lg font-semibold ${kpi.tone}`}>{kpi.value}</p>
                    </div>
                  ))}
                </div>
                <div className="hidden gap-3 px-6 pb-6 sm:flex">
                  <div className="flex h-32 flex-1 items-end gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                    {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 rounded-sm bg-blue-500/70"
                      />
                    ))}
                  </div>
                  <div className="flex w-48 flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                    {["Clients", "Articles", "Commerciaux"].map((row) => (
                      <div key={row} className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">{row}</span>
                        <span className="h-1.5 w-14 overflow-hidden rounded-full bg-blue-100">
                          <span className="block h-full w-2/3 rounded-full bg-blue-500" />
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
      <section className="border-t border-blue-100 bg-linear-to-b from-blue-50/70 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Vos informations méritent mieux qu&apos;un cahier ou un fichier Excel
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Beaucoup d&apos;entreprises gèrent encore leurs données dans plusieurs outils
              non connectés. Résultat : des informations perdues, des doublons et des
              décisions retardées.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {PAIN_POINTS.map((point) => (
              <div
                key={point.title}
                className="card card-hover p-5"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Comment ça marche
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              De la description de votre entreprise au pilotage de vos résultats, en
              quatre étapes.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.number} className="relative">
                <span className="text-3xl font-black text-blue-200">
                  {step.number}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
        className="scroll-mt-16 border-t border-blue-100 bg-linear-to-b from-blue-50/70 to-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Un module pour chaque partie de votre activité
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Activez uniquement les modules dont vous avez besoin. Chacun reste relié
              aux autres pour éviter les ressaisies.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card card-hover p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
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
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Trois modèles, pour aller à votre rythme
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
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
                    ? "border-slate-900 bg-blue-600 text-white shadow-xl"
                    : "border-slate-200 bg-white "
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Le plus choisi
                  </span>
                )}
                <h3
                  className={`text-lg font-semibold ${
                    tier.highlighted ? "" : "text-slate-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.highlighted
                      ? "text-slate-300"
                      : "text-slate-500"
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
                            ? "text-blue-400"
                            : "text-blue-600"
                        }`}
                      />
                      <span
                        className={`min-w-0 ${
                          tier.highlighted
                            ? "text-slate-100"
                            : "text-slate-600"
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
        className="scroll-mt-16 border-t border-blue-100 bg-linear-to-b from-blue-50/70 to-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Pensé pour de nombreux secteurs d&apos;activité
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              APGEPCI adapte ses formulaires et ses rapports à votre métier, avec la
              possibilité d&apos;ajouter de nouveaux secteurs.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {SECTORS.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600"
              >
                {sector}
              </span>
            ))}
            <span className="rounded-full border border-dashed border-blue-200 px-3.5 py-1.5 text-sm text-blue-400">
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
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Vos données restent les vôtres, et personne d&apos;autre ne les voit
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Séparation stricte par entreprise, rôles précis, journal d&apos;audit
                complet : la confidentialité et la traçabilité sont pensées dès la base.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TRUST_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data model callout */}
      <section className="border-t border-blue-100 bg-linear-to-b from-blue-50/70 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Des tables et des formulaires qui s&apos;adaptent à votre organisation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
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
                  <item.icon className="h-4 w-4 shrink-0 text-blue-600" />
                  <span className="min-w-0 text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="panel-gradient relative overflow-hidden rounded-3xl px-6 py-14 text-center shadow-[0_30px_70px_-35px_rgba(30,64,175,0.9)] sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_60%)]"
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Prêt à structurer votre entreprise ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-blue-50/90 sm:text-base">
                Créez votre espace, décrivez votre activité et laissez APGEPCI vous
                proposer un modèle de gestion adapté à votre secteur.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Créer mon compte gratuitement
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
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
