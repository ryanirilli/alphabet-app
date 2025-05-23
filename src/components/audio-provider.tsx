"use client";

import { useLetterData } from "@/lib/hooks";
import { ILetter } from "@/lib/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface IAudioContext {
  handlePlay: () => void;
  audioUrl: string | null;
  isPlaying: boolean;
}

const AudioContext = createContext<IAudioContext | undefined>(undefined);

interface IAudioProvider {
  children: React.ReactNode;
  params: ILetter;
}

export const AudioProvider = ({ children, params }: IAudioProvider) => {
  const [_, letterData] = useLetterData(params.letter, params.category);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/text-to-speech", {
      method: "POST",
      body: JSON.stringify({
        letter: letterData?.letter,
        word: letterData?.word,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
      });
  }, [letterData]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider value={{ handlePlay, audioUrl, isPlaying }}>
      {children}
      {audioUrl && (
        <audio
          ref={audioRef}
          className="sr-only"
          controls
          preload="auto"
          onEnded={() => setIsPlaying(false)}
        >
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
