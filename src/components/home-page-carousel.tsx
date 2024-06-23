"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { categories } from "@/lib/categories";
import Link from "next/link";
import { hoverAnimation } from "@/lib/utils";

export default function HomePageCarousel() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {categories.map((category, index) => (
          <CarouselItem key={index} className={`md:basis-1/2 lg:basis-1/3`}>
            <div className="p-1">
              <Link href={`/alphabet/${category.name}`}>
                <Card
                  className={`bg-white/10 border-white/20 transition-colors hover:bg-white/20`}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold capitalize">
                      {category.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
    <CarouselNext /> */}
    </Carousel>
  );
}
