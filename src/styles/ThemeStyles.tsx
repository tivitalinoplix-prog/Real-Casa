import React from 'react';

export const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Oswald:wght@400;700&family=Anton&family=Space+Grotesk:wght@500;700&display=swap');
    
    :root {
      --bg-base: #020204;
      --bg-card: #0d0d10;
      --bg-elevated: #14141c;
      --bg-glass-solid: rgba(8, 8, 12, 0.92);
      --bg-nav: rgba(5, 5, 10, 0.96);
      --text-main: #ffffff;
      --text-muted: #a1a1b2;
      --text-inactive: #5b5b66;
      --border-strong: rgba(255, 255, 255, 0.18);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --bg-hover: rgba(255, 255, 255, 0.06);
      --bg-hover-strong: rgba(255, 255, 255, 0.12);
      --shadow-soft: 0 18px 45px rgba(0, 0, 0, 0.85);
      
      --pit-primary: #6a1b9a;
      --pit-secondary: #ffca28;
      --pit-tertiary: #005a9e;

      --brand-blue: #1A3A8F;
      --brand-green: #00C853;
      --brand-red: #E50000;
      --brand-purple: #7e22ce;
      --brand-gold: #FFD700;
      --accent: #E50000;
      --accent-gold: #FFD700;
    }
    
    .font-oswald { font-family: 'Oswald', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-massive { font-family: 'Anton', sans-serif; }
    .font-headline { font-family: 'Space Grotesk', sans-serif; }
    
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* CSS Customizado da Tela de Acesso */
    .diagonal-bg { background: linear-gradient(115deg, #020204 0%, #08080c 45%, #0c0c14 100%); }
    .telemetry-grid-html {
        background-image: linear-gradient(rgba(0, 90, 158, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 90, 158, 0.1) 1px, transparent 1px);
        background-size: 60px 60px;
        transform: skewY(-5deg);
    }
    .laser-line { background: linear-gradient(90deg, transparent, #00ddea, transparent); height: 1px; width: 100%; opacity: 0.5; position: absolute; }
    .slashed-module { clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%); transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1); }
    .slashed-module:hover, .slashed-module:active { clip-path: polygon(4% 0%, 104% 0%, 96% 100%, -4% 100%); transform: scale(1.02) translateX(5px); }
    .vertical-text { writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); }
    .scan-overlay { background: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 221, 234, 0.1) 2px, transparent 3px); }
    .logo-obscure {
        mask-image: linear-gradient(105deg, rgba(0,0,0,1) 15%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,1) 85%);
        -webkit-mask-image: linear-gradient(105deg, rgba(0,0,0,1) 15%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,1) 85%);
        mask-size: 300% 300%;
        -webkit-mask-size: 300% 300%;
        animation: wave-flag 6s ease-in-out infinite alternate;
    }
    
    @keyframes wave-flag {
        0% { mask-position: 0% 50%; -webkit-mask-position: 0% 50%; }
        100% { mask-position: 100% 50%; -webkit-mask-position: 100% 50%; }
    }

    /* CSS Customizado Elite Performance (Perfil) Fiel à Imagem */
    .dot-matrix-elite {
        background-image: radial-gradient(#FFD700 0.5px, transparent 0.5px);
        background-size: 20px 20px;
        opacity: 0.08;
    }
    .glass-panel-elite {
        background: rgba(35, 35, 45, 0.85);
        backdrop-filter: blur(25px);
        border: 1px solid rgba(160, 100, 255, 0.3);
    }
    .donut-shadow-elite { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
    .donut-shadow-violet-elite { filter: drop-shadow(0 0 10px rgba(160, 100, 255, 0.6)); }
    @keyframes dash {
        from { stroke-dashoffset: 283; }
        to { stroke-dashoffset: var(--dashoffset); }
    }
    .animate-dash { animation: dash 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  `}</style>
);
