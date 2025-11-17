// src/components/SuccessToast.tsx
import { useEffect } from 'react';

interface SuccessToastProps {
  message: string;
  onClose: () => void;
}

export default function SuccessToast({ message, onClose }: SuccessToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom">
      <i className="fas fa-check-circle text-2xl"></i>
      <span className="font-semibold">{message}</span>
    </div>
  );
}