"use client";

import { useEffect, useState } from "react";
import { getInquiries } from "@/api";
import Link from "next/link";
import { LogOut, Calendar, Mail, User, MapPin, Grid, MessageSquare, Files } from "lucide-react";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshInquiries();
  }, []);

  const refreshInquiries = async () => {
    setLoading(true);
    const { data } = await getInquiries();
    if (data) {
      setInquiries(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blush p-6 md:p-12 lg:p-24 selection:bg-rose selection:text-blush">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-start mb-24">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-light text-plum">
              Studio <span className="italic">Dashboard</span>
            </h1>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mt-4">Authorized Personnel Only</p>
          </div>
          
          <Link 
            href="/admin/login" 
            className="flex items-center space-x-2 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 hover:text-rose transition-colors duration-300 border border-rose/10 px-6 py-3 bg-white shadow-sm"
          >
            <span>Logout</span>
            <LogOut size={14} />
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content: Inquiries */}
          <section className="lg:col-span-8">
            <div className="flex justify-between items-end border-b border-rose/25 pb-4 mb-12">
               <h2 className="text-2xl font-serif text-plum">Recent Inquiries</h2>
               <button onClick={refreshInquiries} className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/40 hover:text-rose transition-colors">Refresh</button>
            </div>
            
            {loading ? (
              <div className="space-y-6">
                {[1,2,3].map(i => <div key={i} className="h-24 bg-rose/5 animate-pulse" />)}
              </div>
            ) : (
              <div className="space-y-6">
                {inquiries.map((inq, idx) => (
                   <div key={inq.id}  style={{ animationDelay: `${idx * 100}ms` }} className="animate-reveal group bg-white border border-rose/5 p-8 hover:shadow-xl hover:shadow-rose/10 transition-all duration-500">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 bg-rose/10 flex items-center justify-center text-rose font-sans text-xs font-bold">
                               {inq.name.charAt(0)}
                             </div>
                             <div>
                               <h3 className="text-xl font-serif text-plum">{inq.name}</h3>
                               <p className="font-sans text-[10px] tracking-[0.1em] text-plum/40 uppercase">{inq.email}</p>
                             </div>
                          </div>
                          <div className="flex flex-wrap gap-4 text-[10px] font-sans tracking-[0.15em] uppercase text-plum/60">
                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-rose" /> {inq.event_type}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-rose" /> {inq.location || 'TBD'}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 text-right">
                           <span className={`font-sans text-[9px] tracking-[0.2em] uppercase px-4 py-1.5 ${inq.status === 'new' || !inq.status ? 'bg-rose text-blush shadow-lg shadow-rose/20' : 'bg-rose/10 text-rose'}`}>
                             {inq.status || 'New'}
                           </span>
                           <Link 
                            href={`mailto:${inq.email}`}
                            className="text-[10px] font-sans tracking-[0.2em] uppercase text-plum/40 hover:text-rose transition-colors duration-300"
                           >
                             Reply via Email
                           </Link>
                        </div>
                      </div>
                   </div>
                ))}
                {inquiries.length === 0 && (
                  <div className="py-24 text-center bg-rose/5 italic font-serif text-plum/40 rounded-lg">No inquiries yet.</div>
                )}
              </div>
            )}
          </section>

          {/* Sidebar: Navigation & Quick Stats */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-plum p-10 text-blush shadow-2xl shadow-plum/30">
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-60 mb-8">System Summary</h3>
               <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                     <p className="text-3xl font-light mb-1">{inquiries.length}</p>
                     <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Inquiries</p>
                  </div>
                  <div>
                     <p className="text-3xl font-light mb-1">6</p>
                     <p className="font-sans text-[9px] tracking-[0.2em] uppercase opacity-40">Projects</p>
                  </div>
               </div>
               <nav className="space-y-2 border-t border-white/5 pt-8">
                  <Link href="/portfolio" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <Grid size={14} /> Projects
                  </Link>
                  <Link href="/press" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <Files size={14} /> Press Features
                  </Link>
                  <Link href="/client/portal" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <User size={14} /> Sample Portal
                  </Link>
                  <Link href="/inquiry" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 transition-colors font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">
                     <MessageSquare size={14} /> Form Preview
                  </Link>
               </nav>
            </div>

            <div className="border border-plum/10 p-10 bg-white/30 backdrop-blur-sm">
               <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/50 mb-8">Resources</h3>
               <ul className="space-y-6">
                  <li>
                    <Link href="/" className="group flex justify-between items-center py-2 border-b border-rose/10 hover:border-rose transition-all">
                      <span className="font-serif text-plum italic">Global Homepage</span>
                      <LogOut size={12} className="rotate-180 opacity-20 group-hover:opacity-100" />
                    </Link>
                  </li>
               </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
