import { Search, ChevronDown, CheckCircle2, AlertTriangle, Clock, ExternalLink, Loader2, DatabaseZap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export interface VerificationRecord {
  id: string;
  candidateName: string;
  uploadDate: string;
  trustScore: number | null;
  status: 'Authentic' | 'Flagged' | 'Pending';
}

interface Props {
  onLoadRecord: (id: string) => void;
}

export default function VerificationHistory({ onLoadRecord }: Props) {
  
  const [realRecords, setRealRecords] = useState<VerificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/records/all", {
          headers: {
            'Authorization': `Bearer dummy_token_123` 
          }
        });
        
        if (!response.ok) throw new Error("Failed to fetch history");
        
        const data = await response.json();
        setRealRecords(data); 
        
      } catch (error) {
        console.error("Error loading verification history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Preserved right-click functionality
  const handleRightClick = (e: React.MouseEvent, recordId: string) => {
    e.preventDefault();
    onLoadRecord(recordId); 
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold text-brand">Verification History</h2>
            <p className="text-sm text-muted mt-1">Click or right-click any record to view its full forensic analysis.</p>
        </div>
        
        <div className="relative flex-1 sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by ID or Name..." 
            className="w-full pl-10 pr-4 py-2 border border-brand/10 rounded-xl bg-white focus:outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand/10 overflow-hidden shadow-sm min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-72 gap-3 text-muted">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <p className="font-semibold text-lg">Loading database records...</p>
          </div>
        ) : realRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-72 gap-3 text-muted">
            <DatabaseZap className="w-12 h-12 text-brand/30" />
            <p className="font-semibold text-lg">No past verifications found.</p>
            <p className="text-sm">Processed documents will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted-bg/50 border-b border-brand/5">
                  <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Document ID</th>
                  <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Candidate Name</th>
                  <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Upload Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider">Trust Score</th>
                  <th className="py-4 px-6 text-xs font-bold text-muted uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand/5">
                {realRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    onClick={() => onLoadRecord(record.id)} // NEW: Standard Left Click
                    onContextMenu={(e) => handleRightClick(e, record.id)} // Original Right Click
                    title="Click to view forensics"
                    className="hover:bg-brand/5 hover:shadow-sm transition-all group cursor-pointer"
                  >
                    <td className="py-4 px-6 text-sm font-bold text-brand flex items-center gap-2">
                      {record.id.split("-")[0].toUpperCase()}
                      <ExternalLink className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-brand">{record.candidateName}</td>
                    <td className="py-4 px-6 text-sm font-medium text-muted">{record.uploadDate}</td>
                    <td className="py-4 px-6">
                      {record.trustScore !== null ? (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-brand">{record.trustScore.toFixed(1)}%</span>
                          <div className="w-24 h-1.5 bg-muted-bg rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${record.trustScore}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                record.trustScore > 80 ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-muted/40">--</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <StatusBadge status={record.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: VerificationRecord['status'] }) {
  const styles = {
    Authentic: 'bg-green-50 text-green-700 border-green-200',
    Flagged: 'bg-red-50 text-red-700 border-red-200',
    Pending: 'bg-muted-bg text-muted border-brand/10',
  };
  const Icons = { Authentic: CheckCircle2, Flagged: AlertTriangle, Pending: Clock };
  const Icon = Icons[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}