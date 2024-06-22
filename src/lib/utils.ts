import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hoverAnimation =
  "transition-transform scale-100 hover:scale-110 active:scale-95";
