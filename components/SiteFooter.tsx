import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { Logo, Arrow } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-20">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
            {SITE.short}
          </p>
          <form
            className="mt-6 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-4"
            action="/signup"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand-deep px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[12.5px] text-faint">
            By subscribing you agree to our{" "}
            <Link href="/privacy" className="text-brand-dark underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {FOOTER_NAV.map((col) => (
          <div key={col.heading}>
            <h4 className="text-[13px] font-bold tracking-[0.1em] uppercase text-ink">
              {col.heading}
            </h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14.5px] text-muted transition-colors hover:text-brand-dark"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 text-[13.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <Link
            href="/contact?topic=institutions"
            className="inline-flex items-center gap-1.5 font-medium text-brand-dark hover:gap-2.5 transition-all"
          >
            Universities &amp; teams — talk to us <Arrow className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
