"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, ShieldCheck, Truck, Clock, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AboutPage() {
  return (
    <div className="bg-[#FFFDF5] selection:bg-primary/10">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col gap-32 pb-32"
      >
        {/* Editorial Hero */}
        <section className="pt-40 pb-20 text-center overflow-hidden relative">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-col gap-12 relative z-10">
            <div className="flex flex-col gap-6 items-center">
               <motion.span 
                 variants={fadeInUp}
                 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary"
               >
                 Our Journey
               </motion.span>
               <motion.h1 
                 variants={fadeInUp}
                 className="font-serif text-[56px] lg:text-[100px] leading-[0.9] tracking-tighter text-foreground lowercase italic"
               >
                 Made with love, <br /> <span className="not-italic">forever.</span>
               </motion.h1>
            </div>
            <motion.p 
              variants={fadeInUp}
              className="text-[16px] lg:text-[20px] font-medium text-foreground/40 max-w-2xl mx-auto leading-relaxed italic"
            >
              Kahaani was born from a simple belief: that every relationship is a unique story that deserves to be printed on the world's most beautiful paper.
            </motion.p>
          </div>
        </section>

        {/* The Studio Story Section */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <motion.div 
               variants={fadeInUp}
               className="relative aspect-[4/5] lg:aspect-square rounded-[4rem] overflow-hidden shadow-2xl shadow-primary/5"
             >
                <Image 
                  src="https://images.unsplash.com/photo-1544816153-094595e86976?q=80&w=2000&auto=format&fit=crop" 
                  alt="Our Craftsmanship" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
             </motion.div>
             <motion.div 
                variants={staggerContainer}
                className="flex flex-col gap-10"
             >
               <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Founded 2024</span>
                  <h2 className="font-serif text-[42px] lg:text-[64px] leading-tight tracking-tight text-foreground lowercase italic">Born in New Delhi.</h2>
               </motion.div>
               <motion.div variants={fadeInUp} className="flex flex-col gap-6 text-[16px] lg:text-[18px] text-foreground/50 leading-relaxed font-medium">
                  <p>
                     The digital age has made our most precious memories ephemeral. We take thousands of photos, yet we rarely touch them. We wanted to bring back the tactile joy of holding a memory in your hands.
                  </p>
                  <p>
                     What started as a small studio for handcrafted wedding albums has grown into India's leading platform for personalized storytelling. Every book we produce is more than just paper and ink—it's a celebration of your journey, your love, and your legacy.
                  </p>
               </motion.div>
               <motion.div 
                 variants={fadeInUp}
                 className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.3em] py-8 border-y border-foreground/5"
               >
                  <Heart className="h-5 w-5 fill-primary" />
                  <span>Handcrafted for your legacy</span>
               </motion.div>
             </motion.div>
          </div>
        </section>

        {/* The Kahaani Promise - Grid Section */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
           <div className="rounded-[5rem] bg-white border border-foreground/5 p-12 lg:p-24 flex flex-col gap-24 shadow-sm shadow-primary/5">
              <div className="flex flex-col gap-6 text-center max-w-2xl mx-auto">
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">The Studio Standard</span>
                 <h2 className="font-serif text-[42px] lg:text-[64px] tracking-tight text-foreground lowercase italic">Uncompromising <span className="not-italic">Quality.</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   {
                     icon: Sparkles,
                     title: "Gold Foiling",
                     desc: "Every cover is individually stamped with high-quality gold or silver foil for a truly luxury touch."
                   },
                   {
                     icon: ShieldCheck,
                     title: "Archival Paper",
                     desc: "Our paper is acid-free and museum-grade, ensuring your photos won't fade for a hundred years."
                   },
                   {
                     icon: Truck,
                     title: "White Glove Delivery",
                     desc: "From Srinagar to Kanyakumari, we deliver your stories safely with specialized, secure shipping partners."
                   }
                 ].map((pillar, i) => (
                   <motion.div 
                     key={i}
                     variants={fadeInUp}
                     className="flex flex-col gap-8 p-10 rounded-[3rem] bg-background border border-foreground/5 hover:border-primary/20 transition-all group"
                   >
                      <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                         <pillar.icon size={28} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col gap-4">
                         <h3 className="font-serif text-2xl italic tracking-tight text-foreground lowercase">{pillar.title}</h3>
                         <p className="text-[14px] text-foreground/40 leading-relaxed font-medium">{pillar.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Philosophy / Made in India Section */}
        <section className="mx-auto max-w-4xl px-6 text-center flex flex-col gap-12 pt-20">
           <motion.div variants={fadeInUp} className="flex justify-center">
              <Clock className="h-10 w-10 text-primary opacity-20" />
           </motion.div>
           <motion.h2 
             variants={fadeInUp}
             className="font-serif text-[36px] lg:text-[52px] leading-tight tracking-tight text-foreground lowercase italic"
           >
             Your memories, <span className="not-italic">our canvas.</span>
           </motion.h2>
           <motion.p 
             variants={fadeInUp}
             className="text-[16px] lg:text-[18px] text-foreground/40 leading-relaxed italic font-medium"
           >
             We take pride in every single book. Our team in New Delhi reviews every layout, optimizes every photo, and ensures that when you open your Kahaani Book, it feels like opening a piece of your heart.
           </motion.p>
           
           <motion.div 
             variants={fadeInUp}
             className="pt-10 flex flex-col items-center gap-6"
           >
              <div className="h-20 w-20 rounded-full bg-white border border-foreground/5 shadow-xl shadow-primary/5 flex items-center justify-center relative overflow-hidden group">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border-2 border-dashed border-primary/10 rounded-full"
                 />
                 <span className="font-serif italic text-2xl text-primary drop-shadow-sm">K</span>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Proudly Made in India</span>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20">Studio HQ • Green Park, New Delhi</p>
              </div>
           </motion.div>
        </section>

        {/* Call to Action */}
        <section className="pb-40">
           <div className="mx-auto max-w-xl px-6 text-center">
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col gap-8 items-center"
              >
                 <p className="font-serif text-2xl text-foreground font-medium">Ready to tell your story?</p>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="h-16 px-12 rounded-full bg-primary text-white font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 flex items-center gap-4"
                 >
                    Start Creating <ArrowRight size={18} strokeWidth={3} />
                 </motion.button>
              </motion.div>
           </div>
        </section>
      </motion.div>
    </div>
  );
}
