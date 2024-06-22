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
import { hoverAnimation } from "@/lib/utils";
import { Layers } from "lucide-react";
import Link from "next/link";

interface IAppLayout {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IAppLayout) {
  return (
    <section>
      <Dialog>
        <DialogTrigger
          asChild
          className="absolute right-4 top-4 rounded-full rou"
        >
          <Button
            variant="outline"
            className={`bg-transparent border-2 border-white w-16 h-16 ${hoverAnimation}`}
          >
            <Layers className="w-8 h-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Choose a category</DialogTitle>
            <DialogDescription>
              <ul className="text-xl flex flex-col gap-4 mt-4">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/alphabet/${category.name}`}
                      key={category.name}
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-full capitalize"
                      >
                        {category.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {children}
    </section>
  );
}
