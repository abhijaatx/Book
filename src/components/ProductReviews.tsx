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
      { type: "image", url: "https://images.unsplash.com/photo-1544333323-537f844e3ad1?q=80&w=800&auto=format&fit=crop" },
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
    <div className="flex flex-col gap-10 mt-12 w-full max-w-2xl px-2">
      <div className="flex items-end justify-between border-b border-muted pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-3xl font-bold text-primary">Customer Stories</h2>
          <div className="flex items-center gap-3">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Based on {product.reviews} heartfelt reviews
            </span>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="text-sm font-bold text-secondary uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          {showForm ? "Cancel" : "Share your story"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-[2rem] bg-muted/40 p-6 border border-primary/5 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-xl font-bold text-primary">Tell us about your moment</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Your review helps others capture their magic</p>
          </div>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="rounded-full bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 border border-transparent focus:border-secondary/20"
              />
              <div className="rounded-full bg-white px-5 py-3 flex items-center justify-between border border-transparent">
                 <span className="text-sm text-muted-foreground font-medium">Rating</span>
                 <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
                    ))}
                 </div>
              </div>
            </div>
            <textarea 
              placeholder="What made this gift special? Share a small piece of your story..." 
              rows={4}
              className="rounded-[1.5rem] bg-white px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 border border-transparent focus:border-secondary/20 resize-none"
            />
            
            <div className="flex items-center gap-3">
               <button className="flex h-12 items-center gap-2 rounded-full border border-secondary/15 bg-white px-5 text-xs font-bold text-secondary hover:bg-secondary/5 transition-all">
                  <ImageIcon className="h-4 w-4" /> Add Photo
               </button>
               <button className="flex h-12 items-center gap-2 rounded-full border border-secondary/15 bg-white px-5 text-xs font-bold text-secondary hover:bg-secondary/5 transition-all">
                  <Video className="h-4 w-4" /> Add Video
               </button>
            </div>

            <button className="flex h-12 items-center justify-center gap-2 rounded-full bg-secondary text-sm font-bold text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all">
               <Send className="h-4 w-4" /> Send your review
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-4 group">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg font-bold text-primary">{review.author}</span>
                  {review.verified && (
                    <span className="text-[10px] bg-secondary/10 text-secondary font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Verified Story</span>
                  )}
                </div>
                <div className="flex text-accent">
                   {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3" fill={i < review.rating ? "currentColor" : "none"} strokeWidth={3} />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {review.date}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground font-medium italic opacity-90 border-l-2 border-secondary/20 pl-4">
              "{review.content}"
            </p>

            {review.assets && review.assets.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {review.assets.map((asset, i) => (
                  <div key={i} className="relative aspect-square w-32 overflow-hidden rounded-2xl border border-black/5 bg-muted shadow-sm group/media cursor-pointer">
                    <Image
                      src={asset.type === 'video' ? (asset.thumbnail || "") : asset.url}
                      alt="Review attachment"
                      fill
                      className="object-cover transition-transform group-hover/media:scale-110 duration-500"
                    />
                    {asset.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/media:bg-black/30 transition-all">
                        <PlayCircle className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] hover:text-secondary transition-colors text-center pb-12 border-b border-muted">
        View more stories ({product.reviews})
      </button>
    </div>
  );
}
