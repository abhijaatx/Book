"use client"

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  LayoutGrid, 
  List,
  ChevronRight,
  X,
  ArrowRight,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AdminInventory() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(getAllProducts());
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: any) => {
    // Ensure all fields exist in the state, even if missing in original data
    setSelectedProduct({
      ...product,
      salePrice: product.salePrice || null,
      isNew: product.isNew || false,
      size: product.size || "8.5 x 11 inches",
      material: product.material || "Archival Matte Paper",
      images: [...product.images]
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct({
      id: `registry-${Date.now()}`,
      name: "",
      slug: "",
      description: "",
      basePrice: 0,
      salePrice: null,
      isNew: true,
      size: "8.5 x 11 inches",
      material: "Archival Matte Paper",
      images: [""],
      category: { name: "Planners", slug: "planners", description: "" },
      type: "book",
      featured: false,
      rating: 5,
      reviews: 0
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const exists = products.find(p => p.id === selectedProduct.id);
    if (exists) {
      setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
    } else {
      setProducts([selectedProduct, ...products]);
    }
    setIsModalOpen(false);
  };

  const addImage = () => {
    setSelectedProduct({
      ...selectedProduct,
      images: [...selectedProduct.images, ""]
    });
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...selectedProduct.images];
    newImages[index] = value;
    setSelectedProduct({ ...selectedProduct, images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = selectedProduct.images.filter((_: any, i: number) => i !== index);
    setSelectedProduct({ ...selectedProduct, images: newImages });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this edition from the library?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-12 relative animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
         <div className="flex flex-col gap-4">
            <h1 className="font-serif text-[48px] tracking-tight text-foreground lowercase italic">Library <span className="text-primary/60 not-italic font-sans font-black uppercase text-[24px] tracking-[0.2em] ml-4">Curations</span></h1>
            <p className="text-foreground/50 text-[15px] font-medium max-w-lg leading-relaxed">Manage your premium product catalog. Feature your best work and curate the collection.</p>
         </div>
         
         <div className="flex items-center gap-4">
            <div className="relative group w-72">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search catalog..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-white border border-foreground/5 rounded-2xl py-3.5 pl-12 pr-6 text-[12px] font-bold uppercase tracking-widest text-foreground placeholder:text-foreground/20 outline-none focus:ring-1 focus:ring-primary/50 transition-all shadow-sm"
               />
            </div>
            <button 
               onClick={handleAdd}
               className="h-14 px-8 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
               <Plus size={18} strokeWidth={3} /> Add Product
            </button>
         </div>
      </div>

      {/* Inventory Table Container */}
      <div className="rounded-[3rem] bg-white border border-foreground/5 overflow-hidden flex flex-col shadow-sm shadow-primary/5">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-foreground/5">
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Edition</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Category</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">Type</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 text-center">Status</th>
                     <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 text-right">Pricing</th>
                     <th className="px-10 py-8"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-foreground/5 font-medium leading-normal text-foreground">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.tr 
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-primary/[0.02] transition-colors"
                      >
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-6">
                               <div className="h-20 w-16 relative rounded-xl overflow-hidden bg-background flex-shrink-0 group-hover:scale-105 transition-transform">
                                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" unoptimized />
                               </div>
                               <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-3">
                                     <span className="text-[15px] font-black text-foreground group-hover:text-primary transition-colors cursor-pointer">{product.name}</span>
                                     {product.isNew && (
                                       <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                                     )}
                                  </div>
                                  <span className="text-[11px] text-foreground/40 font-medium uppercase tracking-widest">{product.slug}</span>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <span className="text-[13px] font-bold text-foreground/40 capitalize">{product.category.name}</span>
                         </td>
                         <td className="px-10 py-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-background border border-foreground/5 text-[10px] font-black uppercase tracking-widest text-foreground/40">
                               {product.type}
                            </div>
                         </td>
                         <td className="px-10 py-8 text-center">
                            <div className="flex items-center justify-center gap-3">
                               <button 
                                 onClick={() => setProducts(products.map(p => p.id === product.id ? {...p, featured: !p.featured} : p))}
                                 title="Feature in Studio"
                                 className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${product.featured ? 'text-primary bg-primary/10 border border-primary/20' : 'text-foreground/20 bg-background border border-foreground/5 hover:text-foreground/40'}`}
                               >
                                  <Star size={18} fill={product.featured ? "currentColor" : "none"} strokeWidth={2} />
                               </button>
                            </div>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <div className="flex flex-col items-end gap-1">
                               <span className={`text-[16px] font-black tracking-tight ${product.salePrice ? 'text-primary' : 'text-foreground'}`}>
                                  ₹{product.salePrice || product.basePrice}
                               </span>
                               {product.salePrice && (
                                 <span className="text-[11px] text-foreground/20 line-through">₹{product.basePrice}</span>
                               )}
                            </div>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => handleEdit(product)}
                                 className="h-10 w-10 rounded-xl border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all"
                               >
                                  <Edit3 size={16} />
                               </button>
                               <button 
                                 onClick={() => handleDelete(product.id)}
                                 className="h-10 w-10 rounded-xl border border-foreground/10 flex items-center justify-center text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
         
         <div className="px-10 py-8 bg-background border-t border-foreground/5 flex items-center justify-between text-foreground/40 font-bold text-[11px] tracking-widest uppercase">
            <span>Catalog Scan: {products.length} Premium SKUs Found</span>
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-4">
                  <span className="opacity-40">Layout:</span>
                  <div className="flex bg-white border border-foreground/5 p-1 rounded-xl shadow-sm">
                     <button className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shadow-inner"><List size={14} /></button>
                     <button className="h-8 w-8 rounded-lg text-foreground/20 flex items-center justify-center opacity-40"><LayoutGrid size={14} /></button>
                  </div>
               </div>
               <div className="h-8 w-[1px] bg-foreground/5" />
               <div className="flex items-center gap-2">
                  <button className="h-10 w-10 rounded-xl border border-foreground/5 flex items-center justify-center text-foreground/40 hover:text-primary transition-all"><ChevronRight size={18} className="rotate-180" /></button>
                  <span className="px-4 text-foreground font-black">Page 01</span>
                  <button className="h-10 w-10 rounded-xl border border-foreground/5 flex items-center justify-center text-foreground/40 hover:text-primary transition-all"><ChevronRight size={18} /></button>
               </div>
            </div>
         </div>
      </div>

      {/* High-Fidelity Edit Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[90vh] bg-[#FFFDF5] rounded-[4rem] shadow-2xl z-[70] overflow-hidden border border-foreground/5"
            >
               <div className="h-full flex flex-col">
                  {/* Modal Header */}
                  <div className="p-10 lg:p-14 border-b border-foreground/5 bg-white flex items-center justify-between">
                     <div className="flex flex-col gap-2">
                        <h2 className="font-serif text-[32px] lg:text-[42px] leading-none tracking-tight text-foreground lowercase italic">Curation <span className="not-italic text-primary/60 font-sans font-black uppercase text-[12px] tracking-[0.4em] ml-4">Registry</span></h2>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/20">Modifying: {selectedProduct.name}</p>
                     </div>
                     <button 
                        onClick={() => setIsModalOpen(false)}
                        className="h-14 w-14 rounded-full bg-background border border-foreground/5 flex items-center justify-center text-foreground/20 hover:text-primary transition-all"
                     >
                        <X size={24} />
                     </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-10 lg:p-14">
                     <div className="flex flex-col gap-16">
                        
                        {/* Section: Basic Identity */}
                        <div className="flex flex-col gap-8">
                           <div className="flex items-center gap-4">
                              <div className="h-8 w-[2px] bg-primary" />
                              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">Product Identity</h3>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <div className="flex flex-col gap-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Product Name</label>
                                 <input 
                                    type="text" 
                                    value={selectedProduct.name}
                                    onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                                    placeholder="The Heirloom Photobook"
                                    className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 shadow-sm"
                                 />
                              </div>
                              <div className="flex flex-col gap-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Classification</label>
                                 <select 
                                    value={selectedProduct.category.slug}
                                    onChange={(e) => {
                                      const cat = {
                                        planners: "Planners",
                                        notebooks: "Notebooks",
                                        photobooks: "Photobooks",
                                        magazines: "Magazines",
                                        newspapers: "Newspapers",
                                        new: "New In",
                                        sale: "Sale",
                                        stationery: "Stationery"
                                      }[e.target.value as string] || "Planners";
                                      setSelectedProduct({...selectedProduct, category: { slug: e.target.value, name: cat, description: "" }})
                                    }}
                                    className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 shadow-sm appearance-none cursor-pointer"
                                 >
                                    <option value="planners">Planners</option>
                                    <option value="notebooks">Notebooks</option>
                                    <option value="photobooks">Photobooks</option>
                                    <option value="magazines">Magazines</option>
                                    <option value="newspapers">Newspapers</option>
                                    <option value="new">New In</option>
                                    <option value="sale">Sale</option>
                                    <option value="stationery">Stationery</option>
                                 </select>
                              </div>
                              <div className="flex flex-col gap-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Registry Slug</label>
                                 <input 
                                    type="text" 
                                    value={selectedProduct.slug}
                                    onChange={(e) => setSelectedProduct({...selectedProduct, slug: e.target.value})}
                                    placeholder="heirloom-photobook"
                                    className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 shadow-sm"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Section: Imagery Gallery */}
                        <div className="flex flex-col gap-8">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className="h-8 w-[2px] bg-primary" />
                                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">Visual Assets</h3>
                              </div>
                              <button 
                                 onClick={addImage}
                                 className="h-10 px-6 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                              >
                                 Add Image Slot
                              </button>
                           </div>
                           <div className="grid grid-cols-1 gap-4">
                              {selectedProduct.images.map((url: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                   <div className="h-14 w-12 rounded-xl bg-white border border-foreground/5 overflow-hidden flex-shrink-0 relative">
                                      {url && <Image src={url} alt="Preview" fill className="object-cover" unoptimized />}
                                   </div>
                                   <input 
                                      type="text" 
                                      value={url}
                                      onChange={(e) => updateImage(idx, e.target.value)}
                                      placeholder="https://images.unsplash.com/..."
                                      className="flex-1 bg-white border border-foreground/5 rounded-2xl py-4 px-6 text-[12px] font-medium text-foreground/60 outline-none focus:ring-1 focus:ring-primary/20 shadow-sm"
                                   />
                                   <button 
                                      onClick={() => removeImage(idx)}
                                      className="h-10 w-10 rounded-full flex items-center justify-center text-foreground/10 hover:text-red-500 hover:bg-red-500/5 transition-all opacity-0 group-hover:opacity-100"
                                   >
                                      <Trash2 size={16} />
                                   </button>
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* Section: Pricing & Specifications */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                           <div className="flex flex-col gap-8">
                              <div className="flex items-center gap-4">
                                 <div className="h-8 w-[2px] bg-primary" />
                                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">Pricing Tier</h3>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Base Price (₹)</label>
                                    <input 
                                       type="number" 
                                       value={selectedProduct.basePrice}
                                       onChange={(e) => setSelectedProduct({...selectedProduct, basePrice: Number(e.target.value)})}
                                       className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 shadow-sm"
                                    />
                                 </div>
                                 <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Sale Price (₹)</label>
                                    <input 
                                       type="number" 
                                       value={selectedProduct.salePrice || ""}
                                       onChange={(e) => setSelectedProduct({...selectedProduct, salePrice: e.target.value ? Number(e.target.value) : null})}
                                       placeholder="No Sale"
                                       className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-primary outline-none focus:ring-1 focus:ring-primary/50 shadow-sm"
                                    />
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-col gap-8">
                              <div className="flex items-center gap-4">
                                 <div className="h-8 w-[2px] bg-primary" />
                                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">Specifications</h3>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Product Type</label>
                                    <select 
                                       value={selectedProduct.type}
                                       onChange={(e) => setSelectedProduct({...selectedProduct, type: e.target.value})}
                                       className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 shadow-sm appearance-none cursor-pointer"
                                    >
                                       <option value="book">Artisanal Book</option>
                                       <option value="album">Signature Album</option>
                                    </select>
                                 </div>
                                 <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Material</label>
                                    <input 
                                       type="text" 
                                       value={selectedProduct.material}
                                       onChange={(e) => setSelectedProduct({...selectedProduct, material: e.target.value})}
                                       placeholder="Archival Matte"
                                       className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 shadow-sm"
                                    />
                                 </div>
                                 <div className="flex flex-col gap-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Standard Size</label>
                                    <input 
                                       type="text" 
                                       value={selectedProduct.size}
                                       onChange={(e) => setSelectedProduct({...selectedProduct, size: e.target.value})}
                                       placeholder="8.5 x 11 inches"
                                       className="w-full bg-white border border-foreground/5 rounded-2xl py-5 px-8 text-[13px] font-bold text-foreground outline-none focus:ring-1 focus:ring-primary/50 shadow-sm"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Section: Status & Curation Metadata */}
                        <div className="flex flex-col gap-8">
                           <div className="flex items-center gap-4">
                              <div className="h-8 w-[2px] bg-primary" />
                              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">Curation Status</h3>
                           </div>
                           <div className="flex flex-wrap gap-12 p-10 bg-white border border-foreground/5 rounded-[2.5rem] shadow-inner">
                              <label className="flex items-center gap-4 cursor-pointer group">
                                 <div 
                                    onClick={() => setSelectedProduct({...selectedProduct, featured: !selectedProduct.featured})}
                                    className={`h-6 w-12 rounded-full p-1 transition-colors ${selectedProduct.featured ? 'bg-primary' : 'bg-foreground/10'}`}
                                 >
                                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${selectedProduct.featured ? 'translate-x-6' : 'translate-x-0'}`} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-black uppercase tracking-[0.1em] text-foreground">Featured Study</span>
                                    <span className="text-[9px] font-medium text-foreground/30 uppercase tracking-widest">Display on homepage</span>
                                 </div>
                              </label>

                              <label className="flex items-center gap-4 cursor-pointer group">
                                 <div 
                                    onClick={() => setSelectedProduct({...selectedProduct, isNew: !selectedProduct.isNew})}
                                    className={`h-6 w-12 rounded-full p-1 transition-colors ${selectedProduct.isNew ? 'bg-primary' : 'bg-foreground/10'}`}
                                 >
                                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${selectedProduct.isNew ? 'translate-x-6' : 'translate-x-0'}`} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-black uppercase tracking-[0.1em] text-foreground">New Collection</span>
                                    <span className="text-[9px] font-medium text-foreground/30 uppercase tracking-widest">Apply "NEW" badge</span>
                                 </div>
                              </label>
                           </div>
                        </div>

                        {/* Section: Editorial Content */}
                        <div className="flex flex-col gap-8 pb-10">
                           <div className="flex items-center gap-4">
                              <div className="h-8 w-[2px] bg-primary" />
                              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/40">Editorial Narrative</h3>
                           </div>
                           <div className="flex flex-col gap-3">
                              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-4">Detailed Description</label>
                              <textarea 
                                 rows={5}
                                 value={selectedProduct.description}
                                 onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                                 className="w-full bg-white border border-foreground/5 rounded-[2rem] py-8 px-10 text-[14px] font-medium italic text-foreground/60 outline-none focus:ring-1 focus:ring-primary/20 shadow-sm resize-none leading-relaxed"
                              />
                           </div>
                        </div>

                     </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-10 lg:p-14 border-t border-foreground/5 bg-white flex items-center justify-end gap-6">
                     <button 
                        onClick={() => setIsModalOpen(false)}
                        className="h-14 px-10 rounded-full border border-foreground/10 text-foreground/30 font-black text-[11px] uppercase tracking-widest hover:bg-background transition-all"
                     >
                        Discard Changes
                     </button>
                     <button 
                        onClick={handleSave}
                        className="h-14 px-12 rounded-full bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
                     >
                        Commit to Registry <ArrowRight size={18} strokeWidth={3} />
                     </button>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
