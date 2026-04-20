import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { StandardHeader } from '../../components/ui/StandardHeader';
import { staggerContainer, itemVariant, pageTransitionVariants } from '../../data/mockData';

export function AlertsResponsavel() {
  const alerts = [
    { id: 1, title: 'Treino Cancelado', date: 'Hoje', desc: 'Devido às fortes chuvas, o treino de hoje foi cancelado.', type: 'urgent' },
    { id: 2, title: 'Mensalidade', date: 'Ontem', desc: 'Sua mensalidade vence em 3 dias.', type: 'warning' },
  ];

  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="pb-24 min-h-screen bg-[var(--bg-base)]">
      <StandardHeader title="Avisos" />
      <div className="p-6">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
          {alerts.map(alert => (
            <motion.div key={alert.id} variants={itemVariant} className={`bg-[var(--bg-card)] border ${alert.type === 'urgent' ? 'border-[var(--brand-red)]/50' : 'border-[var(--brand-gold)]/50'} rounded-2xl p-4 flex gap-4 shadow-[var(--shadow-soft)] relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${alert.type === 'urgent' ? 'bg-[var(--brand-red)]' : 'bg-[var(--brand-gold)]'}`} />
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${alert.type === 'urgent' ? 'bg-[var(--brand-red)]/20 text-[var(--brand-red)]' : 'bg-[var(--brand-gold)]/20 text-[var(--brand-gold)]'}`}>
                <Bell size={20} />
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-oswald font-bold text-md text-[var(--text-main)] uppercase tracking-wide">{alert.title}</h4>
                  <span className="font-inter text-[10px] text-[var(--text-muted)]">{alert.date}</span>
                </div>
                <p className="font-inter text-xs text-[var(--text-muted)] leading-relaxed">{alert.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
