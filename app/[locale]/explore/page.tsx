import PageHeader from '@/components/PageHeader';
import StageExplorer from '@/components/StageExplorer';

export const metadata = {
  title: 'Interactive Pregnancy Guide — MySGBaby',
  description: 'A guided, step-by-step walk through every pregnancy stage for Singapore parents.',
};

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Guided, step by step"
        title="Interactive pregnancy guide"
        subtitle="Tap through each stage — what happens, what it costs, and what's next. You can always go back."
      />
      <StageExplorer />
    </div>
  );
}
