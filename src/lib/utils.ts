import { type ClassValue, clsx } from "clsx";
import { Transition } from "framer-motion";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hoverAnimation =
  "transition-transform scale-100 hover:scale-110 active:scale-95";

export const revealAnimation = (options: Transition = {}) => {
  return {
    initial: { y: "100%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: { duration: 0.75, ease: [0.25, 0.1, 0, 1], ...options },
  };
};

export const colors = [
  {
    bgColor: "bg-orange-500",
    bgHover: "hover:bg-orange-600",
    textColor: "text-orange-200",
  },
  {
    bgColor: "bg-lime-500",
    bgHover: "hover:bg-lime-600",
    textColor: "text-lime-200",
  },
  {
    bgColor: "bg-emerald-500",
    bgHover: "hover:bg-emerald-600",
    textColor: "text-emerald-200",
  },
  {
    bgColor: "bg-teal-500",
    bgHover: "hover:bg-teal-600",
    textColor: "text-teal-200",
  },
  {
    bgColor: "bg-cyan-500",
    bgHover: "hover:bg-cyan-600",
    textColor: "text-cyan-200",
  },
  {
    bgColor: "bg-blue-500",
    bgHover: "hover:bg-blue-600",
    textColor: "text-blue-200",
  },
  {
    bgColor: "bg-violet-500",
    bgHover: "hover:bg-violet-600",
    textColor: "text-violet-200",
  },
  {
    bgColor: "bg-fuchsia-500",
    bgHover: "hover:bg-fuchsia-600",
    textColor: "text-fuchsia-200",
  },
  {
    bgColor: "bg-rose-500",
    bgHover: "hover:bg-rose-600",
    textColor: "text-rose-200",
  },
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const getColorByIndex = (index: number) => {
  const adjustedIndex = index % colors.length;
  return colors[adjustedIndex];
};
