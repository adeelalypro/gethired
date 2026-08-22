# GetHired

**gethired.info** — AI hiring-preparation platform, structured like
[hataf.ai](https://hataf.ai) but with **persona-based pricing** instead of a
quantity ladder.

Marketing site only at this stage. Forms are demo forms; there is no backend or
auth yet.

## The idea

Six product modules covering the whole hiring journey. Four personas, each of
which runs out of a **different** one of those modules. So the plans differ by
shape, not by size.

The reasoning, the price ladder, and the rules for changing any of it are in
**[PRICING.md](./PRICING.md)**. Read that before touching `lib/pricing.ts`.

## Run it

```bash
npm run dev
```

```bash
npm run build
```

## Where things live

| Path | What |
|---|---|
| `lib/pricing.ts` | Plans, meters, packs, the matcher. Single source of truth for every price on the site. |
| `lib/content.ts` | Journey stages, feature deep-dives, FAQs, proof stats. |
| `lib/site.ts` | Brand name and navigation. **Renaming the product is one line here.** |
| `app/icon.svg` | Favicon. Same mark as `LogoMark` in `components/Icons.tsx`. |
| `app/globals.css` | Design tokens (color, type, spacing, motion). |
| `components/` | Section components. `PricingGrid` is shared by `/` and `/pricing`. |

## Voice — read this before writing any copy

The persona model is **invisible architecture**. It shapes what each plan
contains; it is never explained to the customer. Copy that broke this rule was
removed once already — don't put it back.

**Never on the site:**

- Comparisons to other products, named or implied ("most platforms…", "3x any
  competitor’s top tier"). The reader has not heard of them and does not care.
- Saving money as the value proposition. Nobody's goal is to spend less on
  career tools; their goal is the job. Price efficiency is a consequence of the
  design, not the pitch.
- Internal vocabulary: *bottleneck*, *persona*, *tier*, *ladder*, *value metric*,
  *allocation*. No candidate has ever said "my bottleneck is tailored resumes."
- Explaining our own design decisions ("no column is strictly larger than
  another — that is the design"). That belongs in `PRICING.md`.
- Pricing language above the pricing section. The hero sells the outcome.

**Always:**

- Lead with the outcome: getting hired.
- Write the persona's pain in their own words ("You're sending the same resume
  everywhere and hearing nothing back"), so they recognise themselves rather
  than being categorised.
- Say what the product does, plainly and truthfully. Label simulated work as
  simulated.

The strategy behind all of this lives in `PRICING.md`, which is an **internal
document**. Nothing in it should ever appear on a page.

## Design

| | |
|---|---|
| Display | Plus Jakarta Sans 800 |
| Body | Inter |
| Ink | `#0A1A2B` |
| Brand | `#0F9D63`, deep `#064E33` |
| Accent | `#F0A11B` (badges only) |
| Radius | 20px cards, full-round buttons |
| Logo | Checkmark whose upstroke keeps rising into an arrowhead — "approved" and "moving up" in one mark. Wordmark sets `get` semibold in ink, `hired` extrabold in brand green. |

## Motion

The motion system is ported from hataf.ai so the two sites feel the same in the
hand. As on their site, **nothing is scroll-triggered** — motion fires on load or
on interaction only. Keyframes live in `app/globals.css`.

| Class | Spec | Where |
|---|---|---|
| `.hero-word` | 0.5s ease-out, 80ms per-word stagger, `translateX(-0.6em) scale(.96)` | Hero headline |
| `.hero-cursor` | 1s `steps(1)` infinite | Blinking cursor after headline |
| `.slide-down-hero` | 0.8s ease-out from `translateY(-40px)` | Hero badge, copy, CTAs, stats, panel |
| `.pipeline-path` | 5s linear, `stroke-dashoffset` 100→0 | Journey rail draws itself |
| `.pipeline-node-active` | 1.6s ease-in-out infinite, scale 1.08 + green glow | Active journey node |
| `.tab-progress` | 9s linear `scaleX` | Feature tab underline / auto-advance timer |
| `.check-draw` | 0.8s ease-out, 0.4s delay, dashoffset 22→0 | Every checkmark |
| `.shimmer` | 2.6s ease-in-out infinite sweep | "Most popular" badge |

Hover transitions match theirs too: 150ms on color, 200ms on transform, both
`cubic-bezier(.4,0,.2,1)`. Hero stages advance every 5s and feature tabs every
9s; both pause on hover. All of it is disabled under
`prefers-reduced-motion: reduce`.

Structure follows the reference site (hero → personas → features → how it works →
pricing → FAQ → CTA), with three deliberate changes:

1. **Personas moved above features.** The pricing thesis has to land before
   anyone reads a feature list.
2. **How It Works is a real six-card stepper**, replacing the reference site's
   mostly-empty band of dotted lines.
3. **Pricing gained a self-select matcher and a comparison table**, because four
   differently shaped plans need more help being chosen between than four tiers
   on a ladder.

## Not built yet

Auth, billing, the six product modules themselves, PKR pricing, and the
university/seat-based tier.
