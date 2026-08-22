import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Contact" };

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

          <ContactForm />
        </div>
      </section>
    </>
  );
}
