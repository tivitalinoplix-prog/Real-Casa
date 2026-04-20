import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, DollarSign, AlertTriangle, FileText } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toast } from 'sonner';
import { StandardHeader } from '../../components/ui/StandardHeader';
import { KpiCard } from '../../components/ui/KpiCard';
import { staggerContainer, itemVariant, pageTransitionVariants } from '../../data/mockData';

export function HomeGestor({ students, waitlist, isFocusMode, performanceData }: { students: any[], waitlist: any[], isFocusMode: boolean, performanceData: any[] }) {
  const totalStudents = students.length;
  const pendingPayments = students.filter(s => s.paymentStatus === 'pending').length;
  const activeWaitlist = waitlist.length;

  const handleGenerateReport = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2500)), {
      loading: 'Compilando inteligência e estatísticas...',
      success: 'Relatório PDF gerado e pronto para download!',
      error: 'Falha ao gerar relatório.'
    });
  };

  return (
    <motion.div 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      className="pb-32 min-h-screen bg-[#020204] relative overflow-hidden flex flex-col pt-12"
    >
      {/* Background HUD Layers */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 telemetry-grid-html opacity-20 pointer-events-none z-0" />

      {/* Header HUD Identity */}
      {!isFocusMode && (
        <StandardHeader 
          title="VISÃO" 
          coloredPart="SISTÊMICA" 
          subtitle="SISTEMA OPERACIONAL V.4" 
          accentColor="#00ddea"
        />
      )}

      <div className="px-6 space-y-6 relative z-10 flex-1">
        {/* KPI Grid HUD */}
        {!isFocusMode && (
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariant} className="bg-[#14141c]/40 backdrop-blur-xl border-l-2 border-[#00C853] p-4 rounded-xl flex flex-col shadow-lg">
              <span className="text-3xl font-oswald font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                {totalStudents} 
              </span>
              <span className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.15em] leading-tight">
                Atletas Ativos
              </span>
            </motion.div>

            <motion.div variants={itemVariant} className="bg-[#14141c]/40 backdrop-blur-xl border-l-2 border-[#FFD700] p-4 rounded-xl flex flex-col shadow-lg">
              <span className="text-3xl font-oswald font-bold text-[#FFD700] mb-1">
                {activeWaitlist}
              </span>
              <span className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.15em] leading-tight">
                Fila de Espera
              </span>
            </motion.div>

            <motion.div variants={itemVariant} className="bg-[#14141c]/40 backdrop-blur-xl border-l-2 border-[#E50000] p-4 rounded-xl flex flex-col shadow-lg">
              <span className="text-3xl font-oswald font-bold text-[#E50000] mb-1">
                {pendingPayments}
              </span>
              <span className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.15em] leading-tight">
                Inadimplentes
              </span>
            </motion.div>

            <motion.div variants={itemVariant} className="bg-[#14141c]/40 backdrop-blur-xl border-l-2 border-[#00C853] p-4 rounded-xl flex flex-col shadow-lg">
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] font-oswald font-bold text-[#00C853]">R$</span>
                <span className="text-3xl font-oswald font-bold text-[#00C853]">750</span>
              </div>
              <span className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.15em] leading-tight">
                Receita Est.
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* MÓDULO DE PERFORMANCE (CHART) */}
        <motion.div variants={itemVariant} className="bg-[#14141c]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-oswald font-bold text-sm text-white tracking-[0.2em] uppercase">MÉTRICA DE EVOLUÇÃO</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#00ddea]" />
                <span className="text-[7px] text-white/40 font-bold uppercase tracking-widest">Presença</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#7e22ce]" />
                <span className="text-[7px] text-white/40 font-bold uppercase tracking-widest">Gols</span>
              </div>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 'bold' }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D0D10', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="presença" 
                  stroke="#00ddea" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#00ddea', strokeWidth: 2, stroke: '#020204' }} 
                  activeDot={{ r: 6, shadow: '0 0 10px #00ddea' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="gols" 
                  stroke="#7e22ce" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#7e22ce', strokeWidth: 2, stroke: '#020204' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateReport}
            className="mt-6 w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-3 group"
          >
            <FileText size={16} className="text-white/40 group-hover:text-white transition-colors" />
            <span className="font-oswald text-[11px] font-bold tracking-[0.2em] text-white/60 group-hover:text-white uppercase transition-colors">Gerar Relatório Resumo (PDF)</span>
          </motion.button>
        </motion.div>

        {/* Status do Sistema (Detailed HUD) */}
        {!isFocusMode && (
          <motion.div variants={itemVariant} className="bg-[#14141c]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ddea]/30 to-transparent" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#00ddea]/10 flex items-center justify-center border border-[#00ddea]/20">
                <Activity className="text-[#00ddea]" size={16} />
              </div>
              <h3 className="font-oswald font-bold text-base text-white tracking-[0.15em] uppercase">STATUS DO SISTEMA</h3>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Capacidade Item */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-inter font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-white/40">groups</span>
                    <span className="text-white/60">Capacidade (Sub-13)</span>
                  </div>
                  <span className="text-[#FFD700]">85%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-[#00ddea] to-[#7e22ce] h-full rounded-full"
                  />
                </div>
              </div>

              {/* Arrecadação Item */}
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00C853]/10 flex items-center justify-center text-[#00C853]">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  </div>
                  <span className="text-xs font-inter font-bold text-white/70 uppercase tracking-widest">Arrecadação Mês</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-lg font-oswald font-bold text-[#00C853]">R$ 4.560</span>
                  <span className="text-[7px] text-white/30 uppercase font-black tracking-tighter">DATA LOG: 17/04</span>
                </div>
              </div>

              {/* Avisos Item */}
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E50000]/10 flex items-center justify-center text-[#E50000]">
                    <span className="material-symbols-outlined text-[18px]">notifications</span>
                  </div>
                  <span className="text-xs font-inter font-bold text-white/70 uppercase tracking-widest">Avisos Pendentes</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#E50000]/20 flex items-center justify-center border border-[#E50000]/30">
                  <span className="text-lg font-oswald font-bold text-[#E50000]">3</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* System Footer Decorative */}
        <div className="pt-4 flex items-center justify-center gap-4 opacity-20">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
          <span className="font-inter text-[6px] font-black uppercase tracking-[1em]">END OF LOG</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
        </div>
      </div>
    </motion.div>
  );
}
