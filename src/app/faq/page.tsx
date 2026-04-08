"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  Package, 
  Truck, 
  ShieldCheck, 
  Search,
  ArrowRight
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      category: "Orders & Crafting",
      items: [
        {
          q: "How long does it take to craft a Kahaani photobook?",
          a: "Every book is handcrafted in our New Delhi studio with meticulous attention to detail. Once you approve your digital layout, the physical crafting process—including printing on archival paper and individual gold foiling—takes 5–7 business days. We believe quality cannot be rushed."
        },
        {
          q: "Can I change my photos after I've placed an order?",
          a: "We allow modifications to your layout within 12 hours of placing an order. Once our curators begin the archival printing process, we are unable to change the imagery to ensure the production timeline remains on track for all curators."
        },
        {
          q: "What is archival quality paper, and why is it important?",
          a: "Archival paper is acid-free and museum-grade, designed to prevent yellowing or deterioration over decades. At Kahaani, we use heavyweight matte paper that ensures your photos maintain their original high-fidelity colors for over 100 years."
        }
      ]
    },
    {
      category: "Shipping & Logistics",
      items: [
        {
          q: "Do you ship your handmade books across India?",
          a: "Yes, we offer white-glove, pan-India delivery. Whether you are in New Delhi, Mumbai, or a remote corner of the country, our specialized logistics partners ensure your treasures arrive in pristine condition, housed in our signature protective eco-packaging."
        },
        {
          q: "How can I track the progress of my story?",
          a: "Once your book is ready for its journey, you will receive a tracking link via email and WhatsApp. You can also monitor the real-time status of your curation in the 'Track Order' section of our studio portal."
        }
      ]
    },
    {
      category: "Personalization",
      items: [
        {
          q: "Can I add a custom gift note or gold foiling to the cover?",
          a: "Absolutely. Personalization is at the heart of Kahaani. You can specify custom text for gold or silver foil stamping during the design process, and add a handwritten-style gift note at checkout to make your treasure truly unique."
        },
        {
          q: "Do you offer layout design assistance for large projects?",
          a: "Yes! Our design curators are available for consultations on larger projects (over 200 photos). We help you organize your visual narrative for a cohesive and high-end editorial look."
        }
      ]
    }
  ];

  // Logic to flatten items for global indexing
  let globalCount = 0;

  // JSON-LD Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(cat => 
      cat.items.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    )
  };

  return (
    <div className="bg-[#FFFDF5] selection:bg-primary/10 min-h-screen">
      {/* Inject SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
                 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary"
               >
                 Client Support
               </motion.span>
               <motion.h1 
                 variants={fadeInUp}
                 className="font-serif text-[56px] lg:text-[100px] leading-[0.9] tracking-tighter text-foreground lowercase italic"
               >
                 Common <br /> <span className="not-italic">curiosities.</span>
               </motion.h1>
            </div>
            <motion.p 
              variants={fadeInUp}
              className="text-[16px] lg:text-[20px] font-medium text-foreground/40 max-w-2xl mx-auto leading-relaxed italic"
            >
              Every meaningful story comes with questions. Find answers about our artisanal crafting process, shipping logistics, and archival quality standards.
            </motion.p>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="mx-auto max-w-4xl px-6 w-full">
           <div className="flex flex-col gap-24">
              {faqData.map((category, catIdx) => (
                <div key={catIdx} className="flex flex-col gap-10">
                   <motion.div 
                     variants={fadeInUp}
                     className="flex items-center gap-6"
                   >
                      <div className="h-px flex-1 bg-foreground/5" />
                      <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/40 whitespace-nowrap">{category.category}</h2>
                      <div className="h-px flex-1 bg-foreground/5" />
                   </motion.div>

                   <div className="flex flex-col gap-4">
                      {category.items.map((item, itemIdx) => {
                        const currentIndex = globalCount++;
                        const isOpen = openIndex === currentIndex;
                        
                        return (
                          <motion.div 
                            key={itemIdx}
                            variants={fadeInUp}
                            className={`rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                              isOpen ? 'bg-white border-primary/10 shadow-xl shadow-primary/5' : 'bg-transparent border-foreground/5'
                            }`}
                          >
                             <button 
                               onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                               className="w-full text-left p-8 lg:p-10 flex items-center justify-between gap-8 group"
                             >
                                <span className={`font-serif text-[18px] lg:text-[22px] tracking-tight leading-tight transition-colors duration-500 ${
                                  isOpen ? 'text-foreground' : 'text-foreground/60'
                                }`}>
                                   {item.q}
                                </span>
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                  isOpen ? 'bg-primary text-white rotate-180' : 'bg-foreground/5 text-foreground/20'
                                }`}>
                                   {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                             </button>

                             <AnimatePresence>
                               {isOpen && (
                                 <motion.div 
                                   initial={{ height: 0, opacity: 0 }}
                                   animate={{ height: "auto", opacity: 1 }}
                                   exit={{ height: 0, opacity: 0 }}
                                   transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                 >
                                    <div className="px-8 lg:px-10 pb-10">
                                       <div className="pt-6 border-t border-foreground/5">
                                          <p className="text-[15px] lg:text-[16px] text-foreground/50 leading-relaxed font-medium italic">
                                             {item.a}
                                          </p>
                                       </div>
                                    </div>
                                 </motion.div>
                               )}
                             </AnimatePresence>
                          </motion.div>
                        );
                      })}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Support CTA Section */}
        <section className="mx-auto max-w-xl px-6 text-center">
           <motion.div 
             variants={fadeInUp}
             className="flex flex-col gap-10 items-center p-16 rounded-[4rem] bg-white border border-foreground/5 shadow-sm shadow-primary/5"
           >
              <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                 <HelpCircle size={32} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-4">
                 <h2 className="font-serif text-3xl italic tracking-tight text-foreground lowercase">Still <span className="not-italic">curious?</span></h2>
                 <p className="text-[14px] text-foreground/40 leading-relaxed font-medium italic">
                    If you couldn't find your answer here, our curators are available for personal guidance via chat or email.
                 </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 px-12 rounded-full bg-primary text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 flex items-center gap-4 mt-4"
              >
                 Connect with a Curator <ArrowRight size={18} strokeWidth={3} />
              </motion.button>
           </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
