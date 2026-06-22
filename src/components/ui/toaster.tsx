"use client";

// Toast system léger basé sur un state global simple.
// En production, on peut le remplacer par la librairie "sonner" déjà installée.
// Ce fichier expose le composant <Toaster /> à monter dans le layout racine.

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Store global minimaliste (sans Redux ni Zustand pour garder ce fichier autonome)
const listeners: Set<(toasts: Toast[]) => void> = new Set();
let toasts: Toast[] = [];

function notify(listeners: Set<(t: Toast[]) => void>, next: Toast[]) {
  toasts = next;
  listeners.forEach((fn) => fn(next));
}

export function toast(message: string, type: ToastType = "info") {
  const id = Math.random().toString(36).slice(2);
  notify(listeners, [...toasts, { id, message, type }]);
  setTimeout(() => {
    notify(listeners, toasts.filter((t) => t.id !== id));
  }, 4000);
}

toast.success = (message: string) => toast(message, "success");
toast.error = (message: string) => toast(message, "error");
toast.warning = (message: string) => toast(message, "warning");

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const colors: Record<ToastType, string> = {
  success: "bg-[#065f46] text-white",
  error: "bg-[var(--color-danger)] text-white",
  warning: "bg-[var(--color-warning)] text-white",
  info: "bg-[var(--color-abyss)] text-[var(--color-foam)]",
};

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (t: Toast[]) => setItems([...t]);
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded shadow-lg text-sm font-medium",
            "animate-in slide-in-from-right-full duration-300",
            colors[item.type]
          )}
          role="alert"
        >
          <span className="text-base" aria-hidden>
            {icons[item.type]}
          </span>
          <span>{item.message}</span>
        </div>
      ))}
    </div>
  );
}
