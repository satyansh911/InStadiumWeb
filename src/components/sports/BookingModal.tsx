"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  sportName: string;
}

export default function BookingModal({ isOpen, onClose, sportName }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-plum/60 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-blush rounded-[2.5rem] shadow-2xl overflow-hidden border border-rose/10"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-plum/30 hover:text-plum transition-colors z-10"
            >
              <X size={24} />
            </button>

            {!isSuccess ? (
              <div className="p-12">
                <div className="mb-10">
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-rose font-bold mb-4 block">Reservation</span>
                  <h2 className="text-3xl md:text-5xl font-light text-plum tracking-tight">
                    Inquire for <br />
                    <span className="italic font-serif">Stadium Tour</span>
                  </h2>
                  <p className="text-plum/40 font-sans text-xs tracking-widest mt-6 uppercase leading-relaxed">
                    Experience the grandeur of {sportName} arenas first-hand.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-rose/30 group-focus-within:text-rose transition-colors" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        className="w-full pl-14 pr-6 py-4 bg-plum/5 rounded-2xl border-none focus:ring-2 focus:ring-rose/20 font-sans text-[13px] text-plum placeholder:text-plum/20 transition-all"
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-rose/30 group-focus-within:text-rose transition-colors" size={18} />
                      <input
                        required
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-14 pr-6 py-4 bg-plum/5 rounded-2xl border-none focus:ring-2 focus:ring-rose/20 font-sans text-[13px] text-plum placeholder:text-plum/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-rose/30 group-focus-within:text-rose transition-colors" size={18} />
                    <select
                      required
                      className="w-full pl-14 pr-6 py-4 bg-plum/5 rounded-2xl border-none focus:ring-2 focus:ring-rose/20 font-sans text-[13px] text-plum appearance-none"
                    >
                      <option value="">Preferred Stadium</option>
                      <option value="wankhede">Wankhede Stadium, Mumbai</option>
                      <option value="eden">Eden Gardens, Kolkata</option>
                      <option value="narendra">Narendra Modi Stadium, Ahmedabad</option>
                      <option value="pinnacle">National Sports Centre</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-rose/30 group-focus-within:text-rose transition-colors" size={18} />
                    <input
                      required
                      type="date"
                      className="w-full pl-14 pr-6 py-4 bg-plum/5 rounded-2xl border-none focus:ring-2 focus:ring-rose/20 font-sans text-[13px] text-plum transition-all"
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-rose text-blush rounded-2xl font-sans text-[10px] tracking-[0.3em] uppercase transition-all duration-500 hover:bg-plum shadow-xl shadow-rose/20 disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin text-blush/60" size={16} />
                        Processing Registry...
                      </>
                    ) : (
                      "Secure Tour Inquiry"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-20 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-rose/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-rose/10"
                >
                  <CheckCircle2 size={40} className="text-rose" />
                </motion.div>
                <h3 className="text-3xl font-light text-plum mb-6 italic">Inquiry <span className="not-italic font-normal">Sent</span></h3>
                <p className="text-plum/30 font-sans text-xs tracking-widest uppercase max-w-sm mx-auto leading-loose">
                  Your request has been registered in our premier database. A concierge will contact you shortly to finalize your experience.
                </p>
                <button
                  onClick={onClose}
                  className="mt-12 font-sans text-[10px] uppercase tracking-[0.4em] text-rose font-bold border-b border-rose transition-all hover:tracking-[0.5em] pb-1"
                >
                  Return to Discovery
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
