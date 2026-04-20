import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export function StatControl({ label, value, onDec, onInc }: { label: string, value: number, onDec: () => void, onInc: () => void }) {
  return (
    <div className="bg-[var(--bg-base)] p-2 rounded-2xl flex justify-between items-center border border-[var(--border-subtle)] shadow-inner">
      <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-[0.25em] ml-2">{label}</span>
      <div className="flex items-center gap-1.5">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onDec} className="w-7 h-7 flex items-center justify-center bg-[var(--bg-hover)] rounded-lg text-[var(--text-muted)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover-strong)] transition-colors"><Minus size={14} /></motion.button>
        <span className="w-6 text-center font-oswald font-bold text-lg text-[var(--text-main)]">{value}</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onInc} className="w-7 h-7 flex items-center justify-center bg-[var(--bg-hover)] rounded-lg text-[var(--text-main)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover-strong)] transition-colors"><Plus size={14} /></motion.button>
      </div>
    </div>
  );
}
