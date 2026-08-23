import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact/" }, description: "Contact GetHired for pilot support, product feedback, privacy questions, or institutional pilots." };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us."
        lede="Account help, pilot feedback, or a conversation about an institutional pilot."
      />

      <section className="border-b border-line py-20 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-[18px]">Universities &amp; institutions</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                We are exploring pilots with universities, colleges, workforce programmes, and teams. Tell us about your audience, goals, and approximate cohort size; we will reply using the email you provide.
              </p>
            </div>
            <div>
              <h2 className="text-[18px]">Account &amp; pilot support</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                The current pilot does not collect payment details. Use this form for sign-in help, promo-code questions, privacy requests, product feedback, or anything that is unclear.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-mid bg-brand-light p-5"><p className="text-[13.5px] font-semibold text-brand-deep">Your message is saved to the private admin inbox so the GetHired team can follow up.</p></div>
          </div>

          <Suspense fallback={<div className="card min-h-[460px] p-8 text-[14px] text-muted">Loading contact form…</div>}><ContactForm /></Suspense>
        </div>
      </section>
    </>
  );
}

