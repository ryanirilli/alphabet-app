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
    </main>
  );
}
