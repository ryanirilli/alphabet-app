"use client";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "./audio-provider";

interface IWordImage {
  word: string;
}

export default function WordImage({ word }: IWordImage) {
  const { handlePlay } = useAudio();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const hasFetchedRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const endPosRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
    const touch = event.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLImageElement>) => {
    const touch = event.changedTouches[0];
    endPosRef.current = { x: touch.clientX, y: touch.clientY };
    checkForTap();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    startPosRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLImageElement>) => {
    endPosRef.current = { x: event.clientX, y: event.clientY };
    checkForTap();
  };

  const checkForTap = () => {
    if (startPosRef.current && endPosRef.current) {
      const deltaX = endPosRef.current.x - startPosRef.current.x;
      const deltaY = endPosRef.current.y - startPosRef.current.y;

      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        // If the movement is minimal, consider it a tap
        handlePlay();
      }
    }
    startPosRef.current = null;
    endPosRef.current = null;
  };

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }
    hasFetchedRef.current = true;
    fetch("/api/text-to-image", {
      method: "POST",
      body: JSON.stringify({ word }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ imageUrl: imgUrl }) => {
        setImageUrl(imgUrl);
      });
  }, [word]);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setIsLoaded(true);
      if (img.complete) {
        setIsLoaded(true);
      }
    }
  }, [imageUrl]);

  return (
    <img
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      alt={`picture of ${word}`}
      role="button"
      aria-pressed="false"
      draggable="false"
      className={`cursor-pointer object-contain w-full max-h-full mix-blend-lighten opacity-0 duration-700 ${
        isLoaded ? "opacity-100" : ""
      }`}
      src={imageUrl as string}
    />
  );
}
