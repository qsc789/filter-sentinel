import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Auth from "@/pages/Auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route
            path="/"
            element={session ? <Index /> : <Navigate to="/auth" />}
          />
          <Route
            path="/profile"
            element={session ? <Profile /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!session ? <Auth /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;