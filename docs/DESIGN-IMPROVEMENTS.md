# MySGBaby — Design Improvement Plan

Your critique is correct: the current pages are *functional but generic*. This is why they read as "robot-generated," and how to fix each one — modelled on what high-traffic parenting/health sites (BabyCenter, What to Expect, The Bump, Flo, Peanut) and modern landing pages actually do.

## Diagnosis — why it feels flat
| Problem | Why it reads as generic |
|---|---|
| Plain white background | No atmosphere or brand mood; every SaaS-template looks like this |
| Static cards, thin borders | No depth, no shadow, no motion — nothing invites a tap |
| Weak hierarchy | Everything is similar size/weight; the eye has nowhere to land |
| Stages shown as a flat 5-across row | Doesn't feel like a *journey*; no imagery, no reason to click |
| Basic imagery | One illustration, no consistent art direction, low "wow" |
| No social proof / trust signals | New health brands live or die on trust; there's none visible |
| No micro-interaction | Hovers, reveals, and parallax are what make a site feel "alive" |

## What high-traffic sites do (patterns to borrow)
1. **Atmospheric, dynamic backgrounds** — soft animated gradient "mesh," floating blurred colour blobs, subtle particles. Never flat white behind the hero.
2. **A hero with depth** — a big cinematic image *layered* with floating decorative elements (stars, moon, glow), an oversized gradient-filled headline, **two CTAs** (primary + secondary), and **trust signals** right there ("Trusted by 10,000+ SG parents", "Verified daily").
3. **The pregnancy journey as the hero interaction** — not a flat row. A visual *path* of big, image-rich, colour-coded stage cards with icons, a hover lift, and an explicit "Explore →". This is the #1 fix for "nothing makes me click."
4. **Section rhythm** — alternating tinted/gradient section backgrounds, generous whitespace, big rounded cards with soft shadows, so scrolling feels designed, not stacked.
5. **Consistent, richer illustration** — one strong art style (here: dreamy anime), used everywhere, with real "wow" hero art.
6. **Social proof + stats band** — parent counts, prices-verified counters, short testimonials, partner/source logos.
7. **Motion, tastefully** — hover lifts, scroll-reveal fade-ups, gentle parallax/float. Always gated by `prefers-reduced-motion`.
8. **A refined, glassy sticky header** — blur, a clear CTA button, active-state nav, the logo with presence.
9. **Mobile-first** — bottom tab bar, big thumb targets, swipeable stage cards.

## Concrete changes (prioritised)
1. **Background:** animated multi-colour gradient mesh + floating blurred blobs (lavender/gold/peach), replacing white. *(done in preview)*
2. **Hero:** cinematic anime art, layered floating stars/moon, gradient headline, dual CTA, trust row. *(done)*
3. **Stage journey:** five large, colour-coded, image/icon cards with hover lift + "Explore →", laid out as a journey. *(done)*
4. **Sections:** alternating soft-tinted backgrounds, rounded shadowed cards, a stats/social-proof band, a "why mysgbaby" feature grid, a testimonial. *(done in preview)*
5. **Motion:** scroll-reveal + hover micro-interactions, reduced-motion safe. *(done)*
6. **Art style:** move all illustration to a richer **anime** aesthetic. *(new hero done; per-stage art is the next step)*
7. **Header:** glassy, gradient underline nav, prominent CTA. *(done)*

## What's implemented now
The static **`index.html`** preview has been rebuilt with all of the above so you can *see* the new direction. The next step is porting it fully into the Next.js components and generating a matching anime illustration per pregnancy stage (5 images) so the stage journey is fully visual.
