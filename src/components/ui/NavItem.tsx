import React from 'react';

const TAB_ACTIVE_COLORS: Record<string, string> = {
  'INÍCIO': '#00ddea',
  'Início': '#00ddea',
  'ALUNOS': '#f59e0b',
  'Atletas': '#f59e0b',
  'CHAMADA': '#00C853',
  'Chamada': '#00C853',
  'Busca': '#00ddea',
  'SCOUT': '#E50000',
  'Scout': '#E50000',
  'FINANÇAS': '#00C853',
  'Finanças': '#00C853',
  'AVISOS': '#a855f7',
  'Avisos': '#a855f7',
  'Alertas': '#a855f7',
  'ATLETA': '#f59e0b',
  'Atleta': '#f59e0b',
  'PAINEL': '#00ddea',
  'Painel': '#00ddea',
  'Ajustes': '#00ddea',
  'AJUSTES': '#00ddea',
};

export function NavItem({ icon: Icon, label, isActive, onClick }: { icon: any; label: string; isActive: boolean; onClick: () => void }) {
  const activeColor = TAB_ACTIVE_COLORS[label] || '#00ddea';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-2 px-1 flex-1 transition-all duration-200`}
      style={{
        WebkitTapHighlightColor: 'transparent',
        color: isActive ? activeColor : '#5b5b66',
        borderTop: isActive ? `3px solid ${activeColor}` : '3px solid transparent',
        opacity: isActive ? 1 : 0.6,
      }}
    >
      <Icon 
        size={24} 
        strokeWidth={isActive ? 2.5 : 1.5} 
        style={{ fontVariationSettings: isActive ? '"FILL" 1' : '"FILL" 0' }}
        fill={isActive ? 'currentColor' : 'none'}
      />
      <span className="font-inter font-bold text-[9px] tracking-widest uppercase">
        {label}
      </span>
    </button>
  );
}