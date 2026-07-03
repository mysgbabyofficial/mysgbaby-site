// One place to set the details that appear on your legal pages and footer.
// This is the ONLY thing you must touch before launch — set contactEmail below.
export const siteConfig = {
  // Your name or brand. "MySGBaby" is fine — you don't need a registered company.
  operatorName: 'MySGBaby',

  // Data-protection / general contact.
  contactEmail: 'mysgbabyofficial@gmail.com',

  // Primary site domain (shown in footer/contact).
  domain: 'www.mysgbaby.com',

  // Update this only when you change the legal text.
  legalLastUpdated: '2026-07-01',

  // Defaults for the recommended stack — change if you use something else.
  hostingProvider: 'Vercel',
  analyticsProvider: 'Plausible',
};

// Falls back to a visible reminder if you haven't set the email yet.
export const contactEmailOrPlaceholder =
  siteConfig.contactEmail || '[set contactEmail in site.config.ts]';
