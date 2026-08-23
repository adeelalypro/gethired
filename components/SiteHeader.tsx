"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { Logo } from "./Icons";

export default function SiteHeader() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await getSupabaseBrowserClient().auth.signOut();
    setOpen(false);
    router.push("/");
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-[#fafcfb]/90 backdrop-blur-xl"
          : "border-b border-transparent bg-[#fafcfb]"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="GetHired home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[14.5px] font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          {signedIn ? (
            <>
              <button onClick={signOut} className="rounded-full border border-line px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-brand-mid hover:bg-brand-light">Log out</button>
              <Link href="/dashboard" className="rounded-full bg-brand-deep px-4.5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark">Dashboard</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-line px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-brand-mid hover:bg-brand-light">Sign In</Link>
              <Link href="/signup" className="rounded-full bg-brand-deep px-4.5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark">Start Free</Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line lg:hidden"
        >
          <span className="relative block h-3.5 w-4.5">
            <span
              className={`absolute left-0 h-[1.8px] w-full rounded bg-ink transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-[1.8px] w-full rounded bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.8px] w-full rounded bg-ink transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-2 hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2.5">
              {signedIn ? (
                <>
                  <button onClick={signOut} className="flex-1 rounded-full border border-line px-4 py-2.5 text-center text-[14px] font-semibold text-ink">Log out</button>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-brand-deep px-4 py-2.5 text-center text-[14px] font-semibold text-white">Dashboard</Link>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-line px-4 py-2.5 text-center text-[14px] font-semibold text-ink">Sign In</Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-brand-deep px-4 py-2.5 text-center text-[14px] font-semibold text-white">Start Free</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
