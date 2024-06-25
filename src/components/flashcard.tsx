"use client";

import Link from "next/link";
import { TLetterData } from "@/lib/categories";
import { LetterAudio } from "./letter-audio";
import { Card, CardContent } from "./ui/card";
import { useEffect, useMemo, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import WordImage from "./word-image";
import { getRandomColor } from "@/lib/utils";

interface IFlashcard {
  letterData: TLetterData;
  nextLink: string;
  prevLink: string;
}

export const Flashcard = ({ letterData, nextLink, prevLink }: IFlashcard) => {
  const controls = useAnimation();
  const isMountedRef = useRef(true);

  useEffect(() => {
    const sequence = async () => {
      isMountedRef.current = true;
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
      if (!isMountedRef.current) return;
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
      if (!isMountedRef.current) return;
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
    return () => {
      controls.stop();
      isMountedRef.current = false;
    };
  }, [controls]);

  const cardColor = useMemo(getRandomColor, []);

  return (
    <Card
      className={`${cardColor.bgColor} ${cardColor.textColor} w-full h-full rounded-none sm:p-4 sm:h-auto sm:rounded-lg`}
    >
      <CardContent>
        <div className="flex flex-col items-center py-8 h-screen sm:h-[80vh]">
          <div>
            <motion.h1
              className="text-9xl font-bold leading-tight"
              initial={{ y: "100%", rotate: 10, opacity: 0 }}
              animate={controls}
            >
              {letterData.letter.toUpperCase()}
              {letterData.letter.toLowerCase()}
            </motion.h1>
          </div>
          <div className="overflow-clip">
            <motion.h2
              className="text-3xl leading-normal tracking-widest"
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
          </div>
          <div className="grow py-4 overflow-hidden">
            <WordImage word={letterData.word} />
          </div>
          <div className="flex justify-between w-full items-center pb-24 sm:pb-0">
            <Button asChild variant="ghost" className="rounded-full">
              <Link href={prevLink}>
                <ArrowLeft className="w-8 h-8" />
              </Link>
            </Button>

            <LetterAudio {...letterData} />

            <Button asChild variant="ghost" className="rounded-full">
              <Link href={nextLink}>
                <ArrowRight className="w-8 h-8" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
