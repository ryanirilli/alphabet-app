import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { categories } from "@/lib/categories";
import { getColorByIndex, hoverAnimation } from "@/lib/utils";
import { Layers, X } from "lucide-react";
import Link from "next/link";

interface IAppLayout {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IAppLayout) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="absolute right-4 top-4 z-50">
          <Button
            variant="outline"
            className={`rounded-full bg-transparent border-2 border-white w-14 h-14 ${hoverAnimation}`}
          >
            <Layers className="w-8 h-8" />
          </Button>
        </SheetTrigger>
        <SheetContent
          hideClose
          side="bottom"
          className="h-dvh sm:h-5/6 bg-slate-100 text-slate-800 overflow-auto pt-0 rounded-t-2xl"
        >
          <SheetHeader className="sticky top-0 bg-slate-100 py-4 flex flex-row items-center justify-between">
            <SheetTitle className="text-slate-800 flex text-left">
              <Layers className="w-8 h-8 mr-2" />
              Choose a category
            </SheetTitle>
            <div>
              <SheetClose>
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
          </SheetHeader>
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
        </SheetContent>
      </Sheet>
      {children}
    </>
  );
}
