'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Consent-gated analytics.
 * - GA4 loads with Google Consent Mode v2: storage is DENIED by default and only
 *   granted after the user chooses "Accept all" in the ConsentBanner. (To block GA
 *   entirely until consent, also gate the gtag.js <Script> on `consent === 'all'`.)
 * - Plausible (cookieless) loads ONLY after consent — the strict privacy option.
 *
 * Configure with NEXT_PUBLIC_GA4_ID and/or NEXT_PUBLIC_PLAUSIBLE_DOMAIN.
 * If neither is set, nothing loads.
 */
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function Analytics() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    try {
      setConsent(localStorage.getItem('mysgbaby_consent'));
    } catch {}
    const onConsent = (e: Event) => setConsent((e as CustomEvent<string>).detail);
    window.addEventListener('mysgbaby-consent', onConsent as EventListener);
    return () => window.removeEventListener('mysgbaby-consent', onConsent as EventListener);
  }, []);

  // When the user accepts, grant GA4 storage (Consent Mode v2 update).
  useEffect(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (consent === 'all' && GA4 && typeof w.gtag === 'function') {
      w.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  }, [consent]);

  return (
    <>
      {GA4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var _c='denied';try{if(localStorage.getItem('mysgbaby_consent')==='all')_c='granted';}catch(e){}
gtag('consent','default',{ad_storage:_c,analytics_storage:_c,ad_user_data:_c,ad_personalization:_c});
gtag('js',new Date());gtag('config','${GA4}');`}
          </Script>
        </>
      )}

      {PLAUSIBLE && consent === 'all' && (
        <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}
    </>
  );
}
