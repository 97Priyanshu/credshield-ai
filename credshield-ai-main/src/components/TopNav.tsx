import { Shield, ChevronDown } from 'lucide-react';

export default function TopNav() {
  return (
    <nav className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-brand/10 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-brand" />
        <span className="font-bold text-brand">Credshield AI</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 hover:bg-muted-bg p-1.5 rounded-lg transition-colors group">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-brand">Priyanshu</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted group-hover:text-brand transition-colors" />
        </button>
      </div>
    </nav>
  );
}
