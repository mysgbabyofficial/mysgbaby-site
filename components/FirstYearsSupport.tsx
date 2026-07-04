import benefits from '@/data/benefits.json';

type Row = { name: string; amount: string; who: string };

function Table({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-sm">
      <div className="bg-primary/10 px-4 py-2 font-heading font-bold">{title}</div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-primary/10 align-top">
              <td className="p-3">
                <b>{r.name}</b>
                <span className="block text-xs text-ink/50">{r.who}</span>
              </td>
              <td className="whitespace-nowrap p-3 text-right font-semibold text-primary">{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FirstYearsSupport() {
  const d = (benefits as { firstYearsSupport?: {
    taxReliefs: Row[]; childcare: Row[]; notes: string[]; sources: { label: string; url: string }[];
  } }).firstYearsSupport;
  if (!d) return null;

  return (
    <section className="space-y-4">
      <div>
        <p className="font-accent text-lg text-primary">Beyond birth</p>
        <h2 className="text-2xl font-extrabold">Support through the first years</h2>
        <p className="text-ink/70">
          Government help doesn&apos;t stop at birth — here&apos;s what continues as your child grows.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Table title="💸 Tax reliefs & rebates" rows={d.taxReliefs} />
        <Table title="🧸 Childcare & ongoing" rows={d.childcare} />
      </div>
      <div className="rounded-xl border border-trust/30 bg-trust/5 p-4 text-sm">
        <p className="font-semibold">Good to know</p>
        <ul className="mt-1 list-inside list-disc text-ink/70">
          {d.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink/50">
          Sources:{' '}
          {d.sources.map((s, i) => (
            <span key={i}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                {s.label}
              </a>
              {i < d.sources.length - 1 ? ' · ' : ''}
            </span>
          ))}
          . Verified 2026 — confirm on IRAS / ECDA before relying on figures.
        </p>
      </div>
    </section>
  );
}
