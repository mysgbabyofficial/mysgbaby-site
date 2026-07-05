import PageHeader from '@/components/PageHeader';
import { Link } from '@/i18n/routing';

const COMMUNITIES = [
  { name: 'KiasuParents', desc: 'Long-running Singapore parenting forum — pregnancy, schools, everything.', url: 'https://www.kiasuparents.com' },
  { name: 'r/singaporeparents (Reddit)', desc: 'Candid, anonymous peer discussion.', url: 'https://www.reddit.com/r/singaporeparents/' },
  { name: 'Singapore Mums (Facebook)', desc: 'Several large, active local groups — search “Singapore Mums”.', url: 'https://www.facebook.com/' },
  { name: 'Pregnant and Popped — The Village', desc: 'SG pregnancy & postpartum community with experts.', url: 'https://www.pregnantandpopped.com/' },
  { name: 'Hospital parent groups (KKH / NUH)', desc: 'Ask your hospital about new-parent groups and classes.', url: 'https://www.kkh.com.sg/' },
];

const HELPLINES = [
  { name: "AWARE Women's Helpline", num: '1800-777-5555', note: 'Emotional support, postnatal depression, stress' },
  { name: 'IMH Mental Health Helpline', num: '6389 2222', note: '24 hours' },
  { name: 'Samaritans of Singapore (SOS)', num: '1767', note: '24-hour crisis support' },
];

const FAQ = [
  {
    q: 'Is it normal to feel overwhelmed?',
    a: 'Completely — the early weeks are a huge adjustment and most parents feel it. If low mood or anxiety persists, reach out to a helpline above or your doctor.',
  },
  {
    q: 'How do I compare hospital costs?',
    a: 'See the Hospitals page for every SG maternity hospital with 2026 reference costs, and the Calculator to plan your budget.',
  },
  {
    q: 'What support am I entitled to?',
    a: 'The Benefits Centre lists every grant, subsidy and tax relief — from birth to age 7 — with sources.',
  },
  {
    q: 'I just found out I\'m pregnant — where do I start?',
    a: 'Open the interactive guide and tap “Pre-conception & Testing”. It walks you through the very first steps.',
  },
];

export const metadata = {
  title: 'Community & Support — MySGBaby',
  description: 'Trusted Singapore parenting communities, helplines and common questions for new parents.',
};

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="You're not alone"
        title="Community & support"
        subtitle="Peer support is one of the biggest helps in new parenthood. Here are trusted places to connect and get help."
      />

      <section>
        <h2 className="mb-3 text-xl font-extrabold">Where Singapore parents connect</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {COMMUNITIES.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-heading font-bold">{c.name}</h3>
              <p className="mt-1 text-sm text-ink/60">{c.desc}</p>
              <span className="mt-1 inline-block text-sm font-semibold text-primary">Visit →</span>
            </a>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink/50">
          MySGBaby isn&apos;t affiliated with these communities — please follow each group&apos;s own
          rules. Seek groups that normalise the ups and downs, not milestone-boasting.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold">Free, confidential helplines</h2>
        <div className="overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              {HELPLINES.map((h) => (
                <tr key={h.name} className="border-t border-primary/10 first:border-t-0">
                  <td className="p-3">
                    <b>{h.name}</b>
                    <span className="block text-xs text-ink/50">{h.note}</span>
                  </td>
                  <td className="whitespace-nowrap p-3 text-right font-semibold text-primary">{h.num}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink/50">
          For breastfeeding support, ask your hospital&apos;s lactation service, or see{' '}
          <a href="https://www.healthhub.sg" target="_blank" rel="noopener noreferrer" className="underline">
            HealthHub
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold">Questions parents often ask</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl border border-primary/15 bg-surface p-4 shadow-sm">
              <p className="font-heading font-bold">{f.q}</p>
              <p className="mt-1 text-sm text-ink/70">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm text-ink/70">
        Need the whole journey? <Link href="/explore" className="font-semibold text-primary underline">Open the interactive guide →</Link>
      </p>
    </div>
  );
}
