export default function RefundPolicyPage() {
  const policies = [
    { title: "No Return for Personalized Items", detail: "Since every Kahaani Book is uniquely created for you, we cannot accept returns or offer refunds for personalized products once production has begun." },
    { title: "Damage or Manufacturing Errors", detail: "If your book arrives damaged or has a printing error (blurry photos, misspelled names in production), please contact us within 48 hours of delivery at care@kahaanibooks.com with photos of the issue." },
    { title: "Replacement Policy", detail: "In case of valid damage or manufacturing errors, we will offer a FREE replacement of the same product at no extra cost. We do not provide cash refunds." },
    { title: "Order Cancellations", detail: "Cancellations are only possible within 2 hours of placing the order. Once it moves to the design and production phase, cancellations cannot be processed." },
    { title: "Incorrect Address", detail: "Kahaani Books is not responsible for non-delivery if the shipping address provided is incorrect or incomplete. Please double-check your shipping details at checkout." }
  ];

  return (
    <div className="flex flex-col gap-16 pb-32">
       <section className="bg-muted py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
             <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary italic">Refund Policy</h1>
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
