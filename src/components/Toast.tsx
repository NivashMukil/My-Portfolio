import { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] glass-card-strong rounded-2xl px-5 py-4 border max-w-sm flex items-center gap-3 shadow-2xl"
      style={{
        borderColor: type === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(251,113,133,0.3)',
        boxShadow: type === 'success' ? '0 0 30px rgba(52,211,153,0.15)' : '0 0 30px rgba(251,113,133,0.15)',
        animation: 'slideInRight 0.3s ease-out both',
      }}
    >
      {type === 'success'
        ? <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        : <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
      }
      <p className="text-sm text-slate-200 flex-1 leading-snug">{message}</p>
      <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
