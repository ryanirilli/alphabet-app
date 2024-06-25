import { SupportMe } from "@/components/SupportMe";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import Link from "next/link";

interface ICategory {
  children: React.ReactNode;
}

export default function Category({ children }: ICategory) {
  return (
    <>
      <SupportMe />
      {children}
    </>
  );
}
