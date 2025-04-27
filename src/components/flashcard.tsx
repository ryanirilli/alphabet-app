"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TLetterData, categories } from "@/lib/categories";
import { getRandomColor } from "@/lib/utils";
import { LetterAudio } from "./letter-audio";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import WordImage from "./word-image";
import LetterAndWordAnimation from "./letter-and-word-animation";
import { PanInfo, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const swipeThreshold = 50;

interface IFlashcard {
  letterData: TLetterData;
  nextLink: string;
  prevLink: string;
  category: string;
}

export const Flashcard = ({
  letterData,
  nextLink,
  prevLink,
  category,
}: IFlashcard) => {
  const router = useRouter();
  const [direction, setDirection] = useState<
    "left" | "right" | "up" | "down" | null
  >(null);
  const cardColor = useMemo(getRandomColor, []);
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);
    if (absY > swipeThreshold && absY > absX) {
      if (offset.y < 0) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    } else if (absX > swipeThreshold) {
      if (offset.x > 0) {
        setDirection("right");
      } else {
        setDirection("left");
      }
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 300 },
      });
    }
  };

  useEffect(() => {
    controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    });
  }, [controls]);

  useEffect(() => {
    if (direction) {
      const currentCategoryIndex = categories.findIndex(
        (c) => c.name === category
      );
      const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      const prevCategoryIndex =
        (currentCategoryIndex - 1 + categories.length) % categories.length;
      const nextCategoryName = categories[nextCategoryIndex].name;
      const prevCategoryName = categories[prevCategoryIndex].name;
      const letterPath = letterData.letter.toLowerCase();

      controls
        .start({
          x:
            direction === "left"
              ? -window.innerWidth
              : direction === "right"
              ? window.innerWidth
              : 0,
          y:
            direction === "up"
              ? -window.innerHeight
              : direction === "down"
              ? window.innerHeight
              : 0,
          rotate: direction === "left" ? -15 : direction === "right" ? 15 : 0,
          opacity: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        })
        .then(() => {
          if (direction === "left") {
            router.push(nextLink);
          } else if (direction === "right") {
            router.push(prevLink);
          } else if (direction === "up") {
            router.push(`/alphabet/${nextCategoryName}/${letterPath}`);
          } else {
            router.push(`/alphabet/${prevCategoryName}/${letterPath}`);
          }
        });
    }
  }, [
    direction,
    controls,
    nextLink,
    prevLink,
    category,
    letterData.letter,
    router,
  ]);

  return (
    <motion.div
      initial={{ y: 20 }}
      drag={true}
      onDragEnd={handleDragEnd}
      animate={controls}
      transition={{ type: "tween", ease: "linear" }}
      className="touch-none"
    >
      <Card
        className={`${cardColor.bgColor} ${cardColor.textColor} w-full h-full rounded-none sm:p-4 sm:h-auto sm:rounded-lg`}
      >
        <CardContent>
          <div className="flex flex-col items-center justify-between h-dvh sm:h-[80vh]">
            <LetterAndWordAnimation
              letter={letterData.letter}
              word={letterData.word}
            />
            <div className="grow py-4 overflow-hidden">
              <WordImage word={letterData.word} />
            </div>
            <div className="flex justify-between w-full items-center pb-4 md:pb-0">
              <Button asChild variant="ghost" className="rounded-full">
                <Link href={prevLink}>
                  <ArrowLeft className="w-8 h-8" />
                  <span className="sr-only">Navigate to the previous card</span>
                </Link>
              </Button>

              <LetterAudio />

              <Button asChild variant="ghost" className="rounded-full">
                <Link href={nextLink}>
                  <ArrowRight className="w-8 h-8" />
                  <span className="sr-only">Navigate to the next card</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
