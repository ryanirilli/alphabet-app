import { TCategory, categories } from "@/lib/categories";
import { redirect } from "next/navigation";
import { AnimatedLetterContent } from "@/components/animated-letter-content";
import WordImage from "@/components/word-image";

interface ILetter {
  params: {
    category: string;
    letter: string;
  };
}

export default function Letter({ params }: ILetter) {
  const category =
    categories.find((category) => category.name === params.category) ||
    ({} as TCategory);
  const letterData = category.data?.find(
    (letterData) =>
      letterData.letter.toLowerCase() === params.letter.toLowerCase()
  );

  if (!letterData) {
    redirect(`/alphabet/animals/a`);
  }

  const currentIndex =
    category.data?.findIndex(
      (letterData) =>
        letterData.letter.toLowerCase() === params.letter.toLowerCase()
    ) || 0;

  const nextIndex = (currentIndex + 1) % category.data!.length;
  const prevIndex =
    (currentIndex - 1 + category.data!.length) % category.data!.length;

  const nextLetter = category.data![nextIndex].letter;
  const prevLetter = category.data![prevIndex].letter;

  const nextLink = `/alphabet/${params.category}/${nextLetter.toLowerCase()}`;
  const prevLink = `/alphabet/${params.category}/${prevLetter.toLowerCase()}`;

  return (
    <div className="sm:flex items-center justify-center h-screen">
      <div className="flex flex-col sm:max-w-lg w-full h-full sm:h-auto">
        <AnimatedLetterContent
          letterData={letterData}
          nextLink={nextLink}
          prevLink={prevLink}
        >
          <WordImage word={letterData.word} />
        </AnimatedLetterContent>
      </div>
    </div>
  );
}
