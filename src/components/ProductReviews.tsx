"use client";

import { useState } from "react";
import { Star, MessageSquare, Send, User, Calendar, Image as ImageIcon, Video, PlayCircle } from "lucide-react";
import { Product } from "@/lib/products";
import Image from "next/image";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  assets?: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  }[];
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Ananya Sharma",
    rating: 5,
    date: "Feb 12, 2026",
    content: "The most beautiful anniversary gift I've ever given. The paper quality is luxury and the colors are so vibrant. My husband was moved to tears!",
    verified: true,
    assets: [
      { type: "image", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1517713982677-4b66332f98de?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "2",
    author: "Rahul Varma",
    rating: 5,
    date: "Jan 28, 2026",
    content: "Perfect for our first anniversary. Handcrafted feels different, much more soul than mass-produced albums. Highly recommend for milestone moments.",
    verified: true,
    assets: [
      { type: "video", url: "#", thumbnail: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "3",
    author: "Priya K.",
    rating: 4,
    date: "Jan 15, 2026",
    content: "Beautiful layouts and easy to personalize. The delivery took a few extra days, but the result was worth the wait. Every page tells our story perfectly.",
    verified: true,
  }
];

export default function ProductReviews({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-12 mt-16 w-full max-w-2xl">
      <div className="flex items-end justify-between border-b border-border/50 pb-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-sans text-4xl font-black text-foreground tracking-tight uppercase leading-none">Customer Stories</h2>
          <div className="flex items-center gap-4">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={3} />
              ))}
            </div>
            <span className="text-[10px] font-black tracking-widest text-foreground/40 uppercase">
              Based on {product.reviews} heartfelt reviews
            </span>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          {showForm ? "Cancel" : "Share your story"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-[2.5rem] bg-secondary/30 p-8 border border-border/50 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col gap-2">
            <h3 className="font-sans text-2xl font-black text-foreground tracking-tight uppercase">Tell us your story</h3>
            <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.2em]">Your magic helps others find theirs</p>
          </div>
          
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="rounded-full bg-white px-6 py-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/50"
              />
              <div className="rounded-full bg-white px-6 py-4 flex items-center justify-between border border-border/50">
                 <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Rating</span>
                 <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" strokeWidth={3} />
                    ))}
                 </div>
              </div>
            </div>
            <textarea 
              placeholder="What made this gift special? Share a piece of your magic..." 
              rows={4}
              className="rounded-[2rem] bg-white px-6 py-5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/50 resize-none"
            />
            
            <div className="flex items-center gap-4">
               <button className="flex h-14 items-center gap-3 rounded-full border-2 border-border bg-white px-8 text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-secondary/30 transition-all">
                  <ImageIcon className="h-4 w-4" /> Add Photo
               </button>
               <button className="flex h-14 items-center gap-3 rounded-full border-2 border-border bg-white px-8 text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-secondary/30 transition-all">
                  <Video className="h-4 w-4" /> Add Video
               </button>
            </div>

            <button className="flex h-16 items-center justify-center gap-3 rounded-full bg-primary-pressed text-xs font-black uppercase tracking-[0.25em] text-white shadow-2xl shadow-primary-pressed/40 transition-all hover:scale-105 active:scale-95">
               <Send className="h-4 w-4" /> Send your story
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-12">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-6 group">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xl font-black text-foreground tracking-tight uppercase">{review.author}</span>
                  {review.verified && (
                    <span className="text-[8px] bg-primary/10 text-primary font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full">Verified Store</span>
                  )}
                </div>
                <div className="flex text-primary">
                   {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill={i < review.rating ? "currentColor" : "none"} strokeWidth={3} />
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20 group-hover:text-foreground/40 transition-colors flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {review.date}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/60 font-medium italic border-l-4 border-primary/20 pl-6 py-1">
              "{review.content}"
            </p>

            {review.assets && review.assets.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-2">
                {review.assets.map((asset, i) => (
                  <div key={i} className="relative aspect-square w-40 overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm group/media cursor-pointer hover:shadow-xl transition-all">
                    <Image
                      src={asset.type === 'video' ? (asset.thumbnail || "") : asset.url}
                      alt="Review attachment"
                      fill
                      className="object-cover transition-all duration-700 group-hover/media:scale-110"
                      unoptimized
                    />
                    {asset.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/media:bg-black/30 transition-all">
                        <PlayCircle className="h-10 w-10 text-white drop-shadow-xl" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.4em] hover:text-primary transition-all text-center pb-12 border-b border-border/50 mb-12">
        View more stories ({product.reviews})
      </button>
    </div>
  );
}
