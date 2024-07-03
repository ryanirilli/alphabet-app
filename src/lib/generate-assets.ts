import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { categories, TLetterData } from "./categories";
import OpenAI from "openai";
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import axios from "axios";

config();

const newCategories: string[] = ["music"];

type TRegenerateLetter = { categoryName: string; letters: string[] };
const regenerateLetters: TRegenerateLetter[] = [
  // {
  //   categoryName: "",
  //   letters: [],
  // },
];

const cats = regenerateLetters.length
  ? categories.filter((cat) => {
      const categoryToRegenrate = regenerateLetters.find(
        (r) => r.categoryName === cat.name
      );
      console.log("categoryToRegenrate", categoryToRegenrate);
      if (!categoryToRegenrate) {
        return false;
      }
      if (categoryToRegenrate.letters.length) {
        cat.data = cat.data.filter((letter) =>
          categoryToRegenrate.letters.includes(letter.letter)
        );
        return true;
      }
      return false;
    })
  : newCategories.length
  ? categories.filter((cat) => newCategories.includes(cat.name))
  : categories;

const shouldOverwriteImageIfExists = false;
const shouldOverwriteAudioIfExists = false;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async function () {
  for (const category of cats) {
    for (const letterData of category.data) {
      console.log(`Generating assets for ${letterData.word}`);
      await generateImage(
        category.name,
        letterData.word,
        letterData.fact,
        shouldOverwriteImageIfExists
      );
      await generateAudio(letterData, shouldOverwriteAudioIfExists);

      console.log(`Assets generated for ${letterData.word}`);
    }
  }
})();

async function generateAudio(
  { letter, word, fact }: TLetterData,
  overwriteIfExists = false
) {
  const key = `${word}-audio`;
  try {
    const audioUrl: string | null = await kv.get(key);
    if (audioUrl && !overwriteIfExists) {
      console.log(`Audio URL already exists in KV: ${audioUrl}`);
      return;
    }

    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: `${letter} is for ${word}! ${fact}`,
    });

    const audioBuffer = Buffer.from(await response.arrayBuffer());

    const { url } = await put(key, audioBuffer, {
      access: "public",
      contentType: "audio/mp3",
    });

    await kv.set(key, url);

    console.log(`Audio URL stored in KV: ${url}`);
  } catch (error) {
    console.error("Error generating audio:", error);
  }
}

async function generateImage(
  category: string,
  word: string,
  fact: string,
  overwriteIfExists = false,
  imagePath?: string
) {
  try {
    const key = `${word}-image`;

    // Check if the image URL already exists in KV
    const existingUrl = await kv.get(key);
    if (existingUrl && !overwriteIfExists) {
      console.log(`Image URL already exists in KV: ${existingUrl}`);
      return;
    }

    let imageBuffer: Buffer;

    if (imagePath) {
      imageBuffer = fs.readFileSync(path.resolve(imagePath));
    } else {
      // Generate the image
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `the category is ${category}, ${fact}. with this information, generate a cute crayon style drawing of a ${word} using only a white color on a black background.`,
        n: 1,
        size: "1024x1024",
      });

      const imageUrl = response.data[0].url;

      if (!imageUrl) {
        throw new Error("No image URL returned from OpenAI");
      }

      // Download the image
      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      imageBuffer = Buffer.from(imageResponse.data, "binary");
    }

    // Upload the image to Vercel Blob
    const blobResponse = await put(key, imageBuffer, {
      access: "public",
      contentType: "image/png",
    });

    const blobUrl = blobResponse.url;

    // Store the Vercel Blob URL in Vercel KV
    await kv.set(key, blobUrl);

    console.log(`Image URL stored in KV: ${blobUrl}`);
  } catch (error) {
    console.error("Error generating image:", error);
  }
}
