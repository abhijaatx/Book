"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How many photos can I upload to my book?",
    answer: "You can upload 20-60 photos depending on the layout you choose. We recommend high-resolution photos for the best print quality."
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Since every Kahaani Book is uniquely personalized and cannot be resold, we currently only accept prepaid orders via UPI, Cards, and Netbanking."
  },
  {
    question: "Can I see a preview before my book is printed?",
    answer: "Yes! At the end of the personalization wizard, you can see a digital mockup of your book. We also perform a final layout check before printing."
  },
  {
    question: "Is my data and photos secure?",
    answer: "Absolutely. We use industry-standard encryption, and your photos are only used for printing your book. We never share them with third parties."
  },
  {
    question: "How do I track my order?",
    answer: "You will receive a tracking link via SMS/Email as soon as your book is shipped. You can also use the 'Order Status' page on our website."
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col gap-16 pb-32">
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
             <h1 className="font-serif text-5xl font-bold text-primary italic underline decoration-secondary">Frequently Asked Questions</h1>
             <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-2">Everything You Need to Know</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
           {faqs.map((faq, i) => (
             <details key={i} className="group border-b border-muted hover:bg-muted/30 transition-all rounded-xl p-4">
                <summary className="flex items-center justify-between font-bold text-primary text-xl cursor-pointer list-none py-2">
                   {faq.question}
                   <Plus className="h-5 w-5 text-secondary group-open:hidden" />
                   <Minus className="h-5 w-5 text-secondary hidden group-open:block" />
                </summary>
                <p className="text-muted-foreground leading-relaxed italic pt-4 pb-2">
                   {faq.answer}
                </p>
             </details>
           ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-20 text-center">
         <div className="bg-primary text-white p-12 rounded-3xl flex flex-col gap-6 shadow-2xl shadow-primary/20">
            <h3 className="font-serif text-3xl font-bold">Still have questions?</h3>
            <p className="text-sm opacity-80 uppercase tracking-widest italic font-medium mt-1">Our customer care is here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
               <a href="/contact" className="px-8 py-3 rounded-xl bg-secondary text-white font-bold hover:bg-secondary/90 shadow-lg">Contact Us</a>
               <span className="text-xs opacity-50 uppercase font-bold">OR</span>
               <a href="https://wa.me/919123456789" className="text-secondary font-bold underline decoration-white hover:decoration-secondary">WhatsApp Support</a>
            </div>
         </div>
      </section>
    </div>
  );
}
