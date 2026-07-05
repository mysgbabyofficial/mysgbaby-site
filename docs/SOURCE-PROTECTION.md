# Source Protection & Anti-Theft — what actually works

**Prepared:** 2026-07-05 · Consistent with `RISK-AND-FEASIBILITY.md` §5.

## The one hard truth

A public website **cannot** hide its front-end. Every visitor's browser downloads
your HTML, CSS, and JavaScript to render the page — so anyone can read the markup,
copy the visible text/prices, and screenshot the design. **No tool changes this.**
Right-click blocking, "disable devtools", CSS copy-prevention, and steganographic
watermarks are theatre: trivially bypassed, and they hurt real users, accessibility,
and SEO. We deliberately do **not** ship them (see RISK doc §5).

What you *can* protect is: (1) your **source repository**, (2) your **server-side
code**, (3) **legal ownership** so copying has consequences, and (4) casual reuse
(embedding, hotlinking, fingerprinting). Those are all real, and are done below.

## What is already private

| Layer | Status | Why |
|---|---|---|
| Server components, `lib/content.ts`, any API routes | **Private** ✅ | Next.js runs these on the server; the code never reaches the browser. |
| Original TypeScript source | **Not shipped** ✅ | `next build` compiles + minifies. Source maps are disabled (`productionBrowserSourceMaps: false`) so no readable TS is served. |
| Secrets / API keys | **None committed** ✅ | `.gitignore` ignores all `.env*` files; real values live in host secrets. Scanned clean 2026-07-05. |
| Stack fingerprint | **Reduced** ✅ | `poweredByHeader: false` removes the `X-Powered-By: Next.js` header. |
| Framing / clickjacking / content theft via `<iframe>` | **Blocked** ✅ | `frame-ancestors 'none'` + `X-Frame-Options: SAMEORIGIN` in `next.config.mjs`. |
| Transport | **Enforced** ✅ | HSTS + `upgrade-insecure-requests`. |
| Legal ownership of the code | **Established** ✅ | `LICENSE` (All Rights Reserved) + `public/DMCA.md` takedown route. |

## The single most important action: keep the repo PRIVATE

This is the real answer to "hide my source code." The client bundle is public no
matter what; your **source repository does not have to be.**

1. Host the code in a **private** GitHub/GitLab repo (Settings → Danger Zone →
   change visibility to Private). Never push to a public repo.
2. Deploy from that private repo to your host (Vercel/Netlify/etc.). The host
   serves only the **built output**, never your source tree.
3. Restrict repo access to people who need it. Use branch protection.
4. Keep real secrets in the host's environment-variable/secret store — never in
   the repo. `.env.example` (committed) is only a template.
5. Turn on secret-scanning / Dependabot (or run `npm audit` in CI) so a leaked
   key or vulnerable dependency is caught early.

If the repo is public today, making it private is the biggest single win here.

## The legal layer (this is what actually deters thieves)

You can't stop the bytes from being downloadable, but you can make copying a
**legal liability** with recourse:

- **`LICENSE`** — All Rights Reserved; no copy/modify/redistribute without
  permission. Put your **full legal name or registered entity** in it for the
  strongest standing.
- **`public/DMCA.md`** — takedown path; add a real contact email.
- **Terms of Use page** — should state ownership and prohibit scraping/reuse.
  Have it lawyer-reviewed (RISK doc §1 flags this).
- **Register copyright** if you want maximum leverage in a dispute.
- Optional: keep a private, timestamped copy of your source (a dated private repo
  or archive) as evidence of authorship and creation date.

## Optional, with honest trade-offs

- **JavaScript obfuscation** (beyond the default minification): raises the bar for
  a casual reader, but is bypassable, **hurts performance and SEO**, complicates
  debugging, and can break Next.js hydration. For a content site the payoff is
  low. Not recommended; minification already makes the bundle unpleasant to read.
- **Image hotlink protection**: serve illustrations from a host/CDN that blocks
  cross-origin hotlinking, or add a `Referer` check, so other sites can't embed
  your artwork directly. Reasonable if art theft is a concern.
- **Rate limiting on any API routes** (RISK doc §5) once you add them — stops bulk
  scraping of dynamic endpoints.

## Bottom line

- Make the **repo private** → your source code is genuinely hidden.
- The **LICENSE + DMCA + Terms** → copying the public site is now infringement you
  can act on.
- The **headers already in place** → no framing, no fingerprint, no leaked source
  maps, no committed secrets.
- Accept that **rendered content and design are visible** — that is true of every
  website on the internet — and defend it with law, not theatre.
