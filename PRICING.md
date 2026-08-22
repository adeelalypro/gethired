# GetHired — persona pricing model

Why the plans are shaped the way they are. Read this before changing a number.

---

## The problem with the reference model

[hataf.ai](https://hataf.ai) sells four tiers — Free, Basic $5.90, Plus $9.90,
Premium $12.90 — that differ **only by quantity**:

| | Basic | Plus | Premium |
|---|---|---|---|
| Interview minutes | 200 | 300 | 500 |
| ATS resumes | 150/mo | 200/mo | 300/mo |
| Experience Labs | 5 | 10 | 20 |

Every row moves in the same direction at the same time. That has two costs:

1. **Everyone overpays for something.** A student who needs Experience Lab volume
   has to climb to Premium to get 20 simulations — and pays for 300 resumes a
   month they will never generate. Someone with interviews next Tuesday needs
   minutes and nothing else, and gets charged for Experience Labs.
2. **The ceiling is set by the wrong persona.** Because one ladder has to serve
   everyone, the top price is anchored to what a price-sensitive student will
   tolerate. $12.90 is the cap. Someone two weeks from a job offer would happily
   pay double, and there is nothing to sell them.

---

## The fix: one bottleneck per persona

Each persona runs out of a **different** resource. Build the plan around that
resource, stay lean on the rest.

| Persona | Runs out of | Plan | Price |
|---|---|---|---|
| Just looking | — | Starter | $0 |
| The Learner | Experience Lab simulations | Build | $6.90 |
| The Job Seeker | Tailored resumes | Apply | $12.90 |
| The Career Switcher | Proof they can do the new job | Switch | $18.90 |
| The Interview Candidate | Interview reps | Interview | $24.90 |

**No column in the comparison table is strictly larger than another.** That is
the design, and it is what makes these bundles rather than tiers. Build at $6.90
has *more* Experience Lab volume than Interview at $24.90. If you ever "fix"
that, you have rebuilt the ladder.

---

## The price ladder tracks proximity to a paycheck

```
$0 ──── $6.90 ──── $12.90 ──── $18.90 ──── $24.90
looking  learning   applying    switching   interviewing
                                                    │
              further from an offer ◄────────────────┘ closest to an offer
```

Willingness to pay rises as the job gets closer and more concrete.

- **$6.90 Learner** — long horizon, no income, most price-sensitive segment.
  Priced *below* the reference Basic tier deliberately: this is the volume and
  word-of-mouth play, and student verification takes another 30% off.
- **$12.90 Job Seeker** — has income or recent income, urgency is real but
  diffuse. Anchored exactly at the reference platform's *top* tier, so a
  side-by-side comparison shows more of what they need at the same price.
- **$18.90 Switcher** — the outcome is a salary change, and the alternative
  (a bootcamp, a second degree) costs thousands.
- **$24.90 Interview** — days away from an offer. This price is a rounding error
  against one month of the salary being negotiated. This is where the margin is,
  and the reference model has nothing to sell here at all.

**Annual discount is 40%** across all paid plans, deeper than the reference
platform's 50% headline on a lower base. Annual matters most for Learner (long
horizon) and least for Interview, where the need is measured in weeks and a
monthly commitment is the honest shape.

---

## What stops it being a quantity ladder

Every plan carries capabilities that **exist nowhere else**. Without these, a
buyer correctly reads the plans as arbitrary caps.

| Plan | Only on this plan |
|---|---|
| Build | Verified Experience Portfolio; guided task tracks by role; student verification discount |
| Apply | JD match score; application tracker; bulk import of 20 job descriptions |
| Switch | Transferable-skills map; 90-day switch roadmap; Experience Lab tasks in the **target** field |
| Interview | Company-specific question sets; recorded + graded sessions with score deltas; priority low-latency voice |

---

## One-time packs

Shaped by persona too, not small/medium/large.

| Pack | Price | For |
|---|---|---|
| Interview Pack | $19.90 | One round of interviews, no subscription |
| Apply Pack | $14.90 | A heavy month of applying |
| Build Pack | $12.90 | Filling the experience gap on a CV |

Credits never expire, stack on top of a plan, and survive cancellation. This is
the pressure valve that removes the need for overage billing or a forced
upgrade — both of which generate support load and churn.

---

## Rules for changing this

1. **Do not let one plan dominate another on every row.** The moment that
   happens the model collapses back into tiers.
2. **Each plan's flagship meter must be the most generous across all plans.**
   Build must always have the most Experience Labs; Interview must always have
   the most minutes.
3. **Keep the free plan genuinely useful.** A full career analysis is the hook —
   it produces a number (your worth, your gaps) that creates the urgency the
   paid plans resolve.
4. **Switching must be frictionless and lossless.** The model assumes people
   move between plans as their situation changes: learner → job seeker →
   interview candidate. If switching is painful, the whole thesis fails and they
   just cancel instead.

---

## Open questions for a real launch

- **Currency.** Currently USD-only. For the Pakistan market, PKR-first pricing
  with a USD toggle would likely convert better; $24.90 is a hard sell locally
  and the ladder may need a separate local set rather than a conversion.
- **Interview as a 30-day one-off.** The persona's need is genuinely
  temporary. A $19.90 non-recurring 30-day sprint may out-convert the $24.90
  subscription and cause less refund friction. Worth an A/B test.
- **Universities.** Seat-based licensing is deliberately "contact sales" only
  and is not modelled here.
- **Meter calibration.** All allowances are reasoned, not measured. Once real
  usage data exists, set each flagship meter so ~15% of that persona hits the
  cap — high enough that the plan feels generous, low enough that packs sell.
