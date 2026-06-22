import { z } from "zod";

// ─── Demande de transport ─────────────────────────────────────────────────────

export const shipmentRequestSchema = z.object({
  // Informations de l'entreprise
  companyName: z.string()
    .min(2, "Nom de l'entreprise requis (min 2 caractères)")
    .max(100),
  contactName: z.string()
    .min(2, "Nom du contact requis")
    .max(100),
  email: z.string()
    .email("Adresse email invalide"),
  phone: z.string()
    .min(8, "Numéro de téléphone invalide")
    .max(20),

  // Logistique
  origin: z.string()
    .min(2, "Ville / port d'origine requis")
    .max(100),
  destination: z.enum(
    ["GUADELOUPE", "MARTINIQUE", "GUYANE", "REUNION", "MAYOTTE", "POLYNESIE", "NOUVELLE_CALEDONIE"],
    { error: "Veuillez sélectionner une destination" }
  ),

  goodsType: z.enum(
    ["PALETTE_STANDARD", "CONTENEUR_20_PIEDS", "CONTENEUR_40_PIEDS", "VRAC", "COLIS", "VEHICULE", "MARCHANDISE_DANGEREUSE", "PRODUITS_FRAIS_REFRIGERES", "AUTRE"],
    { error: "Type de marchandise requis" }
  ),
  goodsDescription: z.string().max(1000).optional(),
  weightKg: z.number({ error: "Entrez un poids en kg" })
    .positive("Le poids doit être positif")
    .optional()
    .nullable(),
  volumeM3: z.number({ error: "Entrez un volume en m³" })
    .positive("Le volume doit être positif")
    .optional()
    .nullable(),

  frequency: z.enum(
    ["PONCTUEL", "HEBDOMADAIRE", "MENSUEL", "TRIMESTRIEL", "REGULIER_AUTRE"],
    { error: "Fréquence requise" }
  ),
  desiredDate: z.string().optional().nullable(),
  comments: z.string().max(2000).optional(),

  // Honeypot anti-spam (champ caché, doit rester vide)
  website: z.string().max(0, "Champ non valide").optional(),
});

export type ShipmentRequestInput = z.infer<typeof shipmentRequestSchema>;

// ─── Inscription utilisateur ──────────────────────────────────────────────────

export const registerSchema = z.object({
  name: z.string().min(2, "Prénom/Nom requis").max(100),
  email: z.string().email("Email invalide"),
  password: z.string()
    .min(8, "Mot de passe : 8 caractères minimum")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[0-9]/, "Au moins un chiffre"),
  confirmPassword: z.string(),
  companyName: z.string().min(2, "Nom de l'entreprise requis").max(100),
  phone: z.string().min(8, "Téléphone invalide").max(20).optional(),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: "Vous devez accepter les conditions générales",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ─── Connexion ────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Inscription partenaire ───────────────────────────────────────────────────

export const partnerRegisterSchema = z.object({
  // Infos personnelles
  name: z.string().min(2).max(100),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum").regex(/[A-Z]/).regex(/[0-9]/),
  confirmPassword: z.string(),

  // Infos entreprise
  companyName: z.string().min(2).max(100),
  siret: z.string()
    .regex(/^[0-9]{14}$/, "SIRET invalide (14 chiffres sans espace)"),
  partnerType: z.enum(
    ["TRANSITAIRE", "COMMISSIONNAIRE", "TRANSPORTEUR", "LOGISTICIEN"],
    { error: "Type de partenaire requis" }
  ),
  phone: z.string().min(8).max(20),
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(100),
  postalCode: z.string().regex(/^[0-9]{5}$/, "Code postal invalide"),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
  description: z.string().min(50, "Décrivez votre activité (min 50 caractères)").max(1000),

  // Destinations couvertes
  coveredDestinations: z.array(
    z.enum(["GUADELOUPE", "MARTINIQUE", "GUYANE", "REUNION", "MAYOTTE", "POLYNESIE", "NOUVELLE_CALEDONIE"])
  ).min(1, "Sélectionnez au moins une destination"),

  acceptTerms: z.boolean().refine((v) => v === true, {
    message: "Acceptez les CGU partenaire",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type PartnerRegisterInput = z.infer<typeof partnerRegisterSchema>;

// ─── Réinitialisation mot de passe ───────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// ─── Formulaire de contact ────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, "Nom requis").max(100),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Sujet requis").max(200),
  message: z.string().min(20, "Message trop court (20 caractères minimum)").max(3000),
  // Honeypot
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ─── Réponse partenaire à une demande ─────────────────────────────────────────

export const shipmentResponseSchema = z.object({
  priceAmount: z.number()
    .positive("Le prix doit être supérieur à 0")
    .max(1000000, "Montant trop élevé"),
  estimatedTransitDays: z.number().int().positive().optional().nullable(),
  message: z.string().min(20, "Ajoutez un message (min 20 caractères)").max(2000),
});

export type ShipmentResponseInput = z.infer<typeof shipmentResponseSchema>;

// ─── Message (messagerie interne) ────────────────────────────────────────────

export const messageSchema = z.object({
  content: z.string().min(1, "Message vide").max(5000),
});

export type MessageInput = z.infer<typeof messageSchema>;
