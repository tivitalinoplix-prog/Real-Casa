import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { StandardHeader } from '../../components/ui/StandardHeader';
import { CATEGORIES, staggerContainer, itemVariant, pageTransitionVariants } from '../../data/mockData';

export function SearchGestor({ students }: { students: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.guardian.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="pb-24 min-h-screen bg-[var(--bg-base)]">
      <StandardHeader title="Busca" />
      <div className="p-4 sticky top-[80px] z-10 bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
          <input type="text" placeholder="Nome do atleta ou responsável..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl py-4 pl-12 pr-12 text-[var(--text-main)] font-inter focus:outline-none focus:border-[var(--brand-blue)] transition-colors shadow-inner" />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {searchTerm && (
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
            {filtered.length > 0 ? filtered.map(student => (
              <motion.div key={student.id} variants={itemVariant} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 flex items-center gap-4 shadow-[var(--shadow-soft)]">
                <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-oswald font-bold text-lg text-[var(--text-main)] uppercase tracking-wide">{student.name}</h4>
                  <p className="font-inter text-xs text-[var(--text-muted)]">Resp: {student.guardian}</p>
                </div>
                <span className="text-[10px] font-inter font-bold bg-[var(--brand-blue)]/20 text-[var(--brand-blue)] px-2 py-1 rounded uppercase tracking-wider">{CATEGORIES.find(c => c.id === student.category)?.label}</span>
              </motion.div>
            )) : (
              <div className="text-center py-12 text-[var(--text-muted)] font-inter">Nenhum resultado encontrado.</div>
            )}
          </motion.div>
        )}
        {!searchTerm && (
          <div className="text-center py-12 text-[var(--text-inactive)] font-inter text-sm">Digite para buscar atletas ou responsáveis.</div>
        )}
      </div>
    </motion.div>
  );
}
