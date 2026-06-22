import Link from "next/link";
import { siteConfig, destinations, footerNavigation } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-abyss)] text-[var(--color-foam)]">
      {/* Bande supérieure avec tracé de route maritime */}
      <div className="border-b border-[#233544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4 overflow-x-auto">
            {/* Ligne de navigation symbolique métropole → DOM-TOM */}
            <span className="text-xs font-mono text-[var(--color-channel)] whitespace-nowrap shrink-0">
              Paris / Le Havre / Marseille
            </span>
            <svg
              className="w-full max-w-md shrink"
              height="12"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0 6 H295"
                stroke="#5B7A8C"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <polygon points="295,3 300,6 295,9" fill="#C8651B" />
            </svg>
            <div className="flex gap-4 shrink-0">
              {destinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="text-xs font-mono text-[var(--color-channel)] hover:text-[var(--color-beacon)] transition-colors whitespace-nowrap"
                >
                  {dest.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Corps du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Bloc marque */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="2" fill="#C8651B" />
                <path d="M6 22 Q10 14 16 16 Q22 18 26 10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="6" cy="22" r="2" fill="white" />
                <circle cx="16" cy="16" r="2" fill="white" />
                <circle cx="26" cy="10" r="2" fill="white" />
              </svg>
              <span className="font-display text-xl uppercase tracking-widest text-[var(--color-foam)]">
                Dom <span className="text-[var(--color-beacon)]">&</span> Sea
              </span>
            </div>
            <p className="text-sm text-[var(--color-channel)] leading-relaxed mb-6 max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-channel)]">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="hover:text-[var(--color-beacon)] transition-colors font-mono"
              >
                {siteConfig.contactEmail}
              </a>
              <span className="font-mono">{siteConfig.phone}</span>
              <span>{siteConfig.address}</span>
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-[var(--color-channel)] mb-4">
              Plateforme
            </h3>
            <ul className="flex flex-col gap-3">
              {footerNavigation.plateforme.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-foam-dim)] hover:text-[var(--color-beacon)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-[var(--color-channel)] mb-4">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-3">
              {footerNavigation.entreprise.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-foam-dim)] hover:text-[var(--color-beacon)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-[var(--color-channel)] mb-4">
              Légal
            </h3>
            <ul className="flex flex-col gap-3">
              {footerNavigation.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-foam-dim)] hover:text-[var(--color-beacon)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-[#233544]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-channel)] font-mono">
            © {currentYear} Dom & Sea. Tous droits réservés.
          </p>
          <p className="text-xs text-[var(--color-channel)]">
            Plateforme made in Nantes 🇫🇷
          </p>
        </div>
      </div>
    </footer>
  );
}
