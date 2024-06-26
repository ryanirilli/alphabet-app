"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
interface ILetterAndWordAnimation {
  letter: string;
  word: string;
}

export default function LetterAndWordAnimation({
  letter,
  word,
}: ILetterAndWordAnimation) {
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

  return (
    <>
      <div>
        <motion.h1
          className="text-9xl font-bold leading-tight"
          initial={{ y: "100%", rotate: 10, opacity: 0 }}
          animate={controls}
        >
          {letter.toUpperCase()}
          {letter.toLowerCase()}
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
          {word.toUpperCase()}
        </motion.h2>
      </div>
    </>
  );
}
