import Link from "next/link";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

export default function HeroSection() {


  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row page-enter">
      {/* Left Text Column: Sports Discovery */}
      <div className="w-full md:w-1/2 bg-blush pt-32 pb-24 px-6 md:px-16 flex flex-col justify-center min-h-[50vh] md:min-h-screen">
        <div className="max-w-xl">
          <p className="animate-fade-in delay-200 font-sans text-[10px] sm:text-xs text-plum/60 tracking-[0.3em] uppercase mb-8 ml-1">
            Indian Stadium Guide &mdash; Discover the Roar
          </p>
          <h1 className="animate-slide-left delay-300 text-5xl md:text-6xl lg:text-[80px] leading-[1.1] text-plum font-light mb-12">
            The Ultimate <span className="italic transition-all group-hover:pl-4 transition-all duration-700 font-medium">Stadium</span> Companion
          </h1>
          <p className="animate-fade-up delay-500 text-plum/75 text-lg leading-relaxed mb-16 max-w-md">
            Interactive guides for India&apos;s most iconic sports venues. From historical matches back to the latest live scores, we&apos;ve got you covered.
          </p>
          <Link
            href="/stadiums"
            className="animate-fade-up delay-600 inline-block bg-rose text-blush font-sans text-xs uppercase tracking-[0.2em] px-10 py-5 btn-luxury"
          >
            Explore Stadiums
          </Link>
        </div>
      </div>

      {/* Right Image Column: Stadium View */}
      <div className="animate-slide-right w-full md:w-1/2 bg-plum relative min-h-[50vh] md:min-h-screen">
        <div className="absolute inset-x-8 inset-y-8 md:inset-12 bg-white/5 pointer-events-none z-0" />
        <div className="absolute inset-0 p-6 md:p-16 flex items-center justify-center">
          <div className="relative w-full h-[60vh] md:h-[80vh] shadow-2xl shadow-plum/40 overflow-hidden group rounded-3xl bg-rose-soft">
            <img
              src="/images/stadium.jpg"
              alt="Indian Cricket Stadium View"
              className="w-full h-full object-cover object-center img-zoom saturate-[0.9] group-hover:saturate-100 relative z-10"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/60 to-transparent pointer-events-none z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
