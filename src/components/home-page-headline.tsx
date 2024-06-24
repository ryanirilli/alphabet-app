"use client";

import { revealAnimation } from "@/lib/utils";
import { motion } from "framer-motion";

export default function HomePageHeadline() {
  return (
    <>
      <motion.h1
        className="text-3xl font-bold mb-2 xl:mb-8 xl:text-[64px]"
        {...revealAnimation}
      >
        Have fun learning the ABCs!
      </motion.h1>
      <motion.h2 className="text-xl" {...revealAnimation}>
        Boost your child&apos;s alphabet skills with colorful and interactive
        flashcards.
      </motion.h2>
    </>
  );
}
