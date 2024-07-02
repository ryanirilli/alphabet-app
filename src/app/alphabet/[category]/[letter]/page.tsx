import { TCategory, categories } from "@/lib/categories";
import { redirect } from "next/navigation";
import { Flashcard } from "@/components/flashcard";
import FullPageMobile from "@/components/full-page-mobile";
import { ILetter } from "@/lib/types";
import { useLetterData } from "@/lib/hooks";

export default function Letter({ params }: { params: ILetter }) {
  const [category, letterData] = useLetterData(params.letter, params.category);

  // Handle invalid letter and/or category
  if (!letterData) {
    if (category?.name) {
      redirect(`/alphabet/${category.name}/a`);
    }
    redirect(`/alphabet/animals/a`);
  }

  const currentIndex =
    category?.data?.findIndex(
      (letterData) =>
        letterData.letter.toLowerCase() === params.letter.toLowerCase()
    ) || 0;

  const nextIndex = (currentIndex + 1) % category!.data!.length;
  const prevIndex =
    (currentIndex - 1 + category!.data!.length) % category!.data!.length;

  const nextLetter = category!.data![nextIndex].letter;
  const prevLetter = category!.data![prevIndex].letter;

  const nextLink = `/alphabet/${params.category}/${nextLetter.toLowerCase()}`;
  const prevLink = `/alphabet/${params.category}/${prevLetter.toLowerCase()}`;

  return (
    <div className="sm:flex items-center justify-center h-screen">
      <div className="flex flex-col sm:max-w-lg w-full h-full sm:h-auto">
        <FullPageMobile />
        <Flashcard
          letterData={letterData}
          nextLink={nextLink}
          prevLink={prevLink}
        />
      </div>
    </div>
  );
}
