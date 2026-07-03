type Package = { price: number | null; verificationStatus: string; source: string | null };
type Hospital = {
  id: string;
  name: string;
  type: string;
  wardOptions: string[];
  capabilities: string[];
  packages: { normalDelivery: Package; cSection: Package };
};

function PriceCell({ pkg, label }: { pkg: Package; label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink/70">{label}</span>
      {pkg.price === null ? (
        <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
          Pending verification
        </span>
      ) : (
        <span className="font-semibold">${pkg.price.toLocaleString('en-SG')}</span>
      )}
    </div>
  );
}

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <article className="group rounded-2xl border border-primary/20 bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <h3 className="font-heading font-bold">{hospital.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{hospital.type}</p>

      <div className="mt-3 space-y-1 text-sm">
        <PriceCell pkg={hospital.packages.normalDelivery} label="Normal delivery" />
        <PriceCell pkg={hospital.packages.cSection} label="C-section" />
      </div>

      <p className="mt-3 text-xs text-ink/60">Wards: {hospital.wardOptions.join(', ')}</p>
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
