"use client";

import { useCart } from "@/store/useCart";
import { ArrowLeft, CreditCard, ShieldCheck, Truck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items } = useCart();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary">Your cart is empty</h1>
        <p className="text-muted-foreground">Add some stories to your cart before checking out.</p>
        <Link href="/" className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/20">
          Go Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-32 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors underline">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="rounded-3xl bg-white p-8 lg:p-12 shadow-xl shadow-primary/5">
              <h2 className="mb-8 font-serif text-3xl font-bold text-primary">Shipping Details</h2>
              <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Abhijaat Krishna"
                    className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="care@kahaanibooks.com"
                    className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest">Phone Number (+91)</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="91234 56789"
                    className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest">Shipping Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Building, Street, Area..."
                    rows={3}
                    className="rounded-xl border-2 border-muted p-4 focus:border-secondary transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest">Pincode (India)</label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="110001"
                    className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New Delhi"
                    className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="rounded-3xl bg-[#322030] p-8 lg:p-10 text-white shadow-xl shadow-primary/5">
               <div className="flex items-center gap-4 mb-6">
                  <ShieldCheck className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="font-serif text-xl font-bold">Secure Payment via Razorpay</h3>
                    <p className="text-xs text-[#D8B4E2] uppercase tracking-widest mt-1">100% Safe & Trusted Transactions</p>
                  </div>
               </div>
               <p className="text-sm leading-relaxed text-[#D8B4E2] opacity-80 mb-8">
                 After clicking "Complete Purchase", you will be redirected to the secure payment page to complete your order. We accept all major Indian credit/debit cards, UPI, and Netbanking.
               </p>
               <div className="flex items-center gap-4">
                  <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">UPI</div>
                  <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                  <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">CARDS</div>
               </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col gap-8">
            <div className="sticky top-32 rounded-3xl bg-white p-8 shadow-xl shadow-primary/5">
              <h2 className="mb-6 font-serif text-2xl font-bold text-primary">Order Summary</h2>
              <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                       <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-xs font-bold text-primary line-clamp-1">{item.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{item.quantity} × ₹{item.price}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t pt-6">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">FREE</span>
                </div>
                <div className="flex justify-between font-serif text-2xl font-bold text-primary mt-2">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <button className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-secondary text-white font-bold text-lg shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all active:scale-[0.98]">
                <Sparkles className="h-6 w-6" />
                Complete Purchase
              </button>
              
              <div className="mt-6 flex flex-col gap-3">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                    <Truck className="h-4 w-4 text-secondary" />
                    <span>Free Delivery across India</span>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                    <CreditCard className="h-4 w-4 text-secondary" />
                    <span>EMI Available at Checkout</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
