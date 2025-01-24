import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import type { ContentScore, ScoreLevel } from "@/types/analysis";

const scoreLevels: ScoreLevel[] = [
  { min: 0, max: 40, action: "保留", color: "bg-green-100 text-green-800" },
  { min: 40, max: 60, action: "评审", color: "bg-yellow-100 text-yellow-800" },
  { min: 60, max: 100, action: "预警", color: "bg-red-100 text-red-800" }
];

const mockData: ContentScore[] = [
  {
    content: "这个产品真的很差劲！",
    score: 45,
    type: "显性攻击",
    tags: [{ name: "情绪化", color: "bg-orange-100 text-orange-800" }],
    timestamp: "2024-03-15 14:30",
    author: "用户A"
  },
  {
    content: "建议大家都来看看这个链接...",
    score: 75,
    type: "引流",
    tags: [{ name: "营销", color: "bg-purple-100 text-purple-800" }],
    timestamp: "2024-03-15 15:20",
    author: "用户B"
  },
  {
    content: "这个功能设计得不错",
    score: 20,
    type: "正常",
    tags: [{ name: "建设性", color: "bg-blue-100 text-blue-800" }],
    timestamp: "2024-03-15 16:10",
    author: "用户C"
  }
];

const getScoreLevel = (score: number): ScoreLevel => {
  return scoreLevels.find(level => score >= level.min && score < level.max) || scoreLevels[0];
};

const getScoreIcon = (level: ScoreLevel) => {
  switch (level.action) {
    case "预警":
      return <AlertTriangle className="h-4 w-4" />;
    case "评审":
      return <Shield className="h-4 w-4" />;
    default:
      return <CheckCircle className="h-4 w-4" />;
  }
};

export const ContentAnalysis = () => {
  const [contents] = useState<ContentScore[]>(mockData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {scoreLevels.map((level) => (
          <Card key={level.action} className="p-4">
            <div className="flex items-center gap-2">
              {getScoreIcon(level)}
              <h3 className="font-medium">{level.action}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {level.min}-{level.max}分
            </p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {contents.map((content, index) => {
          const level = getScoreLevel(content.score);
          return (
            <Alert key={index} className="relative">
              <div className="flex justify-between items-start">
                <div>
                  <AlertTitle className="flex items-center gap-2">
                    {getScoreIcon(level)}
                    <span>{content.author}</span>
                    <span className="text-sm text-muted-foreground">
                      {content.timestamp}
                    </span>
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    {content.content}
                  </AlertDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className={level.color}>
                    分数: {content.score}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    {content.type}
                  </Badge>
                  <div className="flex gap-1">
                    {content.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline" 
                        className={tag.color}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Alert>
          )
        })}
      </div>
    </div>
  );
};