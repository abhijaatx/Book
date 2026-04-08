"use client"

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, 
  FileSearch, 
  Factory, 
  SearchCheck, 
  Truck, 
  CheckCircle2,
  Search, 
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Info
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type Status = "order_confirmed" | "design_review" | "artisanal_production" | "quality_inspection" | "dispatched" | "delivered";

interface OrderStage {
  id: Status;
  label: string;
  description: string;
  details: string;
  icon: any;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const stages: OrderStage[] = useMemo(() => [
    { 
      id: "order_confirmed", 
      label: "Order Confirmed", 
      description: "Successfully entered into studio registry", 
      details: "Your order has been verified and assigned a unique registry ID for our artisanal workflow.",
      icon: ClipboardCheck 
    },
    { 
      id: "design_review", 
      label: "Design Review", 
      description: "Visual layout inspection in progress", 
      details: "Our curators are reviewing your uploaded imagery and layout to ensure optimal print quality and editorial flow.",
      icon: FileSearch 
    },
    { 
      id: "artisanal_production", 
      label: "Artisanal Production", 
      description: "Physical assembly and gold foiling", 
      details: "Your book is being physically constructed. This includes archival printing and manual application of 24k gold leaf to the cover.",
      icon: Factory 
    },
    { 
      id: "quality_inspection", 
      label: "Quality Inspection", 
      description: "Final white-glove verification", 
      details: "Every page is inspected individually for color accuracy and binding integrity before we proceed with dispatch.",
      icon: SearchCheck 
    },
    { 
      id: "dispatched", 
      label: "Dispatched", 
      description: "Handed over to specialized logistics", 
      details: "Your treasure is now in transit with our secure shipping partners. You will receive real-time SMS updates.",
      icon: Truck 
    }
  ], []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setIsSearching(true);
    setOrderData(null);

    // Simulate database lookup
    setTimeout(() => {
      setIsSearching(false);
      if (orderId.toUpperCase() === "KB-2024") {
        setOrderData({
          id: "KB-2024",
          product: "The Heirloom Photobook",
          status: "artisanal_production" as Status,
          date: "October 24, 2024",
          destination: "Green Park, New Delhi",
          eta: "October 31, 2024"
        });
      } else {
        setOrderData("not_found");
      }
    }, 1200);
  };

  const getStatusIndex = (status: Status) => stages.findIndex(s => s.id === status);

  return (
    <div className="bg-[#FFFDF5] selection:bg-primary/10 min-h-screen font-sans">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col gap-24 pb-40"
      >
        {/* Professional Hero Section */}
        <section className="pt-40 pb-12 text-center border-b border-foreground/5 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-col gap-10">
            <div className="flex flex-col gap-4 items-center">
               <motion.span 
                 variants={fadeInUp}
                 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60"
               >
                 Logistics Portal
               </motion.span>
               <motion.h1 
                 variants={fadeInUp}
                 className="font-serif text-[48px] lg:text-[72px] tracking-tight text-foreground lowercase italic"
               >
                 Order <span className="not-italic">Tracking.</span>
               </motion.h1>
            </div>
            
            <motion.form 
               variants={fadeInUp}
               onSubmit={handleTrack}
               className="max-w-2xl mx-auto w-full mt-4"
            >
               <div className="relative group p-2 bg-white rounded-full border border-foreground/5 shadow-xl shadow-primary/5 focus-within:border-primary/20 transition-all">
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
                     <Search size={18} className="text-foreground/20 group-focus-within:text-primary transition-colors" />
                     <div className="w-px h-4 bg-foreground/10" />
                  </div>
                  <input 
                    type="text" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter Registry ID (e.g. KB-2024)" 
                    className="w-full bg-transparent py-4 pl-16 pr-44 text-[13px] font-bold text-foreground outline-none placeholder:text-foreground/10"
                  />
                  <button 
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-8 rounded-full bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 flex items-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                  >
                     {isSearching ? "Searching..." : "Request Update"}
                  </button>
               </div>
            </motion.form>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 w-full min-h-[500px]">
           <AnimatePresence mode="wait">
              {!orderData && !isSearching && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center gap-4 pt-20"
                >
                   <p className="text-[12px] font-black uppercase tracking-[0.3em] text-foreground/20">Awaiting Search Parameters</p>
                   <p className="text-[14px] text-foreground/30 font-medium italic max-w-xs leading-relaxed">Please enter your unique Order ID to view current studio status and logistics progress.</p>
                </motion.div>
              )}

              {isSearching && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 pt-20"
                >
                   <div className="relative h-16 w-16 flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full"
                      />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Establishing Registry Connection...</p>
                </motion.div>
              )}

              {orderData === "not_found" && (
                <motion.div 
                  key="not_found"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-primary/10 p-12 lg:p-20 rounded-[4rem] text-center flex flex-col items-center gap-6 shadow-sm shadow-primary/5"
                >
                   <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center text-primary/40 font-bold">!</div>
                   <div className="flex flex-col gap-2">
                      <h2 className="font-serif text-3xl text-foreground lowercase">Information <span className="not-italic">Not Located.</span></h2>
                      <p className="text-[14px] text-foreground/40 font-medium max-w-sm mx-auto leading-relaxed">The Registry ID provided does not match any current orders. Please verify the ID or contact your studio curator for assistance.</p>
                   </div>
                </motion.div>
              )}

              {orderData && orderData !== "not_found" && (
                <motion.div 
                  key="result"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col gap-10"
                >
                   {/* Master Card: Information Hierarchy */}
                   <div className="bg-white border border-foreground/5 rounded-[4rem] overflow-hidden shadow-sm shadow-primary/5">
                      <div className="p-10 lg:p-14 border-b border-foreground/5 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                         <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 uppercase">Registry Master Card</span>
                            <h2 className="font-serif text-[36px] lg:text-[42px] tracking-tighter text-foreground lowercase leading-none italic">{orderData.product}</h2>
                         </div>
                         <div className="flex gap-10 border-t lg:border-t-0 lg:border-l border-foreground/5 pt-10 lg:pt-0 lg:pl-10">
                            <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/20">Registry ID</span>
                               <span className="text-[13px] font-bold text-foreground">{orderData.id}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/20">Status Date</span>
                               <span className="text-[13px] font-bold text-foreground">{orderData.date}</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
                         <div className="bg-white p-10 flex items-center gap-6">
                            <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                               <MapPin size={20} strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/20">Destination Address</span>
                               <span className="text-[13px] font-bold text-foreground">{orderData.destination}</span>
                            </div>
                         </div>
                         <div className="bg-white p-10 flex items-center gap-6 border-l border-foreground/5">
                            <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                               <Calendar size={20} strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col gap-1">
                               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/20">Estimated Completion</span>
                               <span className="text-[13px] font-bold text-foreground">{orderData.eta}</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Precision Vertical Timeline */}
                   <div className="bg-white border border-foreground/5 p-12 lg:p-20 rounded-[4rem] shadow-sm shadow-primary/5">
                      <div className="flex flex-col gap-16">
                         <div className="flex flex-col gap-3">
                            <h3 className="font-serif text-3xl italic tracking-tight text-foreground lowercase leading-tight">Artisanal <span className="not-italic text-primary">Workflow Progress.</span></h3>
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/20">Comprehensive Stage Breakdown</p>
                         </div>
                         
                         <div className="flex flex-col gap-0 relative">
                            {stages.map((stage, i) => {
                              const isCompleted = i <= getStatusIndex(orderData.status);
                              const isCurrent = i === getStatusIndex(orderData.status);
                              const isLast = i === stages.length - 1;

                              return (
                                <motion.div 
                                  key={stage.id} 
                                  variants={fadeInUp}
                                  className="flex gap-10 relative pb-16 last:pb-0 group"
                                >
                                   {/* Timeline Precision Line */}
                                   {!isLast && (
                                     <div className="absolute left-7 top-14 w-0.5 h-[calc(100%-1rem)] bg-foreground/5 overflow-hidden">
                                        <motion.div 
                                          initial={{ height: 0 }}
                                          animate={{ height: isCompleted ? "100%" : 0 }}
                                          transition={{ duration: 1.5, delay: i * 0.2 }}
                                          className="w-full bg-primary"
                                        />
                                     </div>
                                   )}

                                   {/* Status Node Component */}
                                   <div className="relative z-10 flex-shrink-0">
                                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                                        isCompleted ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-background text-foreground/10 border border-foreground/5'
                                      }`}>
                                         <stage.icon size={22} strokeWidth={1.5} />
                                      </div>
                                      {isCurrent && (
                                        <motion.div 
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                          className="absolute -inset-1 rounded-[1.2rem] border-2 border-primary/30 z-[-1]"
                                        />
                                      )}
                                   </div>

                                   {/* Status Content & Informative Interaction */}
                                   <div className="flex flex-col gap-4 flex-1">
                                      <div className="flex flex-col gap-1">
                                         <h4 className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-700 ${
                                           isCompleted ? 'text-foreground' : 'text-foreground/20'
                                         }`}>
                                            {stage.label}
                                         </h4>
                                         <p className={`text-[14px] font-medium leading-relaxed transition-colors duration-700 ${
                                           isCompleted ? 'text-foreground/40' : 'text-foreground/10'
                                         }`}>
                                            {stage.description}
                                         </p>
                                      </div>
                                      
                                      {isCompleted && (
                                        <div className="p-6 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 group-hover:border-primary/20 transition-all">
                                           <div className="flex items-start gap-3">
                                              <Info size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                              <p className="text-[12px] text-foreground/50 font-medium leading-relaxed italic">{stage.details}</p>
                                           </div>
                                        </div>
                                      )}
                                   </div>

                                   {isCurrent && (
                                     <div className="hidden lg:flex items-center gap-3 h-fit py-2 px-5 rounded-full border border-primary/20 bg-primary/5 text-primary">
                                        <Clock size={12} className="animate-spin-slow" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">In Studio Progress</span>
                                     </div>
                                   )}
                                 </motion.div>
                              );
                            })}
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </section>

        {/* Global Support Integration */}
        <section className="mx-auto max-w-xl px-6 text-center pt-10">
           <motion.div variants={fadeInUp} className="flex flex-col gap-8 items-center border-t border-foreground/5 pt-12">
              <p className="text-[13px] text-foreground/40 leading-relaxed font-medium italic">
                 For detailed logistics inquiries or custom curation requests, our <br />
                 <span className="text-primary cursor-pointer hover:underline decoration-primary/30 underline-offset-4">Registry Support Team</span> is available 10:00–18:00 IST.
              </p>
           </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
