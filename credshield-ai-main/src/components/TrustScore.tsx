import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TrustScoreProps {
  score?: number;
}

export default function TrustScore({ score = 0 }: TrustScoreProps) {
  const percentage = (score / 100) * 282.7; // Circumference = 2 * PI * 45

  return (
    <div className="bg-muted-bg rounded-2xl p-6 border border-brand/10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-brand">Overall Trust Score</h3>
        <div className="bg-green-100/80 backdrop-blur px-3 py-1 rounded-lg flex items-center gap-2 border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-700">
            {score >= 80 ? 'Authentic' : 'Flagged'}
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-4">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              className="text-brand/5"
            />
            <motion.circle
              initial={{ strokeDashoffset: 282.7 }}
              animate={{ strokeDashoffset: 282.7 - percentage }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="282.7"
              strokeLinecap="round"
              className={score >= 80 ? "text-green-500" : "text-red-500"}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-brand">{score}<span className="text-lg">%</span></span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-green-700 bg-green-50 py-3 px-4 rounded-xl border border-green-100">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-semibold text-sm">QR Signature Validated</span>
      </div>
    </div>
  );
}