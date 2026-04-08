"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/store/useAuth";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Simulate network delay for high-fidelity feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError(true);
      setIsLoading(false);
      // Shake animation trigger
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center p-6 selection:bg-primary/10 overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
         <motion.div 
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" 
         />
         <motion.div 
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
           className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px]" 
         />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="flex flex-col items-center gap-12 text-center mb-12">
           <div className="flex flex-col items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/20"
              >
                 <Sparkles size={32} strokeWidth={2.5} />
              </motion.div>
              <div className="flex flex-col gap-3">
                 <h1 className="font-serif text-[48px] tracking-tight text-foreground lowercase italic">Kahaani <span className="text-primary/60 not-italic font-sans font-black uppercase text-[14px] tracking-[0.4em] ml-2">Studio</span></h1>
                 <p className="text-foreground/40 text-[11px] font-black uppercase tracking-[0.3em]">Administrative Passkey Required</p>
              </div>
           </div>
        </div>

        <motion.form 
          onSubmit={handleSubmit}
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-primary/5 border border-foreground/5 flex flex-col gap-8 relative overflow-hidden"
        >
           {/* Form Content */}
           <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-4">Identifier</label>
                 <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-background border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 focus:bg-white transition-all"
                      required
                    />
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-4">Secret Word</label>
                 <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="password" 
                      placeholder="magic"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-background border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 focus:bg-white transition-all"
                      required
                    />
                 </div>
              </div>
           </div>

           <AnimatePresence>
             {error && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: "auto" }}
                 exit={{ opacity: 0, height: 0 }}
                 className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100"
               >
                  <AlertCircle size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Passkey rejected. Please try again.</span>
               </motion.div>
             )}
           </AnimatePresence>

           <button 
             type="submit"
             disabled={isLoading}
             className={`h-16 rounded-2xl bg-primary text-white font-black text-[12px] uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
           >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Unlock Studio <ArrowRight size={18} strokeWidth={3} /></>
              )}
           </button>

           <div className="flex items-center gap-4 py-4">
              <div className="h-[1px] flex-1 bg-foreground/5" />
              <span className="font-serif italic text-foreground/20 text-[14px] lowercase">or</span>
              <div className="h-[1px] flex-1 bg-foreground/5" />
           </div>

           <button 
             type="button"
             disabled
             className="h-16 rounded-2xl bg-white border border-foreground/10 text-foreground/40 font-black text-[11px] uppercase tracking-[0.2em] shadow-sm transition-all flex items-center justify-center gap-4 cursor-not-allowed"
           >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
              </svg>
              Google SSO Coming Soon
           </button>
           
           <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Authorized access only • Kahaani Internal Registry v2.0</span>
           </div>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
           <button 
             onClick={() => router.push("/")}
             className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors"
           >
              Return to Public Gallery
           </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
