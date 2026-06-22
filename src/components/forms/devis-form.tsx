"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toaster";
import { shipmentRequestSchema, type ShipmentRequestInput } from "@/lib/validations";
import { destinations } from "@/config/site";

// ─── Données statiques des selects ────────────────────────────────────────────

const destinationOptions = destinations.map((d) => ({
  value: d.enumValue,
  label: d.name,
}));

const goodsTypeOptions = [
  { value: "PALETTE_STANDARD", label: "Palette standard" },
  { value: "CONTENEUR_20_PIEDS", label: "Conteneur 20 pieds" },
  { value: "CONTENEUR_40_PIEDS", label: "Conteneur 40 pieds" },
  { value: "VRAC", label: "Vrac" },
  { value: "COLIS", label: "Colis" },
  { value: "VEHICULE", label: "Véhicule" },
  { value: "MARCHANDISE_DANGEREUSE", label: "Marchandise dangereuse" },
  { value: "PRODUITS_FRAIS_REFRIGERES", label: "Produits frais / réfrigérés" },
  { value: "AUTRE", label: "Autre" },
];

const frequencyOptions = [
  { value: "PONCTUEL", label: "Ponctuel (une seule fois)" },
  { value: "HEBDOMADAIRE", label: "Hebdomadaire" },
  { value: "MENSUEL", label: "Mensuel" },
  { value: "TRIMESTRIEL", label: "Trimestriel" },
  { value: "REGULIER_AUTRE", label: "Régulier (autre fréquence)" },
];

// ─── Composant principal ──────────────────────────────────────────────────────

export function DevisForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ShipmentRequestInput>({
    resolver: zodResolver(shipmentRequestSchema),
    defaultValues: {
      frequency: "PONCTUEL",
    },
  });

  const onSubmit = async (data: ShipmentRequestInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Erreur lors de l'envoi");
      }

      setSubmitted(true);
      toast.success("Demande envoyée ! Vous serez contacté sous 48h.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── État de confirmation ─────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-16 h-16 bg-[var(--color-beacon)] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-3xl uppercase text-[var(--color-abyss)] mb-3">
          Demande envoyée
        </h2>
        <p className="text-[var(--color-channel)] mb-8 max-w-md mx-auto">
          Nos partenaires logistiques couvrant votre destination ont reçu votre
          demande. Vous serez contacté dans les 48 heures ouvrées.
        </p>
        <Button
          variant="secondary"
          onClick={() => router.push("/")}
        >
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  // ── Formulaire ───────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bloc 1 : Informations de l'entreprise */}
        <Card padding="lg">
          <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
            1. Votre entreprise
          </h2>
          <div className="flex flex-col gap-5">
            <Input
              {...register("companyName")}
              label="Raison sociale"
              placeholder="SAS Transport DOM..."
              error={errors.companyName?.message}
              required
            />
            <Input
              {...register("contactName")}
              label="Nom du contact"
              placeholder="Jean Dupont"
              error={errors.contactName?.message}
              required
            />
            <Input
              {...register("email")}
              type="email"
              label="Email professionnel"
              placeholder="contact@votre-entreprise.fr"
              error={errors.email?.message}
              required
            />
            <Input
              {...register("phone")}
              type="tel"
              label="Téléphone"
              placeholder="+33 2 40 00 00 00"
              error={errors.phone?.message}
              required
            />
          </div>
        </Card>

        {/* Bloc 2 : Détails de l'expédition */}
        <Card padding="lg">
          <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
            2. L'expédition
          </h2>
          <div className="flex flex-col gap-5">
            <Input
              {...register("origin")}
              label="Port / ville d'origine"
              placeholder="Le Havre, Marseille, Lyon..."
              error={errors.origin?.message}
              required
              hint="Le point de départ de vos marchandises en métropole"
            />
            <Select
              {...register("destination")}
              label="Destination"
              options={destinationOptions}
              placeholder="Sélectionnez une destination"
              error={errors.destination?.message}
              required
            />
            <Select
              {...register("goodsType")}
              label="Type de marchandise"
              options={goodsTypeOptions}
              placeholder="Type de marchandise"
              error={errors.goodsType?.message}
              required
            />
            <Textarea
              {...register("goodsDescription")}
              label="Description de la marchandise"
              placeholder="Nature exacte des produits, précautions particulières..."
              error={errors.goodsDescription?.message}
            />
          </div>
        </Card>

        {/* Bloc 3 : Poids, volume, timing */}
        <Card padding="lg">
          <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
            3. Volume et planning
          </h2>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("weightKg", { valueAsNumber: true })}
                type="number"
                label="Poids estimé (kg)"
                placeholder="1500"
                error={errors.weightKg?.message}
                hint="Poids total brut"
              />
              <Input
                {...register("volumeM3", { valueAsNumber: true })}
                type="number"
                label="Volume estimé (m³)"
                placeholder="12"
                error={errors.volumeM3?.message}
              />
            </div>
            <Select
              {...register("frequency")}
              label="Fréquence d'expédition"
              options={frequencyOptions}
              error={errors.frequency?.message}
              required
            />
            <Input
              {...register("desiredDate")}
              type="date"
              label="Date d'expédition souhaitée"
              error={errors.desiredDate?.message}
              hint="Date à laquelle la marchandise doit partir"
            />
          </div>
        </Card>

        {/* Bloc 4 : Commentaires */}
        <Card padding="lg">
          <h2 className="font-display text-xl uppercase text-[var(--color-abyss)] mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
            4. Informations complémentaires
          </h2>
          <div className="flex flex-col gap-5">
            <Textarea
              {...register("comments")}
              label="Commentaires libres"
              placeholder="Contraintes particulières, matières dangereuses, demandes spéciales..."
              className="min-h-[180px]"
              error={errors.comments?.message}
            />
            {/* Honeypot — caché des utilisateurs réels, visible des bots */}
            <div className="hidden" aria-hidden="true">
              <input
                {...register("website")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Bouton de soumission */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="submit"
          size="xl"
          loading={submitting}
          className="sm:min-w-[280px]"
        >
          Envoyer ma demande
        </Button>
        <p className="text-sm text-[var(--color-channel)]">
          Gratuit · Sans engagement · Réponse sous 48h
        </p>
      </div>
    </form>
  );
}
