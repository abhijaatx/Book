import Link from "next/link";
import { Globe, Heart, Send, Mail } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    { title: "SHOP", links: [
      { name: "New In", href: "/category/new" },
      { name: "Planners", href: "/category/planners" },
      { name: "Notebooks", href: "/category/notebooks" },
      { name: "Photobooks", href: "/category/photobooks" },
      { name: "Stationery", href: "/category/stationery" },
      { name: "Newspaper", href: "/category/newspapers" },
      { name: "Sale", href: "/category/sale" },
    ]},
    { title: "ABOUT", links: [
      { name: "Our Story", href: "/about" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
      { name: "Contact Us", href: "/contact" },
    ]},
    { title: "HELP", links: [
      { name: "FAQs", href: "/faq" },
      { name: "Track Order", href: "/track" },
      { name: "Shipping & Returns", href: "/policies/shipping" },
      { name: "Privacy Policy", href: "/policies/privacy" },
    ]}
  ];

  return (
    <footer className="w-full bg-primary text-white pt-20 pb-12">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-8 mb-16">
          <div className="flex flex-col gap-3">
            <span className="font-serif text-[48px] leading-none tracking-[-0.04em] lowercase">kahaani</span>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] opacity-60 text-white/60">Stationery & gifts for everyday magic</p>
          </div>
          
          <div className="flex gap-4">
            {[Globe, Heart, Send, Mail].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-primary hover:scale-110 transition-premium"
              >
                <Icon size={14} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{section.title}</h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[12px] font-bold uppercase tracking-widest text-white hover:text-white/60 transition-premium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
          <p>© 2026 Kahaani India. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>GPay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
