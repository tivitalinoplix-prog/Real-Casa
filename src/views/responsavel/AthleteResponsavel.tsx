import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import { DonutCard } from '../../components/ui/DonutCard';
import { CATEGORIES } from '../../data/mockData';
import { toast } from 'sonner';
import { StandardHeader } from '../../components/ui/StandardHeader';

export function AthleteResponsavel({ student, allStudents = [], onSelectStudent = null, isParentView, onClose = null }: any) {
  if (!student) return <div className="p-10 text-center text-white/50 font-inter">Nenhum atleta selecionado.</div>;
  
  const firstName = student.name.split(' ')[0];
  const lastName = student.name.split(' ').slice(1).join(' ');
  const categoryInfo = CATEGORIES.find(c => c.id === student.category) || CATEGORIES[0];

  return (
    <div className="w-full flex flex-col relative bg-[#020204] min-h-full pb-32 overflow-x-hidden text-[#e5e1e8]">
      <div className="absolute inset-0 dot-matrix-elite pointer-events-none z-0" />

      {/* CABEÇALHO PADRÃO VIA COMPONENTE */}
      <StandardHeader 
        title="MEU" 
        coloredPart="ATLETA" 
        subtitle="PERFIL DO ATLETA" 
        accentColor="#f59e0b"
        rightElement={
          <div className="flex items-center gap-4 shrink-0">
            {onClose && (
              <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10 shadow-lg">
                <ChevronLeft size={18} className="text-white" />
              </button>
            )}
            <button 
              onClick={() => isParentView && toast.info('Configurações')} 
              className="w-12 h-12 rounded-full overflow-hidden bg-[#232328] border-2 border-[#f59e0b]/60 ring-2 ring-[#ffd700]/30 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <img alt={student.name} className="w-full h-full object-cover" src={student.photo} />
            </button>
          </div>
        }
      />

      {/* HERO SECTION WITH CLEAN HUD HEADER */}
      <section className="relative h-[400px] w-full overflow-hidden shrink-0 z-10 rounded-b-[40px] shadow-2xl">
        <img alt={student.name} className="w-full h-full object-cover brightness-110 contrast-105 object-[center_20%]" src={student.photo} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(122,69,240,0.3)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/20 to-transparent" />
        
        {/* NOME DO ATLETA DENTRO DO HERO (ALINHADO COM A PARTE INFERIOR) */}
        <div className="absolute bottom-12 w-full z-50 flex justify-between items-end px-6">
          <div className="flex flex-col relative w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-md font-inter text-[9px] font-extrabold tracking-[0.2em] text-[#ffd700] uppercase backdrop-blur-sm">
                DIV {categoryInfo.label}
              </span>
            </div>
            <h1 className="text-4xl font-black text-white font-oswald uppercase tracking-tight drop-shadow-2xl leading-none">
              {firstName} <span className="text-[#ffd700]">{lastName}</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="px-6 -mt-6 relative z-20 space-y-6 max-w-5xl mx-auto w-full">
        {/* EVOLUÇÃO GERAL */}
        <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="glass-panel-elite p-8 relative overflow-hidden rounded-[24px] shadow-2xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#7a45f0]/15 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-8">
            <div className="space-y-1 w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] shadow-[0_0_12px_#ffd700]" />
                <span className="font-inter text-[12px] tracking-[0.35em] font-black text-white/90 uppercase">DESEMPENHO GERAL</span>
              </div>
              <h2 className="font-oswald text-5xl font-bold text-white tracking-tight leading-none uppercase">
                EVOLUÇÃO INCRÍVEL
              </h2>
              <div className="pt-6 w-64 max-w-full">
                <div className="h-3 w-full bg-white/10 rounded-full relative overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }} 
                     whileInView={{ width: `${student.attendance}%` }} 
                     viewport={{ once: true }} 
                     transition={{ duration: 1.5, ease: "easeOut" }} 
                     className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7a45f0] to-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.5)] rounded-full" 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 self-end mt-4 md:mt-0 shrink-0">
              <span className="font-oswald text-9xl font-black text-white leading-[0.8] drop-shadow-2xl">{student.attendance}</span>
              <span className="font-oswald text-4xl font-bold text-[#ffd700]">%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="flex flex-col border-l-2 border-[#00e8f8] pl-4">
              <span className="font-inter text-[10px] font-bold text-white/40 tracking-[0.25em] uppercase mb-1">RITMO</span>
              <p className="font-oswald text-2xl text-[#00e8f8]">32.4 <span className="text-xs">KM/H</span></p>
            </div>
            <div className="flex flex-col border-l-2 border-[#00e8f8] pl-4">
              <span className="font-inter text-[10px] font-bold text-white/40 tracking-[0.25em] uppercase mb-1">SAÚDE</span>
              <p className="font-oswald text-2xl text-[#00e8f8]">FORTE</p>
            </div>
            <div className="flex flex-col border-l-2 border-[#ffb4ab] pl-4">
              <span className="font-inter text-[10px] font-bold text-white/40 tracking-[0.25em] uppercase mb-1">CANSAÇO</span>
              <p className="font-oswald text-2xl text-[#ffb4ab]">BAIXO</p>
            </div>
          </div>
        </motion.div>

        {/* DONUT CHARTS (1 Coluna fiel ao Mobile da Imagem) */}
        <div className="grid grid-cols-1 gap-4 pt-2">
          <DonutCard value={student.goals} max={20} label="GOLS" sub="BRILHANDO" colorHex="#FFD700" shadowClass="donut-shadow-elite" />
          <DonutCard value={student.assists} max={15} label="ASSIST." sub="EQUIPE" colorHex="#a064ff" shadowClass="donut-shadow-violet-elite" />
          <DonutCard value={Math.floor(student.attendance / 10)} max={10} label="JOGOS" sub="PRESENÇA" colorHex="#FFD700" shadowClass="donut-shadow-elite" />
        </div>

        {/* AÇÕES */}
        {isParentView && (
          <a href={`https://wa.me/55${student.phone}`} target="_blank" rel="noopener noreferrer" className="mt-4 w-full glass-panel-elite bg-[#0d0d10]/80 rounded-2xl py-5 flex items-center justify-center gap-3 text-white font-inter text-xs font-bold uppercase tracking-[0.25em] hover:bg-white/5 transition-colors shadow-2xl">
            <MessageCircle size={18} className="text-[#ffd700]" /> CONTATAR COMISSÃO
          </a>
        )}
      </div>
    </div>
  );
}