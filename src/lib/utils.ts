import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hoverAnimation =
  "transition-transform scale-100 hover:scale-110 active:scale-95";

export const revealAnimation = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  transition: { duration: 0.75, ease: [0.25, 0.1, 0, 1] },
};
