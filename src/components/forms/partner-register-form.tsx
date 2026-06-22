"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import {
  partnerRegisterSchema,
  type PartnerRegisterInput,
} from "@/lib/validations";
import { destinations } from "@/config/site";

const partnerTypes = [
  { value: "TRANSITAIRE", label: "Transitaire" },
  { value: "COMMISSIONNAIRE", label: "Commissionnaire de transport" },
  { value: "TRANSPORTEUR", label: "Transporteur" },
  { value: "LOGISTICIEN", label: "Logisticien" },
] as const;

export function PartnerRegisterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartnerRegisterInput>({
    resolver: zodResolver(partnerRegisterSchema),
    defaultValues: { coveredDestinations: [] },
  });

  const selectedDestinations = watch("coveredDestinations") ?? [];
  const selectedType = watch("partnerType");

  const toggleDestination = (value: string) => {
    const current = selectedDestinations;
    const next = current.includes(value as never)
      ? current.filter((d) => d !== value)
      : [...current, value as never];
    setValue("coveredDestinations", next, { shouldValidate: true });
  };

  const onSubmit = async (data: PartnerRegisterInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/partenaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Erreur lors de l'envoi");
      }

      setSubmitted(true);
      toast.success("Candidature envoyée !");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-[var(--color-beacon)] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-3xl uppercase text-[var(--color-abyss)] mb-3">
          Candidature envoyée
        </h2>
        <p className="text-[var(--color-channel)] mb-8 max-w-md mx-auto">
          Notre équipe examine votre dossier. Vous recevrez une réponse par
          email sous 3 à 5 jours ouvrés. En cas de validation, vous pourrez
          alors compléter vos justificatifs légaux (Kbis, licence, assurance).
        </p>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
      {/* Type de partenaire */}
      <Card padding="lg">
        <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-5">
          1. Type d'activité
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {partnerTypes.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue("partnerType", value, { shouldValidate: true })}
              className={cn(
                "px-4 py-4 rounded-sm border text-sm font-medium transition-colors text-center",
                selectedType === value
                  ? "border-[var(--color-beacon)] bg-[var(--color-beacon)]/5 text-[var(--color-beacon-dark)]"
                  : "border-[var(--color-border-subtle)] hover:border-[var(--color-channel)]"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {errors.partnerType && (
          <p className="text-xs text-[var(--color-danger)] mt-2">{errors.partnerType.message}</p>
        )}
      </Card>

      {/* Informations personnelles */}
      <Card padding="lg">
        <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-5">
          2. Vos identifiants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input {...register("name")} label="Nom complet" required error={errors.name?.message} />
          <Input {...register("email")} type="email" label="Email professionnel" required error={errors.email?.message} />
          <Input {...register("password")} type="password" label="Mot de passe" required error={errors.password?.message} hint="8 caractères min., 1 majuscule, 1 chiffre" />
          <Input {...register("confirmPassword")} type="password" label="Confirmer le mot de passe" required error={errors.confirmPassword?.message} />
        </div>
      </Card>

      {/* Informations entreprise */}
      <Card padding="lg">
        <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-5">
          3. Votre entreprise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input {...register("companyName")} label="Raison sociale" required error={errors.companyName?.message} />
          <Input {...register("siret")} label="SIRET" placeholder="14 chiffres sans espace" required error={errors.siret?.message} />
          <Input {...register("phone")} type="tel" label="Téléphone" required error={errors.phone?.message} />
          <Input {...register("website")} label="Site web (optionnel)" placeholder="https://..." error={errors.website?.message} />
          <Input {...register("address")} label="Adresse" required error={errors.address?.message} className="sm:col-span-2" />
          <Input {...register("city")} label="Ville" required error={errors.city?.message} />
          <Input {...register("postalCode")} label="Code postal" required error={errors.postalCode?.message} />
        </div>
        <div className="mt-5">
          <Textarea
            {...register("description")}
            label="Présentation de votre activité"
            required
            error={errors.description?.message}
            hint="Décrivez votre expertise, votre flotte, vos certifications (50 caractères min.)"
            className="min-h-[120px]"
          />
        </div>
      </Card>

      {/* Destinations couvertes */}
      <Card padding="lg">
        <h2 className="font-display text-lg uppercase text-[var(--color-abyss)] mb-5">
          4. Destinations couvertes
        </h2>
        <div className="flex flex-wrap gap-2">
          {destinations.map((dest) => {
            const active = selectedDestinations.includes(dest.enumValue as never);
            return (
              <button
                key={dest.slug}
                type="button"
                onClick={() => toggleDestination(dest.enumValue)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm border transition-colors",
                  active
                    ? "bg-[var(--color-beacon)] text-white border-[var(--color-beacon)]"
                    : "border-[var(--color-border-subtle)] text-[var(--color-channel)] hover:border-[var(--color-channel)]"
                )}
              >
                {dest.name} {active && "✓"}
              </button>
            );
          })}
        </div>
        {errors.coveredDestinations && (
          <p className="text-xs text-[var(--color-danger)] mt-2">
            {errors.coveredDestinations.message}
          </p>
        )}
      </Card>

      {/* CGU + soumission */}
      <Card padding="lg">
        <Controller
          control={control}
          name="acceptTerms"
          render={({ field }) => (
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[var(--color-beacon)]"
              />
              <span className="text-sm text-[var(--color-channel)]">
                J'accepte les conditions générales partenaires et certifie
                l'exactitude des informations fournies. Les justificatifs
                légaux (Kbis, licence, assurance) seront demandés après
                validation préliminaire du dossier.
              </span>
            </label>
          )}
        />
        {errors.acceptTerms && (
          <p className="text-xs text-[var(--color-danger)] mt-2">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" size="xl" loading={submitting} className="mt-6 w-full sm:w-auto">
          Soumettre ma candidature
        </Button>
      </Card>
    </form>
  );
}
