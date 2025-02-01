import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Waves, Users, Database, ChartLine, Activity, TrendingUp, MessageCircle, AlertCircle, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ContentAnalysis } from "@/components/analysis/ContentAnalysis";
import { ScoringRules } from "@/components/scoring/ScoringRules";
import { ScoringHistory } from "@/components/scoring/ScoringHistory";
import { ThemeToggle } from "@/components/theme/theme-toggle";

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
  tieba: "#B7B7EB",    // Light Purple
  weibo: "#9D9EA3",    // Gray
  tiktok: "#EAB883",   // Light Orange
  facebook: "#99BBE1"  // Light Blue
};

const PIE_COLORS = ["#B7B7EB", "#9D9EA3", "#EAB883", "#99BBE1", "#F09BA0"];

const COMMUNITY_KEYWORDS = {
  anime: ["辱华", "人设崩坏", "毒害青少年", "抄袭"],
  cosplay: ["照骗", "滤镜", "假胸", "整容"],
  football: ["黑哨", "假球", "水货", "演员"],
  entertainment: ["塌房", "劣迹", "假唱", "黑料"]
};

const communityWarnings = [
  { community: "动漫圈", count: 15, severity: "high" },
  { community: "Coser圈", count: 8, severity: "medium" },
  { community: "足球圈", count: 12, severity: "high" },
  { community: "娱乐圈", count: 20, severity: "critical" }
];

const myReviewRecords = [
  {
    id: "1",
    content: "这个内容有点问题",
    platform: "微博",
    community: "动漫圈",
    status: "已处理",
    date: "2024-03-15"
  },
  {
    id: "2",
    content: "需要审核的内容",
    platform: "贴吧",
    community: "游戏圈",
    status: "待处理",
    date: "2024-03-14"
  }
];

const communityReviewRecords = [
  {
    id: "1",
    content: "社群举报内容",
    platform: "微博",
    reviewer: "张三",
    status: "已处理",
    date: "2024-03-15"
  },
  {
    id: "2",
    content: "需要社群评审",
    platform: "TikTok",
    reviewer: "李四",
    status: "待处理",
    date: "2024-03-14"
  }
];

const Index = () => {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string[]>(["暴力", "威胁", "攻击"]);
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState<keyof typeof COMMUNITY_KEYWORDS | null>(null);
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

  const selectCommunityKeywords = (community: keyof typeof COMMUNITY_KEYWORDS) => {
    setSelectedCommunity(community);
    setCustomKeywords([...customKeywords, ...COMMUNITY_KEYWORDS[community]]);
    toast({
      title: "已添加社群关键词",
      description: `已添加${community}相关的关键词`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#E5DEFF] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all duration-300 animate-fade-in">
          <div className="absolute top-8 right-8">
            <ThemeToggle />
          </div>
          <div className="w-16 h-16 mb-4 relative">
            <div className="absolute inset-0 bg-[#7E69AB]/20 rounded-full animate-pulse"></div>
            <img 
              src="/lovable-uploads/ef4a095b-c738-4af3-9144-dc5579e8eb92.png" 
              alt="和语方舟" 
              className="w-full h-full object-contain relative z-10 animate-bounce"
            />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] mb-2 hover:scale-105 transition-transform">
            和语方舟
          </h1>
          <p className="text-sm text-[#8E9196] max-w-md animate-fade-in">专业的社群言论安全监控平台</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
          {communityWarnings.map((warning) => (
            <Card 
              key={warning.community}
              className={`p-4 hover:shadow-xl transition-all duration-300 ${
                warning.severity === 'critical' ? 'bg-red-50' :
                warning.severity === 'high' ? 'bg-orange-50' :
                'bg-yellow-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className={`${
                  warning.severity === 'critical' ? 'text-red-500' :
                  warning.severity === 'high' ? 'text-orange-500' :
                  'text-yellow-500'
                }`} />
                <h3 className="font-medium">{warning.community}</h3>
              </div>
              <p className="mt-2 text-2xl font-bold">{warning.count}</p>
              <p className="text-sm text-gray-600">条预警信息</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="monitor" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur p-1 rounded-xl">
            <TabsTrigger value="monitor" className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white">
              <Shield className="w-4 h-4" />
              平台监控
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white">
              <Database className="w-4 h-4" />
              关键词管理
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white">
              <Waves className="w-4 h-4" />
              AI分析
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2 data-[state=active]:bg-[#7E69AB] data-[state=active]:text-white">
              <Users className="w-4 h-4" />
              用户评审
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitor" className="animate-fade-in">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(monitoringStatus).map(([platform, status]) => (
                  <Card 
                    key={platform} 
                    className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-[#E5DEFF]"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F1F0FB] p-2 flex items-center justify-center">
                          <img 
                            src={`/platform-logos/${platform}.svg`} 
                            alt={platform} 
                            className="w-6 h-6"
                          />
                        </div>
                        <h3 className="text-lg font-medium capitalize text-[#403E43]">{platform}</h3>
                      </div>
                      <Button
                        variant={status ? "destructive" : "default"}
                        size="sm"
                        onClick={() => toggleMonitoring(platform as keyof typeof monitoringStatus)}
                        className={`${
                          status 
                            ? "bg-[#DC2626] hover:bg-[#B91C1C]" 
                            : "bg-[#7E69AB] hover:bg-[#6E59A5]"
                        } text-white transition-colors duration-300 text-xs px-3`}
                      >
                        {status ? "停止" : "开始"}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#8E9196]">
                      <Activity className={`w-4 h-4 ${status ? "text-green-500" : "text-gray-400"}`} />
                      <span>状态: {status ? "监控中" : "未监控"}</span>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
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
                        <Line 
                          type="monotone" 
                          dataKey="tieba" 
                          stroke={PLATFORM_COLORS.tieba} 
                          name="贴吧" 
                          strokeWidth={2}
                          dot={{ fill: PLATFORM_COLORS.tieba }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="weibo" 
                          stroke={PLATFORM_COLORS.weibo} 
                          name="微博" 
                          strokeWidth={2}
                          dot={{ fill: PLATFORM_COLORS.weibo }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="tiktok" 
                          stroke={PLATFORM_COLORS.tiktok} 
                          name="TikTok" 
                          strokeWidth={2}
                          dot={{ fill: PLATFORM_COLORS.tiktok }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="facebook" 
                          stroke={PLATFORM_COLORS.facebook} 
                          name="Facebook" 
                          strokeWidth={2}
                          dot={{ fill: PLATFORM_COLORS.facebook }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
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
                            <Cell 
                              key={`cell-${index}`} 
                              fill={PIE_COLORS[index % PIE_COLORS.length]}
                              className="transition-all duration-300 hover:opacity-80"
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="animate-fade-in">
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Database className="w-6 h-6 text-[#7E69AB]" />
                关键词管理
              </h2>
              <div className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="添加新关键词..."
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="bg-white"
                  />
                  <Button 
                    onClick={addCustomKeyword} 
                    className="bg-[#7E69AB] hover:bg-[#6E59A5] transition-colors"
                  >
                    添加
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4 bg-white/80 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#7E69AB]" />
                      社群关键词模板
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(COMMUNITY_KEYWORDS).map(([community, keywords]) => (
                        <Button
                          key={community}
                          variant="outline"
                          onClick={() => selectCommunityKeywords(community as keyof typeof COMMUNITY_KEYWORDS)}
                          className={`text-sm ${
                            selectedCommunity === community ? 'border-[#7E69AB] bg-[#7E69AB]/10' : ''
                          } hover:bg-[#7E69AB]/5 transition-colors`}
                        >
                          {community === "anime" && "动漫圈"}
                          {community === "cosplay" && "Coser圈"}
                          {community === "football" && "足球圈"}
                          {community === "entertainment" && "娱乐圈"}
                        </Button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4 bg-white/80 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#7E69AB]" />
                      已添加关键词
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {customKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-[#F1F0FB] text-[#7E69AB] rounded-full text-sm animate-fade-in hover:bg-[#7E69AB] hover:text-white transition-colors cursor-default"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </Card>
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
                          <Accordion type="single" collapsible key={record.id}>
                            <AccordionItem value={record.id}>
                              <TableRow className="cursor-pointer hover:bg-gray-50">
                                <TableCell>
                                  <AccordionTrigger className="hover:no-underline">
                                    {record.content}
                                  </AccordionTrigger>
                                </TableCell>
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
                              <AccordionContent>
                                <div className="p-4 bg-gray-50">
                                  <h4 className="font-medium mb-2">详细信息</h4>
                                  <p className="text-sm text-gray-600">
                                    这里可以显示更多关于该评审记录的详细信息，
                                    包括评审过程、处理方式等。
                                  </p>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
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
                          <Accordion type="single" collapsible key={record.id}>
                            <AccordionItem value={record.id}>
                              <TableRow className="cursor-pointer hover:bg-gray-50">
                                <TableCell>
                                  <AccordionTrigger className="hover:no-underline">
                                    {record.content}
                                  </AccordionTrigger>
                                </TableCell>
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
                              <AccordionContent>
                                <div className="p-4 bg-gray-50">
                                  <h4 className="font-medium mb-2">详细信息</h4>
                                  <p className="text-sm text-gray-600">
                                    这里可以显示更多关于该社群评审记录的详细信息，
                                    包括评审进度、处理意见等。
                                  </p>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
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
