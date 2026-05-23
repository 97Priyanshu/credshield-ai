import { CloudDownload, UploadCloud, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  onUploadStart: () => void;
  onUploadComplete: (data: any) => void;
  isProcessing: boolean;
}

export default function VerificationGateway({ onUploadStart, onUploadComplete, isProcessing }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isBatchMode, setIsBatchMode] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    onUploadStart();

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      alert("Session expired. Please log in again.");
      onUploadComplete(null);
      return;
    }

    if (isBatchMode && files.length > 1) {
      const hostname = window.location.hostname;
      const ws = new WebSocket(`ws://${hostname}:8000/api/v1/verify/batch-stream`);
      
      ws.onopen = async () => {
        for (let i = 0; i < files.length; i++) {
          const arrayBuffer = await files[i].arrayBuffer();
          ws.send(arrayBuffer);
        }
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === "success") onUploadComplete(data);
      };
    } else {
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/verify/single", {
          method: "POST",
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });

        if (!response.ok) throw new Error("Unauthorized");
        const data = await response.json();
        onUploadComplete(data);
      } catch (error) {
        console.error("Upload Error:", error);
        onUploadComplete(null); 
      }
    }
  };

  const handleDigilocker = async () => {
    onUploadStart();
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/integration/digilocker?uri=mock_uri`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${session?.access_token}` }
      });
      const data = await response.json();
      onUploadComplete(data);
    } catch (e) {
      onUploadComplete(null);
    }
  };

  return (
    <section className="bg-muted-bg rounded-2xl p-8 border border-brand/10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold text-brand leading-tight">Verification Gateway</h1>
        <p className="text-muted max-w-md">Securely upload documents for AI-powered forensic analysis.</p>
        <button 
          onClick={handleDigilocker}
          className="bg-accent text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 hover:brightness-110 transition-all shadow-sm disabled:opacity-50" 
          disabled={isProcessing}
        >
          <CloudDownload className="w-5 h-5" />
          Fetch from DigiLocker
        </button>
      </div>

      <div className="flex-1 w-full max-w-md">
        <input 
          type="file" 
          multiple={isBatchMode} 
          accept=".pdf,.jpg,.png" 
          onChange={handleFileUpload} 
          className="hidden" 
          ref={fileInputRef}
        />
        <motion.div 
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-brand/20 rounded-2xl p-8 flex flex-col items-center justify-center bg-white text-center cursor-pointer ${isProcessing ? 'opacity-50' : ''}`}
        >
          {isProcessing ? <Loader2 className="animate-spin text-accent" /> : <UploadCloud className="text-brand" />}
          <p className="font-semibold text-brand mt-4">{isBatchMode ? "Select multiple files" : "Click to upload file"}</p>
        </motion.div>
      </div>
    </section>
  );
}