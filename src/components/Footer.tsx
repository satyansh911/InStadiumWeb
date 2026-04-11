import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="w-full bg-blush bg-pinstripe py-20 md:py-28 px-6 md:px-12 border-t border-rose/15 relative">
      <div className="absolute inset-0 bg-blush/80 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <ScrollReveal direction="left" className="col-span-1 md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-light mb-8 max-w-sm text-plum">
                Experience the soul of India&apos;s most <span className="italic">iconic</span> arenas.
              </h2>
              <Link
                href="/stadiums"
                className="inline-block bg-rose text-blush font-sans text-xs uppercase tracking-[0.2em] px-10 py-5 btn-luxury hover:bg-plum"
              >
                Explore Arenas
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2} className="col-span-1 md:col-span-3">
             <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mb-6">Explore</h4>
             <ul className="space-y-4 font-serif text-lg text-plum/75">
               <li><Link href="/stadiums" className="link-underline hover:text-rose transition-colors duration-300">Stadiums</Link></li>
               <li><Link href="/about" className="link-underline hover:text-rose transition-colors duration-300">Our Story</Link></li>
               <li><Link href="/sports" className="link-underline hover:text-rose transition-colors duration-300">Sports Directory</Link></li>
               <li><Link href="/find-stadium" className="link-underline hover:text-rose transition-colors duration-300">Find Stadium</Link></li>
             </ul>
          </ScrollReveal>

          <ScrollReveal delay={3} className="col-span-1 md:col-span-4">
            <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mb-6">Contact</h4>
            <div className="space-y-6 font-serif text-plum/75">
              <p className="leading-relaxed">
                <span className="block mb-1">Presence in</span>
                Mumbai &mdash; Delhi &mdash; Bangalore
              </p>
              <p>
                <a href="mailto:hello@instadium.com" className="link-underline border-b border-rose/30 pb-1 hover:text-rose transition-colors duration-300">hello@instadium.com</a>
              </p>
              <div className="flex space-x-6 pt-6">
                <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] hover:text-rose transition-colors duration-300">Instagram</a>
                <a href="#" className="font-sans text-[10px] uppercase tracking-[0.2em] hover:text-rose transition-colors duration-300">X (Twitter)</a>
              </div>
            </div>
          </ScrollReveal>

        </div>

        <ScrollReveal className="mt-20 pt-8 border-t border-rose/15 flex flex-col md:flex-row justify-between items-center text-xs text-plum/40 font-sans tracking-[0.1em] uppercase">
          <p>&copy; {new Date().getFullYear()} Instadium.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
             {/* Portals Removed */}
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
