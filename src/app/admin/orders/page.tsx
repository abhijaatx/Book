"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Truck, 
  PackageCheck,
  ChevronDown
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AdminOrders() {
  const [filter, setFilter] = useState("all");
  
  const orders = [
    { id: "ORD-9281", customer: "Abhijaat X", email: "abhijaat@example.com", product: "The 'Our Story' Anniversary Book", amount: "₹2,499", status: "processing", date: "April 08, 2026", items: 1 },
    { id: "ORD-9280", customer: "Sarah Miller", email: "sarah@miller.com", product: "In Full Bloom Album", amount: "₹4,200", status: "shipped", date: "April 07, 2026", items: 2 },
    { id: "ORD-9279", customer: "Michael Chen", email: "m.chen@outlook.com", product: "Celestial Dreams Magazine", amount: "₹1,899", status: "pending", date: "April 07, 2026", items: 1 },
    { id: "ORD-9278", customer: "Emma Wilson", email: "emma.w@gmail.com", product: "Magical Planners Pack", amount: "₹999", status: "delivered", date: "April 06, 2026", items: 3 },
    { id: "ORD-9277", customer: "David Brown", email: "dbrown4@yahoo.com", product: "Classic OG Notebook", amount: "₹499", status: "processing", date: "April 06, 2026", items: 1 },
    { id: "ORD-9276", customer: "Lisa Park", email: "lisa.park@karea.net", product: "Everything Magic Journal", amount: "₹1,499", status: "shipped", date: "April 05, 2026", items: 2 },
  ];

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const getStatusColor = (status: string) => {
     switch(status) {
        case "pending": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        case "processing": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        case "shipped": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
        case "delivered": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        default: return "text-slate-500 bg-slate-500/10 border-slate-500/20";
     }
  };

  const getStatusIcon = (status: string) => {
     switch(status) {
        case "pending": return <Clock size={12} />;
        case "processing": return <CheckCircle2 size={12} />;
        case "shipped": return <Truck size={12} />;
        case "delivered": return <PackageCheck size={12} />;
        default: return null;
     }
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
         <div className="flex flex-col gap-4">
            <h1 className="font-serif text-[48px] tracking-tight text-foreground lowercase italic">Magic <span className="text-secondary/60 not-italic font-sans font-black uppercase text-[24px] tracking-[0.2em] ml-4">Registry</span></h1>
            <p className="text-foreground/50 text-[15px] font-medium max-w-lg leading-relaxed">Oversee every personalized keepsake as it moves from the studio to its new home.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <div className="bg-white border border-foreground/5 rounded-2xl flex p-1 shadow-sm">
               {["all", "pending", "processing", "shipped", "delivered"].map((f) => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/40 hover:text-primary hover:bg-primary/5"}`}
                 >
                   {f}
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* Orders Table Container */}
      <motion.div variants={fadeInUp} className="rounded-[3rem] bg-white border border-foreground/5 overflow-hidden flex flex-col shadow-sm shadow-primary/5">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-foreground/5">
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Order ID</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Curator</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Edition</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Status</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Story Date</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 text-right">Value</th>
                     <th className="px-10 py-8"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-foreground/5 font-medium leading-normal text-foreground">
                  <AnimatePresence mode="popLayout">
                    {filteredOrders.map((order) => (
                      <motion.tr 
                        key={order.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-primary/[0.02] transition-colors"
                      >
                         <td className="px-10 py-8">
                            <span className="text-[13px] font-black text-primary transition-colors cursor-pointer">{order.id}</span>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex flex-col gap-1">
                               <span className="text-[14px] font-medium text-foreground">{order.customer}</span>
                               <span className="text-[11px] text-foreground/40 font-medium">{order.email}</span>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex flex-col gap-1 max-w-[200px]">
                               <span className="text-[13px] text-foreground line-clamp-1">{order.product}</span>
                               <span className="text-[11px] text-foreground/40 uppercase font-black tracking-widest">{order.items} {order.items === 1 ? 'Item' : 'Items'}</span>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                               {getStatusIcon(order.status)}
                               {order.status}
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <span className="text-[13px] font-serif italic text-foreground/40">{order.date}</span>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <span className="text-[15px] font-black text-foreground tracking-tight">{order.amount}</span>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="h-9 w-9 rounded-xl border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all" title="View Design">
                                  <ExternalLink size={16} />
                               </button>
                               <button className="h-9 w-9 rounded-xl border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all">
                                  <MoreHorizontal size={16} />
                               </button>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
         
         <div className="px-10 py-8 bg-background border-t border-foreground/5 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-widest text-foreground/40">Showing {filteredOrders.length} of {orders.length} Magic Registers</span>
            <div className="flex items-center gap-4">
               <button className="text-[11px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary cursor-pointer transition-colors px-6 py-2 border border-foreground/5 rounded-full">Archive History</button>
               <button className="text-[11px] font-black uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 rounded-full px-8 py-3 hover:bg-primary transition-all hover:text-white shadow-lg shadow-primary/10">Export Registry</button>
            </div>
         </div>
      </motion.div>
    </motion.div>
  );
}
