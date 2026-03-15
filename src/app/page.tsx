import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedStadiums from "@/components/FeaturedStadiums";
import SportsGrid from "@/components/stadium/SportsGrid";
import NearbyStadiums from "@/components/stadium/NearbyStadiums";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-rose selection:text-blush">
      <Navbar />
      <HeroSection />
      
      {/* Sports Categories */}
      <SportsGrid />

      {/* Services Divider */}
      <ScrollReveal>
        <section className="w-full bg-peach/30 py-32 px-6 flex items-center justify-center border-b border-rose/15">
          <p className="text-xl md:text-3xl max-w-4xl text-center leading-relaxed font-light text-plum/85">
            Discover India&apos;s most <span className="italic">iconic sporting arenas</span>, with interactive guides and real-time updates for fans. 
          </p>
        </section>
      </ScrollReveal>

      <FeaturedStadiums />

      <NearbyStadiums />

      <Footer />
    </main>
  );
}
