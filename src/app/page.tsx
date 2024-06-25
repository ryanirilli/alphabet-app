import HomePageCarousel from "@/components/home-page-carousel";
import HomePageHeadline from "@/components/home-page-headline";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-500 to-cyan-500 min-h-screen">
      <section className="xl:hidden bg-homepage-hero bg-contain bg-no-repeat bg-right-top min-h-64" />
      <section className="xl:bg-homepage-hero bg-contain bg-no-repeat bg-right-top flex flex-col justify-center items-center py-16 px-4 xl:py-32">
        <div className="container">
          <HomePageHeadline />
        </div>
      </section>
      <section className="container pt-8 pb-32">
        <HomePageCarousel />
      </section>
      <section className="py-16">
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
      <section className="min-h-80" />
    </main>
  );
}
