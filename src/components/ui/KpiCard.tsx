import React from 'react';
import { motion } from 'framer-motion';

export function KpiCard({ label, value, color, variants }: { label: string, value: number | string, color: 'green' | 'gold' | 'red', variants?: any }) {
  const colorMap = { green: 'text-[var(--brand-green)]', gold: 'text-[var(--brand-gold)]', red: 'text-[var(--brand-red)]' }[color];
  const borderMap = { green: 'border-[var(--brand-green)]/20', gold: 'border-[var(--brand-gold)]/20', red: 'border-[var(--brand-red)]/20' }[color];
  return (
    <motion.div 
      variants={variants}
      className={`bg-[var(--bg-card)] p-4 rounded-2xl border ${borderMap} flex flex-col items-center shadow-[var(--shadow-soft)] relative overflow-hidden group`}
    >
      <div className={`absolute top-0 left-0 w-full h-0.5 bg-current ${colorMap} opacity-40`} />
      <span className={`font-oswald font-bold text-3xl ${colorMap} drop-shadow-md group-hover:scale-110 transition-transform`}>{value}</span>
      <span className="font-inter text-[8px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-bold mt-2 text-center leading-tight">{label}</span>
    </motion.div>
  );
}
