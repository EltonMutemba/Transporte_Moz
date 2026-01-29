import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para fundir classes do Tailwind de forma inteligente,
 * evitando conflitos (ex: 'p-4 p-2' vira apenas 'p-2').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}