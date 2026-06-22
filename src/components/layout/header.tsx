"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { destinations, mainNavigation } from "@/config/site";
import { Button } from "@/components/ui/button";

// ─── Logo SVG ─────────────────────────────────────────────────────────────────

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      {/* Ancre stylisée en SVG, épurée et géométrique */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="2" fill="#C8651B" />
        {/* Ligne de navigation stylisée */}
        <path
          d="M6 22 Q10 14 16 16 Q22 18 26 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Points d'escale */}
        <circle cx="6" cy="22" r="2" fill="white" />
        <circle cx="16" cy="16" r="2" fill="white" />
        <circle cx="26" cy="10" r="2" fill="white" />
      </svg>
      <span className="font-display text-xl uppercase tracking-widest text-[var(--color-abyss)] group-hover:text-[var(--color-beacon)] transition-colors">
        Dom <span className="text-[var(--color-beacon)]">&</span> Sea
      </span>
    </Link>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Ferme le menu mobile sur changement de page
  useEffect(() => {
    setMobileOpen(false);
    setDestOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-[var(--color-border-subtle)]"
          : "bg-white border-b border-[var(--color-border-subtle)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            <Link
              href="/"
              className={cn(
                "text-sm font-display uppercase tracking-wider transition-colors hover:text-[var(--color-beacon)]",
                pathname === "/" ? "text-[var(--color-beacon)]" : "text-[var(--color-abyss)]"
              )}
            >
              Accueil
            </Link>

            {/* Dropdown Destinations */}
            <div className="relative" onMouseLeave={() => setDestOpen(false)}>
              <button
                className={cn(
                  "text-sm font-display uppercase tracking-wider transition-colors hover:text-[var(--color-beacon)] flex items-center gap-1",
                  pathname.startsWith("/destinations") ? "text-[var(--color-beacon)]" : "text-[var(--color-abyss)]"
                )}
                onMouseEnter={() => setDestOpen(true)}
                onClick={() => setDestOpen(!destOpen)}
                aria-expanded={destOpen}
                aria-haspopup="true"
              >
                Destinations
                <svg className={cn("w-4 h-4 transition-transform", destOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {destOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-[var(--color-border-subtle)] rounded shadow-lg py-2 z-50"
                  onMouseEnter={() => setDestOpen(true)}
                >
                  {destinations.map((dest) => (
                    <Link
                      key={dest.slug}
                      href={`/destinations/${dest.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[var(--color-foam-dim)] hover:text-[var(--color-beacon)] transition-colors group"
                    >
                      <span className="font-medium">{dest.name}</span>
                      <span className="text-xs text-[var(--color-channel)] font-mono group-hover:text-[var(--color-beacon-dark)]">
                        {dest.region}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: "À propos", href: "/a-propos" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-display uppercase tracking-wider transition-colors hover:text-[var(--color-beacon)]",
                  pathname.startsWith(href) ? "text-[var(--color-beacon)]" : "text-[var(--color-abyss)]"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTAs desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/connexion"
              className="text-sm font-display uppercase tracking-wider text-[var(--color-channel)] hover:text-[var(--color-abyss)] transition-colors"
            >
              Connexion
            </Link>
            <Button size="sm" asChild>
              <Link href="/devis">Obtenir un devis</Link>
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <button
            className="lg:hidden p-2 rounded text-[var(--color-abyss)] hover:bg-[var(--color-foam-dim)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Menu de navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[var(--color-border-subtle)] px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="font-display uppercase tracking-wider text-sm py-2">Accueil</Link>

          {/* Destinations mobile : liste dépliée */}
          <div>
            <p className="font-display uppercase tracking-wider text-sm text-[var(--color-channel)] mb-2">
              Destinations
            </p>
            <div className="grid grid-cols-2 gap-1 pl-2">
              {destinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="text-sm py-1.5 hover:text-[var(--color-beacon)] transition-colors"
                >
                  {dest.name}
                </Link>
              ))}
            </div>
          </div>

          {[
            { label: "À propos", href: "/a-propos" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="font-display uppercase tracking-wider text-sm py-2">
              {label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-2 border-t border-[var(--color-border-subtle)]">
            <Link href="/connexion" className="font-display uppercase tracking-wider text-sm text-[var(--color-channel)] py-2">
              Connexion
            </Link>
            <Button size="md" className="w-full" asChild>
              <Link href="/devis">Obtenir un devis</Link>
            </Button>
            <Button variant="secondary" size="md" className="w-full" asChild>
              <Link href="/devenir-partenaire">Devenir partenaire</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
