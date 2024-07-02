"use client";

import { useLetterData } from "@/lib/hooks";
import { ILetter } from "@/lib/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface IAudioContext {
  handlePlay: () => void;
  audioUrl: string | null;
}

const AudioContext = createContext<IAudioContext | undefined>(undefined);

interface IAudioProvider {
  children: React.ReactNode;
  params: ILetter;
}

export const AudioProvider = ({ children, params }: IAudioProvider) => {
  const [_, letterData] = useLetterData(params.letter, params.category);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
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

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <AudioContext.Provider value={{ handlePlay, audioUrl }}>
      {children}
      {audioUrl && (
        <audio ref={audioRef} className="hidden" controls>
          <source src={audioUrl} type="audio/mp3" />
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
