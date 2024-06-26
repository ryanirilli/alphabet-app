"use client";
import { hoverAnimation } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { AudioLines } from "lucide-react";
import { Button } from "./ui/button";

interface ILetterAudio {
  letter: string;
  word: string;
  fact: string;
}

export const LetterAudio = ({ letter, word, fact }: ILetterAudio) => {
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
        variant="outline"
        className={`rounded-full bg-transparent border-4 border-white w-20 h-20 ${hoverAnimation}`}
        disabled={!audioUrl}
        onClick={handlePlay}
      >
        <AudioLines strokeWidth={2} className="w-16 h-16" />
      </Button>
      {audioUrl && (
        <audio ref={audioRef} className="hidden" controls>
          <source src={audioUrl} type="audio/mp3" />
        </audio>
      )}
    </>
  );
};
