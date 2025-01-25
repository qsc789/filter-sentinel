import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ScoringHistory } from "@/types/scoring";

const mockHistory: ScoringHistory[] = [
  {
    id: "1",
    content: "这是一条测试内容",
    score: 35,
    timestamp: "2024-03-15 14:30:00",
    agentDetails: [
      {
        agentId: "1",
        agentName: "Agent 1",
        score: 30,
        reasoning: "内容正常"
      },
      {
        agentId: "2",
        agentName: "Agent 2",
        score: 40,
        reasoning: "轻微争议"
      }
    ],
    finalVerdict: "内容正常，无需处理"
  }
];

export const ScoringHistory = () => {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold mb-4">评分历史记录</h3>
        {mockHistory.map((record) => (
          <Card key={record.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{record.content}</p>
                <p className="text-sm text-muted-foreground">
                  {record.timestamp}
                </p>
              </div>
              <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                得分: {record.score}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Agent 评分详情:</h4>
              <div className="space-y-2">
                {record.agentDetails.map((agent) => (
                  <div
                    key={agent.agentId}
                    className="text-sm text-muted-foreground"
                  >
                    <span className="font-medium">{agent.agentName}:</span>{" "}
                    {agent.score}分 - {agent.reasoning}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm font-medium">
              最终判定: {record.finalVerdict}
            </p>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};