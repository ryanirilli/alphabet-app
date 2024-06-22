"use client";

import Link from "next/link";
import { TLetterData } from "@/lib/categories";
import { LetterAudio } from "./letter-audio";
import { Card, CardContent } from "./ui/card";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const bgColors = [
  "bg-orange-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-rose-500",
];

interface IAnimatedLetterContent {
  letterData: TLetterData;
  nextLink: string;
  prevLink: string;
  children: React.ReactNode;
}

export const AnimatedLetterContent = ({
  letterData,
  nextLink,
  prevLink,
  children,
}: IAnimatedLetterContent) => {
  const bgColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  }, []);

  return (
    <section className="sm:p-4 w-full h-full sm:h-auto">
      <Card
        className={`${bgColor} h-full sm:h-auto rounded-none sm:rounded-lg`}
      >
        <CardContent>
          <div className="flex flex-col items-center py-8">
            <span className="overflow-hidden">
              <motion.h1
                className="text-9xl font-bold"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.25, 0.1, 0, 1] }}
              >
                {letterData.letter}
              </motion.h1>
            </span>
            <span className="overflow-hidden">
              <motion.h2
                className="text-xl tracking-widest"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.75,
                  ease: [0.25, 0.1, 0, 1],
                  delay: 0.15,
                }}
              >
                {letterData.word.toUpperCase()}
              </motion.h2>
            </span>
            {children}
            <div className="flex justify-between w-full items-center">
              <Link href={prevLink}>
                <Button variant="ghost">
                  <ArrowLeft />
                </Button>
              </Link>
              <LetterAudio {...letterData} />
              <Link href={nextLink}>
                <Button variant="ghost">
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
