export type ScoringRule = {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  action: string;
  description: string;
};

export type ScoringHistoryType = {
  id: string;
  content: string;
  score: number;
  timestamp: string;
  agentDetails: AgentScore[];
  finalVerdict: string;
};

export type AgentScore = {
  agentId: string;
  agentName: string;
  score: number;
  reasoning: string;
};

export type ScoringConfig = {
  enabledAgents: string[];
  customRules: ScoringRule[];
  autoModeration: boolean;
  sensitivityLevel: number;
};