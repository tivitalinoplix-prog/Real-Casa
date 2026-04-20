import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, UserIcon, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';
import { CREST_URL, pageTransitionVariants } from '../../data/mockData';
import { Student } from '../../types';

interface RoleSelectionProps {
  setRole: (role: 'gestor' | 'responsavel') => void;
  students: Student[];
  onLoginResponsavel: (studentId: number) => void;
}

export function RoleSelection({ setRole, students, onLoginResponsavel }: RoleSelectionProps) {
  const [activeForm, setActiveForm] = useState<'none' | 'gestor' | 'responsavel'>('none');
  const [inputValue, setInputValue] = useState('');

  const handleGestorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === '1234') {
      setRole('gestor');
    } else {
      toast.error('Senha incorreta', { style: { background: '#E50000', color: '#fff', border: 'none' } });
      setInputValue('');
    }
  };

  const handleResponsavelLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = inputValue.trim().toUpperCase();
    const foundStudent = students.find(s => s.accessCode === cleanToken);
    
    if (foundStudent) {
      onLoginResponsavel(foundStudent.id);
      setRole('responsavel');
    } else {
      toast.error('Token não encontrado ou inválido', { style: { background: '#E50000', color: '#fff', border: 'none' } });
      setInputValue('');
    }
  };

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

      <div className="w-full max-w-sm space-y-6 relative z-10 min-h-[220px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeForm === 'none' && (
            <motion.div key="buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 w-full">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveForm('gestor')} className="w-full bg-[var(--bg-card)] border border-[var(--border-strong)] p-6 flex items-center gap-6 group relative overflow-hidden slashed-module shadow-[var(--shadow-soft)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-[var(--bg-elevated)] rounded-xl flex items-center justify-center border border-[var(--border-subtle)] group-hover:border-[var(--brand-blue)]/50 transition-colors relative z-10">
                  <Shield className="text-[var(--brand-blue)]" size={28} />
                </div>
                <div className="text-left relative z-10">
                  <h2 className="font-oswald font-bold text-2xl text-[var(--text-main)] tracking-wider uppercase">Acesso Gestor</h2>
                  <p className="font-inter text-xs text-[var(--text-muted)] tracking-widest uppercase mt-1">Controle Total</p>
                </div>
              </motion.button>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveForm('responsavel')} className="w-full bg-[var(--bg-card)] border border-[var(--border-strong)] p-6 flex items-center gap-6 group relative overflow-hidden slashed-module shadow-[var(--shadow-soft)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-[var(--bg-elevated)] rounded-xl flex items-center justify-center border border-[var(--border-subtle)] group-hover:border-[var(--brand-green)]/50 transition-colors relative z-10">
                  <UserIcon className="text-[var(--brand-green)]" size={28} />
                </div>
                <div className="text-left relative z-10">
                  <h2 className="font-oswald font-bold text-2xl text-[var(--text-main)] tracking-wider uppercase">Responsável</h2>
                  <p className="font-inter text-xs text-[var(--text-muted)] tracking-widest uppercase mt-1">Portal do Atleta</p>
                </div>
              </motion.button>
            </motion.div>
          )}

          {activeForm === 'gestor' && (
            <motion.form key="gestor-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: 20 }} onSubmit={handleGestorLogin} className="w-full bg-[var(--bg-card)] border border-[var(--border-strong)] p-6 slashed-module relative">
              <button type="button" onClick={() => {setActiveForm('none'); setInputValue('');}} className="absolute top-4 right-4 text-white/40 hover:text-white">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-[var(--brand-blue)]" size={24} />
                <h2 className="font-oswald font-bold text-xl text-[var(--text-main)] tracking-wider uppercase">Acesso Gestor</h2>
              </div>
              <div className="space-y-4">
                <input type="password" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="INSIRA A SENHA (1234)" className="w-full bg-[#020204] border border-[var(--border-subtle)] p-4 rounded-xl text-white font-inter text-sm tracking-widest outline-none focus:border-[var(--brand-blue)] transition-colors text-center" autoFocus />
                <button type="submit" className="w-full bg-[var(--brand-blue)] hover:bg-[#153075] text-white p-4 rounded-xl font-oswald text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors">
                  Autenticar <ArrowRight size={16} />
                </button>
              </div>
            </motion.form>
          )}

          {activeForm === 'responsavel' && (
            <motion.form key="responsavel-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: 20 }} onSubmit={handleResponsavelLogin} className="w-full bg-[var(--bg-card)] border border-[var(--border-strong)] p-6 slashed-module relative">
              <button type="button" onClick={() => {setActiveForm('none'); setInputValue('');}} className="absolute top-4 right-4 text-white/40 hover:text-white">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <UserIcon className="text-[var(--brand-green)]" size={24} />
                <h2 className="font-oswald font-bold text-xl text-[var(--text-main)] tracking-wider uppercase">Responsável</h2>
              </div>
              <div className="space-y-4">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="TOKEN (EX: RC-8921)" className="w-full bg-[#020204] border border-[var(--border-subtle)] p-4 rounded-xl text-white font-inter text-sm tracking-widest outline-none focus:border-[var(--brand-green)] transition-colors text-center uppercase" autoFocus />
                <button type="submit" className="w-full bg-[var(--brand-green)] hover:bg-[#00a846] text-[#020204] p-4 rounded-xl font-oswald text-sm tracking-widest font-bold uppercase flex items-center justify-center gap-2 transition-colors">
                  Acessar Portal <ArrowRight size={16} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-8 left-0 w-full text-center opacity-40 pointer-events-none">
        <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-[var(--text-main)]">Sistema de Telemetria RC</p>
      </div>
    </motion.div>
  );
}
