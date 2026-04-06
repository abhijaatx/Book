"use client";

import { useState } from "react";
import { ShoppingBag, ChevronRight, User, MapPin, Phone, Mail, Clock, CheckCircle, Package, Truck } from "lucide-react";

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Mock data for demo
  const orders = [
    {
      id: "ord_123",
      createdAt: "2026-04-06T10:00:00Z",
      customerName: "Abhijaat Krishna",
      customerEmail: "abhijaat@example.com",
      customerPhone: "91234 56789",
      shippingAddress: "E-12, Green Park, New Delhi",
      pincode: "110016",
      totalAmount: 2499,
      paymentStatus: "paid",
      shippingStatus: "confirmed",
      items: [
        {
          name: "The 'Our Story' Anniversary Book",
          price: 2499,
          personalization: {
            recipientName: "Neha",
            senderName: "Abhijaat",
            message: "To my forever love, 5 years and counting!",
            photos: ["photo1.jpg", "photo2.jpg"]
          }
        }
      ]
    },
    {
      id: "ord_124",
      createdAt: "2026-04-06T11:30:00Z",
      customerName: "Priya Sharma",
      customerEmail: "priya@example.com",
      customerPhone: "98765 43210",
      shippingAddress: "Bungalow 4, Juhu Tara Road, Mumbai",
      pincode: "400049",
      totalAmount: 4999,
      paymentStatus: "paid",
      shippingStatus: "production",
      items: [
        {
          name: "Forever Together Premium Photo Album",
          price: 4999,
          personalization: {
            recipientName: "Mom & Dad",
            senderName: "Priya",
            message: "Happy 25th Anniversary!",
            photos: ["wedding.jpg", "vacation.jpg"]
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
             <h1 className="font-serif text-3xl font-bold text-primary">Order Management</h1>
             <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Kahaani Books Admin</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">A</div>
             <span className="text-sm font-bold text-primary">Admin Access</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Order List */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest pl-2">Recent Orders</h3>
            {orders.map((order) => (
              <div 
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`p-6 rounded-2xl cursor-pointer border-2 transition-all flex justify-between items-center ${selectedOrder?.id === order.id ? "bg-white border-secondary shadow-lg" : "bg-white/50 border-white hover:border-secondary/20"}`}
              >
                <div className="flex flex-col gap-1">
                   <span className="text-xs font-bold text-muted-foreground">{order.id}</span>
                   <span className="font-bold text-primary">{order.customerName}</span>
                   <span className="text-[10px] uppercase font-bold text-secondary">₹{order.totalAmount} • {order.paymentStatus}</span>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${selectedOrder?.id === order.id ? "rotate-90 text-secondary" : "text-muted-foreground"}`} />
              </div>
            ))}
          </div>

          {/* Order Detail View */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-primary/5 flex flex-col gap-10">
                <div className="flex justify-between items-start pb-6 border-b">
                   <div className="flex flex-col gap-2">
                      <h2 className="font-serif text-3xl font-bold text-primary">{selectedOrder.customerName}</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                         <Clock className="h-4 w-4" /> <span>Order date: {new Date(selectedOrder.createdAt).toLocaleString()}</span>
                      </div>
                   </div>
                   <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase"> Paid via Razorpay </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                   {/* Shipping */}
                   <div className="flex flex-col gap-6">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-4 border-secondary pl-3">Shipping Info</h4>
                      <div className="flex flex-col gap-3 text-sm font-medium">
                         <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-secondary" /> {selectedOrder.shippingAddress}</div>
                         <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-secondary" /> {selectedOrder.customerPhone}</div>
                         <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-secondary" /> {selectedOrder.customerEmail}</div>
                         <div className="flex items-center gap-3 font-bold text-primary"><Package className="h-4 w-4 text-secondary" /> Pincode: {selectedOrder.pincode}</div>
                      </div>
                   </div>

                   {/* Status Control */}
                   <div className="flex flex-col gap-6">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-4 border-secondary pl-3">Order Progress</h4>
                      <div className="flex flex-col gap-3">
                         {[
                           { name: "Confirmed", icon: CheckCircle, active: true },
                           { name: "In Production", icon: Package, active: selectedOrder.shippingStatus === "production" },
                           { name: "Shipped", icon: Truck, active: false }
                         ].map(state => (
                           <button 
                             key={state.name}
                             className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all font-bold text-xs uppercase ${state.active ? "bg-primary text-white border-primary" : "border-muted text-muted-foreground hover:border-secondary"}`}
                           >
                             <state.icon className="h-4 w-4" /> {state.name}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Personalization Section */}
                <div className="flex flex-col gap-6 pt-10 border-t">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest border-l-4 border-secondary pl-3">Personalization Artifacts</h4>
                    {selectedOrder.items.map((item: any, i: number) => (
                      <div key={i} className="bg-muted/30 rounded-2xl p-6 flex flex-col gap-6">
                         <h5 className="font-serif text-xl font-bold text-primary">{item.name}</h5>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                            <div className="flex flex-col gap-1">
                               <span className="text-xs font-bold text-muted-foreground uppercase">Recipient</span>
                               <span className="font-bold">{item.personalization.recipientName}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                               <span className="text-xs font-bold text-muted-foreground uppercase">Sender</span>
                               <span className="font-bold">{item.personalization.senderName}</span>
                            </div>
                            <div className="sm:col-span-2 flex flex-col gap-1">
                               <span className="text-xs font-bold text-muted-foreground uppercase">Custom Message</span>
                               <p className="italic bg-white p-4 rounded-xl border border-secondary/20 font-medium">"{item.personalization.message}"</p>
                            </div>
                            <div className="sm:col-span-2 flex flex-col gap-3">
                               <span className="text-xs font-bold text-muted-foreground uppercase">Uploaded Photos (Source)</span>
                               <div className="flex gap-4">
                                  {item.personalization.photos.map((p: string) => (
                                    <div key={p} className="h-20 w-20 rounded-xl bg-primary/10 flex flex-col items-center justify-center border-2 border-dashed border-primary/20 text-[10px] font-bold text-primary">
                                       <span>SRC</span>
                                       <span>IMG</span>
                                    </div>
                                  ))}
                               </div>
                               <button className="self-start text-[10px] font-bold text-secondary underline tracking-widest uppercase">Download All Assets (.zip)</button>
                            </div>
                         </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[600px] rounded-3xl border-2 border-dashed border-muted flex flex-col items-center justify-center gap-4 text-muted-foreground">
                 <ShoppingBag className="h-20 w-20 opacity-10" />
                 <p className="font-medium">Select an order from the list to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
