import React from 'react';
import { Download, CheckCircle2, AlertTriangle, Info, FileImage } from 'lucide-react';
import { motion } from 'motion/react';

export default function ForensicAnalysis() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand/10 pb-6">
        <h1 className="text-3xl font-bold text-brand">Forensic Analysis: CS-2023-8942</h1>
        <button className="flex items-center gap-2 px-4 py-2 border border-brand/20 rounded-xl font-bold text-sm text-brand hover:bg-muted-bg transition-colors">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-brand/10 rounded-2xl p-2 shadow-sm relative overflow-hidden group">
            <div className="relative aspect-[1.32] bg-muted-bg/30 rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0uj92O_a81HOUMqMz5_kApHyzv4if9BNgGbxwEE_KQmV88wVYAVEe07vTRwo2E8XvqxEzuRko5xkqvUCXyJLjNVOasBbVl9sglNwGmDUr3Suk53G5sT5xtLXkTNJCOjUlCt8gA-f9ZyGO-lJUGZfmMDiL6ewIGUpVSCJY8yqrQ84O07SKzZeRxAiXnnbOfKfZIagyh3BNcAc_BgXJEbs_vsP924TIUt0QKRRMj_YfJm2FPd5ePBJS-PMK9nxkfR6zqpL5O3lCElR7xs" 
                alt="Forensic ELA Scan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-red-500/10 mix-blend-multiply pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-brand/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                ELA Heatmap Active
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-muted-bg/50 p-1 rounded-xl inline-flex gap-1 border border-brand/5 shadow-inner">
              <button className="px-5 py-2 rounded-lg text-xs font-bold text-muted hover:text-brand transition-colors">Original Image</button>
              <button className="px-5 py-2 rounded-lg text-xs font-bold bg-white text-accent shadow-sm border border-brand/10">ELA Heatmap</button>
              <button className="px-5 py-2 rounded-lg text-xs font-bold text-muted hover:text-brand transition-colors">Metadata Map</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-[4/3] rounded-xl border border-brand/10 overflow-hidden bg-white shadow-sm ring-1 ring-brand/5 group cursor-zoom-in">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0ujv_APO-T4bhUiRSVB2H0XgbzXt_YmCiBk0bpFsRwEuBE9oomUW3AvtDlI1VLb3Imkl1hycNs-RfEaBvXZPNVIr0dTFkcBg5QBAHlb4437ErfG1WQ5KSRrT9ZsXJ_GVp13YB_xCanXdVvNAPPV8pR2COBOG9h4EqABXkSBq0K6g4XRA0pzFPQgtAsM6Ds5rmQEECg4clfkgKAdsLsltzOmcIJO_w5l_luQZ2pe9LRRCqy6Jzit40X7PAn8ovN7l50AQYZUhwy9t7w" 
                alt="Detail Crop 1"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl border border-brand/10 overflow-hidden bg-white shadow-sm ring-1 ring-brand/5 group cursor-zoom-in">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0uh8KcX1O5-Cv99lNECFtf-1ZJNt8kMU2dlRsKVMbSpggqAovGvd4_PvTcgGS79Mop_goPFrHI7UbqoWDJ4y5qqEj--xRXRTZolrxrtl7mgda2IM8fsgibV-8FZI0n1vUufeCt31CpzYpDsU34yskVxmJy4E2A6kLswu2zSUJQ4gZGT7BHGt3jf7aTwIv0Ztt4OeSaZor_yE6Z75QAvwpE8vvUjfpMFDRDpDIOmx4rczoa7wBxDOehLrB0o-J0GrxokQxVPAkmFgzmE" 
                alt="Detail Crop 2"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Inspector Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold text-brand">Inspector Diagnostics</h2>
          
          <div className="space-y-4">
            <DiagnosticCard 
              title="Cryptographic Hash"
              status="success"
              message="SHA-256 Match"
              icon={<CheckCircle2 className="w-5 h-5" />}
            />
            
            <DiagnosticCard 
              title="Error Level Analysis (ELA)"
              status="error"
              message="Anomalous compression detected in the 'Grades' region."
              icon={<AlertTriangle className="w-5 h-5" />}
            />

            <DiagnosticCard 
              title="Font Consistency"
              status="success"
              message="Uniform typography detected."
              icon={<CheckCircle2 className="w-5 h-5" />}
            />

            <div className="bg-white border border-brand/10 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-brand">Metadata</span>
                <Info className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-sm font-bold text-red-600">Software: Adobe Photoshop 2023</p>
              
              <div className="pt-4 border-t border-brand/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-muted uppercase tracking-wider">Date Modified</span>
                  <span className="font-bold text-brand">2023-10-24 14:32</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-muted uppercase tracking-wider">Color Space</span>
                  <span className="font-bold text-brand">sRGB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagnosticCard({ title, status, message, icon }: { title: string, status: 'success' | 'error', message: string, icon: React.ReactNode }) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border space-y-2 transition-all hover:translate-x-1 ${
      status === 'success' 
        ? 'bg-white border-brand/10' 
        : 'bg-red-50/50 border-red-100'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-brand">{title}</span>
        <div className={status === 'success' ? 'text-green-500' : 'text-red-500'}>
          {icon}
        </div>
      </div>
      <p className={`text-sm font-semibold ${status === 'success' ? 'text-muted' : 'text-red-600/80'}`}>
        {message}
      </p>
    </div>
  );
}
