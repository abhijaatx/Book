"use client";

import Link from "next/link";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

export default function AccountPage() {
  // Mock data for high-fidelity social-first profile
  const orders = [
    { id: "ord_123", name: "The 'Our Story' Anniversary Book", status: "confirmed", date: "April 06, 2026", amount: 2499 },
    { id: "ord_110", name: "Celestial Dreams Photo Magazine", status: "delivered", date: "March 12, 2026", amount: 1299 }
  ];

  const savedKeepsakes = [
    { name: "My 2024 Travel Chronicle", type: "Magazine", progress: 75 },
    { name: "Summer in Tuscany", type: "Newspaper", progress: 20 }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF5] selection:bg-primary/10">
      
      {/* Editorial Account Header */}
      <section className="bg-primary pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none text-white">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 Q50,50 0,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
           </svg>
        </div>
        
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative">
          <div className="flex flex-col gap-10">
             <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center p-4">
                   <User className="h-full w-full text-white" />
                </div>
                <div className="flex flex-col gap-2">
                   <h1 className="font-serif text-[48px] lg:text-[72px] leading-none tracking-[-0.04em] text-white lowercase">My Kahaani</h1>
                   <div className="flex items-center gap-4 text-white/60">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Client Since 2026</span>
                      <div className="h-1 w-1 rounded-full bg-white/20" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Premium Member</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
           
           {/* Sidebar: Personal Box Menu */}
           <div className="lg:col-span-3 flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/60 border-l-2 border-primary pl-4">The Personal Box</h4>
                 <nav className="flex flex-col gap-1">
                    {[
                      { icon: Package, name: "Keepsake History", href: "#history", active: true },
                      { icon: Heart, name: "Saved Stories", href: "#saved", active: false },
                      { icon: MapPin, name: "Handover Address", href: "#address", active: false },
                      { icon: User, name: "Studio Profile", href: "#profile", active: false }
                    ].map((item) => (
                      <Link 
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${item.active ? "bg-white text-primary shadow-xl shadow-primary/5 shadow-inner" : "text-foreground/40 hover:bg-white hover:text-primary"}`}
                      >
                         <item.icon size={18} className="transition-transform group-hover:scale-110" />
                         <span className="text-[12px] font-black uppercase tracking-widest">{item.name}</span>
                      </Link>
                    ))}
                 </nav>
              </div>

              <button className="flex items-center gap-4 px-4 py-4 text-rose-800/40 hover:text-rose-800 transition-colors">
                 <LogOut size={18} />
                 <span className="text-[12px] font-black uppercase tracking-widest">Sign out of Studio</span>
              </button>
           </div>

           {/* Content Area */}
           <div className="lg:col-span-9 flex flex-col gap-24">
              
              {/* Stories in Progress - Visual Dashboard */}
              <div id="saved" className="flex flex-col gap-10">
                 <div className="flex items-center justify-between">
                    <h3 className="font-serif text-[32px] lg:text-[44px] leading-tight tracking-tight text-foreground lowercase italic">Stories in <span className="text-secondary font-medium">Progress</span></h3>
                    <Link href="/category/all" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:opacity-60">Create New Story</Link>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {savedKeepsakes.map((story) => (
                      <div key={story.name} className="group p-8 rounded-[3rem] bg-white border border-foreground/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col gap-12">
                         <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-tighter text-primary/40 leading-none">{story.type}</span>
                                <span className="text-[11px] font-black uppercase tracking-widest text-primary">{story.progress}%</span>
                            </div>
                            <h4 className="font-serif text-[24px] text-foreground tracking-tight line-clamp-1">{story.name}</h4>
                         </div>
                         <div className="flex flex-col gap-6">
                            <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                               <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${story.progress}%` }} />
                            </div>
                            <Link 
                                href="/personalize/photobooks-everything-magic"
                                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] transition-premium hover:scale-[1.02] active:scale-95"
                            >
                               Continue Editing
                            </Link>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Keepsake History - Table View */}
              <div id="history" className="flex flex-col gap-10">
                 <h3 className="font-serif text-[32px] lg:text-[44px] leading-tight tracking-tight text-foreground lowercase italic">Keepsake <span className="text-primary font-medium">History</span></h3>
                 
                 <div className="overflow-hidden rounded-[3rem] bg-white shadow-xl shadow-primary/5 border border-foreground/5">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left border-collapse">
                          <thead>
                             <tr className="bg-muted/30">
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Item Details</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Story Date</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Status</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 text-right">Story Total</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-foreground/5">
                             {orders.map((order) => (
                               <tr key={order.id} className="group hover:bg-[#FFFDF5] cursor-pointer">
                                  <td className="px-10 py-10">
                                     <div className="flex flex-col gap-1">
                                        <span className="text-[14px] font-bold text-foreground">{order.name}</span>
                                        <span className="text-[10px] font-medium text-foreground/30 uppercase tracking-[0.2em]">ID: {order.id}</span>
                                     </div>
                                  </td>
                                  <td className="px-10 py-10">
                                     <span className="text-[13px] font-serif italic text-foreground/60">{order.date}</span>
                                  </td>
                                  <td className="px-10 py-10">
                                     <div className="flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${order.status === 'confirmed' ? 'bg-amber-500' : 'bg-[#606c38]'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{order.status}</span>
                                     </div>
                                  </td>
                                  <td className="px-10 py-10 text-right">
                                     <span className="text-[14px] font-black text-primary tracking-tight">₹{order.amount}</span>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>

              {/* No more content footer */}
              <div className="flex flex-col items-center text-center gap-4 py-20 bg-primary/5 rounded-[4rem] border-2 border-dashed border-primary/10">
                  <h4 className="font-serif text-3xl italic text-primary/40 lowercase">The story never ends...</h4>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/40">More keepsakes mean more legacy.</p>
              </div>

           </div>
        </div>
      </section>
    </div>
  );
}
