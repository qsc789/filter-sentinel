import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User, Settings, ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/');
        return;
      }

      let { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const updates = {
        id: user.id,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      
      toast({
        title: "个人资料已更新",
        description: "您的个人资料已成功保存。",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "更新失败",
        description: "无法更新个人资料，请稍后重试。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] dark:bg-gradient-to-br dark:from-[#1A1F2C] dark:to-[#221F26] p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>

        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="w-6 h-6 text-[#7E69AB]" />
              个人中心
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback>
                  {username?.charAt(0).toUpperCase() || '用户'}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline"
                className="text-sm"
                onClick={() => {
                  toast({
                    title: "功能开发中",
                    description: "头像上传功能即将推出",
                  });
                }}
              >
                更换头像
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">用户名</label>
                <Input
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                />
              </div>

              <Button 
                className="w-full bg-[#7E69AB] hover:bg-[#6E59A5]"
                onClick={updateProfile}
              >
                保存修改
              </Button>
            </div>

            <div className="pt-6 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/');
                  toast({
                    title: "已退出登录",
                    description: "您已成功退出登录。",
                  });
                }}
              >
                退出登录
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;