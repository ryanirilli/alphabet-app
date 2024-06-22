import { config } from "dotenv";
import { categories, TLetterData } from "./categories";
import OpenAI from "openai";
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import axios from "axios";

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async function () {
  for (const category of categories) {
    for (const letterData of category.data) {
      console.log(`Generating assets for ${letterData.word}`);
      await generateImage(category.name.slice(0, -1), letterData.word, false);
      await generateAudio(letterData);

      console.log(`Assets generated for ${letterData.word}`);
    }
  }
})();

async function generateAudio({ letter, word, fact }: TLetterData) {
  const key = `${word}-audio`;
  try {
    const audioUrl: string | null = await kv.get(key);
    if (audioUrl) {
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
  overwriteIfExists = false
) {
  try {
    const key = `${word}-image`;

    // Check if the image URL already exists in KV
    const existingUrl = await kv.get(key);
    if (existingUrl && !overwriteIfExists) {
      console.log(`Image URL already exists in KV: ${existingUrl}`);
      return;
    }

    // Generate the image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `the category is ${category}, generate a cute crayon drawing of a ${word} using a white color on a black background.`,
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

    // Upload the image to Vercel Blob
    const blobResponse = await put(key, imageResponse.data, {
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
