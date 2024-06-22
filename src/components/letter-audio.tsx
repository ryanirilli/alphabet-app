"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { CirclePlay } from "lucide-react";
import { Button } from "./ui/button";

interface ILetterAudio {
  letter: string;
  word: string;
  fact: string;
  className?: string;
}

export const LetterAudio = ({
  letter,
  word,
  fact,
  className,
}: ILetterAudio) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/text-to-speech", {
      method: "POST",
      body: JSON.stringify({ letter, word, fact }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
      });
  }, [letter, word, fact]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <Button
        className={cn("hover:bg-transparent", className)}
        disabled={!audioUrl}
        variant="ghost"
        size={null}
        onClick={handlePlay}
      >
        <div>
          <CirclePlay size={64} strokeWidth={1} className="cursor-pointer" />
        </div>
      </Button>
      {audioUrl && (
        <audio ref={audioRef} className="hidden" controls>
          <source src={audioUrl} type="audio/mp3" />
        </audio>
      )}
    </>
  );
};
