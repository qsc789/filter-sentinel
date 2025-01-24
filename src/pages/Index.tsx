import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Waves, Users, Database } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string[]>(["暴力", "威胁", "攻击"]);
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [monitoringStatus, setMonitoringStatus] = useState({
    tieba: false,
    weibo: false,
    tiktok: false
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <img 
              src="/lovable-uploads/8ddbcdba-1c9f-4b81-abf7-ed484ff6c63a.png" 
              alt="语方舟" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">语方舟</h1>
          <p className="text-secondary">专业的社群言论安全监控平台</p>
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
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">平台监控</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(monitoringStatus).map(([platform, status]) => (
                  <div key={platform} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium capitalize">{platform}</h3>
                      <Button
                        variant={status ? "destructive" : "default"}
                        onClick={() => toggleMonitoring(platform as keyof typeof monitoringStatus)}
                      >
                        {status ? "停止监控" : "开始监控"}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      状态: {status ? "监控中" : "未监控"}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
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
                  />
                  <Button onClick={addCustomKeyword}>添加</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">系统关键词</h3>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">自定义关键词</h3>
                    <div className="flex flex-wrap gap-2">
                      {customKeywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1 bg-secondary/10 text-secondary rounded-full"
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
              <h2 className="text-2xl font-semibold mb-4">AI情感分析</h2>
              <p className="text-secondary">
                即将推出: AI驱动的情感分析功能，可以识别隐含的负面情绪和潜在威胁。
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">用户评审系统</h2>
              <p className="text-secondary">
                即将推出: 优质用户参与的内容评审机制，提供更准确的边缘案例判断。
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;