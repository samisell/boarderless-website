
import { AiSuggesterForm } from "./components/ai-suggester-form";

export default function AiSuggesterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Number Suggester</h1>
        <p className="text-muted-foreground max-w-2xl">
          Let our AI help you find the perfect virtual number. Describe your target audience and geographical preferences, and we&apos;ll suggest numbers that fit your needs.
        </p>
      </div>
      
      <AiSuggesterForm />
      
    </div>
  );
}
