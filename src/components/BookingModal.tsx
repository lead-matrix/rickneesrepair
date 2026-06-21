import React, { useEffect } from 'react';
import { LeadForm } from './LeadForm';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  applianceType?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-3xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Lead Form */}
        <div className="p-1">
          <LeadForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};
export default BookingModal;
