"use client";

import { useEffect, useState } from "react";
import { FEATURES, type FeatureId } from "@/lib/content";
import { Check, Glyph } from "./Icons";

/** Matches the reference site's 9s tab cycle and progress-bar fill. */
const TAB_MS = 9000;

export default function Features() {
  const [active, setActive] = useState<FeatureId>(FEATURES[0].id);
  const [paused, setPaused] = useState(false);
  const feature = FEATURES.find((f) => f.id === active) ?? FEATURES[0];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((cur) => {
        const idx = FEATURES.findIndex((f) => f.id === cur);
        return FEATURES[(idx + 1) % FEATURES.length].id;
      });
    }, TAB_MS);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="roadmap" className="border-b border-line py-20 md:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Product roadmap</span>
          <h2 className="mt-4 text-[34px] leading-[1.08] sm:text-[42px]">
            What we&rsquo;re researching and building.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            These are product directions, not a list of finished services. Status labels show the current stage honestly.
          </p>
        </div>

        {/* Tab rail — auto-advances, with the underline as the progress bar */}
        <div
          className="mt-11 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            role="tablist"
            aria-label="Feature modules"
            className="flex min-w-max gap-2 border-b border-line pb-0"
          >
            {FEATURES.map((f) => {
              const on = f.id === active;
              return (
                <button
                  key={f.id}
                  role="tab"
                  id={`tab-${f.id}`}
                  aria-selected={on}
                  aria-controls="feature-panel"
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={`relative flex items-center gap-2 rounded-t-lg px-4 py-3 text-[14.5px] font-semibold whitespace-nowrap transition-colors ${
                    on ? "text-brand-deep" : "text-muted hover:text-ink"
                  }`}
                >
                  <Glyph name={f.id} className="h-4.5 w-4.5" />
                  {f.name}
                  {on && (
                    <span
                      key={`${f.id}-${paused}`}
                      className={`absolute inset-x-2 -bottom-px h-[2.5px] rounded-full bg-brand ${
                        paused ? "scale-x-100" : "tab-progress"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          key={feature.id}
          id="feature-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${feature.id}`}
          className="rise mt-10 grid gap-10 rounded-[20px] border border-line bg-surface p-7 md:grid-cols-[1.1fr_1fr] md:gap-14 md:p-11"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3"><span className="eyebrow">{feature.kicker}</span><span className="rounded-full bg-white px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-brand-deep ring-1 ring-brand-mid">{feature.status}</span></div>
            <h3 className="mt-3.5 text-[26px] leading-tight sm:text-[31px]">
              {feature.headline}
            </h3>
            <p className="mt-4.5 text-[15.5px] leading-relaxed text-muted">
              {feature.body}
            </p>
          </div>

          <ul className="space-y-3.5 self-center">
            {feature.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-deep">
                  <Check className="h-3 w-3" draw />
                </span>
                <span className="text-[14.5px] leading-snug text-ink-2">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

