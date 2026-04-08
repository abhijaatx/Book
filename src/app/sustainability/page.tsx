"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Sun, Recycle, Wind, Heart, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function SustainabilityPage() {
  return (
    <div className="bg-[#FFFDF5] selection:bg-[#606c38]/10 min-h-screen">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col gap-32 pb-40"
      >
        {/* Editorial Hero */}
        <section className="pt-40 pb-20 text-center overflow-hidden relative">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-col gap-12 relative z-10">
            <div className="flex flex-col gap-6 items-center">
               <motion.span 
                 variants={fadeInUp}
                 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#606c38]"
               >
                 Our Commitment
               </motion.span>
               <motion.h1 
                 variants={fadeInUp}
                 className="font-serif text-[56px] lg:text-[100px] leading-[0.9] tracking-tighter text-foreground lowercase italic"
               >
                 A lighter <br /> <span className="not-italic">footprint.</span>
               </motion.h1>
            </div>
            <motion.p 
              variants={fadeInUp}
              className="text-[16px] lg:text-[20px] font-medium text-foreground/40 max-w-2xl mx-auto leading-relaxed italic"
            >
              At Kahaani, we believe that preserving memories shouldn't come at the cost of the environment. Every treasure we craft is a promise to the future.
            </motion.p>
          </div>
          
          {/* Subtle Decorative Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
             <Leaf size={600} strokeWidth={0.5} className="text-[#606c38]" />
          </motion.div>
        </section>

        {/* The Three Pillars Section */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: Leaf,
                  title: "FSC Certified",
                  desc: "Every sheet of paper in our studio is sourced from responsibly managed forests that provide environmental, social, and economic benefits."
                },
                {
                  icon: Recycle,
                  title: "Plastic-Free",
                  desc: "From biodegradable honeycomb wraps to compostable mailers, your order arrives in 100% plastic-free, recyclable packaging."
                },
                {
                  icon: Sun,
                  title: "Solar Studio",
                  desc: "Our New Delhi headquarters is powered by sunlight, reducing our carbon footprint and embracing the energy of the future."
                }
              ].map((pillar, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col gap-8 p-12 rounded-[4rem] bg-white border border-foreground/5 hover:border-[#606c38]/20 transition-all group shadow-sm shadow-primary/5"
                >
                   <div className="h-16 w-16 rounded-3xl bg-[#606c38]/5 flex items-center justify-center text-[#606c38] group-hover:bg-[#606c38] group-hover:text-white transition-all duration-500">
                      <pillar.icon size={32} strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col gap-4">
                      <h3 className="font-serif text-3xl italic tracking-tight text-foreground lowercase">{pillar.title}</h3>
                      <p className="text-[15px] text-foreground/40 leading-relaxed font-medium">{pillar.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Deep Dive Philosophy Section */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="rounded-[5rem] overflow-hidden bg-white border border-foreground/5 shadow-sm shadow-primary/5">
             <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto h-full">
                   <Image 
                     src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop" 
                     alt="Sustainably Sourced" 
                     fill 
                     className="object-cover"
                     unoptimized
                   />
                </div>
                <div className="p-12 lg:p-24 flex flex-col gap-12">
                   <div className="flex flex-col gap-6">
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#606c38]">The Kahaani Ethics</span>
                      <h2 className="font-serif text-[42px] lg:text-[64px] leading-tight tracking-tight text-foreground lowercase italic">Crafting for <br /> <span className="not-italic">generations.</span></h2>
                   </div>
                   <div className="flex flex-col gap-8 text-[16px] lg:text-[18px] text-foreground/50 leading-relaxed font-medium italic">
                      <p>
                         Sustainability isn't a checkbox for us—it's the foundation of everything we build. We choose archival-grade materials not just for their beauty, but because they are designed to last a lifetime, preventing the 'throwaway culture' of digital prints.
                      </p>
                      <p>
                         By producing in small batches in our New Delhi studio, we minimize waste and ensure that every scrap of paper finds a secondary purpose as a gift tag or testing swatch.
                      </p>
                   </div>
                   <div className="flex items-center gap-6 pt-6">
                      <div className="flex flex-col items-center">
                         <div className="h-12 w-12 rounded-full border border-[#606c38]/20 flex items-center justify-center text-[#606c38]">
                            <Wind size={20} />
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-3 text-[#606c38]">Low Energy</span>
                      </div>
                      <div className="flex flex-col items-center">
                         <div className="h-12 w-12 rounded-full border border-[#606c38]/20 flex items-center justify-center text-[#606c38]">
                            <Recycle size={20} />
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-3 text-[#606c38]">Circular Use</span>
                      </div>
                      <div className="flex flex-col items-center">
                         <div className="h-12 w-12 rounded-full border border-[#606c38]/20 flex items-center justify-center text-[#606c38]">
                            <Heart size={20} />
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-3 text-[#606c38]">Ethical Work</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mx-auto max-w-4xl px-6 text-center">
           <motion.div 
             variants={fadeInUp}
             className="flex flex-col gap-10 items-center"
           >
              <div className="h-16 w-16 rounded-full bg-[#606c38]/5 border border-[#606c38]/20 flex items-center justify-center text-[#606c38]">
                 <Leaf size={24} />
              </div>
              <h2 className="font-serif text-[32px] lg:text-[48px] tracking-tight text-foreground lowercase italic leading-tight">
                 Make a choice that <br /> <span className="not-italic text-[#606c38]">feels good.</span>
              </h2>
              <p className="text-[15px] lg:text-[18px] text-foreground/40 leading-relaxed font-medium italic max-w-lg">
                 Support a studio that prioritizes people and the planet without compromising on the luxury you deserve.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 px-12 rounded-full bg-[#606c38] text-white font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-[#606c38]/20 flex items-center gap-4 mt-4"
              >
                 Shop Sustainably <ArrowRight size={18} strokeWidth={3} />
              </motion.button>
           </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
