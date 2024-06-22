import { redirect } from "next/navigation";
import { categories } from "@/lib/categories";
export async function GET(
  _: Request,
  { params }: { params: { category: string } }
) {
  const categoryNames = categories.map((category) => category.name);
  if (!categoryNames.includes(params.category)) {
    return redirect(`/alphabet/animals/a`);
  }
  return redirect(`/alphabet/${params.category}/a`);
}
