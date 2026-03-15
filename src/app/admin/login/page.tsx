import Link from "next/link";

export default function AdminLogin() {
  return (
    <main className="min-h-screen bg-rose flex items-center justify-center p-6 selection:bg-plum selection:text-blush">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
          <h1 className="text-blush text-4xl md:text-5xl font-light mb-4">
            Studio <span className="italic">Login</span>
          </h1>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-blush/60">
            For authorized personnel only
          </p>
        </div>

        <form className="space-y-8">
          <div className="border-b border-blush/30">
             <label className="font-sans text-[9px] tracking-[0.3em] uppercase text-blush/50 block mb-2 text-center">Admin Email</label>
             <input 
               type="email" 
               className="w-full bg-transparent border-none outline-none py-2 text-center text-blush font-serif text-xl placeholder:text-blush/20"
               placeholder="director@luxuryevents.com"
             />
          </div>
          
          <div className="border-b border-blush/30">
             <label className="font-sans text-[9px] tracking-[0.3em] uppercase text-blush/50 block mb-2 text-center">Password</label>
             <input 
               type="password" 
               className="w-full bg-transparent border-none outline-none py-2 text-center text-blush font-serif text-xl placeholder:text-blush/20"
               placeholder="••••••••"
             />
          </div>

          <div className="pt-8">
            <Link 
              href="/admin/dashboard"
              className="block w-full bg-blush text-rose font-sans text-xs uppercase tracking-[0.2em] py-5 text-center hover:bg-white transition-colors duration-300"
            >
              Authenticate
            </Link>
          </div>
        </form>

        <div className="mt-16 text-center">
           <Link href="/" className="font-sans text-[9px] tracking-[0.2em] uppercase text-blush/40 hover:text-blush transition-colors border-b border-blush/20 pb-1">
             Return to Portfolio
           </Link>
        </div>
      </div>
    </main>
  );
}
