"use client";
import { useEffect, useRef, useState } from "react";

interface IWordImage {
  word: string;
}

export default function WordImage({ word }: IWordImage) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasFetchedRef = useRef(false);
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
      draggable="false"
      className={`object-contain w-full max-h-full mix-blend-lighten transition-opacity duration-700 opacity-0 ${
        isLoaded ? "opacity-100" : ""
      }`}
      src={imageUrl as string}
    />
  );
}
