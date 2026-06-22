/**
 * Configuration centrale du site.
 * Toutes les pages destinations / navigation / footer puisent ici plutôt
 * que de dupliquer des données en dur dans chaque composant.
 */

export const siteConfig = {
  name: "Dom & Sea",
  tagline: "Votre partenaire logistique entre la métropole et les DOM-TOM",
  description:
    "Plateforme de mise en relation entre entreprises expéditrices, transitaires, commissionnaires de transport, transporteurs et logisticiens pour les flux France métropolitaine / DOM-TOM.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.domandsea.com",
  contactEmail: "contact@domandsea.com",
  supportEmail: "support@domandsea.com",
  phone: "+33 2 40 00 00 00",
  address: "Nantes, France",
};

export type DestinationSlug =
  | "guadeloupe"
  | "martinique"
  | "guyane"
  | "reunion"
  | "mayotte"
  | "polynesie"
  | "nouvelle-caledonie";

export interface DestinationConfig {
  slug: DestinationSlug;
  /** Valeur de l'enum Prisma Destination correspondante */
  enumValue:
    | "GUADELOUPE"
    | "MARTINIQUE"
    | "GUYANE"
    | "REUNION"
    | "MAYOTTE"
    | "POLYNESIE"
    | "NOUVELLE_CALEDONIE";
  name: string;
  region: string;
  mainPort: string;
  metropolePort: string;
  transitTimeDays: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keyFacts: { label: string; value: string }[];
  coordinates: { lat: number; lng: number };
}

export const destinations: DestinationConfig[] = [
  {
    slug: "guadeloupe",
    enumValue: "GUADELOUPE",
    name: "Guadeloupe",
    region: "Caraïbes",
    mainPort: "Port de Jarry, Pointe-à-Pitre",
    metropolePort: "Le Havre / Marseille",
    transitTimeDays: "12 à 18 jours",
    heroDescription:
      "Expédiez vos marchandises vers la Guadeloupe en toute confiance. Comparez les offres de transitaires et transporteurs spécialisés sur cette liaison.",
    metaTitle: "Transport et logistique vers la Guadeloupe",
    metaDescription:
      "Trouvez le bon transitaire pour expédier vos marchandises vers la Guadeloupe. Devis gratuit, comparaison de prestataires, suivi de votre fret maritime.",
    keyFacts: [
      { label: "Port principal", value: "Jarry, Pointe-à-Pitre" },
      { label: "Délai moyen", value: "12-18 jours" },
      { label: "Type de fret dominant", value: "Conteneurs 20/40 pieds" },
    ],
    coordinates: { lat: 16.265, lng: -61.551 },
  },
  {
    slug: "martinique",
    enumValue: "MARTINIQUE",
    name: "Martinique",
    region: "Caraïbes",
    mainPort: "Grand Port Maritime de Fort-de-France",
    metropolePort: "Le Havre / Marseille",
    transitTimeDays: "12 à 18 jours",
    heroDescription:
      "Connectez votre entreprise aux meilleurs partenaires logistiques pour vos flux vers la Martinique, de la palette au conteneur complet.",
    metaTitle: "Transport et logistique vers la Martinique",
    metaDescription:
      "Comparez les transitaires et transporteurs pour expédier vers la Martinique. Devis rapide, suivi de cargaison, partenaires vérifiés.",
    keyFacts: [
      { label: "Port principal", value: "Fort-de-France" },
      { label: "Délai moyen", value: "12-18 jours" },
      { label: "Type de fret dominant", value: "Conteneurs, vrac" },
    ],
    coordinates: { lat: 14.616, lng: -61.058 },
  },
  {
    slug: "guyane",
    enumValue: "GUYANE",
    name: "Guyane",
    region: "Amérique du Sud",
    mainPort: "Port de Dégrad des Cannes, Cayenne",
    metropolePort: "Le Havre / Marseille",
    transitTimeDays: "18 à 25 jours",
    heroDescription:
      "La Guyane impose des contraintes logistiques spécifiques (douane, délais, climat). Trouvez des partenaires qui maîtrisent cette destination.",
    metaTitle: "Transport et logistique vers la Guyane",
    metaDescription:
      "Expédiez vers la Guyane avec des transitaires spécialisés sur cette liaison exigeante. Comparaison de devis et suivi de votre marchandise.",
    keyFacts: [
      { label: "Port principal", value: "Dégrad des Cannes" },
      { label: "Délai moyen", value: "18-25 jours" },
      { label: "Type de fret dominant", value: "Conteneurs, matériel BTP" },
    ],
    coordinates: { lat: 4.937, lng: -52.326 },
  },
  {
    slug: "reunion",
    enumValue: "REUNION",
    name: "La Réunion",
    region: "Océan Indien",
    mainPort: "Grand Port Maritime de La Réunion, Port-Est",
    metropolePort: "Marseille / Le Havre",
    transitTimeDays: "25 à 35 jours",
    heroDescription:
      "L'Océan Indien à votre portée : comparez les solutions de transport maritime vers La Réunion, du colis isolé au conteneur dédié.",
    metaTitle: "Transport et logistique vers La Réunion",
    metaDescription:
      "Trouvez le bon partenaire pour expédier vers La Réunion. Devis gratuit, comparaison de transitaires, suivi de votre fret.",
    keyFacts: [
      { label: "Port principal", value: "Port-Est, La Réunion" },
      { label: "Délai moyen", value: "25-35 jours" },
      { label: "Type de fret dominant", value: "Conteneurs réfrigérés, vrac" },
    ],
    coordinates: { lat: -20.878, lng: 55.45 },
  },
  {
    slug: "mayotte",
    enumValue: "MAYOTTE",
    name: "Mayotte",
    region: "Océan Indien",
    mainPort: "Port de Longoni",
    metropolePort: "Marseille / Le Havre",
    transitTimeDays: "30 à 40 jours",
    heroDescription:
      "Mayotte demande une expertise logistique pointue. Identifiez les transporteurs qui desservent régulièrement cette destination.",
    metaTitle: "Transport et logistique vers Mayotte",
    metaDescription:
      "Expédiez vers Mayotte avec des partenaires logistiques expérimentés. Comparaison de devis et accompagnement personnalisé.",
    keyFacts: [
      { label: "Port principal", value: "Longoni" },
      { label: "Délai moyen", value: "30-40 jours" },
      { label: "Type de fret dominant", value: "Conteneurs, matériaux de construction" },
    ],
    coordinates: { lat: -12.78, lng: 45.228 },
  },
  {
    slug: "polynesie",
    enumValue: "POLYNESIE",
    name: "Polynésie française",
    region: "Pacifique",
    mainPort: "Port autonome de Papeete",
    metropolePort: "Marseille (via transbordement)",
    transitTimeDays: "35 à 50 jours",
    heroDescription:
      "La Polynésie française, destination la plus lointaine du réseau, nécessite une planification rigoureuse. Nos partenaires connaissent les rotations.",
    metaTitle: "Transport et logistique vers la Polynésie française",
    metaDescription:
      "Trouvez un transitaire fiable pour vos expéditions vers la Polynésie française. Devis, comparaison d'offres, suivi de cargaison.",
    keyFacts: [
      { label: "Port principal", value: "Papeete" },
      { label: "Délai moyen", value: "35-50 jours" },
      { label: "Type de fret dominant", value: "Conteneurs avec transbordement" },
    ],
    coordinates: { lat: -17.535, lng: -149.569 },
  },
  {
    slug: "nouvelle-caledonie",
    enumValue: "NOUVELLE_CALEDONIE",
    name: "Nouvelle-Calédonie",
    region: "Pacifique",
    mainPort: "Port autonome de Nouméa",
    metropolePort: "Marseille (via transbordement)",
    transitTimeDays: "35 à 45 jours",
    heroDescription:
      "Vers la Nouvelle-Calédonie, choisissez un partenaire qui maîtrise les rotations longues et les formalités douanières spécifiques.",
    metaTitle: "Transport et logistique vers la Nouvelle-Calédonie",
    metaDescription:
      "Comparez les transitaires spécialisés sur la Nouvelle-Calédonie. Devis gratuit et suivi de votre marchandise jusqu'à Nouméa.",
    keyFacts: [
      { label: "Port principal", value: "Nouméa" },
      { label: "Délai moyen", value: "35-45 jours" },
      { label: "Type de fret dominant", value: "Conteneurs, équipements miniers" },
    ],
    coordinates: { lat: -22.276, lng: 166.458 },
  },
];

export function getDestinationBySlug(
  slug: string
): DestinationConfig | undefined {
  return destinations.find((d) => d.slug === slug);
}

export const mainNavigation = [
  { label: "Accueil", href: "/" },
  {
    label: "Destinations",
    href: "/destinations",
    children: destinations.map((d) => ({
      label: d.name,
      href: `/destinations/${d.slug}`,
    })),
  },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavigation = {
  plateforme: [
    { label: "Obtenir un devis", href: "/devis" },
    { label: "Devenir partenaire", href: "/devenir-partenaire" },
    { label: "Connexion", href: "/connexion" },
  ],
  entreprise: [
    { label: "À propos", href: "/a-propos" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Conditions générales", href: "/cgu" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
} as const;
