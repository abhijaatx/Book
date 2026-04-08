"use client"

import { motion } from "framer-motion";
import { 
  Users, 
  Mail, 
  MapPin, 
  Calendar, 
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AdminCustomers() {
  const users = [
    { name: "Abhijaat X", email: "abhijaat@example.com", location: "New Delhi, IN", joined: "Jan 2026", spent: "₹12,499", orders: 5, tier: "Gold" },
    { name: "Sarah Miller", email: "sarah@miller.com", location: "London, UK", joined: "Feb 2026", spent: "₹8,200", orders: 3, tier: "Silver" },
    { name: "Michael Chen", email: "m.chen@outlook.com", location: "San Francisco, US", joined: "Mar 2026", spent: "₹1,899", orders: 1, tier: "Bronze" },
    { name: "Emma Wilson", email: "emma.w@gmail.com", location: "Sydney, AU", joined: "Apr 2026", spent: "₹999", orders: 1, tier: "Bronze" },
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4">
         <h1 className="font-serif text-[48px] tracking-tight text-foreground lowercase italic">Curator <span className="text-primary/60 not-italic font-sans font-black uppercase text-[24px] tracking-[0.2em] ml-4">Network</span></h1>
         <p className="text-foreground/50 text-[15px] font-medium max-w-lg leading-relaxed">The heart of Kahaani. Connect with the individuals telling their stories through our craft.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {users.map((user) => (
          <motion.div 
            key={user.email}
            variants={fadeInUp}
            className="p-10 rounded-[3rem] bg-white border border-foreground/5 flex flex-col lg:flex-row items-center justify-between gap-10 hover:shadow-xl hover:shadow-primary/5 transition-all group"
          >
             <div className="flex items-center gap-8">
                <div className="h-20 w-20 rounded-full bg-background border-2 border-foreground/5 flex items-center justify-center text-foreground text-xl font-black uppercase group-hover:scale-110 transition-transform">
                   {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-4">
                      <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">{user.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${user.tier === 'Gold' ? 'bg-accent/10 text-accent border border-accent/20' : user.tier === 'Silver' ? 'bg-foreground/10 text-foreground/40 border border-foreground/10' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                         {user.tier} Member
                      </div>
                   </div>
                   <div className="flex flex-wrap items-center gap-6 text-[11px] font-medium text-foreground/40">
                      <span className="flex items-center gap-2"><Mail size={14} className="text-primary/60" /> {user.email}</span>
                      <span className="flex items-center gap-2"><MapPin size={14} className="text-primary/60" /> {user.location}</span>
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-primary/60" /> Joined {user.joined}</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-12 text-center lg:text-right">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Total Spent</span>
                   <span className="text-2xl font-black text-foreground">{user.spent}</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Chapters</span>
                   <span className="text-2xl font-black text-foreground">{user.orders}</span>
                </div>
                <button className="h-14 w-14 rounded-2xl bg-background border border-foreground/5 flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all">
                   <ChevronRight size={24} />
                </button>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10 flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
               <TrendingUp size={24} />
            </div>
            <div className="flex flex-col gap-1">
               <h4 className="text-[14px] font-bold text-foreground uppercase tracking-widest">Network Growth</h4>
               <p className="text-[12px] text-foreground/40 font-medium">Your curator network has increased by 15% this month.</p>
            </div>
         </div>
         <button className="h-14 px-8 rounded-2xl border border-primary/20 text-primary font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary transition-all hover:text-white">Expand Reach</button>
      </div>
    </motion.div>
  );
}
