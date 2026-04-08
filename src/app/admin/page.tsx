"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Star
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Revenue", value: "₹4,82,900", change: "+12.5%", trendingUp: true, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Active Orders", value: "48", change: "+4", trendingUp: true, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Curators (Users)", value: "1,240", change: "-2%", trendingUp: false, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Avg Order Value", value: "₹10,240", change: "+8.2%", trendingUp: true, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const recentOrders = [
    { id: "ORD-9281", customer: "Abhijaat X", product: "The Everything Book", amount: "₹2,499", status: "Processing", date: "2 mins ago" },
    { id: "ORD-9280", customer: "Sarah Miller", product: "In Full Bloom Album", amount: "₹4,200", status: "Shipped", date: "15 mins ago" },
    { id: "ORD-9279", customer: "Michael Chen", product: "Celestial Dreams Magazine", amount: "₹1,899", status: "Pending", date: "1 hour ago" },
    { id: "ORD-9278", customer: "Emma Wilson", product: "Magical Planners Pack", amount: "₹999", status: "Delivered", date: "3 hours ago" },
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-4">
         <h1 className="font-serif text-[48px] tracking-tight text-foreground lowercase italic">Studio <span className="text-primary/60 not-italic font-sans font-black uppercase text-[24px] tracking-[0.2em] ml-4">Insights</span></h1>
         <p className="text-foreground/50 text-[15px] font-medium max-w-lg leading-relaxed">Your stories are traveling. Here is how the magic is performing across the Kahaani platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.name}
            variants={fadeInUp}
            className="p-8 rounded-[2rem] bg-white border border-foreground/5 flex flex-col gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all group"
          >
             <div className="flex items-center justify-between">
                <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                   <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-widest ${stat.trendingUp ? "text-emerald-600" : "text-rose-600"}`}>
                   {stat.change}
                   {stat.trendingUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">{stat.name}</span>
                <span className="text-2xl font-black text-foreground">{stat.value}</span>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Main Insights Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         
         {/* Analytics Visual (Mock Chart) */}
         <motion.div variants={fadeInUp} className="xl:col-span-8 p-10 rounded-[3rem] bg-white border border-foreground/5 flex flex-col gap-10 shadow-sm shadow-primary/5">
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-2xl italic tracking-tight text-foreground lowercase">Sales <span className="text-foreground/40 font-sans not-italic font-black uppercase text-[10px] tracking-[0.4em] ml-4">Velocity</span></h3>
                  <p className="text-foreground/40 text-xs font-medium">Daily order volume across all categories.</p>
               </div>
               <div className="flex items-center gap-2 bg-background p-1 rounded-full px-4 border border-foreground/5 text-[10px] font-black uppercase tracking-widest text-foreground/40">
                  <span className="text-primary">●</span> Live Data
               </div>
            </div>

            <div className="h-64 w-full flex items-end justify-between gap-4 px-4 pb-4">
               {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((height, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${height}%` }}
                   transition={{ duration: 1, delay: i * 0.05 + 0.3 }}
                   className={`w-full rounded-t-xl transition-all hover:opacity-80 relative group ${i === 11 ? "bg-primary" : "bg-primary/20"}`}
                 >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-white px-3 py-1 rounded-lg text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                       ₹{Math.round(height * 420)}
                    </div>
                 </motion.div>
               ))}
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-foreground/5 text-foreground/40 font-bold text-[10px] tracking-widest uppercase">
               <span>Mon</span>
               <span>Tue</span>
               <span>Wed</span>
               <span>Thu</span>
               <span>Fri</span>
               <span>Sat</span>
               <span className="text-primary font-black">Sun (Today)</span>
            </div>
         </motion.div>

         {/* Recent Orders List */}
         <motion.div variants={fadeInUp} className="xl:col-span-4 p-10 rounded-[3rem] bg-white border border-foreground/5 flex flex-col gap-10 shadow-sm shadow-primary/5">
            <div className="flex items-center justify-between">
               <h3 className="font-serif text-2xl italic tracking-tight text-foreground lowercase">Recent <span className="text-foreground/40 font-sans not-italic font-black uppercase text-[10px] tracking-[0.4em] ml-4">Chapters</span></h3>
               <Link href="/admin/orders" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All</Link>
            </div>

            <div className="flex flex-col gap-8">
               {recentOrders.map((order, i) => (
                 <div key={order.id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center text-foreground/40 border border-foreground/5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                          <ShoppingBag size={16} />
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors">{order.customer}</span>
                          <span className="text-[10px] uppercase font-black tracking-widest text-foreground/40">{order.product}</span>
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                       <span className="text-[13px] font-black text-foreground">{order.amount}</span>
                       <span className="text-[9px] uppercase font-black tracking-widest text-emerald-600/60">{order.status}</span>
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-auto pt-6 border-t border-foreground/5 flex flex-col gap-4">
               <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-foreground/50 italic font-serif">Studio Hot Score</span>
                  <div className="flex items-center gap-1 text-accent">
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" />
                     <Star size={12} fill="currentColor" opacity={0.3} />
                  </div>
               </div>
               <p className="text-[10px] leading-relaxed text-foreground/40 font-medium">92% of orders have been fulfilled within the "magic window" of 3-5 days. High-fidelity output maintained.</p>
            </div>
         </motion.div>

      </div>
    </motion.div>
  );
}
