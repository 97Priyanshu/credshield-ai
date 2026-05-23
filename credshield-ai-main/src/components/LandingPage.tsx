import React from 'react';
import { Shield, Menu, Landmark, BarChart4, CheckSquare, Scan, Binary } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="bg-muted-bg text-brand font-sans antialiased selection:bg-accent selection:text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 border-b border-brand/10 backdrop-blur-xl bg-white/90">
        <div className="flex items-center gap-2">
          <Shield className="text-accent w-6 h-6" fill="currentColor" />
          <span className="font-bold text-xl text-brand">CredShield AI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm font-semibold text-muted hover:text-brand transition-colors" href="#features">Features</a>
          <a className="text-sm font-semibold text-muted hover:text-brand transition-colors" href="#pricing">Pricing</a>
          <a className="text-sm font-semibold text-muted hover:text-brand transition-colors" href="#api">API</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onStart}
            className="hidden md:inline-flex items-center justify-center bg-accent text-white font-bold text-sm rounded-lg px-4 py-2.5 hover:brightness-110 transition-all shadow-sm"
          >
            Get Started
          </button>
          <button className="md:hidden p-2 text-brand">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-24">
        <section className="px-6 py-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-brand max-w-4xl tracking-tight leading-tight"
          >
            Instantly Verify Academic Credentials with AI.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted mt-6 max-w-2xl"
          >
            Stop credential fraud with digital forensics and DigiLocker integration. Build a secure, compliant hiring process without the manual overhead.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <button 
              onClick={onStart}
              className="inline-flex items-center justify-center bg-accent text-white font-bold text-base rounded-xl px-8 py-4 shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              Start Verifying Now
            </button>
          </motion.div>

          {/* Code-Based Animated Hero Graphic */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 w-full max-w-5xl rounded-2xl border border-brand/10 bg-white shadow-2xl overflow-hidden relative group cursor-pointer"
            onClick={onStart}
          >
            <div className="h-10 bg-muted-bg border-b border-brand/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-brand/10"></div>
              <div className="w-3 h-3 rounded-full bg-brand/10"></div>
              <div className="w-3 h-3 rounded-full bg-brand/10"></div>
            </div>
            
            {/* Live Forensic Scanner Animation Container */}
            <div className="aspect-[16/9] w-full bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              {/* Pulsing Core */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
              />

              {/* Scanning UI Elements */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <Shield className="w-24 h-24 text-brand/20 absolute inset-0" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Scan className="w-24 h-24 text-accent" />
                  </motion.div>
                </div>
                
                <div className="mt-8 flex flex-col items-center gap-2">
                  <div className="text-white/80 font-mono text-sm tracking-[0.2em] uppercase flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--accent),0.8)]" />
                    System Active
                  </div>
                  <div className="flex items-center gap-4 text-white/40 font-mono text-xs mt-2">
                    <span className="flex items-center gap-1"><Binary className="w-3 h-3" /> ELA SCANNING</span>
                    <span className="flex items-center gap-1"><CheckSquare className="w-3 h-3" /> EXIF VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Sweeping Laser Line */}
              <motion.div
                animate={{ top: ['-10%', '110%', '-10%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_20px_rgba(var(--accent),1)] z-20"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30 backdrop-blur-sm">
                 <span className="bg-white text-brand px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl">
                    Enter Command Center
                 </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 bg-white mt-12 border-t border-brand/5" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-brand">Powerful Forensic Capabilities</h2>
              <p className="text-muted mt-4">Everything you need to ensure credential authenticity at scale.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Landmark className="w-6 h-6" />}
                title="Gov API Integration"
                description="Highlighting seamless DigiLocker connectivity for instant, official verification directly from government databases."
              />
              <FeatureCard 
                icon={<BarChart4 className="w-6 h-6" />}
                title="Explainable AI Forensics"
                description="Showcasing ELA heatmaps and pixel-level analysis to detect even the most sophisticated document alterations."
              />
              <FeatureCard 
                icon={<CheckSquare className="w-6 h-6" />}
                title="Batch Processing"
                description="Mentioning support for up to 50 files simultaneously, streamlining workflows for high-volume hiring events."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="text-accent w-6 h-6" fill="currentColor" />
            <span className="font-bold text-xl">CredShield AI</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-sm font-medium text-white/60 hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="text-sm font-medium text-white/60 hover:text-white transition-colors" href="#">Terms of Service</a>
            <a className="text-sm font-medium text-white/60 hover:text-white transition-colors" href="#">Contact Support</a>
          </div>
          
          <div className="text-sm font-medium text-white/40">
            © 2026 CredShield AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-muted-bg border border-brand/5 rounded-2xl p-8 transition-shadow hover:shadow-xl hover:shadow-brand/5 flex flex-col items-start group"
    >
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors shadow-sm">
        <div className="text-accent group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-brand mb-3">{title}</h3>
      <p className="text-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}