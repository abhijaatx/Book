"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [isGoogleAvailable, setIsGoogleAvailable] = useState(false);
  const [hasLoadedProviders, setHasLoadedProviders] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getProviders().then((providers) => {
      if (!isMounted) {
        return;
      }

      setIsGoogleAvailable(Boolean(providers?.google));
      setHasLoadedProviders(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const user = session?.user;
  const userInitials =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "MK";

  const orders = [
    {
      id: "ord_123",
      name: "The 'Our Story' Anniversary Book",
      status: "confirmed",
      date: "April 06, 2026",
      amount: 2499,
    },
    {
      id: "ord_110",
      name: "Celestial Dreams Photo Magazine",
      status: "delivered",
      date: "March 12, 2026",
      amount: 1299,
    },
  ];

  const savedKeepsakes = [
    { name: "My 2024 Travel Chronicle", type: "Magazine", progress: 75 },
    { name: "Summer in Tuscany", type: "Newspaper", progress: 20 },
  ];

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#FFFDF5] px-6 py-24 lg:px-12">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-[3rem] bg-white p-12 text-center shadow-xl shadow-primary/5">
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/40">
            Preparing your story studio
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFFDF5] selection:bg-primary/10">
        <section className="relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden pt-10 pb-12 lg:min-h-[calc(100vh-8rem)] lg:pt-16 lg:pb-16">
          <div className="absolute left-[6%] top-[8%] h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-[8%] top-[18%] h-48 w-48 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_440px] lg:gap-16">
              <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
                  My Kahaani
                </span>
                <h1 className="max-w-[900px] font-serif text-[48px] leading-[1.08] tracking-[-0.04em] text-foreground lowercase lg:text-[88px]">
                  Sign in to keep every story close
                </h1>
                <p className="max-w-[760px] text-[15px] font-medium italic leading-relaxed text-foreground/50 lg:text-[18px]">
                  Save your keepsakes, revisit works in progress, and keep your
                  delivery details ready for the next gift-worthy moment.
                </p>
                <div className="flex w-full items-center justify-center gap-3 overflow-x-auto pb-2 lg:justify-start">
                  <Link
                    href="/category/all"
                    className="whitespace-nowrap rounded-full bg-primary px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 transition-all hover:scale-105"
                  >
                    Explore Keepsakes
                  </Link>
                  <Link
                    href="/wishlist"
                    className="whitespace-nowrap rounded-full border border-foreground/5 bg-white px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 shadow-sm transition-all hover:border-primary hover:text-primary"
                  >
                    View Wishlist
                  </Link>
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-[440px] flex-col justify-between rounded-[3rem] border border-foreground/5 bg-white p-8 shadow-2xl shadow-primary/10 lg:p-10">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">
                      Welcome Back
                    </span>
                    <h2 className="font-serif text-[34px] leading-tight tracking-tight text-foreground lowercase">
                      Continue with <span className="italic text-primary">Google</span>
                    </h2>
                    <p className="text-sm leading-relaxed text-foreground/55">
                      Use the same Google account you want connected to your
                      saved stories, order updates, and profile details.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 rounded-[2rem] bg-[#FFFDF5] p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/15">
                        <User size={20} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/35">
                          Account Access
                        </span>
                        <span className="font-serif text-[24px] lowercase text-foreground">
                          One tap back in
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => signIn("google", { callbackUrl: "/account" })}
                      disabled={!hasLoadedProviders || !isGoogleAvailable}
                      className="group inline-flex h-16 w-full items-center justify-center gap-4 rounded-full bg-primary px-8 text-[11px] font-black uppercase tracking-[0.24em] text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-primary/40 disabled:shadow-none"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      {hasLoadedProviders && isGoogleAvailable
                        ? "Sign In With Google"
                        : "Google Sign-In Needs Setup"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-[11px] leading-relaxed text-foreground/45">
                      {hasLoadedProviders && isGoogleAvailable
                        ? "You will return directly to your Kahaani account after Google confirms access."
                        : "Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_URL, and NEXTAUTH_SECRET to enable Google sign-in."}
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-foreground/5 pt-6">
                    {[
                      "Secure OAuth flow",
                      "One-click return to your dashboard",
                      "Works beautifully across desktop and mobile",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-[11px] font-black uppercase tracking-[0.24em] text-foreground/45">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 lg:pb-32">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="rounded-[4rem] border border-foreground/5 bg-white p-8 shadow-xl shadow-primary/5 lg:p-12">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:gap-16">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
                      Your Personal Box
                    </span>
                    <h2 className="font-serif text-[38px] leading-tight tracking-tight text-foreground lowercase lg:text-[56px]">
                      A calmer place for every <span className="italic">draft, order,</span> and future gift.
                    </h2>
                    <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/50">
                      My Kahaani is part account, part memory shelf. It keeps your
                      in-progress creations, delivery details, and order history in
                      one place so returning to a story feels seamless.
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-3">
                    {[
                      {
                        icon: Sparkles,
                        title: "Save Projects",
                        description:
                          "Pick up unfinished photobooks and keepsakes without losing momentum.",
                      },
                      {
                        icon: Heart,
                        title: "Track Orders",
                        description:
                          "Review order status and delivery details from one calm dashboard.",
                      },
                      {
                        icon: MapPin,
                        title: "Fast Checkout",
                        description:
                          "Keep your profile handy so every next story feels effortless.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex flex-col gap-4 rounded-[2rem] bg-[#FFFDF5] p-8"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <item.icon size={20} />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3 className="text-[14px] font-black uppercase tracking-[0.18em] text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-foreground/55">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[3rem] border border-foreground/5 bg-[#FFFDF5] p-8 lg:p-10">
                    <div className="flex flex-col gap-6">
                      <svg
                        className="h-10 w-10 text-primary/20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V9C13.017 6.79086 14.8079 5 17.017 5H20.017C22.2261 5 24.017 6.79086 24.017 9V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0 15V9C0 6.79086 1.79086 5 4 5H7C9.20914 5 11 6.79086 11 9V15C11 18.3137 8.31371 21 5 21H1V18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C2.44772 8 2 8.44772 2 9V12C2 12.5523 1.55228 13 1 13H0V15Z" />
                      </svg>
                      <p className="max-w-3xl font-serif text-[24px] leading-relaxed tracking-tight text-foreground/80 lg:text-[30px]">
                        &quot;The most meaningful gift is the one only you can tell.
                        My Kahaani keeps those stories ready whenever inspiration
                        returns.&quot;
                      </p>
                      <span className="text-[11px] font-black uppercase tracking-[0.35em] text-primary">
                        The Kahaani Studio
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[3rem] border border-foreground/5 bg-[#FFFDF5] p-8 lg:p-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">
                    New Here?
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                    Start exploring the collection first, then come back once
                    you&apos;re ready to save your first story.
                  </p>
                  <Link
                    href="/category/all"
                    className="mt-5 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-primary transition-opacity hover:opacity-60"
                  >
                    Browse the Collection
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-foreground/5 bg-white/50 py-20">
          <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              {[
                {
                  icon: Heart,
                  title: "Save Stories",
                  description:
                    "Keep drafts, favorites, and future gift ideas close at hand.",
                },
                {
                  icon: Sparkles,
                  title: "Return Faster",
                  description:
                    "Sign back in with Google and continue exactly where you left off.",
                },
                {
                  icon: ShieldCheck,
                  title: "Protected Access",
                  description:
                    "Your account uses a secure OAuth sign-in flow managed by Google.",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center gap-4 text-center">
                  <item.icon size={24} className="text-primary" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">
                      {item.title}
                    </h3>
                    <p className="text-[12px] font-medium leading-relaxed text-foreground/40">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5] selection:bg-primary/10">
      <section className="relative overflow-hidden bg-primary pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 right-0 h-full w-[40%] pointer-events-none text-white opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 Q50,50 0,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white/20">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "My Kahaani"}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[22px] font-black uppercase tracking-[0.2em] text-white">
                    {userInitials}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-serif text-[48px] leading-none tracking-[-0.04em] text-white lowercase lg:text-[72px]">
                  My Kahaani
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/60">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Signed In With Google
                  </span>
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="flex flex-col gap-12 lg:col-span-3">
            <div className="flex flex-col gap-6">
              <h4 className="border-l-2 border-primary pl-4 text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">
                The Personal Box
              </h4>
              <nav className="flex flex-col gap-1">
                {[
                  { icon: Package, name: "Keepsake History", href: "#history", active: true },
                  { icon: Heart, name: "Saved Stories", href: "#saved", active: false },
                  { icon: MapPin, name: "Handover Address", href: "#address", active: false },
                  { icon: User, name: "Studio Profile", href: "#profile", active: false },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center gap-4 rounded-2xl px-4 py-4 transition-all ${
                      item.active
                        ? "bg-white text-primary shadow-xl shadow-primary/5 shadow-inner"
                        : "text-foreground/40 hover:bg-white hover:text-primary"
                    }`}
                  >
                    <item.icon size={18} className="transition-transform group-hover:scale-110" />
                    <span className="text-[12px] font-black uppercase tracking-widest">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-4 px-4 py-4 text-rose-800/40 transition-colors hover:text-rose-800"
            >
              <LogOut size={18} />
              <span className="text-[12px] font-black uppercase tracking-widest">
                Sign out of Studio
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-24 lg:col-span-9">
            <div id="saved" className="flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-[32px] leading-tight tracking-tight text-foreground lowercase italic lg:text-[44px]">
                  Stories in <span className="font-medium text-secondary">Progress</span>
                </h3>
                <Link
                  href="/category/all"
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:opacity-60"
                >
                  Create New Story
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {savedKeepsakes.map((story) => (
                  <div
                    key={story.name}
                    className="group flex flex-col gap-12 rounded-[3rem] border border-foreground/5 bg-white p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/5"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-tighter leading-none text-primary/40">
                          {story.type}
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-widest text-primary">
                          {story.progress}%
                        </span>
                      </div>
                      <h4 className="line-clamp-1 font-serif text-[24px] tracking-tight text-foreground">
                        {story.name}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                        <div
                          className="h-full bg-primary transition-all duration-1000"
                          style={{ width: `${story.progress}%` }}
                        />
                      </div>
                      <Link
                        href="/personalize/photobooks-everything-magic"
                        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-[10px] font-black uppercase tracking-[0.2em] text-white transition-premium hover:scale-[1.02] active:scale-95"
                      >
                        Continue Editing
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="history" className="flex flex-col gap-10">
              <h3 className="font-serif text-[32px] leading-tight tracking-tight text-foreground lowercase italic lg:text-[44px]">
                Keepsake <span className="font-medium text-primary">History</span>
              </h3>

              <div className="overflow-hidden rounded-[3rem] border border-foreground/5 bg-white shadow-xl shadow-primary/5">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                          Item Details
                        </th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                          Story Date
                        </th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                          Status
                        </th>
                        <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
                          Story Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {orders.map((order) => (
                        <tr key={order.id} className="group cursor-pointer hover:bg-[#FFFDF5]">
                          <td className="px-10 py-10">
                            <div className="flex flex-col gap-1">
                              <span className="text-[14px] font-bold text-foreground">
                                {order.name}
                              </span>
                              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/30">
                                ID: {order.id}
                              </span>
                            </div>
                          </td>
                          <td className="px-10 py-10">
                            <span className="font-serif text-[13px] italic text-foreground/60">
                              {order.date}
                            </span>
                          </td>
                          <td className="px-10 py-10">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  order.status === "confirmed"
                                    ? "bg-amber-500"
                                    : "bg-[#606c38]"
                                }`}
                              />
                              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                                {order.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-10 py-10 text-right">
                            <span className="text-[14px] font-black tracking-tight text-primary">
                              ₹{order.amount}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div id="profile" className="scroll-mt-32 flex flex-col gap-10">
              <h3 className="font-serif text-[32px] leading-tight tracking-tight text-foreground lowercase italic lg:text-[44px]">
                Studio <span className="font-medium text-rose-800">Profile</span>
              </h3>

              <div className="flex flex-col gap-10 rounded-[3rem] border border-foreground/5 bg-white p-10 shadow-xl shadow-primary/5 lg:p-14">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                      defaultValue={user.name ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                      defaultValue={user.email ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      Birthday
                      <span className="inline-flex rounded-full bg-rose-800 px-2 py-0.5 text-[7px] tracking-widest text-white shadow-sm">
                        FOR SURPRISES
                      </span>
                    </label>
                    <input
                      type="date"
                      className="h-14 w-full rounded-2xl border-2 border-rose-800/20 bg-rose-50/30 px-6 text-[14px] font-medium text-foreground/80 outline-none transition-colors focus:border-rose-800/50"
                    />
                  </div>
                </div>
                <button className="self-start h-12 rounded-full bg-primary px-10 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
                  Save Profile Details
                </button>
              </div>
            </div>

            <div id="address" className="scroll-mt-32 flex flex-col gap-10">
              <h3 className="font-serif text-[32px] leading-tight tracking-tight text-foreground lowercase italic lg:text-[44px]">
                Handover <span className="font-medium text-secondary">Address</span>
              </h3>

              <div className="flex flex-col gap-10 rounded-[3rem] border border-foreground/5 bg-white p-10 shadow-xl shadow-primary/5 lg:p-14">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="123 Artisan Lane, Suite 4B"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="New Delhi"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      State / Region
                    </label>
                    <input
                      type="text"
                      placeholder="Delhi"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="110001"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="India"
                      className="h-14 w-full rounded-2xl border-2 border-border/50 bg-[#FFFDF5] px-6 text-[14px] font-medium outline-none transition-colors focus:border-primary/50"
                      defaultValue="India"
                    />
                  </div>
                </div>
                <button className="self-start h-12 rounded-full bg-secondary px-10 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-secondary/20 transition-transform hover:scale-105 active:scale-95">
                  Update Address
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-[4rem] border-2 border-dashed border-primary/10 bg-primary/5 py-20 text-center">
              <h4 className="font-serif text-3xl italic lowercase text-primary/40">
                The story never ends...
              </h4>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/40">
                More keepsakes mean more legacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
