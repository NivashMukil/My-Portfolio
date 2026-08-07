import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl glass-card border border-cyan-500/40 shadow-2xl animate-in slide-in-from-bottom duration-300">
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      )}
      <span className="text-xs sm:text-sm font-semibold text-slate-100">
        {message}
      </span>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
