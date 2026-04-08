"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        {/* Left: Lifestyle Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full lg:w-[55%] h-[400px] lg:h-auto overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=2000&auto=format&fit=crop"
            alt="Kahaani Lifestyle"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Right: Content Box */}
        <div className="flex flex-1 items-center justify-center bg-primary p-8 lg:p-20">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-[500px] flex flex-col gap-10 items-center text-center lg:items-start lg:text-left"
          >
            <div className="flex flex-col gap-6">
              <motion.h1 
                variants={fadeInUp}
                className="font-serif text-[56px] lg:text-[72px] leading-[1] tracking-[-0.04em] text-foreground lowercase"
              >
                make every <br />
                moment <br />
                magic
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-[14px] lg:text-[16px] font-bold uppercase tracking-[0.2em] text-foreground/60 leading-relaxed max-w-[400px]"
              >
                Personalized planners, notebooks & photobooks designed for your biggest dreams.
              </motion.p>
            </div>
            
            <motion.div variants={fadeInUp}>
              <Link 
                href="/category/planners" 
                className="group inline-flex h-16 items-center justify-center gap-4 rounded-full bg-foreground px-12 text-background font-black text-xs uppercase tracking-[0.2em] transition-premium hover:scale-105 active:scale-95"
              >
                SHOP NOW
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
