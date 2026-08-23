import Link from "next/link";
import { Arrow, Check, Glyph } from "./Icons";

const previewTracks = [
  { name: "Build", note: "Portfolio proof", icon: "experience" },
  { name: "Apply", note: "Application quality", icon: "resume" },
  { name: "Switch", note: "Transferable skills", icon: "analysis" },
  { name: "Interview", note: "Practice out loud", icon: "practice" },
] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="dotfield absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand-light/80 to-transparent" aria-hidden="true" />

      <div className="shell relative py-16 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <span className="slide-down-hero inline-flex items-center gap-2 rounded-full border border-brand-mid bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-deep shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand" />
              Private early access · No card required
            </span>

            <h1 className="mt-6 text-[40px] leading-[1.03] sm:text-[50px] lg:text-[57px]">
              Practise the job search before the real opportunity is on the line.
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Join the GetHired pilot, choose what you need most, and help shape practical tools for resumes, interviews, career changes, and portfolio-building.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:gap-3 hover:bg-brand-dark">
                Join early access <Arrow className="h-4 w-4" />
              </Link>
              <Link href="/#roadmap" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-brand-mid hover:bg-brand-light">
                See what we&rsquo;re building
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[13.5px] text-muted">
              {["Promo code access", "Instant pilot dashboard", "Delete your account anytime"].map((item) => (
                <li key={item} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-brand-dark" />{item}</li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-brand-mid/35 blur-3xl" aria-hidden="true" />
            <div className="card relative overflow-hidden shadow-[0_28px_70px_-32px_rgba(6,78,51,0.35)]">
              <div className="flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.13em] uppercase text-brand-dark">Concept preview</p>
                  <p className="mt-1 text-[13px] text-muted">Early-access track selector</p>
                </div>
                <span className="rounded-full bg-brand-light px-3 py-1.5 text-[11px] font-bold text-brand-deep ring-1 ring-brand-mid">Pilot</span>
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-[13px] font-semibold text-ink">What would help you most right now?</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {previewTracks.map((track, index) => (
                    <div key={track.name} className={`rounded-2xl border p-4 ${index === 1 ? "border-brand-mid bg-brand-light" : "border-line bg-white"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-deep text-brand-mid"><Glyph name={track.icon} className="h-4.5 w-4.5" /></span>
                        {index === 1 && <Check className="h-4 w-4 text-brand-deep" />}
                      </div>
                      <p className="mt-4 font-display text-[15px] font-extrabold text-ink">{track.name}</p>
                      <p className="mt-1 text-[12px] text-muted">{track.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-brand-deep p-5 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div><p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-mid">What happens today</p><p className="mt-1.5 text-[14px] font-semibold">Your choice is saved to your pilot dashboard.</p></div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-deep"><Check className="h-4 w-4" /></span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[12px] text-faint">Illustrative product concept — not a claim that roadmap tools are already live.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

