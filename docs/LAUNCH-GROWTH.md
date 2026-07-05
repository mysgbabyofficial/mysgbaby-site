# Launch & Growth — getting MySGBaby found

You've built a rich site. This is how real parents actually find and use it. Ordered by impact; almost all are free.

## 1. Google Search Console (do this first)
1. Go to **search.google.com/search-console** → **Add property** → choose **Domain**, enter `mysgbaby.com`.
2. **Verify ownership** — easiest is the **DNS TXT record** method: Google gives you a TXT value; add it at your registrar (Namecheap → Advanced DNS) or Cloudflare. *(If your domain is on Cloudflare, its Search Console integration is one click.)*
3. **Submit your sitemap:** Sitemaps → enter `sitemap.xml` → Submit. Your app already generates it at `/sitemap.xml`.
4. Use **URL Inspection** to request indexing for the homepage and a few key pages (`/explore`, `/benefits`, `/hospitals`).
5. *(Optional)* Do the same at **Bing Webmaster Tools** — it also feeds ChatGPT search.

## 2. Already working for you (technical SEO — done ✅)
- Dynamic `sitemap.xml` + `robots.txt`
- Open Graph + Twitter cards (nice link previews when shared)
- Schema.org JSON-LD (Organization + WebSite)
- `llms.txt` for AI search engines (ChatGPT / Perplexity / Gemini)
- Fast, mobile-first, optimised WebP images

## 3. Turn on analytics (so you can see what works)
Set **one** env var in Vercel: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=mysgbaby.com` (privacy-first) **or** `NEXT_PUBLIC_GA4_ID=G-XXXX`. It loads only after consent. Watch which pages/tools get used.

## 4. Get your first visitors (free)
- **Parenting communities — but read the rules.** Most ban self-promo; contribute genuinely and link only where allowed. Places SG parents gather: r/askSingapore & r/singaporeparents, HardwareZone "Parents/Kids", KiasuParents forum, Singapore-Mums Facebook groups. One honest *"I built a free Singapore pregnancy cost + benefits tool"* post in a self-promo-allowed thread beats spamming ten.
- **The shareable hooks** are your **tools** (kick counter, cost & confinement calculators) and your **cited figures** — those get sent between friends.
- **Your socials** (currently "coming soon" in the footer) — set them up when you're ready to post; the icons are already there.
- **Friends & family expecting** — the fastest, warmest first users, and the best feedback.

## 5. Content that pulls search traffic
Your **cited, current figures** are the SEO asset — people literally search *"cost of giving birth in Singapore 2026"*, *"confinement cost Singapore"*, *"Baby Bonus 2026"*. You already have this content in the explorer and pages.
- Keep figures **fresh** (Budget every Feb; leave changes 1 Apr) — freshness ranks.
- Consider a small **articles/blog route** later, turning your explorer content into search-landing pages for those exact queries.

## 6. AI discoverability (GEO)
More parents ask ChatGPT/Perplexity than you'd think. Your `llms.txt` + accurate, sourced content is what gets you cited there. Keep everything factual and referenced.

## Pre-launch checklist
- [ ] `npm run build` passes; site deploys
- [ ] Domain live with HTTPS
- [ ] Contact email set in `site.config.ts`
- [ ] Legal pages have your details (get a review when you can)
- [ ] Analytics env var set
- [ ] Sitemap submitted to Search Console
- [ ] Click every nav link + tool once on the **live** site
- [ ] Test on a **phone** (most parents are mobile)

## The honest priority
**Traffic > features now.** You have more than enough features. The next real win is getting even a handful of Singapore parents actually using it, hearing their feedback, and iterating on *that*.
