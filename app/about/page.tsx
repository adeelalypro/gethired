import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import { SITE } from "@/lib/site";
import { MODULES } from "@/lib/pricing";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about/" }, description: "Why GetHired is starting as a transparent early-access pilot for job-search practice." };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The job search deserves a place to practise."
        lede={`${SITE.name} is starting as a focused pilot: learn what people need most, build carefully, and never pretend a roadmap is already a finished product.`}
      />

      <section className="border-b border-line py-20 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="space-y-6 text-[16px] leading-relaxed text-muted">
            <p>
              You can retake an exam. You can redraft an essay. But the interview
              that decides where you work for the next four years happens once,
              cold, and usually years after the last one.
            </p>
            <p>
              The same is true of everything around it. Entry-level postings ask
              for experience nobody will hand you first. Screening software
              rejects your resume before a person reads it. And you find out you
              were the wrong fit for a role only after you have spent three weeks
              trying to get it.
            </p>
            <p className="font-medium text-ink">
              The long-term idea is a place to rehearse the difficult parts: realistic workplace tasks, job-specific application support, career-change positioning, and interview practice.
            </p>
            <p>
              Today, {SITE.name} is a private early-access pilot. The working service provides promo-code signup, secure accounts, track selection, a status dashboard, and a direct feedback channel. The product capabilities listed here are being researched and built in stages.
            </p>
          </div>

          <div className="card p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4"><h2 className="text-[19px]">What we&rsquo;re building toward</h2><span className="rounded-full bg-brand-light px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-brand-deep ring-1 ring-brand-mid">Roadmap</span></div>
            <ul className="mt-6 space-y-5">
              {MODULES.map((m) => (
                <li key={m.id}>
                  <p className="text-[15px] font-semibold text-ink">{m.name}</p>
                  <p className="mt-1 text-[14px] leading-snug text-muted">
                    {m.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-16 md:py-20">
        <div className="shell grid gap-5 md:grid-cols-3">
          {[
            ["Be clear", "Say what works today, what is being researched, and what remains a concept."],
            ["Protect trust", "Keep accounts private, collect only useful pilot data, and give people control over deletion."],
            ["Build from evidence", "Use track demand and direct feedback to decide which experience deserves investment first."],
          ].map(([title, body]) => <div key={title} className="card p-6"><h2 className="text-[18px]">{title}</h2><p className="mt-2 text-[14px] leading-relaxed text-muted">{body}</p></div>)}
        </div>
      </section>

      <CtaBand />
    </>
  );
}

