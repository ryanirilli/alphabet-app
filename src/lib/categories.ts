import animals from "./categories/animals";
import shapes from "./categories/shapes";
import trains from "./categories/trains";

export type TLetterData = {
  letter: string;
  word: string;
  fact: string;
};

export type TCategory = {
  name: string;
  data: TLetterData[];
};

export const categories: TCategory[] = [
  { name: "animals", data: animals },
  { name: "trains", data: trains },
  { name: "shapes", data: shapes },
];
