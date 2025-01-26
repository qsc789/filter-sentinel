import { ContentAnalysis } from "@/components/analysis/ContentAnalysis";
import { ScoringRules } from "@/components/scoring/ScoringRules";
import { ScoringHistory } from "@/components/scoring/ScoringHistory";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">内容分析系统</h1>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ContentAnalysis />
        </div>
        <div className="space-y-6">
          <ScoringRules />
          <ScoringHistory />
        </div>
      </div>
    </div>
  );
};

export default Index;