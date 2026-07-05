import PageHeader from '@/components/PageHeader';
import KickCounter from '@/components/KickCounter';
import ContractionTimer from '@/components/ContractionTimer';
import BabyLog from '@/components/BabyLog';
import MilestoneTracker from '@/components/MilestoneTracker';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'Parent Tools — MySGBaby',
  description: 'A kick counter and contraction timer for expecting parents in Singapore.',
};

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Handy tools"
        title="Parent tools"
        subtitle="Simple trackers for the everyday moments — count your baby's kicks, and time contractions when the day comes. Saved to your device."
      />
      <MedicalDisclaimer lastChecked="2026-07-01" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-extrabold">🦶 Kick counter</h2>
          <KickCounter />
        </div>
        <div>
          <h2 className="mb-2 text-xl font-extrabold">⏱️ Contraction timer</h2>
          <ContractionTimer />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-extrabold">👶 After baby&apos;s here — daily log</h2>
          <BabyLog />
        </div>
        <div>
          <h2 className="mb-2 text-xl font-extrabold">🌟 Milestone tracker</h2>
          <MilestoneTracker />
        </div>
      </div>
    </div>
  );
}
