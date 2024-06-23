import HomePageCarousel from "@/components/home-page-carousel";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-500 to-cyan-500 min-h-screen">
      <section className="xl:bg-homepage-hero bg-contain bg-no-repeat bg-right-top flex flex-col justify-center items-center py-16 px-4 xl:py-32">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2 xl:mb-8 xl:text-[64px]">
            Have fun learning the ABCs!
          </h1>
          <h2 className="text-xl">
            Boost your child&apos;s alphabet skills with colorful and
            interactive flashcards.
          </h2>
        </div>
      </section>
      <section className="container mt-8 mb-32">
        <HomePageCarousel />
      </section>
    </main>
  );
}
