export type ContentScore = {
  score: number;
  type: ContentType;
  tags: ContentTag[];
  content: string;
  timestamp: string;
  author: string;
};

export type ContentType = 
  | "显性攻击" 
  | "隐性攻击" 
  | "无意识攻击" 
  | "反串" 
  | "灌水" 
  | "引流" 
  | "广告"
  | "正常";

export type ContentTag = {
  name: string;
  color: string;
};

export type ScoreLevel = {
  min: number;
  max: number;
  action: "保留" | "评审" | "预警";
  color: string;
};