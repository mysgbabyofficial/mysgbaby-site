import OnboardingQuiz from '@/components/OnboardingQuiz';

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Let&apos;s personalise your guide</h1>
        <p className="mt-2 max-w-2xl text-ink/80">
          Six quick questions. Your answers stay on your device and help us show the right stage,
          costs and support for you.
        </p>
      </header>
      <OnboardingQuiz />
    </div>
  );
}
