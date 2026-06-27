"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

// ─── Navigation par rôle ──────────────────────────────────────────────────────

const clientNav = [
  { label: "Tableau de bord", href: "/dashboard/client", icon: "▣" },
  { label: "Mes demandes", href: "/dashboard/client/demandes", icon: "◧" },
  { label: "Messagerie", href: "/dashboard/client/messagerie", icon: "◫" },
  { label: "Documents", href: "/dashboard/client/documents", icon: "◻" },
  { label: "Notifications", href: "/dashboard/client/notifications", icon: "◈" },
  { label: "Paramètres", href: "/dashboard/client/parametres", icon: "⊕" },
];

const partnerNav = [
  { label: "Tableau de bord", href: "/dashboard/partner", icon: "▣" },
  { label: "Demandes", href: "/dashboard/partner/demandes", icon: "◧" },
  { label: "Mes réponses", href: "/dashboard/partner/reponses", icon: "◫" },
  { label: "Mon profil", href: "/dashboard/partner/profil", icon: "◻" },
  { label: "Notifications", href: "/dashboard/partner/notifications", icon: "◈" },
];

const adminNav = [
  { label: "Vue d'ensemble", href: "/dashboard/admin", icon: "▣" },
  { label: "Utilisateurs", href: "/dashboard/admin/utilisateurs", icon: "◧" },
  { label: "Demandes", href: "/dashboard/admin/demandes", icon: "◫" },
  { label: "Partenaires", href: "/dashboard/admin/partenaires", icon: "◻" },
  { label: "Documents", href: "/dashboard/admin/documents", icon: "◈" },
  { label: "Statistiques", href: "/dashboard/admin/statistiques", icon: "⊞" },
  { label: "Blog", href: "/dashboard/admin/blog", icon: "⊡" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession() ?? {};
  const role = session?.user?.role;

  const nav =
    role === "ADMIN" ? adminNav
    : role === "PARTNER" ? partnerNav
    : clientNav;

  const roleLabel =
    role === "ADMIN" ? "Administration"
    : role === "PARTNER" ? "Espace partenaire"
    : "Espace client";

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[var(--color-abyss)] border-r border-[#233544] shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#233544]">
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="2" fill="#C8651B" />
            <path d="M6 22 Q10 14 16 16 Q22 18 26 10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="6" cy="22" r="2" fill="white" />
            <circle cx="16" cy="16" r="2" fill="white" />
            <circle cx="26" cy="10" r="2" fill="white" />
          </svg>
          <span className="font-display text-base uppercase tracking-widest text-white">
            Dom & Sea
          </span>
        </Link>
      </div>

      {/* Label de rôle */}
      <div className="px-6 py-3 border-b border-[#233544]">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-channel)]">
          {roleLabel}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Navigation dashboard">
        {nav.map(({ label, href, icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors mb-1",
                active
                  ? "bg-[var(--color-beacon)] text-white font-medium"
                  : "text-[var(--color-channel-light)] hover:bg-[var(--color-hull-light)] hover:text-[var(--color-foam)]"
              )}
            >
              <span className="text-xs font-mono" aria-hidden>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bas de sidebar : info utilisateur + déconnexion */}
      <div className="border-t border-[#233544] px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-[var(--color-foam)] truncate">
              {session?.user?.name ?? session?.user?.email}
            </p>
            <p className="text-xs text-[var(--color-channel)] truncate font-mono">
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-1.5 rounded text-[var(--color-channel)] hover:text-[var(--color-beacon)] hover:bg-[var(--color-hull-light)] transition-colors shrink-0"
            title="Déconnexion"
            aria-label="Se déconnecter"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Layout dashboard ─────────────────────────────────────────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[var(--color-foam)] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar mobile */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[var(--color-abyss)] border-b border-[#233544]">
          <Link href="/" className="font-display text-base uppercase tracking-widest text-white">
            Dom & Sea
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[var(--color-channel)] p-1"
            aria-label="Déconnexion"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
