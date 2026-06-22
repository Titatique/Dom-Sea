import { PrismaClient } from "@prisma/client";

// En développement, Next.js recharge les modules à chaud (HMR), ce qui peut
// créer de nouvelles instances de PrismaClient à chaque sauvegarde et finir
// par épuiser les connexions disponibles à la base de données.
// On stocke donc l'instance sur l'objet global en dev pour la réutiliser.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
