"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  ArrowLeft,
  Bell,
  Search,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/store/useAuth";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Inventory", href: "/admin/inventory", icon: Package },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isClient) return null;
  if (!isAuthenticated && pathname !== "/admin/login") return null;

  // Don't wrap login page with the admin shell
  if (pathname === "/admin/login") {
     return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#FFFDF5] text-foreground overflow-hidden font-sans selection:bg-primary/10">
      
      {/* Sidebar */}
      <aside className="w-72 flex flex-col border-r border-foreground/5 bg-white shadow-sm">
        <div className="p-8 pb-12 flex flex-col gap-8">
           <Link href="/" className="flex items-center gap-3 text-foreground group">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10 transition-all group-hover:scale-110">
                <ArrowLeft size={16} className="text-primary" />
             </div>
             <span className="font-serif text-2xl tracking-tight lowercase">Kahaani <span className="italic text-primary/60">Admin</span></span>
           </Link>

           <nav className="flex flex-col gap-2">
             {sidebarLinks.map((link) => {
               const isActive = pathname === link.href;
               return (
                 <Link
                   key={link.name}
                   href={link.href}
                   className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                     isActive 
                       ? "bg-primary text-white shadow-xl shadow-primary/20" 
                       : "text-foreground/40 hover:text-primary hover:bg-primary/5"
                   }`}
                 >
                   <link.icon size={18} strokeWidth={isActive ? 3 : 2} />
                   {link.name}
                   {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                   )}
                 </Link>
               );
             })}
           </nav>
        </div>

        <div className="mt-auto p-8 border-t border-foreground/5 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/10 overflow-hidden flex items-center justify-center text-primary text-[11px] font-black uppercase">
                {user?.avatar ? (
                  <Image src={user.avatar} alt={user.name || 'Admin'} width={40} height={40} className="object-cover" />
                ) : (
                  user?.name?.split(' ').map(n => n[0]).join('') || 'AD'
                )}
              </div>
              <div className="flex flex-col">
                 <span className="text-[13px] font-bold text-foreground">{user?.name || 'Admin Kahaani'}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-foreground/40">{user?.provider === 'google' ? 'Google Curator' : 'Master Curator'}</span>
              </div>
            </div>
           <button 
             onClick={() => logout()}
             className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-600 transition-colors"
           >
              <LogOut size={14} /> Studio Logout
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 border-b border-foreground/5 flex items-center justify-between px-10 bg-white/70 backdrop-blur-xl sticky top-0 z-30">
           <div className="flex items-center gap-6 flex-1 max-w-md">
              <div className="relative w-full group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 transition-colors group-focus-within:text-primary" />
                 <input 
                   type="text" 
                   placeholder="Search orders, products, customers..." 
                   className="w-full bg-background border border-foreground/5 rounded-full py-3 pl-12 pr-6 text-[12px] font-medium text-foreground placeholder:text-foreground/20 outline-none focus:ring-1 focus:ring-primary/50 focus:bg-white transition-all shadow-sm shadow-primary/5"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button className="relative h-10 w-10 rounded-xl border border-foreground/5 flex items-center justify-center hover:bg-background text-foreground/40 transition-all">
                 <Bell size={18} />
                 <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary border-2 border-white" />
              </button>
              <div className="h-10 px-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 flex items-center gap-3">
                 <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">SYSTEM ACTIVE</span>
              </div>
           </div>
        </header>

        {/* Dynamic Section Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
           {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
