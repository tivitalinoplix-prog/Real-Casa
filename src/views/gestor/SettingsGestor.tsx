import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Save } from 'lucide-react';
import { toast } from 'sonner';
import { StandardHeader } from '../../components/ui/StandardHeader';
import { pageTransitionVariants } from '../../data/mockData';

export function SettingsGestor({ onLogout }: { onLogout: () => void }) {
  const handleSave = () => toast.success('Configurações salvas com sucesso');

  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="pb-24 min-h-screen bg-[var(--bg-base)]">
      <StandardHeader title="Ajustes" />
      <div className="p-6 space-y-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-[var(--shadow-soft)]">
          <h3 className="font-oswald font-bold text-lg text-[var(--text-main)] tracking-widest uppercase mb-4">Sistema</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-inter text-sm text-[var(--text-muted)]">Notificações Push</span>
              <div className="w-12 h-6 bg-[var(--brand-blue)] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-inter text-sm text-[var(--text-muted)]">Modo Escuro</span>
              <div className="w-12 h-6 bg-[var(--brand-blue)] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="w-full bg-[var(--brand-blue)] text-white font-oswald font-bold text-lg tracking-widest uppercase py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(26,58,143,0.4)] hover:bg-blue-700 transition-colors">
          <Save size={20} /> Salvar Alterações
        </button>

        <button onClick={onLogout} className="w-full bg-[var(--bg-elevated)] border border-[var(--brand-red)]/30 text-[var(--brand-red)] font-oswald font-bold text-lg tracking-widest uppercase py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[var(--brand-red)]/10 transition-colors">
          <LogOut size={20} /> Sair do Sistema
        </button>
      </div>
    </motion.div>
  );
}
