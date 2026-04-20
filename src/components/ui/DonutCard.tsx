import React from 'react';
import { motion } from 'framer-motion';

export function DonutCard({ value, max, label, sub, colorHex, shadowClass, tooltip = "" }: any) {
  const percentage = Math.min((value / max) * 100, 100);
  const dashoffset = 283 - (283 * percentage) / 100;
  
  return (
    <div 
      className="glass-panel-elite p-8 flex flex-col items-center justify-center relative group overflow-hidden rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-t border-t-white/10 card-holo-glow cursor-help transition-transform hover:scale-[1.02]"
      style={{ '--card-glow': colorHex ? colorHex + '33' : 'rgba(255,255,255,0.15)' } as any}
    >
      {tooltip && (
        <div className="absolute inset-0 z-40 bg-[#020204]/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none flex flex-col items-center justify-center p-6 text-center">
           <p className="text-white font-oswald text-[12px] font-bold tracking-[0.2em] uppercase leading-relaxed drop-shadow-md">
             {tooltip}
           </p>
        </div>
      )}

      <div className="relative w-40 h-40 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle className="text-white/10" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="8" />
          <motion.circle 
            className={`${shadowClass}`} 
            cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" 
            strokeDasharray="283" 
            strokeLinecap="round" strokeWidth="8" 
            style={{ color: colorHex }} 
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: dashoffset }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px", amount: 0.3 }}
            transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1] }} 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-oswald text-6xl font-bold text-white leading-none">{value.toString().padStart(2, '0')}</span>
          <span className="font-inter text-[11px] font-bold text-white/60 tracking-[0.2em] uppercase mt-1">{label}</span>
        </div>
      </div>
      <span className="font-oswald text-[13px] tracking-[0.3em] font-bold uppercase" style={{ color: colorHex }}>{sub}</span>
    </div>
  );
}
