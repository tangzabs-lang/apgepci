import Link from "next/link";
import { PageHeader } from "@/components/table";

const CARDS = [
  { href: "/purchasing/suppliers", title: "Fournisseurs", description: "Répertoire des fournisseurs et conditions." },
  { href: "/purchasing/requests", title: "Demandes d'achat", description: "Créer et suivre les demandes internes." },
  { href: "/purchasing/orders", title: "Commandes fournisseurs", description: "Commandes en cours et réceptions." },
];

export default function PurchasingHome() {
  return (
    <div>
      <PageHeader title="Achats" description="Fournisseurs, demandes d'achat et commandes." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="card card-hover p-5"
          >
            <h2 className="font-semibold text-slate-900">{c.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
