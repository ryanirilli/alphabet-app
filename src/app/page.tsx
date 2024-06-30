import HomePageCarousel from "@/components/home-page-carousel";
import HomePageHeadline from "@/components/home-page-headline";
import Link from "next/link";

const logos = [
  {
    alt: "vercel logo",
    path: "/logos/vercel-logo.svg",
  },
  {
    alt: "next.js logo",
    path: "/logos/nextjs-logo.svg",
  },
  {
    alt: "tailwindcss logo",
    path: "/logos/tailwind-logo.svg",
  },
  {
    alt: "shadcn logo",
    path: "/logos/shadcn-logo.svg",
  },
  {
    alt: "openai logo",
    path: "/logos/openai-logo.svg",
  },
];

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-500 to-cyan-500 min-h-screen">
      <section className="xl:hidden bg-homepage-hero bg-contain bg-no-repeat bg-right-top min-h-64" />
      <section className="xl:bg-homepage-hero bg-[length:680px_393px] 2xl:bg-contain bg-no-repeat bg-right-top flex flex-col justify-center items-center py-16 px-4 xl:py-32">
        <div className="container">
          <HomePageHeadline />
        </div>
      </section>
      <section>
        <div className="container pt-8 pb-8">
          <HomePageCarousel />
        </div>
      </section>
      <section className="pt-16 pb-8">
        <div className="container">
          <h2 className="text-3xl font-bold mb-2">AI Assisted Learning</h2>
          <p className="max-w-prose text-lg">
            These flashcards have been carefully crafted with the help of AI to
            generate delightful drawings and audio to bring the ABCs to life.
          </p>
          <div className="flex justify-center">
            <img
              className="center w-full max-w-3xl"
              alt="openai logo creating flashcards"
              src="/ai-assist-graphic.svg"
            />
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-800/20">
        <div className="container">
          <div className="flex justify-center sm:text-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Powered by a Dad and the Open Source Community
              </h2>
              <p className="max-w-prose text-lg">
                AI is useless without the creative minds of individuals. This
                app is free to use for everyone and I hope it helps your child
                learn the ABCs in a fun and interactive way. Built with love by{" "}
                <Link
                  className="underline"
                  href="https://buymeacoffee.com/ryanirilli"
                  target="_blank"
                >
                  Ryan Irilli
                </Link>{" "}
                with the following technologies:
              </p>
            </div>
          </div>
        </div>
        <div className="container flex flex-wrap gap-4 my-16 justify-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="p-4 opacity-75 border border-white rounded-xl"
            >
              <img alt={logo.alt} src={logo.path} className="max-w-32 h-auto" />
            </div>
          ))}
        </div>

        <section className="min-h-50" />
      </section>
    </main>
  );
}
