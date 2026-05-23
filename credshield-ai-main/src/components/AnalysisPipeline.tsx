import { CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LogItem {
  check: string;
  status: string;
}

interface Props {
  logs?: LogItem[];
}

export default function AnalysisPipeline({ logs }: Props) {
  // SAFETY NET: Prevent map crash if logs array is missing
  if (!logs || !Array.isArray(logs)) {
    return (
      <div className="bg-muted-bg rounded-2xl p-6 border border-brand/10 h-full flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
        <p className="text-muted font-medium">Loading pipeline...</p>
      </div>
    );
  }

  return (
    <div className="bg-muted-bg rounded-2xl p-6 border border-brand/10 h-full flex flex-col">
      <h3 className="font-bold text-brand mb-6">Analysis Pipeline</h3>
      
      <div className="flex-1 bg-white rounded-xl p-5 border border-brand/5 overflow-hidden">
        <div className="space-y-6">
          {logs.map((log, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`z-10 bg-white rounded-full ${
                    log.status === 'Done' ? 'text-green-500' : 'text-accent'
                  }`}>
                    {log.status === 'Done' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                  </div>
                  {idx !== logs.length - 1 && (
                    <div className="w-px h-full bg-brand/10 mt-1 absolute left-[9.5px] top-6" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className={`text-sm font-semibold ${
                    log.status === 'Done' ? 'text-brand' : 'text-accent'
                  }`}>
                    {log.check}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted/60">
                      {log.status === 'Done' ? 'Completed' : 'Processing...'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}