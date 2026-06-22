import { cn } from "@/lib/utils";

type BadgeVariant =
  | "nouvelle"
  | "en_cours"
  | "reponses"
  | "acceptee"
  | "transit"
  | "livree"
  | "annulee"
  | "expiree"
  | "approved"
  | "pending"
  | "rejected"
  | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  nouvelle: "bg-blue-100 text-blue-800",
  en_cours: "bg-yellow-100 text-yellow-800",
  reponses: "bg-purple-100 text-purple-800",
  acceptee: "bg-[#d1fae5] text-[#065f46]",
  transit: "bg-orange-100 text-orange-800",
  livree: "bg-[#d1fae5] text-[#064e3b]",
  annulee: "bg-gray-100 text-gray-600",
  expiree: "bg-gray-100 text-gray-500",
  approved: "bg-[#d1fae5] text-[#065f46]",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-700",
  default: "bg-[var(--color-foam-dim)] text-[var(--color-channel)]",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
