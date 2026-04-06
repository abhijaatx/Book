export default function ShippingPolicyPage() {
  const policies = [
    { title: "Pan-India Delivery", detail: "We ship to over 19,000+ pincodes across India, including Tier 1, 2, and 3 cities." },
    { title: "Production Time", detail: "Since every Kahaani Book is handcrafted and customized, please allow 3-5 business days for production and quality checks." },
    { title: "Shipping Charges", detail: "We offer FREE Shipping on all orders above ₹1,999 across India. For orders below this, a flat shipping fee of ₹99 applies." },
    { title: "Tracking Your Order", detail: "Once your order is shipped, a tracking link will be sent via SMS and Email. You can also track it in the 'Order Status' section." },
    { title: "Estimated Delivery", detail: "Metro cities: 2-4 days post-shipping. Rest of India: 4-7 days post-shipping." }
  ];

  return (
    <div className="flex flex-col gap-16 pb-32">
       <section className="bg-muted py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
             <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary italic">Shipping Policy</h1>
             <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Kahaani Books India</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
           {policies.map((p, i) => (
             <div key={i} className="flex flex-col gap-3 pb-8 border-b border-muted last:border-0">
               <h2 className="font-serif text-2xl font-bold text-primary">{p.title}</h2>
               <p className="text-muted-foreground leading-relaxed italic">{p.detail}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
