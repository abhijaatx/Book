import Link from "next/link";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const shopLinks = [
    { name: "Anniversary Books", href: "/category/anniversary" },
    { name: "Birthday Books", href: "/category/birthday" },
    { name: "Wedding Books", href: "/category/wedding" },
    { name: "Baby Shower Gifts", href: "/category/baby" },
    { name: "Custom Albums", href: "/category/albums" },
  ];

  const supportLinks = [
    { name: "Order Status", href: "/order-status" },
    { name: "Shipping Policy", href: "/policies/shipping" },
    { name: "Refund Policy", href: "/policies/refund" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="w-full bg-[#322030] text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Heart className="h-6 w-6 text-secondary transition-transform group-hover:scale-110" fill="currentColor" />
              <span className="font-serif text-3xl font-bold tracking-tight">Kahaani</span>
            </Link>
            <p className="text-[#D8B4E2] text-sm leading-relaxed">
              We help you tell your most beautiful stories. Premium handcrafted personalized books and albums for your most cherished moments in India.
            </p>
            <div className="flex gap-4">
              <span className="text-sm font-medium opacity-50 uppercase tracking-widest">Connect with us</span>
            </div>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl font-bold">Shop by Occasion</h3>
            <ul className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#D8B4E2] hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl font-bold">Support</h3>
            <ul className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#D8B4E2] hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl font-bold">Get in Touch</h3>
            <div className="flex flex-col gap-3 text-sm text-[#D8B4E2]">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> <span>+91 91234 56789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> <span>care@kahaanibooks.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#D8B4E2]/20 text-center text-[10px] text-[#D8B4E2]/60 uppercase tracking-widest">
          © 2026 Kahaani Books India. Handcrafted with Love.
        </div>
      </div>
    </footer>
  );
}
