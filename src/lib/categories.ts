import animals from "./categories/animals";
import cars from "./categories/cars";
// import family from "./categories/family";
import foods from "./categories/foods";
import plants from "./categories/plants";
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
  { name: "plants", data: plants },
  { name: "foods", data: foods },
  // { name: "family", data: family }, // potentially controversial AI great content
  { name: "cars", data: cars },
];
