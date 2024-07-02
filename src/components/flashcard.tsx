"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TLetterData } from "@/lib/categories";
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
}

export const Flashcard = ({ letterData, nextLink, prevLink }: IFlashcard) => {
  const router = useRouter();
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const cardColor = useMemo(getRandomColor, []);
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset } = info;
    if (Math.abs(offset.x) > swipeThreshold) {
      if (offset.x > 0) {
        setDirection("right");
      } else {
        setDirection("left");
      }
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300 } });
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
      controls
        .start({
          x: direction === "left" ? -window.innerWidth : window.innerWidth,
          rotate: direction === "left" ? -15 : 15,
          opacity: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        })
        .then(() => {
          if (direction === "left") {
            router.push(nextLink);
          } else {
            router.push(prevLink);
          }
        });
    }
  }, [direction, controls, nextLink, prevLink, router]);

  return (
    <motion.div
      initial={{ y: 20 }}
      drag="x"
      onDragEnd={handleDragEnd}
      dragConstraints={{ left: 0, right: 0 }}
      animate={controls}
      transition={{ type: "tween", ease: "linear" }}
      className="touch-none"
    >
      <Card
        className={`${cardColor.bgColor} ${cardColor.textColor} w-full h-full rounded-none sm:p-4 sm:h-auto sm:rounded-lg`}
      >
        <CardContent>
          <div className="flex flex-col items-center py-8 h-screen sm:h-[80vh]">
            <LetterAndWordAnimation
              letter={letterData.letter}
              word={letterData.word}
            />
            <div className="grow py-4 overflow-hidden">
              <WordImage word={letterData.word} />
            </div>
            <div className="flex justify-between w-full items-center pb-24 sm:pb-0">
              <Button asChild variant="ghost" className="rounded-full">
                <Link href={prevLink}>
                  <ArrowLeft className="w-8 h-8" />
                </Link>
              </Button>

              <LetterAudio />

              <Button asChild variant="ghost" className="rounded-full">
                <Link href={nextLink}>
                  <ArrowRight className="w-8 h-8" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
