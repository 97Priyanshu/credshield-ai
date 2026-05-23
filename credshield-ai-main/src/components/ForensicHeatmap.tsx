import { Scan, AlertCircle, ShieldCheck, FileText, CheckCircle2, Image as ImageIcon, Binary } from 'lucide-react';
import { useState } from 'react';

interface Props {
  heatmapData?: string;
  aiSummary?: string;
  diagnostics?: {
    ela_warning: boolean;
    metadata_warning: boolean;
    software_used: string;
    color_space: string;
  };
}

export default function ForensicHeatmap({ heatmapData, aiSummary, diagnostics }: Props) {
  // NEW: State to track which tab is active
  const [activeTab, setActiveTab] = useState<'ela' | 'metadata'>('ela');

  return (
    <div className="bg-white rounded-2xl border border-brand/10 p-6 flex flex-col lg:flex-row gap-6 shadow-sm">
      
      {/* LEFT SIDE: Heatmap & AI Summary */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-brand text-lg flex items-center gap-2">
              <Scan className="w-5 h-5 text-accent" />
              Forensic Visualizer
            </h3>
            <p className="text-xs text-muted mt-1">Deep pixel inspection and metadata footprinting.</p>
          </div>
        </div>

        {/* NEW: Clickable Tabs */}
        <div className="flex gap-2 bg-muted-bg p-1 rounded-lg w-fit">
          <button 
            onClick={() => setActiveTab('ela')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'ela' ? 'bg-white shadow-sm text-brand' : 'text-muted hover:text-brand'}`}
          >
            <Scan className="w-3.5 h-3.5" /> ELA Heatmap
          </button>
          <button 
            onClick={() => setActiveTab('metadata')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'metadata' ? 'bg-white shadow-sm text-brand' : 'text-muted hover:text-brand'}`}
          >
            <Binary className="w-3.5 h-3.5" /> Metadata Scan
          </button>
        </div>

        {/* IMAGE VIEWER */}
        <div className="bg-black rounded-xl overflow-hidden relative flex items-center justify-center border-2 border-brand/5 min-h-[250px]">
          {heatmapData ? (
            <>
              {activeTab === 'ela' && (
                <>
                  <img src={heatmapData} alt="Forensic ELA Heatmap" className="object-contain w-full h-full max-h-[300px]" />
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                     <div className="w-full h-1 bg-accent/40 shadow-[0_0_15px_rgba(var(--accent),0.5)] absolute top-0 left-0 animate-[scan_3s_ease-in-out_infinite]" />
                  </div>
                </>
              )}
              {activeTab === 'metadata' && (
                <div className="text-green-500 font-mono text-sm p-6 w-full h-full flex flex-col items-start justify-center gap-2">
                   <p>{`> ENGINES: OK`}</p>
                   <p>{`> EXTRACTING EXIF HEADERS...`}</p>
                   <p>{`> SOFTWARE FLAG: ${diagnostics?.software_used}`}</p>
                   <p>{`> COLOR SPACE: ${diagnostics?.color_space}`}</p>
                   <p>{`> MANIPULATION RISK: ${diagnostics?.metadata_warning ? 'HIGH' : 'LOW'}`}</p>
                </div>
              )}
            </>
          ) : (
             <p className="text-white/40 text-sm tracking-widest uppercase">Awaiting Data</p>
          )}
        </div>

        {/* AI SUMMARY BOX */}
        {aiSummary && (
          <div className={`mt-2 p-4 rounded-xl border ${diagnostics?.ela_warning || diagnostics?.metadata_warning ? 'bg-red-50 border-red-100 text-red-900' : 'bg-green-50 border-green-100 text-green-900'}`}>
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> AI Explainer
            </h4>
            <p className="text-sm leading-relaxed">{aiSummary}</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Inspector Diagnostics */}
      <div className="w-full lg:w-72 flex flex-col gap-3">
        <h3 className="font-bold text-brand text-base mb-1">Inspector Diagnostics</h3>
        
        {/* ELA Check */}
        <div className={`p-3 rounded-lg border ${diagnostics?.ela_warning ? 'bg-red-50/50 border-red-200' : 'bg-white border-brand/10'}`}>
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold text-brand">Error Level Analysis</span>
            {diagnostics?.ela_warning ? <AlertCircle className="w-4 h-4 text-red-500" /> : <ShieldCheck className="w-4 h-4 text-green-500" />}
          </div>
          <p className={`text-[11px] ${diagnostics?.ela_warning ? 'text-red-600' : 'text-muted'}`}>
            {diagnostics?.ela_warning ? "Anomalous compression detected. Likely text overlay." : "Uniform pixel variance detected."}
          </p>
        </div>

        {/* Metadata Check */}
        <div className={`p-3 rounded-lg border ${diagnostics?.metadata_warning ? 'bg-red-50/50 border-red-200' : 'bg-white border-brand/10'}`}>
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold text-brand">Metadata & EXIF</span>
            {diagnostics?.metadata_warning ? <AlertCircle className="w-4 h-4 text-red-500" /> : <ShieldCheck className="w-4 h-4 text-green-500" />}
          </div>
          <p className={`text-[11px] mb-2 ${diagnostics?.metadata_warning ? 'text-red-600' : 'text-muted'}`}>
            {diagnostics?.metadata_warning ? "Suspicious modification footprint." : "Metadata appears intact."}
          </p>
          <div className="flex justify-between text-[10px] font-mono text-muted uppercase tracking-wider">
            <span>Software</span>
            <span className="text-brand truncate max-w-[100px] text-right" title={diagnostics?.software_used || "N/A"}>
              {diagnostics?.software_used || "N/A"}
            </span>
          </div>
        </div>

        {/* Generic Checks */}
        <div className="p-3 rounded-lg border bg-white border-brand/10">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold text-brand">Color Space</span>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-[11px] text-muted font-mono">{diagnostics?.color_space || "RGB"}</p>
        </div>

      </div>

      <style>{`@keyframes scan { 0% { top: -10%; } 50% { top: 110%; } 100% { top: -10%; } }`}</style>
    </div>
  );
}