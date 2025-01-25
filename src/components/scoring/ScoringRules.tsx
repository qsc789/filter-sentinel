import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { ScoringRule } from "@/types/scoring";

export const ScoringRules = () => {
  const [rules, setRules] = useState<ScoringRule[]>([
    {
      id: "1",
      name: "保留",
      minScore: 0,
      maxScore: 40,
      action: "保留",
      description: "内容正常，无需处理"
    },
    {
      id: "2",
      name: "评审",
      minScore: 40,
      maxScore: 60,
      action: "评审",
      description: "需要人工评审"
    },
    {
      id: "3",
      name: "预警",
      minScore: 60,
      maxScore: 100,
      action: "预警",
      description: "可能存在违规内容"
    }
  ]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">评分规则配置</h3>
      {rules.map((rule) => (
        <Card key={rule.id} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">{rule.name}</h4>
            <span className="text-sm text-muted-foreground">
              {rule.minScore}-{rule.maxScore}分
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
          <Slider
            defaultValue={[rule.minScore, rule.maxScore]}
            max={100}
            step={1}
            className="my-4"
          />
          <Input
            placeholder="规则描述"
            defaultValue={rule.description}
            className="mt-2"
          />
        </Card>
      ))}
      <Button className="w-full mt-4">添加新规则</Button>
    </div>
  );
};