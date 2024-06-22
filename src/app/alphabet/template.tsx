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
import {} from "@radix-ui/react-dialog";
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
          <Button>Category</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Choose a category</DialogTitle>
            <DialogDescription>
              <ul className="text-xl flex flex-col gap-4 mt-4">
                {categories.map((category) => (
                  <li>
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
