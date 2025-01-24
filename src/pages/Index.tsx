import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Shield, Users, Database } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState<string[]>(["暴力", "威胁", "攻击"]);
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");

  const analyzeContent = () => {
    if (!content) {
      toast({
        title: "请输入内容",
        variant: "destructive",
      });
      return;
    }

    // 简单的关键词检测示例
    const hasKeyword = [...keywords, ...customKeywords].some(keyword => 
      content.includes(keyword)
    );

    if (hasKeyword) {
      toast({
        title: "检测到敏感内容",
        description: "该内容可能包含不当信息",
        variant: "destructive",
      });
    } else {
      toast({
        title: "内容审核通过",
        description: "未检测到敏感内容",
      });
    }
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
        <header className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">内容审核平台</h1>
          <p className="text-secondary">专业的社交媒体内容审核解决方案</p>
        </header>

        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              内容分析
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              关键词管理
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              AI分析
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              用户评审
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">内容分析</h2>
              <div className="space-y-4">
                <textarea
                  className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="请输入需要分析的内容..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button onClick={analyzeContent} className="w-full">
                  开始分析
                </Button>
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