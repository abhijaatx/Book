export default function PrivacyPolicyPage() {
  const policies = [
    { 
      title: "Information We Collect", 
      detail: "When you visit Kahaani Books, we collect certain information about your device, your interaction with the site, and the information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual as 'Personal Information'." 
    },
    { 
      title: "Use of Personal Information", 
      detail: "We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers." 
    },
    { 
      title: "Content Uploaded for Personalization", 
      detail: "The photos, texts, and dates you upload to create your Kahaani Books are kept strictly confidential. We only use this content to print your custom product. Your personalized content is never shared with third parties or used for marketing without your explicit consent. Uploaded images are securely stored and routinely deleted from our active servers after your book is shipped." 
    },
    { 
      title: "Sharing Personal Information", 
      detail: "We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you. For example, we use third-party shipping carriers and secure payment processors. We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights." 
    },
    { 
      title: "Cookies", 
      detail: "A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences." 
    },
    { 
      title: "Data Retention", 
      detail: "When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. Account information and order history are kept to facilitate future purchases." 
    },
    { 
      title: "Changes to This Policy", 
      detail: "We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We encourage you to review it periodically." 
    },
    { 
      title: "Contact Us", 
      detail: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at care@kahaanibooks.com." 
    }
  ];

  return (
    <div className="flex flex-col gap-16 pb-32">
       <section className="bg-muted py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
             <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary italic">Privacy Policy</h1>
             <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Kahaani Books India</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
           {policies.map((p, i) => (
             <div key={i} className="flex flex-col gap-3 pb-8 border-b border-muted last:border-0">
               <h2 className="font-serif text-2xl font-bold text-primary">{p.title}</h2>
               <p className="text-muted-foreground leading-relaxed">{p.detail}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
