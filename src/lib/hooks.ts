import { TCategory, TLetterData, categories } from "./categories";

export const useLetterData = (
  letter: string,
  cat: string
): [TCategory | undefined, TLetterData | undefined] => {
  const category =
    categories.find((category) => category.name === cat) || ({} as TCategory);
  const letterData = category.data?.find(
    (letterData) => letterData.letter.toLowerCase() === letter.toLowerCase()
  );
  return [category, letterData];
};
