import Image from "next/image";
import Link from "next/link";

const LOCKUP_SRC = "/images/apgepci-logo.png";
const MARK_SRC = "/images/apgepci-mark.png";

/**
 * Logo APGEPCI. Le visuel fourni est un rendu sur fond sombre : il est donc
 * toujours présenté sur une plaque bleu nuit, quel que soit le fond de la page.
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
  if (variant === "mark") {
    return (
      <span
        className={`inline-flex shrink-0 overflow-hidden rounded-xl ring-1 ring-inset ring-white/10 ${className}`}
        style={{ width: height, height }}
      >
        <Image
          src={MARK_SRC}
          alt="APGEPCI"
          width={256}
          height={256}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-xl ring-1 ring-inset ring-white/10 ${className}`}
      style={{ height }}
    >
      <Image
        src={LOCKUP_SRC}
        alt="APGEPCI"
        width={744}
        height={240}
        priority={priority}
        className="h-full w-auto object-cover"
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
