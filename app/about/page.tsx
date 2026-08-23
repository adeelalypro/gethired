import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import { SITE } from "@/lib/site";
import { MODULES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "About",
  description: "Why GetHired exists: to help people practise the work, applications, and interviews that stand between them and the offer.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Nobody gets to rehearse the thing that decides their career."
        lede={`That is the gap ${SITE.name} exists to close.`}
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
              So we built somewhere to do all of it first. Real workplace tasks
              that become portfolio proof. Resumes written for the posting in
              front of you. Mock interviews you can get badly wrong at no cost.
              A full hiring process you can run end to end and find out exactly
              where you would have been cut.
            </p>
            <p>
              Practice everything that matters, before any of it counts.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-[19px]">What&rsquo;s in the platform</h2>
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

      <CtaBand />
    </>
  );
}
