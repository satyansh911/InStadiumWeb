export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream selection:bg-olive selection:text-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-cream flex flex-col hidden md:flex">
        <div className="p-8">
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-cream/90">
            Luxury Events
          </h2>
          <p className="font-serif italic text-cream/50 mt-2">Admin Portal</p>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 font-sans text-[10px] tracking-[0.2em] uppercase">
          <a href="/admin/dashboard" className="block px-4 py-3 bg-white/5 text-white">Dashboard</a>
          <a href="#" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Inquiries</a>
          <a href="#" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="block px-4 py-3 text-white/50 hover:bg-white/5 hover:text-white transition-colors">Press</a>
        </nav>

        <div className="p-8">
           <button className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">Log Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
