import React, { useState, useEffect } from 'react';
import { Sparkles, X, Clock, Tag } from 'lucide-react';

interface ExitIntentPopupProps {
  onBookClick: () => void;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onBookClick }) => {
  const [show, setShow] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Exit intent detection
  useEffect(() => {
    // Check if user has already seen or dismissed this session
    const shownBefore = sessionStorage.getItem('ricknees_exit_intent_shown');
    if (shownBefore) {
      setHasDismissed(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves the top of the viewport
      if (e.clientY < 20 && !hasDismissed) {
        setShow(true);
        sessionStorage.setItem('ricknees_exit_intent_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasDismissed]);

  // Countdown timer for urgency
  useEffect(() => {
    if (!show || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [show, timeLeft]);

  if (!show) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleClose = () => {
    setShow(false);
    setHasDismissed(true);
  };

  const handleRedeem = () => {
    setShow(false);
    setHasDismissed(true);
    onBookClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Accent Red top bar */}
        <div className="h-2 bg-accent" />
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 rotate-90" />
          </div>

          <span className="bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-primary/10">
            Wait! Before You Go
          </span>

          <h3 className="text-3xl font-extrabold font-heading text-primary uppercase tracking-wider mt-3">
            Get $25 OFF
          </h3>
          <p className="text-sm font-semibold text-slate-800 mt-1">Your First Appliance Repair Service</p>
          
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
            Don't pay full price. Schedule your diagnostic visit today and we will apply a <span className="font-bold text-accent">$25 discount</span> directly to your repair invoice.
          </p>

          {/* Coupon Code Box */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 my-5 relative">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Use Coupon Code</div>
            <div className="text-2xl font-black font-heading text-primary tracking-widest mt-1">WICHITA25</div>
            
            {/* Timer Banner */}
            <div className="flex items-center justify-center gap-1.5 text-accent font-semibold text-[11px] mt-2.5">
              <Clock className="w-3.5 h-3.5 stroke-[2.5] animate-pulse" />
              <span>Offer expires in: <span className="font-mono bg-accent/10 px-1.5 py-0.5 rounded">{formatTime(timeLeft)}</span></span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleRedeem}
              className="w-full bg-accent hover:bg-accent-dark text-white font-heading text-base font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-white" /> Claim My $25 Discount
            </button>
            
            <button
              onClick={handleClose}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 py-1 transition cursor-pointer"
            >
              No thanks, I'd rather pay full price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExitIntentPopup;
