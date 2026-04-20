import React from 'react';
import { motion } from 'framer-motion';
import { Shield, UserIcon } from 'lucide-react';
import { CREST_URL, pageTransitionVariants } from '../../data/mockData';

export function RoleSelection({ setRole }: { setRole: (role: 'gestor' | 'responsavel') => void }) {
  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen bg-[var(--bg-base)] flex flex-col items-center justify-center p-6 relative overflow-hidden diagonal-bg">
      <div className="absolute inset-0 telemetry-grid-html opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scan-overlay opacity-30 pointer-events-none" />
      <div className="laser-line top-[20%]" />
      <div className="laser-line bottom-[20%]" />
      
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-12 relative z-10">
        <div className="absolute inset-0 bg-[var(--brand-blue)] blur-[80px] opacity-20 rounded-full" />
        <img src={CREST_URL} alt="Real Casa" className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] logo-obscure" />
      </motion.div>

      <div className="w-full max-w-sm space-y-6 relative z-10">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setRole('gestor')} className="w-full bg-[var(--bg-card)] border border-[var(--border-strong)] p-6 flex items-center gap-6 group relative overflow-hidden slashed-module shadow-[var(--shadow-soft)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-14 h-14 bg-[var(--bg-elevated)] rounded-xl flex items-center justify-center border border-[var(--border-subtle)] group-hover:border-[var(--brand-blue)]/50 transition-colors relative z-10">
            <Shield className="text-[var(--brand-blue)]" size={28} />
          </div>
          <div className="text-left relative z-10">
            <h2 className="font-oswald font-bold text-2xl text-[var(--text-main)] tracking-wider uppercase">Acesso Gestor</h2>
            <p className="font-inter text-xs text-[var(--text-muted)] tracking-widest uppercase mt-1">Controle Total</p>
          </div>
        </motion.button>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setRole('responsavel')} className="w-full bg-[var(--bg-card)] border border-[var(--border-strong)] p-6 flex items-center gap-6 group relative overflow-hidden slashed-module shadow-[var(--shadow-soft)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-14 h-14 bg-[var(--bg-elevated)] rounded-xl flex items-center justify-center border border-[var(--border-subtle)] group-hover:border-[var(--brand-green)]/50 transition-colors relative z-10">
            <UserIcon className="text-[var(--brand-green)]" size={28} />
          </div>
          <div className="text-left relative z-10">
            <h2 className="font-oswald font-bold text-2xl text-[var(--text-main)] tracking-wider uppercase">Acesso Responsável</h2>
            <p className="font-inter text-xs text-[var(--text-muted)] tracking-widest uppercase mt-1">Portal do Atleta</p>
          </div>
        </motion.button>
      </div>
      
      <div className="absolute bottom-8 left-0 w-full text-center opacity-40 pointer-events-none">
        <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-[var(--text-main)]">Sistema de Telemetria RC</p>
      </div>
    </motion.div>
  );
}
