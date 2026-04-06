import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-20 pb-32">
      {/* Hero */}
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
             <h1 className="font-serif text-5xl font-bold text-primary">Get in Touch</h1>
             <p className="text-lg text-muted-foreground italic">We're here to help you tell your story beautifully.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-8 lg:p-12 shadow-2xl shadow-primary/5">
             <h2 className="font-serif text-3xl font-bold text-primary mb-8">Send us a Message</h2>
             <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-primary uppercase tracking-widest">Full Name</label>
                      <input type="text" placeholder="Abhijaat Krishna" className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-primary uppercase tracking-widest">Email Address</label>
                      <input type="email" placeholder="care@kahaanibooks.com" className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none" />
                   </div>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-primary uppercase tracking-widest">Subject</label>
                   <input type="text" placeholder="Order inquiry, Bulk order, etc." className="h-14 rounded-xl border-2 border-muted px-4 focus:border-secondary transition-all outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-primary uppercase tracking-widest">Your Message</label>
                   <textarea rows={5} placeholder="How can we help you today?" className="rounded-xl border-2 border-muted p-4 focus:border-secondary transition-all outline-none" />
                </div>
                <button className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-secondary text-white font-bold text-lg shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all">
                   <Send className="h-5 w-5" />
                   Send Message
                </button>
             </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-12 pt-4">
             <div className="flex flex-col gap-6">
                <h3 className="font-serif text-3xl font-bold text-primary">Need a quick answer?</h3>
                <p className="text-muted-foreground leading-relaxed">
                   Whether it's a question about your order status or you need help choosing the right book for your anniversary, our team is just a message away. We pride ourselves on personalized support for your personalized gifts.
                </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-muted/50 border border-muted transition-colors hover:border-secondary/20">
                   <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <Phone className="h-5 w-5" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">Call or WhatsApp</span>
                      <span className="font-bold text-primary">+91 91234 56789</span>
                   </div>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-muted/50 border border-muted transition-colors hover:border-secondary/20">
                   <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <Mail className="h-5 w-5" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">Email Us</span>
                      <span className="font-bold text-primary">care@kahaanibooks.com</span>
                   </div>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-muted/50 border border-muted transition-colors hover:border-secondary/20">
                   <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <MapPin className="h-5 w-5" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">Our Studio</span>
                      <span className="font-bold text-primary text-sm">E-12, Green Park, New Delhi, 110016</span>
                   </div>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-muted/50 border border-muted transition-colors hover:border-secondary/20">
                   <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <Clock className="h-5 w-5" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">Business Hours</span>
                      <span className="font-bold text-primary text-sm">Mon - Sat: 10AM - 7PM IST</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-4 p-6 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
                <MessageSquare className="h-10 w-10 text-secondary" />
                <div className="flex flex-col">
                   <span className="font-bold text-lg">Interested in a Bulk Order?</span>
                   <p className="text-xs opacity-80 uppercase tracking-widest">Special pricing for corporate and wedding favors.</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
