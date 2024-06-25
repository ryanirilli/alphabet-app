"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SupportMe() {
  const [isShowing, setIsShowing] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShowing(true);
    }, 60000);
  }, []);
  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="absolute w-screen flex items-center justify-between bg-rose-500 p-4 z-50 shadow-2xl"
        >
          <div className="flex items-center">
            <Button className="mr-2" size="sm" asChild>
              <Link href="https://buymeacoffee.com/ryanirilli" target="_blank">
                <Heart className="mr-1" fill="red" strokeWidth={0} /> Support
              </Link>
            </Button>
            <p>
              <span className="hidden sm:inline">
                I hope you're enjoying the app!
              </span>
              <span className="sm:hidden">Thank you!</span>
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsShowing(false)}>
            <X className="sm:mr-2" />{" "}
            <span className="hidden sm:inline">Dismiss</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
