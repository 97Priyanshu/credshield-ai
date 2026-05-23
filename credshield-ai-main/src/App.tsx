import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage'; 
import { Loader2 } from 'lucide-react';
import { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 🚨 ALWAYS start with the Landing Page visible
  const [showLanding, setShowLanding] = useState(true); 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF6B35]" />
      </div>
    );
  }

  // 1. If showLanding is true, ALWAYS show the Landing Page first
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  // 2. Once they click "Start," show Dashboard (if logged in) or Login
  return session ? <Dashboard /> : <LoginPage />;
}

export default App;