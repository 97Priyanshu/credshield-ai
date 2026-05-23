import { FileText } from 'lucide-react';

interface Props {
  metadata?: {
    name: string;
    roll_number: string;
    university: string;
    issue_date: string;
    degree: string;
  };
}

export default function MetadataTable({ metadata }: Props) {
  // SAFETY NET: Prevent crash if data is missing
  if (!metadata) {
    return (
      <div className="bg-muted-bg rounded-2xl p-6 border border-brand/10 h-full flex items-center justify-center">
        <p className="text-muted font-medium">Processing metadata...</p>
      </div>
    );
  }

  const displayData = [
    { label: 'Name', value: metadata.name },
    { label: 'Roll Number', value: metadata.roll_number },
    { label: 'University', value: metadata.university },
    { label: 'Issue Date', value: metadata.issue_date },
    { label: 'Degree', value: metadata.degree },
  ];

  return (
    <div className="bg-muted-bg rounded-2xl p-6 border border-brand/10 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-brand">Extracted Metadata</h3>
        <button className="text-brand hover:text-accent transition-colors">
          <FileText className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-0.5">
        {displayData.map((item, idx) => (
          <div 
            key={item.label}
            className={`flex items-center justify-between py-4 ${
              idx !== displayData.length - 1 ? 'border-b border-brand/5' : ''
            }`}
          >
            <span className="text-sm font-medium text-muted">{item.label}</span>
            <span className="text-base font-semibold text-brand text-right">{item.value || '--'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}