# MySGBaby — Brand Guide

The visual system, derived from the moon-cradle logo. Keep everything on this page consistent across the site, social, and any print.

## Logo

**Primary mark:** the circular "moon-cradle" emblem — a baby cradled on a golden crescent inside a lavender starry badge (Singapore's crescent + stars).

| Asset | File | Use |
|---|---|---|
| Icon (text-free) | `public/illustrations/emblem.png` / `.webp` | Site header, favicon source, app icon, avatars |
| Full lockup (emblem + wordmark) | source logo PNGs in your files | Social, hero, print |
| Favicon / app icons | `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | Auto-served by Next.js |
| Social share (OG) | `public/og-image.png` (1200×630) | Link previews |

**Wordmark:** always lowercase **mysgbaby**, in **Singapore-flag red** (see palette). Rounded, friendly weight. Never restyle the letters or change the red.

**Clear space & don'ts:** give the emblem breathing room equal to ~½ the badge radius. Don't recolour the badge, stretch the mark, add drop shadows, or place the red wordmark on a red/busy background.

## Colour palette

Source of truth is `app/globals.css` (OKLCH). Hex values below are **approximate** for reference/print.

| Token | Role | OKLCH (source) | ~Hex |
|---|---|---|---|
| `primary` | Lavender — badge, primary UI | `oklch(0.82 0.07 300)` | ~#B3A0DC |
| `gold` | Crescent-moon accent | `oklch(0.86 0.09 85)` | ~#E7C67C |
| `accent` | Warm peach | `oklch(0.88 0.08 60)` | ~#F6CBA1 |
| `secondary` | Sage green | `oklch(0.85 0.06 150)` | ~#A9D6BE |
| `trust` | Soft blue — medical citations | `oklch(0.80 0.07 250)` | ~#A7C0E6 |
| **`brand`** | **Singapore red — wordmark only** | `#ef3340` | **#EF3340** |
| `surface` | Background | `oklch(0.98 0.01 300)` | ~#FAF8FD |
| `ink` | Text | `oklch(0.30 0.02 300)` | ~#413A52 |

**Rule:** Singapore red (`brand`) is reserved for the **mysgbaby wordmark** and small national accents — not for body buttons or large fills (keep those lavender/peach so the red stays special and legible).

## Typography
- **Headings:** Nunito (rounded, friendly) — `--font-heading`
- **Body:** Inter (readable, min 16px) — `--font-body`
- **Accent/handwritten:** Caveat — `--font-accent`

## Voice
Warm, supportive, plain-English "friendly expert." Never clinical or condescending. Informational, always cited, never presented as medical advice.

## Loss-support exception
On loss/grief pages, switch to the muted palette (`.theme-muted`) and drop the mascot, gold, and celebratory tones — calm and gentle only.
