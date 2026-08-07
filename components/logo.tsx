import Image from "next/image";
import Link from "next/link";

const SRC = "/images/apgepci.png";
const NATURAL = { width: 1536, height: 1024 };

/**
 * Zones utiles du visuel fourni, en pixels source. Le fichier n'est jamais
 * modifié : le cadrage est purement CSS, sinon le logo occuperait moins d'un
 * tiers de l'image et resterait illisible aux tailles d'interface.
 */
const CROPS = {
  lockup: { x: 250, y: 340, width: 1040, height: 300 },
  mark: { x: 265, y: 345, width: 260, height: 260 },
};

/**
 * Logo APGEPCI. Le visuel fourni est un rendu sur fond sombre : il est donc
 * toujours présenté sur une plaque foncée, quel que soit le fond de la page.
 */
export function Logo({
  variant = "lockup",
  className = "",
  height = 36,
  priority,
}: {
  variant?: "lockup" | "mark";
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  const crop = CROPS[variant];
  const width = (height * crop.width) / crop.height;
  const scale = height / crop.height; // pixels affichés par pixel source

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-xl bg-[#3d3d3d] ring-1 ring-inset ring-white/10 ${className}`}
      style={{ width, height }}
    >
      <Image
        src={SRC}
        alt="APGEPCI"
        width={NATURAL.width}
        height={NATURAL.height}
        priority={priority}
        className="absolute max-w-none"
        style={{
          width: NATURAL.width * scale,
          height: NATURAL.height * scale,
          left: -crop.x * scale,
          top: -crop.y * scale,
        }}
      />
    </span>
  );
}

/** Logo cliquable renvoyant vers `href`. */
export function LogoLink({
  href = "/",
  variant = "lockup",
  height = 36,
  className = "",
  priority,
}: {
  href?: string;
  variant?: "lockup" | "mark";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} aria-label="APGEPCI — accueil" className={`inline-flex ${className}`}>
      <Logo variant={variant} height={height} priority={priority} />
    </Link>
  );
}
