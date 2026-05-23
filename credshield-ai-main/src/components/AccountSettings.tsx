import React, { useState } from 'react';
import { 
  Key, 
  Eye, 
  Copy, 
  Building2, 
  Webhook, 
  Plus, 
  User, 
  Users, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

const subNavItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'api', label: 'API & Webhooks', icon: Key },
  { id: 'team', label: 'Team Members', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState('api');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-brand/10 pb-6">
        <h1 className="text-3xl font-bold text-brand">Account Settings</h1>
        <p className="text-muted mt-2">Manage your integrations, security, and team access.</p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Inner Sub-Navigation */}
        <aside className="lg:col-span-3">
          <nav className="flex flex-col gap-1">
            {subNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                  activeTab === item.id 
                    ? 'bg-muted-bg text-brand shadow-sm' 
                    : 'text-muted hover:bg-muted-bg/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'api' ? (
            <>
              {/* API Keys Card */}
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-brand/10 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-brand">API Keys</h2>
                    <p className="text-sm text-muted">Use these keys to authenticate API requests from your application.</p>
                  </div>
                  <span className="px-2.5 py-1 bg-muted-bg text-brand text-[10px] uppercase tracking-wider font-extrabold rounded-lg border border-brand/5">
                    Production
                  </span>
                </div>

                <div className="flex items-center justify-between bg-muted-bg/30 p-4 rounded-xl border border-brand/5 group">
                  <code className="text-sm font-mono text-brand font-bold tracking-wider">
                    {apiKeyVisible ? 'sk_live_q8x2kLp9mN4vR7t1Y5z3X6' : 'sk_live_••••••••••••••••••••••••'}
                  </code>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setApiKeyVisible(!apiKeyVisible)}
                      className="p-2 hover:bg-white rounded-lg text-muted hover:text-brand transition-all shadow-sm border border-transparent hover:border-brand/10"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-muted hover:text-brand transition-all shadow-sm border border-transparent hover:border-brand/10">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Government Integrations Card */}
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-brand/10 rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-brand mb-1">Government Integrations</h2>
                <p className="text-sm text-muted mb-6">Configure official data sources for identity verification.</p>
                
                <div className="flex items-center justify-between p-5 border border-brand/10 rounded-2xl bg-muted-bg/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-brand/5">
                      <Building2 className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand">DigiLocker Integration</h3>
                      <p className="text-xs text-muted">Access verified documents directly.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-lg text-[10px] font-bold text-green-700 border border-green-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Connected
                    </div>
                    
                    <button className="w-12 h-6 bg-accent rounded-full relative transition-colors focus:outline-none">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Webhooks Card */}
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-brand/10 rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-brand mb-1">Webhooks</h2>
                <p className="text-sm text-muted mb-6">Receive real-time updates when verification statuses change.</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand ml-1">Endpoint URL</label>
                    <input 
                      type="url" 
                      placeholder="https://api.yourdomain.com/webhooks/credshield"
                      className="w-full px-4 py-3 border border-brand/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-medium bg-muted-bg/20"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-accent text-white font-bold text-sm px-6 py-3 rounded-xl hover:brightness-110 shadow-sm transition-all flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Endpoint
                    </button>
                  </div>
                </div>
              </motion.section>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-muted-bg/20 rounded-2xl border border-dashed border-brand/10">
              <p className="text-muted font-bold text-lg uppercase tracking-widest opacity-30">Tab Content Coming Soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
