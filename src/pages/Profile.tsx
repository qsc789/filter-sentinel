import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, LogOut, Mail, Key } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      if (data) setUsername(data.username || "");
    } catch (error: any) {
      toast({
        title: "获取个人信息失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "更新成功",
        description: "个人信息已更新",
      });
    } catch (error: any) {
      toast({
        title: "更新失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "退出失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] to-[#F1F0FB] dark:from-[#1A1F2C] dark:to-[#221F26] flex items-center justify-center">
        加载中...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5DEFF] to-[#F1F0FB] dark:from-[#1A1F2C] dark:to-[#221F26] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 bg-white/90 dark:bg-black/40 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7E69AB] to-[#9b87f5]">
              个人中心
            </h1>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="hover:bg-[#7E69AB]/10"
            >
              返回首页
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-[#F1F0FB] dark:bg-white/5 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-[#7E69AB]/20 flex items-center justify-center">
                <User className="w-8 h-8 text-[#7E69AB]" />
              </div>
              <div>
                <h2 className="font-medium">{username || "未设置用户名"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  用户名
                </label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="设置用户名"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  邮箱
                </label>
                <Input
                  value={user?.email}
                  disabled
                  className="bg-gray-50 dark:bg-black/20"
                />
              </div>

              <Button 
                onClick={updateProfile}
                className="w-full bg-[#7E69AB] hover:bg-[#6E59A5]"
              >
                保存修改
              </Button>
            </div>

            <div className="pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;