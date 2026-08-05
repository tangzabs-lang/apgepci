import Link from "next/link";

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
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white dark:bg-white dark:text-zinc-900">
                A
              </span>
              <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                APGEPCI
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              La plateforme qui centralise, structure et pilote les données de votre
              entreprise&nbsp;: organisation, ventes, achats, stock, RH et rapports, réunis en
              un seul endroit sécurisé.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {col.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} APGEPCI. Tous droits réservés.</p>
          <p>Chaque entreprise reste propriétaire de ses données.</p>
        </div>
      </div>
    </footer>
  );
}
