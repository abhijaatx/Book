"use client";

import { motion } from "framer-motion";
import { CheckCircle, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number
    setOrderNumber(`KB-${Math.floor(100000 + Math.random() * 900000)}`);
    
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center flex flex-col items-center gap-6 border border-muted"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
          <CheckCircle className="w-12 h-12" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-bold text-primary">Order Confirmed!</h1>
          <p className="text-muted-foreground italic">Your story is in good hands.</p>
        </div>

        <div className="w-full p-4 bg-muted/50 rounded-2xl flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Order Number</span>
          <span className="font-mono text-lg font-bold text-primary">{orderNumber}</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Thank you for choosing Kahaani Books. Our artisans in New Delhi have received your personalization details and will begin crafting your keepsake shortly.
        </p>

        <div className="flex flex-col w-full gap-3">
          <Link 
            href="/"
            className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <div className="flex items-center justify-center gap-2 text-primary/60 text-xs font-medium">
            <Heart className="w-3 h-3 fill-current" />
            Made with love in India
          </div>
        </div>
      </motion.div>
    </div>
  );
}
