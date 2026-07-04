type Package = { range: string; basis?: string; verificationStatus?: string };
type Hospital = {
  id: string;
  name: string;
  type: string;
  wardOptions: string[];
  capabilities: string[];
  packages: { normalDelivery: Package; cSection: Package };
};

function PriceRow({ pkg, label }: { pkg: Package; label: string }) {
  return (
    <div className="border-t border-primary/10 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-ink/70">{label}</span>
        <span className="font-semibold">{pkg.range}</span>
      </div>
      {pkg.basis && <p className="mt-0.5 text-xs text-ink/50">{pkg.basis}</p>}
    </div>
  );
}

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <article className="group rounded-2xl border border-primary/20 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <h3 className="font-heading font-bold">{hospital.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{hospital.type}</p>

      <div className="mt-3 space-y-2 text-sm">
        <PriceRow pkg={hospital.packages.normalDelivery} label="Normal delivery" />
        <PriceRow pkg={hospital.packages.cSection} label="C-section" />
      </div>

      <p className="mt-3 text-[11px] text-ink/45">Reference figures (2026) — verify with the hospital.</p>

      <p className="mt-2 text-xs text-ink/60">Wards: {hospital.wardOptions.join(', ')}</p>
      {hospital.capabilities.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1">
          {hospital.capabilities.map((c) => (
            <li key={c} className="rounded-full bg-secondary/25 px-2 py-0.5 text-xs">
              {c}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
