import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { categories } from "@/lib/categories";
import { getColorByIndex, hoverAnimation } from "@/lib/utils";
import { Layers } from "lucide-react";
import Link from "next/link";

interface IAppLayout {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IAppLayout) {
  return (
    <section>
      <Dialog>
        <DialogTrigger asChild className="absolute right-4 top-4 z-50">
          <Button
            variant="outline"
            className={`rounded-full bg-transparent border-2 border-white w-14 h-14 ${hoverAnimation}`}
          >
            <Layers className="w-8 h-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-3xl bg-slate-100 text-slate-800">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Layers className="w-8 h-8 mr-2" />
              Choose a category
            </DialogTitle>
            <DialogDescription>
              <ul className="text-xl flex flex-col gap-4 mt-4">
                {categories.map((category, i) => {
                  const color = getColorByIndex(i);
                  return (
                    <li key={category.name}>
                      <Button
                        asChild
                        className={`w-full rounded-full capitalize text-white ${color.bgColor} ${color.bgHover} focus-visible:ring-blue-400 focus-visible:ring-offset-0`}
                      >
                        <Link
                          href={`/alphabet/${category.name}`}
                          key={category.name}
                        >
                          {category.name}
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {children}
    </section>
  );
}
