"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Workflow, 
  Sparkles, 
  MapPin, 
  Clock, 
  ArrowRight,
  Briefcase,
  Boxes,
  X,
  CheckCircle2,
  Mail,
  User,
  Link as LinkIcon,
  MessageSquare
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const internships = [
    {
      id: "design",
      department: "Design & Creative",
      title: "Creative Storyteller Intern",
      type: "Remote / New Delhi HQ",
      duration: "3-6 Months",
      icon: Palette,
      description: "Join our core creative team to help craft the visual language of modern Indian heirlooms.",
      requirements: [
        "Proficiency in Figma and Adobe Creative Suite.",
        "A portfolio demonstrating strong layout and typography skills.",
        "Deep appreciation for physical print and tactile materials.",
        "Ability to translate vague emotions into precise visual designs."
      ]
    },
    {
      id: "ops",
      department: "Studio Operations",
      title: "Growth & Logistics Intern",
      type: "New Delhi HQ (On-site)",
      duration: "4-6 Months",
      icon: Boxes,
      description: "Manage the magic behind the scenes—from inventory curation to white-glove delivery coordination.",
      requirements: [
        "Exceptional organizational skills and eye for detail.",
        "Comfortable with spreadsheets and process mapping.",
        "Strong communication skills for coordinating with curators.",
        "Based in or willing to relocate to New Delhi."
      ]
    }
  ];

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setFormSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#FFFDF5] selection:bg-primary/10 min-h-screen">
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
                 Our Studio
               </motion.span>
               <motion.h1 
                 variants={fadeInUp}
                 className="font-serif text-[56px] lg:text-[100px] leading-[0.9] tracking-tighter text-foreground lowercase italic"
               >
                 Join the <br /> <span className="not-italic">story.</span>
               </motion.h1>
            </div>
            <motion.p 
              variants={fadeInUp}
              className="text-[16px] lg:text-[20px] font-medium text-foreground/40 max-w-2xl mx-auto leading-relaxed italic"
            >
              We're looking for the next generation of storytellers, designers, and curators to help us build a legacy of intentional craftsmanship.
            </motion.p>
          </div>
        </section>

        {/* Values / Culture Section */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: Sparkles,
                  title: "Intentional Magic",
                  desc: "We don't just build products; we create artifacts of meaning. Every detail, from a font choice to a foil stamp, is intentional."
                },
                {
                  icon: Workflow,
                  title: "Craft-First",
                  desc: "We value the process as much as the result. We spend time getting the tactile feel of our paper and the weight of our covers just right."
                },
                {
                  icon: Briefcase,
                  title: "Legacy Driven",
                  desc: "We're building something that will last a hundred years. Our work is a bridge between today's digital moments and tomorrow's heirlooms."
                }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col gap-8 p-12 rounded-[4rem] bg-white border border-foreground/5 shadow-sm shadow-primary/5 group hover:border-primary/20 transition-all"
                >
                   <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <value.icon size={28} strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col gap-4">
                      <h3 className="font-serif text-2xl italic tracking-tight text-foreground lowercase">{value.title}</h3>
                      <p className="text-[14px] text-foreground/40 leading-relaxed font-medium">{value.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Internship Listings Section */}
        <section className="mx-auto max-w-[1440px] px-6 lg:px-12 w-full">
           <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-4">
                 <h2 className="font-serif text-[42px] lg:text-[64px] tracking-tight text-foreground lowercase italic">Open <span className="not-italic">Registry.</span></h2>
                 <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Choose your path in the Kahaani Studio</p>
              </div>

              <div className="grid grid-cols-1 gap-12">
                 {internships.map((job) => (
                   <motion.div 
                     key={job.id}
                     variants={fadeInUp}
                     className="bg-white rounded-[4rem] border border-foreground/5 p-10 lg:p-16 shadow-sm shadow-primary/5 overflow-hidden relative group"
                   >
                      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                         <div className="flex flex-col gap-8 flex-1">
                            <div className="flex items-center gap-6">
                               <div className="h-16 w-16 rounded-3xl bg-background flex items-center justify-center text-primary shadow-inner">
                                  <job.icon size={32} strokeWidth={1.5} />
                               </div>
                               <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">{job.department}</span>
                                  <h3 className="font-serif text-3xl italic tracking-tight text-foreground">{job.title}</h3>
                               </div>
                            </div>
                            <p className="text-[16px] text-foreground/50 leading-relaxed font-medium italic max-w-2xl">{job.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="flex flex-col gap-4">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">The Requirements</span>
                                  <ul className="flex flex-col gap-3">
                                     {job.requirements.map((req, i) => (
                                       <li key={i} className="flex gap-3 text-[13px] font-medium text-foreground/40 leading-snug">
                                          <div className="h-1.5 w-1.5 rounded-full bg-primary/20 mt-1.5 shrink-0" />
                                          {req}
                                       </li>
                                     ))}
                                  </ul>
                               </div>
                               <div className="flex flex-col gap-6">
                                  <div className="flex flex-col gap-4">
                                     <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Studio Details</span>
                                     <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3 text-[13px] font-bold text-foreground">
                                           <MapPin size={14} className="text-primary" />
                                           {job.type}
                                        </div>
                                        <div className="flex items-center gap-3 text-[13px] font-bold text-foreground">
                                           <Clock size={14} className="text-primary" />
                                           {job.duration}
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div className="flex flex-col gap-4 shrink-0">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApply(job)}
                              className="h-16 px-12 rounded-full bg-primary text-white font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 flex items-center gap-4"
                            >
                               Apply Now <ArrowRight size={18} strokeWidth={3} />
                            </motion.button>
                            <p className="text-[9px] text-center font-black uppercase tracking-widest text-foreground/20">Applications open for 2026 Batch</p>
                         </div>
                      </div>

                      {/* Branded Background Accent */}
                      <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                         <job.icon size={300} strokeWidth={0.5} />
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Philosophy Footer Section */}
        <section className="mx-auto max-w-4xl px-6 text-center pt-20">
           <motion.div variants={fadeInUp} className="flex flex-col gap-10 items-center">
              <h2 className="font-serif text-[32px] lg:text-[48px] tracking-tight text-foreground lowercase italic leading-tight">
                 Not your standard <br /> <span className="not-italic text-primary">internship.</span>
              </h2>
              <p className="text-[15px] lg:text-[18px] text-foreground/40 leading-relaxed font-medium italic max-w-lg">
                 At Kahaani, you won't just be watching from the sidelines. You'll be expected to own your craft and contribute to the stories of thousands. 
              </p>
           </motion.div>
        </section>
      </motion.div>

      {/* Application Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#FFFDF5] rounded-[4rem] shadow-2xl z-[70] overflow-hidden border border-foreground/5"
            >
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-10 top-10 h-12 w-12 rounded-full bg-white border border-foreground/5 flex items-center justify-center text-foreground/40 hover:text-primary transition-colors z-10"
               >
                  <X size={20} />
               </button>

               <div className="p-12 lg:p-20">
                  <AnimatePresence mode="wait">
                    {formSuccess ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-8 py-20"
                      >
                         <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 size={40} />
                         </div>
                         <div className="flex flex-col gap-4">
                            <h2 className="font-serif text-4xl italic tracking-tight text-foreground lowercase">Application <span className="not-italic">Sent.</span></h2>
                            <p className="text-foreground/40 text-[15px] font-medium italic">We've received your story. Our curators will review it carefully and get back to you soon.</p>
                         </div>
                         <button 
                            onClick={() => setIsModalOpen(false)}
                            className="h-14 px-10 rounded-full border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all mt-4"
                         >
                            Back to Studio
                         </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-12"
                      >
                         <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">{selectedJob?.department}</span>
                            <h2 className="font-serif text-4xl italic tracking-tight text-foreground lowercase">Apply for <span className="not-italic">{selectedJob?.title}</span></h2>
                         </div>

                         <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 ml-4">Full Name</label>
                               <div className="relative group">
                                  <User className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                  <input required type="text" placeholder="Aarav Sharma" className="w-full bg-white border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                               </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="flex flex-col gap-3">
                                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 ml-4">Email Address</label>
                                  <div className="relative group">
                                     <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                     <input required type="email" placeholder="aarav@studio.com" className="w-full bg-white border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                  </div>
                               </div>
                               <div className="flex flex-col gap-3">
                                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 ml-4">Phone Number</label>
                                  <div className="relative group">
                                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary text-[13px] font-bold">+91</div>
                                     <input required type="tel" placeholder="98765 43210" className="w-full bg-white border border-foreground/5 rounded-2xl py-5 pl-16 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                  </div>
                               </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="flex flex-col gap-3">
                                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 ml-4">Portfolio Link</label>
                                  <div className="relative group">
                                     <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                     <input required type="url" placeholder="https://behance.net/aarav" className="w-full bg-white border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                  </div>
                               </div>
                               <div className="flex flex-col gap-3">
                                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 ml-4">Resume / CV Link</label>
                                  <div className="relative group">
                                     <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                     <input required type="url" placeholder="https://drive.google.com/..." className="w-full bg-white border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                                  </div>
                               </div>
                            </div>

                            <div className="flex flex-col gap-3">
                               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 ml-4">Why Kahaani? (Statement of Purpose)</label>
                               <div className="relative group">
                                  <MessageSquare className="absolute left-6 top-6 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                  <textarea required rows={4} placeholder="Tell us what draws you to intentional storytelling..." className="w-full bg-white border border-foreground/5 rounded-[2rem] py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none" />
                               </div>
                            </div>

                            <button 
                               type="submit"
                               disabled={isSubmitting}
                               className="h-16 w-full rounded-full bg-primary text-white font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                            >
                               {isSubmitting ? "Sending Registry..." : "Submit Application"}
                               {!isSubmitting && <ArrowRight size={18} strokeWidth={3} />}
                            </button>
                         </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
