import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind en résolvant les conflits (ex: deux
 * définitions de padding) et en filtrant les valeurs falsy.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date au format français long (ex: "12 juin 2026").
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Formate une date courte avec l'heure (ex: "12/06/2026 à 14:32").
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Formate un montant en euros (ex: 1234.5 -> "1 234,50 €").
 */
export function formatCurrency(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

/**
 * Formate un poids en kg avec séparateur de milliers français.
 */
export function formatWeight(kg: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(kg)} kg`;
}

/**
 * Formate un volume en m³.
 */
export function formatVolume(m3: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(m3)} m³`;
}

/**
 * Génère un slug URL-safe à partir d'un texte (ex: pour les articles de blog).
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Génère une référence de dossier lisible pour une demande de transport,
 * affichée en police mono dans les dashboards (ex: "DS-7K2N9P").
 */
export function generateRequestReference(id: string): string {
  return `DS-${id.slice(-7).toUpperCase()}`;
}

/**
 * Tronque un texte à une longueur donnée en ajoutant une ellipse.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Calcule un délai relatif simple en français (ex: "il y a 2 heures").
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "an"],
    [2592000, "mois"],
    [86400, "jour"],
    [3600, "heure"],
    [60, "minute"],
  ];

  for (const [secondsInUnit, label] of intervals) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) {
      const plural = label !== "mois" && count > 1 ? "s" : "";
      return `il y a ${count} ${label}${plural}`;
    }
  }
  return "à l'instant";
}
