import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, ReceiptText, AlertCircle } from 'lucide-react';
import { StandardHeader } from '../../components/ui/StandardHeader';
import { KpiCard } from '../../components/ui/KpiCard';
import { staggerContainer, itemVariant, pageTransitionVariants } from '../../data/mockData';

export function HomeResponsavel({ student }: { student: any }) {
  if (!student) return null;

  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="pb-24 min-h-screen bg-[var(--bg-base)]">
      <StandardHeader title="Painel" />
      <div className="p-6 space-y-8">
        <motion.div variants={itemVariant} className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 rounded-2xl shadow-[var(--shadow-soft)]">
          <img src={student.photo} alt={student.name} className="w-16 h-16 rounded-xl object-cover border-2 border-[var(--border-subtle)]" />
          <div>
            <h2 className="font-oswald font-bold text-xl text-[var(--text-main)] uppercase tracking-wide">{student.name}</h2>
            <p className="font-inter text-xs text-[var(--text-muted)]">Olá, {student.guardian.split(' ')[0]}</p>
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
          <KpiCard label="Presença" value={`${student.attendance}%`} color="green" variants={itemVariant} />
          <KpiCard label="Mensalidade" value={student.paymentStatus === 'paid' ? 'Em Dia' : 'Pendente'} color={student.paymentStatus === 'paid' ? 'green' : 'red'} variants={itemVariant} />
        </motion.div>

        <motion.div variants={itemVariant} className="space-y-3">
          <h3 className="font-oswald font-bold text-lg text-[var(--text-main)] tracking-widest uppercase mb-4">Acesso Rápido</h3>
          <button className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 rounded-2xl flex items-center gap-4 shadow-[var(--shadow-soft)] hover:bg-[var(--bg-hover)] transition-colors">
            <div className="w-10 h-10 bg-[var(--brand-blue)]/20 rounded-xl flex items-center justify-center"><CalendarCheck className="text-[var(--brand-blue)]" size={20} /></div>
            <div className="text-left flex-1">
              <h4 className="font-oswald font-bold text-md text-[var(--text-main)] uppercase tracking-wide">Próximo Treino</h4>
              <p className="font-inter text-xs text-[var(--text-muted)]">Terça, 18:30 - Campo 1</p>
            </div>
          </button>
          <button className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] p-4 rounded-2xl flex items-center gap-4 shadow-[var(--shadow-soft)] hover:bg-[var(--bg-hover)] transition-colors">
            <div className="w-10 h-10 bg-[var(--brand-green)]/20 rounded-xl flex items-center justify-center"><ReceiptText className="text-[var(--brand-green)]" size={20} /></div>
            <div className="text-left flex-1">
              <h4 className="font-oswald font-bold text-md text-[var(--text-main)] uppercase tracking-wide">Financeiro</h4>
              <p className="font-inter text-xs text-[var(--text-muted)]">Ver histórico de pagamentos</p>
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
