"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { STAGES, PROOF } from "@/lib/content";
import { Arrow, Glyph } from "./Icons";

/** Headline copy, split into lines so each word can be revealed in turn. */
const HEADLINE: { text: string; accent?: boolean }[][] = [
  [{ text: "Practice" }, { text: "everything." }],
  [
    { text: "Then", accent: true },
    { text: "go", accent: true },
    { text: "get", accent: true },
    { text: "hired.", accent: true },
  ],
];

const WORD_STAGGER = 80;

/** Flatten once at module scope so each word carries its own stagger index. */
let running = 0;
const HEADLINE_LINES = HEADLINE.map((line) =>
  line.map((word) => ({ ...word, order: running++ })),
);

/** Auto-advance interval, matched to the 5s journey-rail draw. */
const STAGE_MS = 5000;

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % STAGES.length), STAGE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const stage = STAGES[i];

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="dotfield absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand-light/70 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid items-start gap-14 lg:grid-cols-[1.12fr_1fr] lg:gap-16">
          <div>
            <span className="slide-down-hero inline-flex items-center gap-2 rounded-full border border-brand-mid bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Your first interview shouldn&rsquo;t be the real one
            </span>

            <h1 className="mt-6 text-[40px] leading-[1.04] sm:text-[50px] lg:text-[56px]">
              {HEADLINE_LINES.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word) => (
                    <span
                      key={`${li}-${word.text}`}
                      className={`hero-word ${word.accent ? "text-brand-dark" : ""}`}
                      style={{ animationDelay: `${word.order * WORD_STAGGER}ms` }}
                    >
                      {word.text}
                      {" "}
                    </span>
                  ))}
                  {li === HEADLINE_LINES.length - 1 && (
                    <span
                      className="hero-cursor h-[0.82em] align-[-0.08em]"
                      aria-hidden="true"
                    />
                  )}
                </span>
              ))}
            </h1>

            <p
              className="slide-down-hero mt-6 max-w-lg text-[17px] leading-relaxed text-muted"
              style={{ animationDelay: "140ms" }}
            >
              Build real experience, write resumes that survive the screening,
              and sit through the interviews &mdash; all before the job you
              actually want is on the line.
            </p>

            <div
              className="slide-down-hero mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "260ms" }}
            >
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:gap-3 hover:bg-brand-dark"
              >
                Start free <Arrow className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-150 hover:border-brand-mid hover:bg-brand-light"
              >
                Find your plan
              </Link>
            </div>

            <dl
              className="slide-down-hero mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4"
              style={{ animationDelay: "380ms" }}
            >
              {PROOF.map((p) => (
                <div key={p.label}>
                  <dt className="font-display text-[26px] font-extrabold text-ink">
                    {p.stat}
                  </dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-muted">
                    {p.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Stage panel with the animated journey rail underneath. */}
          <div
            className="slide-down-hero"
            style={{ animationDelay: "200ms" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="card overflow-hidden shadow-[0_24px_60px_-30px_rgba(10,26,43,0.28)]">
              <div className="flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-3.5">
                <span className="eyebrow">Stage {stage.n} of 06</span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11.5px] font-semibold text-brand-dark ring-1 ring-brand-mid">
                  {stage.module}
                </span>
              </div>

              <div className="px-6 py-7 sm:px-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand-deep">
                  <Glyph name={stage.key} className="h-5.5 w-5.5" />
                </div>
                <h2 key={stage.key} className="rise mt-5 text-[24px] leading-tight sm:text-[27px]">
                  {stage.heading}
                </h2>
                <p className="mt-3.5 min-h-[110px] text-[15px] leading-relaxed text-muted">
                  {stage.body}
                </p>
              </div>

              {/* Journey rail: dashed path draws itself, active node breathes.
                  Nodes are w-[15%] with justify-between, so the first and last
                  centres sit at 7.5% — the rail is inset to match. */}
              <div className="relative border-t border-line px-5 pt-6 pb-4">
                <div
                  className="pointer-events-none absolute top-[36px] h-px"
                  style={{ left: "calc(20px + 7.5%)", right: "calc(20px + 7.5%)" }}
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full"
                    viewBox="0 0 100 1"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="pipeline-path"
                      d="M0 0.5 H100"
                      pathLength={100}
                      fill="none"
                      stroke="var(--color-brand-mid)"
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                <ol className="relative flex items-start justify-between">
                  {STAGES.map((s, idx) => {
                    const isActive = idx === i;
                    const isDone = idx < i;
                    return (
                      <li key={s.key} className="flex w-[15%] flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setI(idx)}
                          aria-label={`Stage ${s.n}: ${s.title}`}
                          aria-current={isActive}
                          className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10.5px] font-bold transition-colors duration-150 ${
                            isActive
                              ? "pipeline-node-active border-brand-deep bg-brand-deep text-white"
                              : isDone
                                ? "border-brand-mid bg-brand-light text-brand-deep"
                                : "border-line bg-white text-faint hover:border-brand-mid"
                          }`}
                        >
                          {s.n}
                        </button>
                        <span
                          className={`mt-2 text-center text-[10px] leading-tight font-semibold transition-colors duration-150 ${
                            isActive ? "text-ink" : "text-faint"
                          }`}
                        >
                          {s.short}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
