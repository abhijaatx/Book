"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  MapPin, 
  Globe, 
  Bell, 
  Shield, 
  Layout, 
  Save,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  UserCog
} from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AdminSettings() {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("studio");

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: "studio", name: "Studio Profile", icon: Building2 },
    { id: "curation", name: "Curation Rules", icon: UserCog },
    { id: "security", name: "Registry Security", icon: Shield },
    { id: "notifications", name: "System Alerts", icon: Bell },
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
         <div className="flex flex-col gap-4">
            <h1 className="font-serif text-[48px] tracking-tight text-foreground lowercase italic">Studio <span className="text-primary/60 not-italic font-sans font-black uppercase text-[24px] tracking-[0.2em] ml-4">Preferences</span></h1>
            <p className="text-foreground/50 text-[15px] font-medium max-w-lg leading-relaxed">Tailor your administrative environment and curation standards.</p>
         </div>
         
         <button 
           onClick={handleSave}
           className="h-14 px-10 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
         >
            {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
            {isSaved ? "Preferences Saved" : "Save All Changes"}
         </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
         {/* Vertical Tabs */}
         <div className="xl:col-span-3 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all group ${
                  activeTab === tab.id 
                    ? "bg-white shadow-xl shadow-primary/5 border border-foreground/5 text-primary" 
                    : "text-foreground/40 hover:text-foreground hover:bg-white/50"
                }`}
              >
                 <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                 <span className="text-[11px] font-black uppercase tracking-widest">{tab.name}</span>
                 {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            ))}
         </div>

         {/* Settings Content */}
         <div className="xl:col-span-9">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] border border-foreground/5 p-12 shadow-sm shadow-primary/5 flex flex-col gap-10"
            >
               {activeTab === "studio" && (
                 <>
                   <div className="flex flex-col gap-2">
                      <h3 className="font-serif text-2xl italic text-foreground lowercase">Studio <span className="text-primary/60 not-italic font-sans font-black uppercase text-[10px] tracking-[0.4em] ml-4">Identity</span></h3>
                      <p className="text-foreground/40 text-xs font-medium uppercase tracking-widest">Public-facing storyteller details.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Studio Name</label>
                         <div className="relative group">
                            <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                            <input type="text" placeholder="Kahaani Studio" className="w-full bg-background border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 focus:bg-white transition-all" />
                         </div>
                      </div>
                      <div className="flex flex-col gap-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Support Email</label>
                         <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                            <input type="email" placeholder="support@kahaani.studio" className="w-full bg-background border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 focus:bg-white transition-all" />
                         </div>
                      </div>
                      <div className="flex flex-col gap-3 md:col-span-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Magic Headquarters</label>
                         <div className="relative group">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                            <input type="text" placeholder="Fine Art Tower, MG Road, Mumbai, IN" className="w-full bg-background border border-foreground/5 rounded-2xl py-5 pl-14 pr-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 focus:bg-white transition-all" />
                         </div>
                      </div>
                   </div>
                 </>
               )}

               {activeTab === "curation" && (
                 <>
                   <div className="flex flex-col gap-2">
                      <h3 className="font-serif text-2xl italic text-foreground lowercase">Curation <span className="text-primary/60 not-italic font-sans font-black uppercase text-[10px] tracking-[0.4em] ml-4">Standards</span></h3>
                      <p className="text-foreground/40 text-xs font-medium uppercase tracking-widest">Rules for product pricing and taxes.</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Studio Currency</label>
                         <select className="w-full bg-background border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer">
                            <option>₹ Indian Rupee (INR)</option>
                            <option>$ US Dollar (USD)</option>
                         </select>
                      </div>
                      <div className="flex flex-col gap-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Default Tax Rate (%)</label>
                         <input type="number" placeholder="18" className="w-full bg-background border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all" />
                      </div>
                   </div>
                 </>
               )}

               {activeTab === "security" && (
                 <>
                   <div className="flex flex-col gap-2">
                      <h3 className="font-serif text-2xl italic text-foreground lowercase">Registry <span className="text-primary/60 not-italic font-sans font-black uppercase text-[10px] tracking-[0.4em] ml-4">Security</span></h3>
                      <p className="text-foreground/40 text-xs font-medium uppercase tracking-widest">Manage access to the internal storytelling registry.</p>
                   </div>
                   
                   <div className="flex flex-col gap-8 max-w-md">
                      <div className="flex flex-col gap-4 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                         <span className="text-[11px] font-black uppercase tracking-widest text-primary">Active Curator</span>
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black uppercase">AD</div>
                            <div className="flex flex-col">
                               <span className="text-[14px] font-bold text-foreground">{user || 'Admin Kahaani'}</span>
                               <span className="text-[10px] uppercase font-black tracking-widest text-foreground/40">Master Level Access</span>
                            </div>
                         </div>
                      </div>
                      <button className="h-14 w-full rounded-2xl border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary transition-all hover:text-white shadow-lg shadow-primary/5">
                         Update Access Secret
                      </button>
                   </div>
                 </>
               )}

               {activeTab === "notifications" && (
                 <>
                   <div className="flex flex-col gap-2">
                      <h3 className="font-serif text-2xl italic text-foreground lowercase">System <span className="text-primary/60 not-italic font-sans font-black uppercase text-[10px] tracking-[0.4em] ml-4">Alerts</span></h3>
                      <p className="text-foreground/40 text-xs font-medium uppercase tracking-widest">Stay informed on studio activity.</p>
                   </div>
                   
                   <div className="flex flex-col gap-6">
                      {[ 
                        { title: "New Story Started", desc: "Receive alerts when a curator begins a new personalization.", checked: true },
                        { title: "Order Fulfilled", desc: "Notification when a treasure is shipped from the library.", checked: true },
                        { title: "Network Growth", desc: "Summary of new curators joining the network.", checked: false },
                        { title: "System Heartbeat", desc: "Daily summary of studio operations.", checked: true },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-foreground/5 hover:bg-background transition-colors cursor-pointer group">
                           <div className="flex flex-col gap-1">
                              <span className="text-[14px] font-black text-foreground">{item.title}</span>
                              <span className="text-[11px] font-medium text-foreground/40">{item.desc}</span>
                           </div>
                           <div className={`h-6 w-12 rounded-full p-1 transition-colors ${item.checked ? 'bg-primary' : 'bg-foreground/10'}`}>
                              <div className={`h-4 w-4 rounded-full bg-white transition-transform ${item.checked ? 'translate-x-6' : 'translate-x-0'}`} />
                           </div>
                        </div>
                      ))}
                   </div>
                 </>
               )}
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
