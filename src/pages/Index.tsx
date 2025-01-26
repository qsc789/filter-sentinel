import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ContentAnalysis } from "@/components/analysis/ContentAnalysis";
import { ScoringRules } from "@/components/scoring/ScoringRules";
import { ScoringHistory } from "@/components/scoring/ScoringHistory";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { UserMenu } from "@/components/auth/UserMenu";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const monitoringData = [
  { time: "00:00", tieba: 400, weibo: 240, tiktok: 320, facebook: 180 },
  { time: "04:00", tieba: 300, weibo: 139, tiktok: 220, facebook: 280 },
  { time: "08:00", tieba: 200, weibo: 980, tiktok: 420, facebook: 380 },
  { time: "12:00", tieba: 278, weibo: 390, tiktok: 520, facebook: 480 },
  { time: "16:00", tieba: 189, weibo: 480, tiktok: 320, facebook: 180 },
  { time: "20:00", tieba: 239, weibo: 380, tiktok: 220, facebook: 280 },
];

const platformData = [
  { name: "贴吧", value: 400 },
  { name: "微博", value: 300 },
  { name: "抖音", value: 300 },
  { name: "脸书", value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("analysis");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">内容监控</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="font-medium">总监控量</h3>
          <div className="text-2xl font-bold mt-2">1,234</div>
          <p className="text-sm text-muted-foreground">较昨日 +12.3%</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium">待处理</h3>
          <div className="text-2xl font-bold mt-2">56</div>
          <p className="text-sm text-muted-foreground">较昨日 -5.2%</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium">已处理</h3>
          <div className="text-2xl font-bold mt-2">789</div>
          <p className="text-sm text-muted-foreground">较昨日 +8.7%</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium">处理率</h3>
          <div className="text-2xl font-bold mt-2">93.4%</div>
          <p className="text-sm text-muted-foreground">较昨日 +2.1%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">平台数据趋势</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monitoringData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <RechartsTooltip />
              <Line
                type="monotone"
                dataKey="tieba"
                stroke="#8884d8"
                name="贴吧"
              />
              <Line
                type="monotone"
                dataKey="weibo"
                stroke="#82ca9d"
                name="微博"
              />
              <Line
                type="monotone"
                dataKey="tiktok"
                stroke="#ffc658"
                name="抖音"
              />
              <Line
                type="monotone"
                dataKey="facebook"
                stroke="#ff7300"
                name="脸书"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">平台分布</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-x-2 mb-4">
          <Button
            variant={activeTab === "analysis" ? "default" : "outline"}
            onClick={() => handleTabChange("analysis")}
          >
            内容分析
          </Button>
          <Button
            variant={activeTab === "rules" ? "default" : "outline"}
            onClick={() => handleTabChange("rules")}
          >
            评分规则
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            onClick={() => handleTabChange("history")}
          >
            评分历史
          </Button>
        </div>

        {activeTab === "analysis" && <ContentAnalysis />}
        {activeTab === "rules" && <ScoringRules />}
        {activeTab === "history" && <ScoringHistory />}
      </Card>
    </div>
  );
};

export default Index;