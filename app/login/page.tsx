import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Log in" };

const FIELD =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand-light";

export default function LoginPage() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="shell max-w-md">
        <h1 className="text-[32px] leading-tight">Welcome back.</h1>
        <p className="mt-3 text-[15.5px] text-muted">
          Pick up where you left off.
        </p>

        <form className="card mt-8 space-y-4 p-7">
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-ink">Email</span>
            <input className={FIELD} name="email" type="email" placeholder="you@email.com" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-ink">Password</span>
            <input className={FIELD} name="password" type="password" placeholder="Your password" required />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-deep px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Log in
          </button>
          <p className="text-center text-[13.5px] text-muted">
            New here?{" "}
            <Link href="/signup" className="font-semibold text-brand-dark underline underline-offset-2">
              Create an account
            </Link>
          </p>
          <p className="text-center text-[12.5px] text-faint">
            Demo form &mdash; not wired to a backend yet.
          </p>
        </form>
      </div>
    </section>
  );
}
