import { useState } from 'react';
import { supabase } from '../lib/supabase'; // 🚨 NEW: Import Supabase
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import VerificationGateway from './VerificationGateway';
import TrustScore from './TrustScore';
import MetadataTable from './MetadataTable';
import ForensicHeatmap from './ForensicHeatmap';
import AnalysisPipeline from './AnalysisPipeline';
import VerificationHistory from './VerificationHistory';
import AnalyticsOverview from './AnalyticsOverview';
import ForensicAnalysis from './ForensicAnalysis';
import AccountSettings from './AccountSettings';

export default function Dashboard() {
  const [subView, setSubView] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleUploadStart = () => {
    setIsProcessing(true);
    setVerificationResult(null); 
  };

  const handleUploadComplete = (data: any) => {
    setIsProcessing(false);
    if (data) {
      setVerificationResult(data);
    }
  };

 const loadPastRecord = async (recordId: string) => {
    setIsProcessing(true);
    setSubView('dashboard'); 
    
    const { data: { session } } = await supabase.auth.getSession();
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/records/${recordId}`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}` // 🚨 FIXED
        }
      });
      
      if (!response.ok) throw new Error("Failed to fetch record");
      const data = await response.json();
      setVerificationResult({ status: 'success', ...data });
    } catch (error) {
      alert("Could not load the forensic record.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderContent = () => {
    switch (subView) {
      case 'dashboard':
        return (
          <>
            <VerificationGateway 
              onUploadStart={handleUploadStart} 
              onUploadComplete={handleUploadComplete} 
              isProcessing={isProcessing}
            />

            {verificationResult && verificationResult.status === 'error' && (
              <div className="flex items-center justify-center h-64 mt-8 border-2 border-red-200 bg-red-50 rounded-2xl">
                <p className="text-red-600 font-medium">{verificationResult.message || "Failed to analyze document"}</p>
                <button onClick={() => setVerificationResult(null)} className="ml-4 underline text-red-800">Try Again</button>
              </div>
            )}

            {verificationResult && verificationResult.status === 'success' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="lg:col-span-1 h-full">
                  <TrustScore score={verificationResult.trust_score} />
                </div>
                <div className="lg:col-span-2 h-full">
                  <MetadataTable metadata={verificationResult.metadata || {}} />
                </div>

                <div className="lg:col-span-2 h-full">
                  <ForensicHeatmap 
                    heatmapData={verificationResult.heatmap}
                    aiSummary={verificationResult.ai_summary}
                    diagnostics={verificationResult.diagnostics}
                  />
                </div>
                <div className="lg:col-span-1 h-full">
                  <AnalysisPipeline logs={verificationResult.forensic_logs} />
                </div>
              </div>
            )}

            {!verificationResult && !isProcessing && (
              <div className="flex items-center justify-center h-64 mt-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                <p className="text-muted font-medium text-lg">Upload a document to view forensic analysis.</p>
              </div>
            )}
          </>
        );
      case 'verifications':
        return <VerificationHistory onLoadRecord={loadPastRecord} />;
      case 'analytics':
        return <AnalyticsOverview />;
      case 'forensics':
        return <ForensicAnalysis />;
      case 'settings':
        return <AccountSettings />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted font-bold text-xl uppercase tracking-widest opacity-20">Coming Soon</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar currentView={subView} onViewChange={setSubView} />
      
      <main className="flex-1 ml-64 pt-16">
        <TopNav />
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}