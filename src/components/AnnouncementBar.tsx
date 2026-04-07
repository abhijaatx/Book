"use client";

import React from "react";

const ANNOUNCEMENTS = [
  "The most meaningful gift is the one only you can tell. Handcrafted with love, for the moments you never want to forget.",
  "FREE SHIPPING ON ALL ORDERS ABOVE ₹999",
  "CRAFTED WITH LOVE IN INDIA",
  "PERSONALIZED PHOTOBOOKS, MAGAZINES & NEWSPAPERS",
  "SHIPPING SOCIALLY CONSCIOUS STATIONERY SINCE 2018",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-primary py-2 overflow-hidden border-b border-foreground/10 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* We repeat the announcements to ensure a seamless loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {ANNOUNCEMENTS.map((text, j) => (
              <span 
                key={j} 
                className="mx-8 text-[10px] font-black uppercase tracking-[0.25em] text-white"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
