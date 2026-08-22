import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Contact" };

const FIELD =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand-light";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us."
        lede="Support questions, billing, or seat-based licensing for a university or a team."
      />

      <section className="border-b border-line py-20 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-[18px]">Universities &amp; institutions</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Seat-based licensing with cohort dashboards, placement tracking,
                and Experience Lab tracks aligned to your curriculum. Pricing
                depends on cohort size, so tell us roughly how many students and
                we will put a number together.
              </p>
            </div>
            <div>
              <h2 className="text-[18px]">Support &amp; billing</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Plan changes are self-serve from your dashboard and upgrades are
                prorated. For refunds inside the first seven days, use the form
                and reference your account email.
              </p>
            </div>
          </div>

          <form className="card space-y-4 p-7 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-ink">Name</span>
                <input className={FIELD} name="name" placeholder="Your name" required />
              </label>
              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-ink">Email</span>
                <input className={FIELD} name="email" type="email" placeholder="you@email.com" required />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-ink">Topic</span>
              <select className={FIELD} name="topic" defaultValue="support">
                <option value="support">Support</option>
                <option value="billing">Billing or refund</option>
                <option value="institutions">Universities &amp; institutions</option>
                <option value="other">Something else</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-ink">Message</span>
              <textarea className={FIELD} name="message" rows={5} placeholder="How can we help?" required />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-brand-deep px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Send message
            </button>
            <p className="text-center text-[12.5px] text-faint">
              Demo form &mdash; not wired to a backend yet.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
