import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Waves, Users, Database, ChartLine, Activity, TrendingUp, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ContentAnalysis } from "@/components/analysis/ContentAnalysis";
import { ScoringRules } from "@/components/scoring/ScoringRules";
import { ScoringHistory } from "@/components/scoring/ScoringHistory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monitoringData = [
  { time: "00:00", tieba: 40, weibo: 24, tiktok: 67, facebook: 45 },
  { time: "04:00", tieba: 30, weibo: 45, tiktok: 45, facebook: 38 },
  { time: "08:00", tieba: 55, weibo: 65, tiktok: 78, facebook: 52 },
  { time: "12:00", tieba: 80, weibo: 70, tiktok: 89, facebook: 75 },
  { time: "16:00", tieba: 65, weibo: 55, tiktok: 56, facebook: 60 },
  { time: "20:00", tieba: 45, weibo: 35, tiktok: 45, facebook: 42 },
];

const engagementData = [
  { name: "贴吧", value: 35 },
  { name: "微博", value: 30 },
  { name: "TikTok", value: 25 },
  { name: "Facebook", value: 10 },
];

const PLATFORM_COLORS = {
  tieba: "#1E40AF",
  weibo: "#DC2626",
  tiktok: "#000000",
  facebook: "#1877F2"
};

const PIE_COLORS = ["#1E40AF", "#DC2626", "#000000", "#1877F2"];

const Index = () => {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string[]>(["暴力", "威胁", "攻击"]);
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [monitoringStatus, setMonitoringStatus] = useState({
    tieba: false,
    weibo: false,
    tiktok: false,
    facebook: false
  });

  const toggleMonitoring = (platform: keyof typeof monitoringStatus) => {
    setMonitoringStatus(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
    
    toast({
      title: `${monitoringStatus[platform] ? "停止" : "开始"}监控`,
      description: `${platform} 平台监控已${monitoringStatus[platform] ? "停止" : "开始"}`,
    });
  };

  const addCustomKeyword = () => {
    if (!newKeyword) return;
    if (customKeywords.includes(newKeyword)) {
      toast({
        title: "关键词已存在",
        variant: "destructive",
      });
      return;
    }
    setCustomKeywords([...customKeywords, newKeyword]);
    setNewKeyword("");
    toast({
      title: "添加成功",
      description: `已添加关键词: ${newKeyword}`,
    });
  };

  const myReviewRecords = [
    {
      id: 1,
      content: "这个帖子涉及敏感话题",
      platform: "贴吧",
      community: "科技社区",
      status: "已处理",
      date: "2024-03-15",
    },
    {
      id: 2,
      content: "违规广告内容",
      platform: "微博",
      community: "游戏玩家圈",
      status: "待处理",
      date: "2024-03-14",
    },
  ];

  const communityReviewRecords = [
    {
      id: 1,
      content: "不当言论",
      platform: "抖音",
      reviewer: "用户A",
      status: "已处理",
      date: "2024-03-15",
    },
    {
      id: 2,
      content: "垃圾广告",
      platform: "贴吧",
      reviewer: "用户B",
      status: "待处理",
      date: "2024-03-14",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F0FB] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center flex flex-col items-center bg-white rounded-lg p-4 shadow-sm">
          <div className="w-12 h-12 mb-2">
            <img 
              src="/lovable-uploads/8ddbcdba-1c9f-4b81-abf7-ed484ff6c63a.png" 
              alt="和语方舟" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-[#7E69AB] mb-1">和语方舟</h1>
          <p className="text-xs text-[#8E9196]">专业的社群言论安全监控平台</p>
        </header>

        <Tabs defaultValue="monitor" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="monitor" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              平台监控
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              关键词管理
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Waves className="w-4 h-4" />
              AI分析
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              用户评审
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitor">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(monitoringStatus).map(([platform, status]) => (
                  <Card key={platform} className="p-4 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={`/platform-logos/${platform}.svg`} 
                          alt={platform} 
                          className="w-6 h-6"
                        />
                        <h3 className="text-lg font-medium capitalize">{platform}</h3>
                      </div>
                      <Button
                        variant={status ? "destructive" : "default"}
                        onClick={() => toggleMonitoring(platform as keyof typeof monitoringStatus)}
                        className="bg-[#7E69AB] hover:bg-[#6E59A5]"
                      >
                        {status ? "停止监控" : "开始监控"}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#8E9196]">
                      <Activity className="w-4 h-4" />
                      <span>状态: {status ? "监控中" : "未监控"}</span>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ChartLine className="w-5 h-5 text-[#7E69AB]" />
                    实时活跃度趋势
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monitoringData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="time" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Line type="monotone" dataKey="tieba" stroke={PLATFORM_COLORS.tieba} name="贴吧" strokeWidth={2} />
                        <Line type="monotone" dataKey="weibo" stroke={PLATFORM_COLORS.weibo} name="微博" strokeWidth={2} />
                        <Line type="monotone" dataKey="tiktok" stroke={PLATFORM_COLORS.tiktok} name="TikTok" strokeWidth={2} />
                        <Line type="monotone" dataKey="facebook" stroke={PLATFORM_COLORS.facebook} name="Facebook" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#7E69AB]" />
                    平台参与度分布
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={engagementData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {engagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#7E69AB]" />
                  互动量统计
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monitoringData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="time" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Bar dataKey="tieba" fill={PLATFORM_COLORS.tieba} name="贴吧" />
                      <Bar dataKey="weibo" fill={PLATFORM_COLORS.weibo} name="微博" />
                      <Bar dataKey="tiktok" fill={PLATFORM_COLORS.tiktok} name="TikTok" />
                      <Bar dataKey="facebook" fill={PLATFORM_COLORS.facebook} name="Facebook" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keywords">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">关键词管理</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="添加新关键词..."
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="bg-white"
                  />
                  <Button onClick={addCustomKeyword} className="bg-[#7E69AB] hover:bg-[#6E59A5]">添加</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">系统关键词</h3>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-[#D3E4FD] text-[#7E69AB] rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">自定义关键词</h3>
                    <div className="flex flex-wrap gap-2">
                      {customKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-[#F1F0FB] text-[#7E69AB] rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Waves className="w-6 h-6 text-[#7E69AB]" />
                AI情感分析
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ContentAnalysis />
                </div>
                <div className="space-y-6">
                  <ScoringRules />
                  <ScoringHistory />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-[#7E69AB]" />
                用户评审系统
              </h2>
              
              <Tabs defaultValue="my-reviews" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="my-reviews">我的评审记录</TabsTrigger>
                  <TabsTrigger value="community-reviews">我的社群评审记录</TabsTrigger>
                </TabsList>

                <TabsContent value="my-reviews">
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>内容</TableHead>
                          <TableHead>平台</TableHead>
                          <TableHead>社群</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead>日期</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myReviewRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{record.content}</TableCell>
                            <TableCell>{record.platform}</TableCell>
                            <TableCell>{record.community}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  record.status === "已处理"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {record.status}
                              </span>
                            </TableCell>
                            <TableCell>{record.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="community-reviews">
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>内容</TableHead>
                          <TableHead>平台</TableHead>
                          <TableHead>评审人</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead>日期</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {communityReviewRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{record.content}</TableCell>
                            <TableCell>{record.platform}</TableCell>
                            <TableCell>{record.reviewer}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  record.status === "已处理"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {record.status}
                              </span>
                            </TableCell>
                            <TableCell>{record.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
