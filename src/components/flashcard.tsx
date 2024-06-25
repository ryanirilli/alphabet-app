"use client";

import Link from "next/link";
import { TLetterData } from "@/lib/categories";
import { LetterAudio } from "./letter-audio";
import { Card, CardContent } from "./ui/card";
import { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import WordImage from "./word-image";

const colors = [
  { bgColor: "bg-orange-500", textColor: "text-orange-200" },
  { bgColor: "bg-lime-500", textColor: "text-lime-200" },
  { bgColor: "bg-emerald-500", textColor: "text-emerald-200" },
  { bgColor: "bg-teal-500", textColor: "text-teal-200" },
  { bgColor: "bg-cyan-500", textColor: "text-cyan-200" },
  { bgColor: "bg-blue-500", textColor: "text-blue-200" },
  { bgColor: "bg-violet-500", textColor: "text-violet-200" },
  { bgColor: "bg-fuchsia-500", textColor: "text-fuchsia-200" },
  { bgColor: "bg-rose-500", textColor: "text-rose-200" },
];

interface IFlashcard {
  letterData: TLetterData;
  nextLink: string;
  prevLink: string;
}

export const Flashcard = ({ letterData, nextLink, prevLink }: IFlashcard) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Initial rise and slight rotation
      const risePromise = controls.start({
        y: "-20%",
        rotate: -10,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 1,
          ease: "easeOut",
        },
      });

      // Start the wiggle effect slightly after the rise begins
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Wiggle effect
      const wigglePromise = await controls.start({
        rotate: [-10, 10, -10, 0],
        transition: {
          duration: 0.5,
          yoyo: 3,
          ease: "easeInOut",
        },
      });

      // Wait for both animations to complete
      await Promise.all([risePromise, wigglePromise]);

      // Fall and bounce
      await controls.start({
        y: "0%",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.5,
          ease: "easeIn",
        },
      });
    };

    sequence();
  }, [controls]);

  const cardColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, []);

  return (
    <section className="sm:p-4 w-full h-full sm:h-auto">
      <Card
        className={`${cardColor.bgColor} ${cardColor.textColor} h-full sm:h-auto rounded-none sm:rounded-lg`}
      >
        <CardContent>
          <div className="flex flex-col items-center py-8 h-screen sm:h-[90vh]">
            <span>
              <motion.h1
                className="text-9xl font-bold"
                initial={{ y: "100%", rotate: 10, opacity: 0 }}
                animate={controls}
              >
                {letterData.letter.toUpperCase()}
                {letterData.letter.toLowerCase()}
              </motion.h1>
            </span>
            <span className="overflow-hidden">
              <motion.h2
                className="text-3xl tracking-widest"
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
            <div className="grow py-4 overflow-hidde">
              <WordImage word={letterData.word} />
            </div>
            <div className="flex justify-between w-full items-center pb-24 sm:pb-0">
              <Link href={prevLink}>
                <Button variant="ghost">
                  <ArrowLeft className="w-8 h-8" />
                </Button>
              </Link>
              <LetterAudio {...letterData} />
              <Link href={nextLink}>
                <Button variant="ghost">
                  <ArrowRight className="w-8 h-8" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
