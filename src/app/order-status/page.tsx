"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function OrderStatusPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate lookup
    if (orderId && phone) {
      setStatus({
        id: orderId,
        date: "April 02, 2026",
        currentStatus: "In Production",
        estimatedDelivery: "April 08, 2026",
        steps: [
          { name: "Order Placed", date: "April 02, 2026", completed: true },
          { name: "Design & Photo Check", date: "April 03, 2026", completed: true },
          { name: "In Production", date: "Expected April 05", completed: false },
          { name: "Shipped", date: "TBA", completed: false },
          { name: "Delivered", date: "TBA", completed: false }
        ]
      });
    }
  };

  return (
    <div className="flex flex-col gap-16 pb-32">
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
             <h1 className="font-serif text-5xl font-bold text-primary italic">Order Status</h1>
             <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold font-mono">Track your Story</p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 lg:p-10 shadow-2xl shadow-primary/5 flex flex-col gap-8">
           <form onSubmit={handleSearch} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-primary uppercase tracking-widest">Order ID</label>
                 <input 
                   type="text" 
                   placeholder="e.g. KB-12345" 
                   value={orderId}
                   onChange={(e) => setOrderId(e.target.value)}
                   className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none" 
                 />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-primary uppercase tracking-widest">Phone Number (+91)</label>
                 <input 
                   type="text" 
                   placeholder="91234 56789" 
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none" 
                 />
              </div>
              <button type="submit" className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-white font-bold transition-all hover:bg-primary/90">
                 <Search className="h-5 w-5" />
                 Track My Order
              </button>
           </form>

           {status && (
             <div className="flex flex-col gap-8 pt-8 border-t border-muted animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-secondary/10">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Current Status</span>
                      <span className="text-xl font-bold text-primary italic">{status.currentStatus}</span>
                   </div>
                   <Package className="h-10 w-10 text-secondary" />
                </div>

                <div className="flex flex-col gap-6">
                   {status.steps.map((step: any, i: number) => (
                     <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                        {i < status.steps.length - 1 && (
                          <div className={`absolute left-[13px] top-6 w-[2px] h-full ${step.completed ? "bg-secondary" : "bg-muted"}`} />
                        )}
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center z-10 ${step.completed ? "bg-secondary text-white" : "bg-muted text-muted-foreground"}`}>
                           <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className={`text-sm font-bold ${step.completed ? "text-primary" : "text-muted-foreground"}`}>{step.name}</span>
                           <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">Date: {step.date}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="p-4 rounded-xl bg-secondary/5 border-2 border-dashed border-secondary/20 flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                     <Truck className="h-3 w-3" />
                     Estimated Delivery
                   </span>
                   <span className="text-lg font-bold text-primary italic">{status.estimatedDelivery}</span>
                </div>
             </div>
           )}

           {!status && (
             <div className="flex flex-col gap-3 py-4">
                <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-xl border border-muted text-xs text-muted-foreground italic leading-relaxed">
                   <Clock className="h-4 w-4 flex-shrink-0 text-secondary" />
                   <span>Tracking information is usually available within 24 hours of placing your order.</span>
                </div>
             </div>
           )}
        </div>
      </section>
    </div>
  );
}
