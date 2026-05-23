import { useState } from 'react';
import { supabase } from '../lib/supabase'; // This pulls from your new lib folder
import { Shield, Mail, Lock, Chrome, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    // This will open the Google login popup
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 space-y-8 border border-gray-100">
        <div className="text-center">
          <div className="bg-[#1A1A1A] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">CredShield AI</h1>
          <p className="text-gray-500 text-sm mt-2">Secure Command Center Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type="email" placeholder="Email" required
              className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] rounded-xl outline-none"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type="password" placeholder="Password" required
              className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] rounded-xl outline-none"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-[#1A1A1A] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all">
            {loading ? <Loader2 className="animate-spin mx-auto w-5 h-5" /> : 'Enter System'}
          </button>
        </form>

        <div className="relative flex items-center justify-center py-2">
          <div className="border-t border-gray-100 w-full"></div>
          <span className="bg-white px-4 text-xs font-bold text-gray-400 absolute uppercase tracking-widest">OR</span>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full border border-gray-200 text-[#1A1A1A] font-bold py-3 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
        >
          <Chrome className="w-5 h-5" /> Continue with Google
        </button>
      </div>
    </div>
  );
}