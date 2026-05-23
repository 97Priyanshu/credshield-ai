import { 
  Shield, 
  LayoutDashboard, 
  CheckCircle2, 
  BarChart3, 
  Fingerprint, 
  Settings, 
  HelpCircle, 
  LogOut,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase'; // 🚨 NEW: Import Supabase client

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'verifications', icon: CheckCircle2, label: 'Verifications' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'forensics', icon: Fingerprint, label: 'Forensics' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  
  // 🚨 NEW: Handle Sign Out
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-brand/10 flex flex-col z-40">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-brand leading-tight">Command Center</h2>
            <p className="text-xs text-muted">Secure Intelligence</p>
          </div>
        </div>

        <button className="w-full bg-accent text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-8 hover:brightness-110 transition-all shadow-sm">
          <Plus className="w-5 h-5" />
          New Verification
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id 
                  ? 'bg-brand text-white' 
                  : 'text-brand hover:bg-muted-bg'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-brand/10 space-y-1">
        {/* Support Link */}
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand hover:bg-muted-bg transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Support</span>
        </a>

        {/* 🚨 MODIFIED: Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brand hover:bg-red-50 hover:text-red-600 transition-all group"
        >
          <LogOut className="w-5 h-5 text-brand group-hover:text-red-600" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}