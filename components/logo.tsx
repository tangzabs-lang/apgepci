import Image from "next/image";
import Link from "next/link";

const SRC = "/images/apgepci-removebg-p.png";
const NATURAL = { width: 612, height: 408 };

/**
 * Zones utiles du visuel fourni, en pixels source. Le fichier n'est jamais
 * modifié : le cadrage est purement CSS, sinon la marge transparente qui
 * entoure le dessin rendrait le logo minuscule aux tailles d'interface.
 */
const CROPS = {
  lockup: { x: 114, y: 152, width: 388, height: 76 },
  mark: { x: 114, y: 145, width: 90, height: 90 },
};

/** Logo APGEPCI, sur fond transparent : il s'adapte au fond de la page. */
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
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
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
