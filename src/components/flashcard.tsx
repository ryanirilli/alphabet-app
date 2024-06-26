"use client";
import { useMemo } from "react";
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

interface IFlashcard {
  letterData: TLetterData;
  nextLink: string;
  prevLink: string;
}

export const Flashcard = ({ letterData, nextLink, prevLink }: IFlashcard) => {
  const router = useRouter();
  const cardColor = useMemo(getRandomColor, []);

  const controls = useAnimation();
  const swipeThreshold = 100;

  const handleDragEnd = (_, info: PanInfo) => {
    const { offset } = info;
    if (Math.abs(offset.x) > swipeThreshold) {
      offset.x > 0 ? router.push(prevLink) : router.push(nextLink);
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300 } });
    }
  };

  return (
    <motion.div
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
    </motion.div>
  );
};
