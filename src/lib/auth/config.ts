import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import type { UserRole } from "@prisma/client";

// ─── Types augmentés ──────────────────────────────────────────────────────────
// NextAuth v5 utilise TypeScript module augmentation pour typer les données
// custom qu'on ajoute au JWT et à la session.

declare module "next-auth" {
  interface User {
    role: UserRole;
    companyName?: string | null;
    status: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
      companyName?: string | null;
      status: string;
    };
  }
}

// ─── Configuration NextAuth ────────────────────────────────────────────────────

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  // Stratégie JWT : les données utilisateur sont encodées dans le cookie,
  // ce qui évite une requête DB à chaque requête pour vérifier la session.
  session: { strategy: "jwt" },

  pages: {
    signIn: "/connexion",
    error: "/connexion",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // 1. Valider le format des données reçues
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // 2. Chercher l'utilisateur en base
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            passwordHash: true,
            role: true,
            status: true,
            companyName: true,
            image: true,
          },
        });

        if (!user || !user.passwordHash) return null;

        // 3. Vérifier le mot de passe avec bcrypt
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) return null;

        // 4. Vérifier que le compte n'est pas suspendu / supprimé
        if (user.status === "SUSPENDED" || user.status === "DELETED") {
          throw new Error("ACCOUNT_SUSPENDED");
        }

        // 5. Log de connexion
        await prisma.activityLog.create({
          data: {
            userId: user.id,
            action: "USER_LOGIN",
            entityType: "User",
            entityId: user.id,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          companyName: user.companyName,
          status: user.status,
        };
      },
    }),
  ],

  callbacks: {
    // Encode les données custom dans le JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyName = user.companyName;
        token.status = user.status;
      }
      return token;
    },

    // Expose les données custom dans la session client
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.companyName = token.companyName as string | null;
        session.user.status = token.status as string;
      }
      return session;
    },
  },

  // Clé de signature du JWT — doit être une chaîne aléatoire forte en prod.
  // Générer avec : openssl rand -base64 32
  secret: process.env.AUTH_SECRET,

  // Debug en développement uniquement
  debug: process.env.NODE_ENV === "development",
});
