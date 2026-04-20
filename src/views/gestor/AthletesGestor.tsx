import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { StandardHeader } from '../../components/ui/StandardHeader';
import { StatControl } from '../../components/ui/StatControl';
import { CATEGORIES, staggerContainer, itemVariant, pageTransitionVariants } from '../../data/mockData';

export function AthletesGestor({ students, setStudents }: { students: any[], setStudents: any }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const updateStudentStat = (id: number, stat: string, increment: number) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        const newValue = Math.max(0, s[stat] + increment);
        return { ...s, [stat]: newValue };
      }
      return s;
    }));
  };

  const toggleYellowCard = (id: number) => {
    setStudents(students.map(s => s.id === id ? { ...s, yellowCard: !s.yellowCard } : s));
    toast.success('Cartão atualizado');
  };

  const resetStats = (id: number) => {
    setStudents(students.map(s => s.id === id ? { ...s, goals: 0, assists: 0, yellowCard: false } : s));
    toast.success('Estatísticas zeradas');
  };

  const filteredStudents = selectedCategory === 'all' ? students : students.filter(s => s.category === selectedCategory);

  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="pb-24 min-h-screen bg-[var(--bg-base)]">
      <StandardHeader 
        subtitle="RECRUTAMENTO & ELENCO" 
        title="ELENCO" 
        coloredPart="TÁTICO" 
        accentColor="#f59e0b"
        rightElement={<motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-[var(--brand-blue)] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(26,58,143,0.5)]"><Plus size={20} className="text-white" /></motion.button>} 
      />
      
      <div className="px-4 py-4 overflow-x-auto no-scrollbar border-b border-[var(--border-subtle)] bg-[var(--bg-card)] sticky top-[80px] z-10">
        <div className="flex gap-2 min-w-max">
          <button onClick={() => setSelectedCategory('all')} className={`px-5 py-2 rounded-full font-inter text-xs font-bold tracking-wider uppercase transition-all ${selectedCategory === 'all' ? 'bg-white text-black' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}>Todos</button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-5 py-2 rounded-full font-inter text-xs font-bold tracking-wider uppercase transition-all ${selectedCategory === cat.id ? 'bg-white text-black' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          {filteredStudents.map(student => (
            <motion.div key={student.id} variants={itemVariant} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 shadow-[var(--shadow-soft)] mb-4 relative overflow-hidden">
              {student.yellowCard && <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--brand-gold)]/10 rounded-bl-full" />}
              
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <img src={student.photo} alt={student.name} className="w-16 h-16 rounded-xl object-cover border-2 border-[var(--border-subtle)]" />
                  {student.yellowCard && <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--brand-gold)] rounded-md border-2 border-[var(--bg-card)] shadow-md flex items-center justify-center"><AlertCircle size={12} className="text-black" /></div>}
                </div>
                <div className="flex-1">
                  <h3 className="font-oswald font-bold text-lg text-[var(--text-main)] uppercase tracking-wide leading-tight">{student.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] font-inter font-bold bg-[var(--bg-elevated)] text-[var(--text-muted)] px-2 py-0.5 rounded uppercase tracking-wider">{student.position}</span>
                    <span className="text-[10px] font-inter font-bold bg-[var(--brand-blue)]/20 text-[var(--brand-blue)] px-2 py-0.5 rounded uppercase tracking-wider">{CATEGORIES.find(c => c.id === student.category)?.label}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <StatControl label="Gols" value={student.goals} onDec={() => updateStudentStat(student.id, 'goals', -1)} onInc={() => updateStudentStat(student.id, 'goals', 1)} />
                <StatControl label="Assists" value={student.assists} onDec={() => updateStudentStat(student.id, 'assists', -1)} onInc={() => updateStudentStat(student.id, 'assists', 1)} />
              </div>

              <div className="flex gap-2 pt-4 border-t border-[var(--border-subtle)]">
                <button onClick={() => toggleYellowCard(student.id)} className={`flex-1 py-2 rounded-xl font-inter text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${student.yellowCard ? 'bg-[var(--brand-gold)] text-black' : 'bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)]'}`}>
                  Cartão Amarelo
                </button>
                <button onClick={() => resetStats(student.id)} className="w-10 h-10 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-red)] transition-colors">
                  <RotateCcw size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}