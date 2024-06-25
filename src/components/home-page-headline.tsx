"use client";

import { revealAnimation } from "@/lib/utils";
import { motion } from "framer-motion";

export default function HomePageHeadline() {
  return (
    <>
      <motion.h1
        className="text-3xl font-bold mb-2 lg:text-[64px] lg:mb-6 xl:mb-8 xl:text-[48px]"
        {...revealAnimation()}
      >
        Have fun learning the ABCs!
      </motion.h1>
      <motion.h2 className="text-xl" {...revealAnimation({ delay: 0.1 })}>
        Boost your child&apos;s alphabet skills with colorful and interactive
        flashcards
      </motion.h2>
    </>
  );
}
