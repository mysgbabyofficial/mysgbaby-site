import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

/**
 * Trust + legal footer (prompt §26). The disclaimer is mandatory on every page.
 * Note: the "Powered by Copilot Cowork" style branding is NOT added here — this
 * is a real product footer.
 */
export default function SiteFooter() {
  const t = useTranslations('common');
  return (
    <footer className="mt-16 border-t border-primary/30 bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-ink/80">
        <p className="font-medium">{t('notMedicalAdvice')}</p>
        <p className="mt-2">
          All medical and financial figures are dated and cited. See each section&apos;s
          &quot;{t('verifiedOn', { date: '…' })}&quot; label for currency of data.
        </p>
        <nav className="mt-4 flex flex-wrap gap-4 text-xs" aria-label="Legal">
          <Link href="/privacy" className="underline">Privacy</Link>
          <Link href="/terms" className="underline">Terms</Link>
          <Link href="/disclaimer" className="underline">Disclaimer</Link>
        </nav>

        <div className="mt-5 flex flex-col gap-1.5 text-xs">
          <a href="https://www.mysgbaby.com" className="hover:underline">🌐 www.mysgbaby.com</a>
          <a href="mailto:mysgbabyofficial@gmail.com" className="hover:underline">✉️ mysgbabyofficial@gmail.com</a>
        </div>

        <div className="mt-4">
          <span className="text-xs font-semibold text-ink/60">Follow along — coming soon</span>
          <div className="mt-2 flex gap-2" aria-label="Social links coming soon">
            {['Facebook', 'Instagram', 'TikTok', 'X'].map((s) => (
              <span
                key={s}
                title={`${s} — coming soon`}
                aria-disabled="true"
                className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg bg-primary/10 text-[11px] font-bold text-ink/50"
              >
                {s[0]}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-ink/60">
          © {new Date().getFullYear()} MySGBaby · Sources: MOM, MSF, MOH/HealthHub, CPFB.
          Informational service; not affiliated with the Singapore Government.
        </p>
      </div>
    </footer>
  );
}
