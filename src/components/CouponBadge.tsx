import React from 'react';
import { Tag } from 'lucide-react';

interface CouponBadgeProps {
  onClick: () => void;
}

export const CouponBadge: React.FC<CouponBadgeProps> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="fixed bottom-24 right-6 z-40 hidden md:flex items-center gap-3.5 bg-accent hover:bg-accent-dark text-white rounded-full px-5 py-3 shadow-2xl border border-white/20 cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 group select-none"
    >
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white animate-pulse">
        <Tag className="w-4 h-4 rotate-90" />
      </div>
      <div className="text-left leading-tight">
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">Special Offer</p>
        <p className="text-sm font-extrabold font-heading uppercase tracking-wide">$25 Off First Repair</p>
      </div>
      <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-white tracking-widest animate-bounce">
        Coupon
      </div>
    </div>
  );
};
export default CouponBadge;
