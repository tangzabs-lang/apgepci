import Link from "next/link";
import { LogoLink } from "@/components/logo";

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { href: "#fonctionnalites", label: "Fonctionnalités" },
      { href: "#modeles", label: "Modèles de gestion" },
      { href: "#secteurs", label: "Secteurs couverts" },
      { href: "#comment-ca-marche", label: "Comment ça marche" },
    ],
  },
  {
    title: "Compte",
    links: [
      { href: "/signup", label: "Créer un compte" },
      { href: "/login", label: "Se connecter" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-2">
            <LogoLink href="/" height={36} />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              La plateforme qui centralise, structure et pilote les données de votre
              entreprise&nbsp;: organisation, ventes, achats, stock, RH et rapports, réunis en
              un seul endroit sécurisé.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-slate-900">
                {col.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} APGEPCI. Tous droits réservés.</p>
          <p>Chaque entreprise reste propriétaire de ses données.</p>
        </div>
      </div>
    </footer>
  );
}
