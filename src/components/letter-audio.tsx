"use client";
import { hoverAnimation } from "@/lib/utils";
import { AudioLines } from "lucide-react";
import { Button } from "./ui/button";
import { useAudio } from "./audio-provider";

export const LetterAudio = () => {
  const { handlePlay, audioUrl } = useAudio();

  return (
    <>
      <Button
        variant="outline"
        className={`rounded-full bg-transparent border-4 border-white w-20 h-20 ${hoverAnimation}`}
        disabled={!audioUrl}
        onClick={handlePlay}
      >
        <AudioLines strokeWidth={2} className="w-16 h-16" />
      </Button>
    </>
  );
};
