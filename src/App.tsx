import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Toaster, toast } from 'sonner';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  CalendarCheck,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ChevronRight,
  Copy,
  DollarSign,
  Flag,
  History,
  Home,
  LogOut,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ReceiptText,
  RotateCcw,
  Save,
  Search,
  Settings,
  Share2,
  Shield,
  User as UserIcon,
  UserPlus,
  Users,
  Wallet,
  X,
} from 'lucide-react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

import { KpiCard } from './components/ui/KpiCard';
import { StandardHeader } from './components/ui/StandardHeader';
import { DonutCard } from './components/ui/DonutCard';
import { PlayIcon, PauseIcon } from './components/ui/Icons';

// --- DATA MOCK FOR CHARTS ---
const performanceData = [
  { name: 'Sem 1', presenÃ§a: 85, gols: 1.2 },
  { name: 'Sem 2', presenÃ§a: 88, gols: 1.5 },
  { name: 'Sem 3', presenÃ§a: 92, gols: 1.8 },
  { name: 'Sem 4', presenÃ§a: 90, gols: 1.6 },
];

// --- HUD Confirmation Modal Component ---
function HudConfirmationModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onCancel} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        className="bg-[#0D0D10] border border-[#FF6D00]/30 rounded-3xl p-8 max-w-sm w-full relative z-[210] shadow-[0_0_50px_rgba(255,215,0,0.15)]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#E50000]/20 border border-[#E50000]/30 flex items-center justify-center">
            <AlertTriangle className="text-[#E50000]" size={20} />
          </div>
          <h3 className="font-massive italic text-xl text-white uppercase">{title}</h3>
        </div>
        <p className="font-inter text-sm text-white/60 mb-8 leading-relaxed uppercase tracking-wider text-[10px]">
          {message}
        </p>
        <div className="flex gap-4">
          <button onClick={onCancel} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white/40 font-oswald text-xs tracking-widest uppercase hover:text-white transition-all">Cancelar</button>
          <button onClick={() => { onConfirm(); onCancel(); }} className="flex-1 py-4 bg-[#E50000] text-white rounded-xl font-oswald text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(229,0,0,0.3)]">Confirmar</button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Transaction Detail Modal Component ---
function TransactionDetailModal({ isOpen, transaction, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && transaction && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ y: "100%", opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: "100%", opacity: 0 }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-[#0D0D10] border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[40px] p-8 w-full max-w-md relative z-[210] overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Background Highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/10 rounded-full blur-[60px] -mr-16 -mt-16" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <p className="text-[10px] font-inter font-black text-[#10b981] tracking-[0.3em] uppercase mb-1">Detalhes da Unidade</p>
                <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight italic">TransaÃ§Ã£o</h2>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/40 hover:text-white transition-colors group"
              >
                <X size={20} className="group-active:scale-90 transition-transform" />
              </button>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Status Card */}
              <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-inter text-white/30 uppercase tracking-widest font-black mb-1">Status Log</span>
                  <span className="text-sm font-oswald font-bold text-[#10b981] tracking-widest uppercase italic">Liquidado â€¢ Verificado</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center">
                  <Shield className="text-[#10b981]" size={24} />
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] font-inter text-white/30 uppercase font-black tracking-widest mb-1">Atleta</p>
                  <p className="text-sm font-oswald font-bold text-white uppercase truncate">{transaction.athlete}</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] font-inter text-white/30 uppercase font-black tracking-widest mb-1">Valor</p>
                  <p className="text-sm font-oswald font-bold text-[#10b981] uppercase tracking-widest">R$ {transaction.val},00</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] font-inter text-white/30 uppercase font-black tracking-widest mb-1">Data registro</p>
                  <p className="text-sm font-oswald font-bold text-white uppercase truncate">{transaction.date.split(',')[0]}</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] font-inter text-white/30 uppercase font-black tracking-widest mb-1">HorÃ¡rio</p>
                  <p className="text-sm font-oswald font-bold text-white uppercase truncate">{transaction.date.split(',')[1] || '00:00'}</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                <p className="text-[9px] font-inter text-white/30 uppercase font-black tracking-widest mb-1">Tipo de Entrada</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                  <p className="text-xs font-oswald font-bold text-white uppercase tracking-widest">{transaction.type} - PIX RECORRENTE</p>
                </div>
              </div>

              <button 
                onClick={onClose} 
                className="w-full py-5 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-2xl text-white font-oswald font-bold tracking-[0.2em] uppercase text-xs shadow-[0_10px_30px_rgba(16,185,129,0.2)] active:scale-95 transition-all"
              >
                Fechar Documento
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- ANIMATION VARIANTS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const itemVariantHorizontal = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

// TransiÃ§Ã£o Otimizada (Performance F1)
const pageTransitionVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

// --- STORAGE & HELPERS ---
function loadJSON(key, fallback, version = 1) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && 'v' in parsed && 'data' in parsed) {
      if (parsed.v !== version) return fallback;
      return parsed.data;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function saveJSON(key, data, version = 1) {
  const env = { v: version, data };
  localStorage.setItem(key, JSON.stringify(env));
}

function normalizePhoneBR(value) {
  return value.replace(/\D/g, '');
}

function suggestCategoryByAge(age) {
  if (age <= 11) return 'sub11';
  if (age <= 13) return 'sub13';
  if (age <= 15) return 'sub15';
  return 'sub17';
}

// --- CONSTANTS & MOCK DATA ---
const STORAGE_VERSION = 4; // Bump version for strict dark mode
const STORAGE_KEYS = {
  role: 'realcasa.role',
  gestorTab: 'realcasa.gestor.activeTab',
  responsavelTab: 'realcasa.responsavel.activeTab',
  students: 'realcasa.students',
  waitlist: 'realcasa.waitlist',
  selectedStudentId: 'realcasa.responsavel.selectedStudentId',
};

const CATEGORIES = [
  { id: 'sub11', label: 'Sub-11', color: '#2C2C35' },
  { id: 'sub13', label: 'Sub-13', color: '#2C2C35' },
  { id: 'sub15', label: 'Sub-15', color: '#7e22ce' },
  { id: 'sub17', label: 'Sub-17', color: '#E50000' },
];

const getBoyPhoto = (_id) => 'https://images.pexels.com/photos/33217156/pexels-photo-33217156.jpeg';
const CREST_URL = '/logo.png';

const initialStudents = [
  {
    id: 1, name: 'Lucas Silva', age: 12, category: 'sub13', guardian: 'Maria (MÃ£e)', phone: '11999999999',
    photo: getBoyPhoto(1), position: 'Atacante', goals: 12, assists: 4, attendance: 90, yellowCard: false, paymentStatus: 'pending', accessCode: 'RC-1111'
  },
  {
    id: 2, name: 'Pedro Santos', age: 14, category: 'sub15', guardian: 'JoÃ£o (Pai)', phone: '11988888888',
    photo: getBoyPhoto(2), position: 'Zagueiro', goals: 2, assists: 1, attendance: 85, yellowCard: true, paymentStatus: 'paid', accessCode: 'RC-2222'
  },
  {
    id: 3, name: 'Mateus Oliveira', age: 10, category: 'sub11', guardian: 'Ana (MÃ£e)', phone: '11977777777',
    photo: getBoyPhoto(3), position: 'Meia', goals: 5, assists: 8, attendance: 95, yellowCard: false, paymentStatus: 'paid', accessCode: 'RC-3333'
  },
  {
    id: 4, name: 'Gabriel Costa', age: 13, category: 'sub13', guardian: 'Carlos (Pai)', phone: '11966666666',
    photo: getBoyPhoto(4), position: 'Goleiro', goals: 0, assists: 0, attendance: 100, yellowCard: false, paymentStatus: 'review', accessCode: 'RC-4444'
  },
  {
    id: 5, name: 'Felipe Mendes', age: 14, category: 'sub15', guardian: 'Roberto (Pai)', phone: '11955555555',
    photo: getBoyPhoto(5), position: 'Atacante', goals: 9, assists: 2, attendance: 80, yellowCard: false, paymentStatus: 'pending', accessCode: 'RC-5555'
  },
];

const initialWaitlist = [
  { id: 101, name: 'Rafael Souza', age: 11, guardian: 'Fernanda', phone: '11955555555', date: 'HÃ¡ 2 dias' },
  { id: 102, name: 'Thiago Lima', age: 14, guardian: 'Roberto', phone: '11944444444', date: 'HÃ¡ 4 dias' },
];

// --- STYLES & THEMING ---
const ThemeStyles = () => (
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
      --brand-gold: #FF6D00;
      --accent: #E50000;
      --accent-gold: #FF6D00;
    }
    
    .font-oswald { font-family: 'Oswald', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-massive { font-family: 'Anton', sans-serif; letter-spacing: 0.04em; }
    .font-headline { font-family: 'Space Grotesk', sans-serif; }
    .font-brand { font-family: 'Space Grotesk', sans-serif; }
    
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

    /* CSS Customizado Elite Performance (Perfil) */
    .dot-matrix-elite {
        background-image: radial-gradient(#FF6D00 0.5px, transparent 0.5px);
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
    
    /* Holographic Pulse Glow Effect */
    @keyframes pulse-holo-glow {
        0%, 100% { box-shadow: 0 0 15px var(--card-glow, rgba(255,255,255,0.05)); }
        50% { box-shadow: 0 0 35px var(--card-glow, rgba(255,255,255,0.2)); }
    }
    .card-holo-glow {
        animation: pulse-holo-glow 4s ease-in-out infinite;
    }
  `}</style>
);

const ColorStripe = () => (
  <div className="w-full h-[3px] flex z-20 relative shrink-0">
    <div className="flex-1 bg-[var(--brand-blue)]" />
    <div className="flex-1 bg-[var(--brand-green)]" />
    <div className="flex-1 bg-[var(--brand-red)]" />
    <div className="flex-1 bg-[var(--brand-purple)]" />
    <div className="flex-1 bg-[var(--brand-gold)]" />
  </div>
);

function NavItem({ icon: Icon, label, isActive, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center justify-start pt-3 flex-1 h-full transition-all ${isActive ? 'text-[#FF6D00] border-t-[3px] border-[#FF6D00]' : 'text-white/40 hover:text-white/90 border-t-[3px] border-transparent'}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} className="mb-1.5" />
      <span className="font-inter font-bold text-[9px] tracking-widest uppercase">
        {label}
      </span>
    </button>
  );
}

function useNavbarLogic(scrollRef) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;
      if (currentScrollY < 0) return; 

      const isAtTop = currentScrollY <= 10;
      const isAtBottom = currentScrollY + container.clientHeight >= container.scrollHeight - 10;

      if (isAtTop || isAtBottom) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY - 2) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 2) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollRef]);

  return isVisible;
}

export default function App() {
  const scrollRef = React.useRef(null);
  const isNavbarVisible = useNavbarLogic(scrollRef);
  const [loading, setLoading] = useState(true);
  
  const [role, setRole] = useState(() => loadJSON(STORAGE_KEYS.role, null, STORAGE_VERSION));
  const [students, setStudents] = useState(() => loadJSON(STORAGE_KEYS.students, initialStudents, STORAGE_VERSION));
  const [authFormActive, setAuthFormActive] = useState<'none' | 'gestor' | 'responsavel'>('none');
  const [authInput, setAuthInput] = useState('');
  const [waitlist, setWaitlist] = useState(() => loadJSON(STORAGE_KEYS.waitlist, initialWaitlist, STORAGE_VERSION));
  const [gestorTab, setGestorTab] = useState(() => loadJSON(STORAGE_KEYS.gestorTab, 'alunos', STORAGE_VERSION));
  const [responsavelTab, setResponsavelTab] = useState(() => loadJSON(STORAGE_KEYS.responsavelTab, 'meuFilho', STORAGE_VERSION));
  const [selectedStudentId, setSelectedStudentId] = useState(() => loadJSON(STORAGE_KEYS.selectedStudentId, initialStudents[0]?.id ?? null, STORAGE_VERSION));

  const [viewingProfileId, setViewingProfileId] = useState(null);
  const [loginRotateX, setLoginRotateX] = useState(0);
  const [loginRotateY, setLoginRotateY] = useState(0);

  const [isFocusMode, setIsFocusMode] = useState(false);
  const [confirmation, setConfirmation] = useState<{isOpen: boolean, title: string, message: string, onConfirm: () => void} | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => saveJSON(STORAGE_KEYS.role, role, STORAGE_VERSION), [role]);
  useEffect(() => saveJSON(STORAGE_KEYS.students, students, STORAGE_VERSION), [students]);
  useEffect(() => saveJSON(STORAGE_KEYS.waitlist, waitlist, STORAGE_VERSION), [waitlist]);
  useEffect(() => saveJSON(STORAGE_KEYS.gestorTab, gestorTab, STORAGE_VERSION), [gestorTab]);
  useEffect(() => saveJSON(STORAGE_KEYS.responsavelTab, responsavelTab, STORAGE_VERSION), [responsavelTab]);
  useEffect(() => saveJSON(STORAGE_KEYS.selectedStudentId, selectedStudentId, STORAGE_VERSION), [selectedStudentId]);

  const logout = () => {
    setRole(null);
    setViewingProfileId(null);
  };

  const activeStudent = useMemo(() => {
    if (!selectedStudentId) return students[0] ?? null;
    return students.find((s) => s.id === selectedStudentId) ?? students[0] ?? null;
  }, [selectedStudentId, students]);

  if (loading) {
    return (
      <div className="h-[100dvh] w-full bg-[#020204] flex flex-col justify-center items-center relative overflow-hidden diagonal-bg">
        <ThemeStyles />
        <div className="absolute inset-0 telemetry-grid-html opacity-30 pointer-events-none z-0" />
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="laser-line top-[25%] rotate-[15deg] scale-150 opacity-20" />
          <div className="laser-line top-[50%] -rotate-[10deg] scale-150 opacity-20" />
          <div className="laser-line top-[75%] rotate-[5deg] scale-150 opacity-20" />
        </div>
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="w-12 h-12 border-t-2 border-r-2 border-[var(--pit-secondary)] rounded-full animate-spin mb-6" />
          <span className="font-brand tracking-[0.5em] text-[var(--pit-secondary)] text-[10px] uppercase animate-pulse">
            Iniciando Sistema...
          </span>
        </div>
      </div>
    );
  }

  // ==============================================
  // TELA DE ENTRADA (ACESSO PIT WALL)
  // ==============================================
  const handleLoginMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setLoginRotateX(((y - centerY) / centerY) * -20);
    setLoginRotateY(((x - centerX) / centerX) * 20);
  };

  if (!role) {
    return (
      <div className="h-[100dvh] w-full bg-[#020204] flex justify-center text-[var(--text-main)] overflow-hidden">
        <ThemeStyles />
        {/* Background Effects (Claudius Forms) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7a45f0]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-[#FF6D00]/5 rounded-full blur-[100px] animate-[pulse_8s_infinite]" />
        </div>

        {/* Noise Texture (Claudius Rock Feel) */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <div className="w-full max-w-md h-full flex flex-col relative border-x border-white/5 diagonal-bg">
          <div className="absolute inset-0 telemetry-grid-html opacity-30 pointer-events-none z-0" />
          
          <div className="absolute left-0 top-0 h-full w-12 md:w-20 flex items-center justify-center z-0 pointer-events-none">
            <h2 className="vertical-text font-massive text-6xl md:text-8xl tracking-[0.1em] text-white/5 uppercase select-none">
              CENTRAL <span className="text-[var(--pit-secondary)]/10">TÃTICA</span>
            </h2>
          </div>
          <div className="absolute right-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-[var(--pit-secondary)]/20 to-transparent pointer-events-none z-0" />
          <div className="absolute right-4 top-1/3 flex flex-col gap-1 pointer-events-none z-0">
            <div className="w-1 h-1 bg-white/20" />
            <div className="w-1 h-1 bg-white/20" />
            <div className="w-1 h-4 bg-[var(--pit-secondary)]/40" />
            <div className="w-1 h-1 bg-white/20" />
          </div>

          <main className="relative z-10 flex flex-col flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pl-16 pt-4 animate-in fade-in duration-1000">
            <header className="w-full flex justify-end px-6 py-6 shrink-0">
              <div className="flex flex-col items-end gap-1 border-r-2 border-[var(--pit-secondary)] pr-4">
                <span className="text-[10px] font-brand tracking-[0.4em] text-[var(--pit-secondary)]">SISTEMA_ONLINE_V.8.0</span>
                <span className="text-[8px] font-brand tracking-[0.2em] text-white/40">MÃ“DULO_RC_TÃTICO</span>
              </div>
            </header>

            <div className="flex flex-col items-center justify-center gap-12 px-6 pt-4 pb-8 shrink-0" style={{ perspective: '1000px' }}>
              <div className="relative group w-56 h-56 flex items-center justify-center">
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-[var(--pit-secondary)]/40 pointer-events-none" />
                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[var(--pit-primary)]/40 pointer-events-none" />

                <motion.div 
                  className="relative w-full h-full flex items-center justify-center"
                  onMouseMove={handleLoginMouseMove}
                  onMouseLeave={() => { setLoginRotateX(0); setLoginRotateY(0); }}
                  animate={{ 
                    rotateX: loginRotateX !== 0 ? loginRotateX : [2, -2, 2], 
                    rotateY: loginRotateY !== 0 ? loginRotateY : [-12, 12, -12],
                    y: [-3, 3, -3],
                    rotateZ: [-1, 1, -1] 
                  }}
                  transition={{ 
                    rotateX: loginRotateX !== 0 ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotateY: loginRotateY !== 0 ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm -skew-x-12 border-l-4 border-[var(--pit-primary)]/50" />
                  <img alt="Real Casa" className="w-44 h-44 object-contain logo-obscure brightness-90 contrast-125 relative z-20 mix-blend-screen" src={CREST_URL} />
                </motion.div>
              </div>

              <div className="flex flex-col items-center text-center z-40 w-full">
                <h1 className="font-massive italic text-6xl text-white uppercase leading-none drop-shadow-md">
                  REAL CASA<br />
                  <span className="text-[var(--pit-secondary)] drop-shadow-[0_0_10px_rgba(255,202,40,0.3)]">ESPORTES</span>
                </h1>
                <p className="mt-5 font-headline text-[10px] tracking-[0.8em] text-white/40 uppercase pl-1 border-l-2 border-[var(--pit-primary)]">
                  Acesso de Alta Performance
                </p>
              </div>
            </div>

            <div className="relative w-full py-8 px-4 shrink-0 mt-4 mb-8 min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {authFormActive === 'none' && (
                  <motion.div key="buttons" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full grid grid-cols-1 gap-14 relative">
                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden -mx-8">
                      <div className="laser-line top-[5%] rotate-[8deg] scale-150" />
                      <div className="laser-line top-[50%] -rotate-[6deg] scale-150" />
                      <div className="laser-line bottom-[5%] rotate-[7deg] scale-150" />
                    </div>

                    <button onClick={() => setAuthFormActive('gestor')} className="slashed-module group relative h-32 bg-[var(--pit-primary)]/10 border-l-[8px] border-[var(--pit-primary)] overflow-hidden flex items-center px-6 hover:bg-[var(--pit-primary)]/20 active:scale-95 shadow-[0_0_20px_rgba(106,27,154,0.1)] card-holo-glow" style={{ "--card-glow": "rgba(106,27,154,0.2)" } as any}>
                      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <motion.div 
                          animate={{ left: ["-100%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                          className="absolute h-[250%] w-12 bg-gradient-to-r from-transparent via-white to-transparent rotate-[35deg] -top-1/2" 
                        />
                      </div>
                      <div className="flex items-center gap-4 z-10 translate-x-1 pointer-events-none">
                        <motion.div 
                          animate={{ boxShadow: ["0 0 10px rgba(106,27,154,0.4)", "0 0 25px rgba(106,27,154,0.7)", "0 0 10px rgba(106,27,154,0.4)"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="w-12 h-12 bg-[var(--pit-primary)]/20 rounded-full flex items-center justify-center border border-[var(--pit-primary)]/50 shrink-0"
                        >
                          <Shield size={22} className="text-[var(--pit-primary)]" />
                        </motion.div>
                        <div className="text-left flex flex-col justify-center">
                          <h3 className="font-massive italic text-3xl text-white uppercase leading-none mt-1">GESTOR</h3>
                          <p className="text-[9px] tracking-[0.2em] text-[var(--pit-primary)] font-bold whitespace-nowrap mt-1 uppercase">LEITURA_TÃ‰CNICA_V.04</p>
                          <p className="text-[8px] font-brand tracking-[0.1em] text-white/40 mt-1 uppercase">Beta: Senha 1234</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-10 h-10 bg-[var(--pit-primary)]/30 flex items-center justify-center group-hover:bg-[var(--pit-primary)] transition-colors pointer-events-none">
                        <motion.svg animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></motion.svg>
                      </div>
                    </button>

                    <button onClick={() => setAuthFormActive('responsavel')} className="slashed-module group relative h-32 bg-[var(--pit-secondary)]/5 border-l-[8px] border-[var(--pit-secondary)] overflow-hidden flex items-center px-6 hover:bg-[var(--pit-secondary)]/10 active:scale-95 card-holo-glow" style={{ "--card-glow": "rgba(255,202,40,0.2)" } as any}>
                      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <motion.div 
                          animate={{ left: ["-100%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                          className="absolute h-[250%] w-12 bg-gradient-to-r from-transparent via-white to-transparent rotate-[35deg] -top-1/2" 
                        />
                      </div>
                      <div className="flex items-center gap-4 z-10 translate-x-1 pointer-events-none">
                        <motion.div 
                          animate={{ boxShadow: ["0 0 10px rgba(255,202,40,0.3)", "0 0 25px rgba(255,202,40,0.6)", "0 0 10px rgba(255,202,40,0.3)"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="w-12 h-12 bg-[var(--pit-secondary)]/20 rounded-full flex items-center justify-center border border-[var(--pit-secondary)]/50 shrink-0"
                        >
                          <UserIcon size={22} className="text-[var(--pit-secondary)]" />
                        </motion.div>
                        <div className="text-left flex flex-col justify-center">
                          <h3 className="font-massive italic text-3xl text-white uppercase leading-none mt-1">RESPONSÃVEL</h3>
                          <p className="text-[9px] tracking-[0.2em] text-[var(--pit-secondary)] font-bold whitespace-nowrap mt-1 uppercase">ACESSO_ATLETA_02</p>
                          <p className="text-[8px] font-brand tracking-[0.1em] text-white/40 mt-1 uppercase">Beta: Ex: RC-1111</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-10 h-10 bg-[var(--pit-secondary)]/30 flex items-center justify-center group-hover:bg-[var(--pit-secondary)] transition-colors pointer-events-none">
                        <motion.svg animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></motion.svg>
                      </div>
                    </button>
                  </motion.div>
                )}

                {authFormActive === 'gestor' && (
                  <motion.form key="gestor-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="slashed-module w-full relative bg-[#020204]/80 backdrop-blur-xl border border-[var(--pit-primary)] p-6 z-20" onSubmit={(e) => { e.preventDefault(); if (authInput === '1234') { setRole('gestor'); setAuthFormActive('none'); } else { toast.error('Senha incorreta', { style: { background: '#E50000', color: '#fff', border: 'none' }}); setAuthInput(''); } }}>
                    <button type="button" onClick={() => { setAuthFormActive('none'); setAuthInput(''); }} className="absolute top-4 right-4 text-white/40 hover:text-[var(--pit-primary)] transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="flex items-center gap-3 mb-6 mt-2">
                      <Shield className="text-[var(--pit-primary)]" size={32} />
                      <div>
                        <h2 className="font-massive italic text-2xl text-white tracking-wider uppercase leading-none">Acesso Gestor</h2>
                        <span className="text-[9px] text-[var(--pit-primary)] uppercase tracking-widest block mt-1">Protocolo Alfa</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <input type="password" value={authInput} onChange={(e) => setAuthInput(e.target.value)} placeholder="INSERIR SENHA" autoFocus className="w-full bg-black/50 border border-[var(--pit-primary)]/40 p-5 font-brand text-sm tracking-[0.3em] text-white outline-none focus:border-[var(--pit-primary)] text-center transition-all slashed-input placeholder:text-white/20" />
                      <button type="submit" className="w-full h-14 bg-[var(--pit-primary)] text-white font-massive italic text-xl uppercase tracking-widest hover:bg-[var(--pit-primary)]/80 transition-colors slashed-button flex justify-center items-center gap-2">
                        Autorizar
                      </button>
                    </div>
                  </motion.form>
                )}

                {authFormActive === 'responsavel' && (
                  <motion.form key="responsavel-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="slashed-module w-full relative bg-[#020204]/80 backdrop-blur-xl border border-[var(--pit-secondary)] p-6 z-20" onSubmit={(e) => { e.preventDefault(); const t = authInput.trim().toUpperCase(); const found = students.find(s => s.accessCode === t); if (found) { setSelectedStudentId(found.id); setRole('responsavel'); setAuthFormActive('none'); } else { toast.error('Token invÃ¡lido ou nÃ£o encontrado', { style: { background: '#E50000', color: '#fff', border: 'none' }}); setAuthInput(''); } }}>
                    <button type="button" onClick={() => { setAuthFormActive('none'); setAuthInput(''); }} className="absolute top-4 right-4 text-white/40 hover:text-[var(--pit-secondary)] transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="flex items-center gap-3 mb-6 mt-2">
                      <UserIcon className="text-[var(--pit-secondary)]" size={32} />
                      <div>
                        <h2 className="font-massive italic text-2xl text-white tracking-wider uppercase leading-none">Acesso Atleta</h2>
                        <span className="text-[9px] text-[var(--pit-secondary)] uppercase tracking-widest block mt-1">Protocolo de Entrada</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <input type="text" value={authInput} onChange={(e) => setAuthInput(e.target.value)} placeholder="INSERIR TOKEN" autoFocus className="w-full bg-black/50 border border-[var(--pit-secondary)]/40 p-5 font-brand text-sm tracking-[0.3em] text-white outline-none focus:border-[var(--pit-secondary)] text-center transition-all slashed-input placeholder:text-white/20 uppercase" />
                      <button type="submit" className="w-full h-14 bg-[var(--pit-secondary)] text-black font-massive italic text-xl uppercase tracking-widest hover:bg-[var(--pit-secondary)]/80 transition-colors slashed-button flex justify-center items-center gap-2">
                        Acessar Portal
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <footer className="mt-auto border-t border-white/10 bg-black/60 backdrop-blur-xl pb-safe relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="px-6 py-5 flex items-center justify-between w-full relative overflow-hidden">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-[var(--pit-primary)] shadow-[0_0_8px_var(--pit-primary)]" />
                    <span className="text-[9px] font-oswald tracking-[0.2em] text-white/70 uppercase">ACESSO GESTOR</span>
                  </div>
                  <span className="text-[7px] font-brand tracking-widest text-[var(--pit-primary)] uppercase">ZONA_ROXA_TÃTICA</span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-oswald tracking-[0.2em] text-white/70 uppercase">ACESSO ATLETA</span>
                    <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="w-1.5 h-1.5 rounded-full bg-[var(--pit-secondary)] shadow-[0_0_8px_var(--pit-secondary)]" />
                  </div>
                  <span className="text-[7px] font-brand tracking-widest text-[var(--pit-secondary)] uppercase">ZONA_OURO_PERFORMANCE</span>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    );
  }

  const profileToView = students.find((s) => s.id === viewingProfileId);

  return (
    <div className="h-[100dvh] w-full bg-[#020204] flex justify-center text-[var(--text-main)] overflow-hidden">
      <ThemeStyles />
      <Toaster position="top-center" theme="dark" />
      <div className="w-full max-w-md bg-[#020204] h-full flex flex-col relative border-x border-[var(--border-subtle)] overflow-hidden">
        
        {role === 'gestor' && !viewingProfileId && (
          <div className="absolute top-6 right-8 z-[60]">
            <button 
              onClick={logout}
              className="w-8 h-8 flex items-center justify-center text-white/20 hover:text-white/60 transition-all hover:bg-white/5 rounded-full active:scale-95"
              title="Sair do Sistema"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        )}

        <main ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col z-10 bg-[#020204]">
          <AnimatePresence mode="wait">
            {role === 'gestor' && (
              <motion.div key={gestorTab} variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col flex-1 origin-top" style={{ willChange: 'opacity, transform' }}>
                {gestorTab === 'home' && <HomeGestor setGestorTab={setGestorTab} />}
                {gestorTab === 'alunos' && <RosterView students={students} setStudents={setStudents} onOpenProfile={setViewingProfileId} isFocusMode={isFocusMode} />}
                {gestorTab === 'chamada' && <AttendanceView students={students} />}
                {gestorTab === 'scout' && <ScoutView students={students} setStudents={setStudents} onConfirmAction={setConfirmation} />}
                {gestorTab === 'financeiro' && <FinanceView students={students} setStudents={setStudents} onConfirmAction={setConfirmation} />}
                {gestorTab === 'vagas' && <AvisosView student={null} isGestorView={true} />}
              </motion.div>
            )}
            {role === 'responsavel' && (
              <motion.div key={responsavelTab} variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col flex-1 origin-top" style={{ willChange: 'opacity, transform' }}>
                {responsavelTab === 'meuFilho' && <AthleteResponsavel student={activeStudent} allStudents={students} onSelectStudent={setSelectedStudentId} isParentView={true} />}
                {responsavelTab === 'mensalidade' && <MensalidadeView student={activeStudent} />}
                {responsavelTab === 'avisos' && <AvisosView student={activeStudent} />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {viewingProfileId && profileToView && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute inset-0 z-50 bg-[#1a1a1e] flex flex-col">
              <div className="flex-1 overflow-y-auto no-scrollbar relative">
                <AthleteResponsavel student={profileToView} isParentView={false} onClose={() => setViewingProfileId(null)} />
              </div>
            </motion.div>
          )}
          {confirmation?.isOpen && (
            <HudConfirmationModal 
              isOpen={confirmation.isOpen}
              title={confirmation.title}
              message={confirmation.message}
              onConfirm={confirmation.onConfirm}
              onCancel={() => setConfirmation(null)}
            />
          )}
        </AnimatePresence>

         {/* Novo Navbar baseando-se na imagem Elite Performance */}
        {role === 'gestor' ? (
          <motion.nav 
            initial={{ y: 150 }} 
            animate={{ y: isNavbarVisible ? 0 : 150 }} 
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
            className="absolute bottom-0 left-0 w-full h-[84px] bg-[#020204]/95 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center z-50 pb-safe px-2 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
          >
            <button onClick={() => setGestorTab('home')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {gestorTab === 'home' && (
                <motion.div layoutId="navIndicatorGestor" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-8 h-[2px] bg-[#00e5ff] shadow-[0_1px_5px_#00e5ff]" />
              )}
              <span 
                className={`material-symbols-outlined text-[24px] mb-1 transition-colors ${gestorTab === 'home' ? 'text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]' : 'text-white/40 group-hover:text-[#00e5ff]/70'}`} 
                style={{ fontVariationSettings: gestorTab === 'home' ? '"FILL" 1' : '"FILL" 0' }}
              >
                dashboard
              </span>
              <span className={`font-inter text-[8px] font-bold uppercase tracking-[0.1em] transition-colors ${gestorTab === 'home' ? 'text-[#00e5ff]' : 'text-white/40 group-hover:text-[#00e5ff]/70'}`}>
                InÃ­cio
              </span>
            </button>

            <button onClick={() => setGestorTab('alunos')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {gestorTab === 'alunos' && (
                <motion.div layoutId="navIndicatorGestor" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-8 h-[2px] bg-[#FF6D00] shadow-[0_1px_5px_#FF6D00]" />
              )}
              <span 
                className={`material-symbols-outlined text-[24px] mb-1 transition-colors ${gestorTab === 'alunos' ? 'text-[#FF6D00] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' : 'text-white/40 group-hover:text-[#FF6D00]/70'}`} 
                style={{ fontVariationSettings: gestorTab === 'alunos' ? '"FILL" 1' : '"FILL" 0' }}
              >
                groups
              </span>
              <span className={`font-inter text-[8px] font-bold uppercase tracking-[0.1em] transition-colors ${gestorTab === 'alunos' ? 'text-[#FF6D00]' : 'text-white/40 group-hover:text-[#FF6D00]/70'}`}>
                Alunos
              </span>
            </button>

            <button onClick={() => setGestorTab('chamada')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {gestorTab === 'chamada' && (
                <motion.div layoutId="navIndicatorGestor" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-8 h-[2px] bg-[#FF6D00] shadow-[0_1px_5px_#FF6D00]" />
              )}
              <span 
                className={`material-symbols-outlined text-[24px] mb-1 transition-colors ${gestorTab === 'chamada' ? 'text-[#FF6D00] drop-shadow-[0_0_8px_rgba(255,109,0,0.5)]' : 'text-white/40 group-hover:text-[#FF6D00]/70'}`} 
                style={{ fontVariationSettings: gestorTab === 'chamada' ? '"FILL" 1' : '"FILL" 0' }}
              >
                checklist
              </span>
              <span className={`font-inter text-[8px] font-bold uppercase tracking-[0.1em] transition-colors ${gestorTab === 'chamada' ? 'text-[#FF6D00]' : 'text-white/40 group-hover:text-[#FF6D00]/70'}`}>
                Chamada
              </span>
            </button>

            <button onClick={() => setGestorTab('scout')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {gestorTab === 'scout' && (
                <motion.div layoutId="navIndicatorGestor" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-8 h-[2px] bg-[#E50000] shadow-[0_1px_5px_#E50000]" />
              )}
              <span 
                className={`material-symbols-outlined text-[24px] mb-1 transition-colors ${gestorTab === 'scout' ? 'text-[#E50000] drop-shadow-[0_0_8px_rgba(229,0,0,0.5)]' : 'text-white/40 group-hover:text-[#E50000]/70'}`} 
                style={{ fontVariationSettings: gestorTab === 'scout' ? '"FILL" 1' : '"FILL" 0' }}
              >
                monitoring
              </span>
              <span className={`font-inter text-[8px] font-bold uppercase tracking-[0.1em] transition-colors ${gestorTab === 'scout' ? 'text-[#E50000]' : 'text-white/40 group-hover:text-[#E50000]/70'}`}>
                Scout
              </span>
            </button>

            <button onClick={() => setGestorTab('financeiro')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {gestorTab === 'financeiro' && (
                <motion.div layoutId="navIndicatorGestor" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-8 h-[2px] bg-[#00C853] shadow-[0_1px_5px_#00C853]" />
              )}
              <span 
                className={`material-symbols-outlined text-[24px] mb-1 transition-colors ${gestorTab === 'financeiro' ? 'text-[#00C853] drop-shadow-[0_0_8px_rgba(0,200,83,0.5)]' : 'text-white/40 group-hover:text-[#00C853]/70'}`} 
                style={{ fontVariationSettings: gestorTab === 'financeiro' ? '"FILL" 1' : '"FILL" 0' }}
              >
                payments
              </span>
              <span className={`font-inter text-[8px] font-bold uppercase tracking-[0.1em] transition-colors ${gestorTab === 'financeiro' ? 'text-[#00C853]' : 'text-white/40 group-hover:text-[#00C853]/70'}`}>
                FinanÃ§as
              </span>
            </button>

            <button onClick={() => setGestorTab('vagas')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {gestorTab === 'vagas' && (
                <motion.div layoutId="navIndicatorGestor" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-8 h-[2px] bg-[#7a45f0] shadow-[0_1px_5px_#7a45f0]" />
              )}
              <span 
                className={`material-symbols-outlined text-[24px] mb-1 transition-colors ${gestorTab === 'vagas' ? 'text-[#7a45f0] drop-shadow-[0_0_8px_rgba(122,69,240,0.5)]' : 'text-white/40 group-hover:text-[#7a45f0]/70'}`} 
                style={{ fontVariationSettings: gestorTab === 'vagas' ? '"FILL" 1' : '"FILL" 0' }}
              >
                campaign
              </span>
              <span className={`font-inter text-[8px] font-bold uppercase tracking-[0.1em] transition-colors ${gestorTab === 'vagas' ? 'text-[#7a45f0]' : 'text-white/40 group-hover:text-[#7a45f0]/70'}`}>
                Avisos
              </span>
            </button>
          </motion.nav>
        ) : (
          <motion.nav 
            initial={{ y: 150 }} 
            animate={{ y: isNavbarVisible ? 0 : 150 }} 
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} 
            className="absolute bottom-0 left-0 w-full h-[84px] bg-[#020204]/95 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center z-50 pb-safe px-2 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
          >
            <button onClick={() => setResponsavelTab('meuFilho')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {responsavelTab === 'meuFilho' && (
                <motion.div layoutId="navIndicatorResp" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-10 h-[2px] bg-[#f59e0b] shadow-[0_1px_5px_#f59e0b]" />
              )}
              <span 
                className={`material-symbols-outlined text-[26px] mb-1 transition-colors ${responsavelTab === 'meuFilho' ? 'text-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-white/40 group-hover:text-[#f59e0b]/70'}`} 
                style={{ fontVariationSettings: responsavelTab === 'meuFilho' ? '"FILL" 1' : '"FILL" 0' }}
              >
                sports_soccer
              </span>
              <span className={`font-inter text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${responsavelTab === 'meuFilho' ? 'text-[#f59e0b]' : 'text-white/40 group-hover:text-[#f59e0b]/70'}`}>
                Atleta
              </span>
            </button>

            <button onClick={() => setResponsavelTab('mensalidade')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {responsavelTab === 'mensalidade' && (
                <motion.div layoutId="navIndicatorResp" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-10 h-[2px] bg-[#00C853] shadow-[0_1px_5px_#00C853]" />
              )}
              <span 
                className={`material-symbols-outlined text-[26px] mb-1 transition-colors ${responsavelTab === 'mensalidade' ? 'text-[#00C853] drop-shadow-[0_0_8px_rgba(0,200,83,0.5)]' : 'text-white/40 group-hover:text-[#00C853]/70'}`} 
                style={{ fontVariationSettings: responsavelTab === 'mensalidade' ? '"FILL" 1' : '"FILL" 0' }}
              >
                payments
              </span>
              <span className={`font-inter text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${responsavelTab === 'mensalidade' ? 'text-[#00C853]' : 'text-white/40 group-hover:text-[#00C853]/70'}`}>
                FinanÃ§as
              </span>
            </button>

            <button onClick={() => setResponsavelTab('avisos')} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              {responsavelTab === 'avisos' && (
                <motion.div layoutId="navIndicatorResp" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute top-[12px] w-10 h-[2px] bg-[#7a45f0] shadow-[0_1px_5px_#7a45f0]" />
              )}
              <span 
                className={`material-symbols-outlined text-[26px] mb-1 transition-colors ${responsavelTab === 'avisos' ? 'text-[#7a45f0] drop-shadow-[0_0_8px_rgba(122,69,240,0.5)]' : 'text-white/40 group-hover:text-[#7a45f0]/70'}`} 
                style={{ fontVariationSettings: responsavelTab === 'avisos' ? '"FILL" 1' : '"FILL" 0' }}
              >
                notifications
              </span>
              <span className={`font-inter text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${responsavelTab === 'avisos' ? 'text-[#7a45f0]' : 'text-white/40 group-hover:text-[#7a45f0]/70'}`}>
                Avisos
              </span>
            </button>

            <button onClick={logout} className="relative flex flex-col items-center justify-center flex-1 h-full group">
              <span 
                className="material-symbols-outlined text-[26px] mb-1 text-white/40 group-hover:text-white/70 transition-colors" 
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                logout
              </span>
              <span className="font-inter text-[9px] font-bold uppercase tracking-[0.1em] text-white/40 group-hover:text-white/70 transition-colors">
                Sair
              </span>
            </button>
          </motion.nav>
        )}
      </div>
    </div>
  );
}

// ==============================================
// ELITE PERFORMANCE - ATHLETE VIEW
// ==============================================

function AthleteResponsavel({ student: initialStudent, allStudents = [], onSelectStudent = null, isParentView, onClose = null }) {
  const [student, setStudent] = useState({ ...initialStudent, address: 'Rua das Flores, 123 - Centro' });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditingBase, setIsEditingBase] = useState(false);
  const [editForm, setEditForm] = useState({ name: student.name, category: student.category, address: student.address });
  
  // Update state if initial student changes (like from RosterView props updates)
  useEffect(() => {
    setStudent({ ...initialStudent, address: student.address || 'Rua das Flores, 123 - Centro' });
    setEditForm({ name: initialStudent.name, category: initialStudent.category, address: student.address || 'Rua das Flores, 123 - Centro' });
  }, [initialStudent]);

  if (!student) return <div className="p-10 text-center text-white/50 font-inter">Nenhum atleta selecionado.</div>;
  
  const firstName = student.name.split(' ')[0];
  const lastName = student.name.split(' ').slice(1).join(' ');
  const categoryInfo = CATEGORIES.find(c => c.id === student.category) || CATEGORIES[0];

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Perfil do Atleta: ${student.name}`,
          text: `Acompanhe o desempenho de ${student.name} na divisÃ£o ${categoryInfo.label}.`,
          url: window.location.href,
        });
      } else {
        toast.error('Compartilhamento nÃ£o suportado neste navegador.');
      }
    } catch (error) {
      console.log('Error sharing', error);
    }
  };

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent({ ...student, photo: reader.result });
        toast.success('SincronizaÃ§Ã£o biomÃ©trica de foto de perfil atualizada!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBase = () => {
    setStudent({ ...student, ...editForm });
    setIsEditingBase(false);
    toast.success('Sistema base atualizado com sucesso!');
  };

  const handleAbsence = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
      loading: 'Enviando aviso de ausÃªncia para a comissÃ£o...',
      success: 'Falta justificada com sucesso. O treinador foi notificado.',
      error: 'Erro ao enviar aviso.'
    });
    setIsSettingsOpen(false);
  };

  return (
    <div className="w-full flex flex-col relative bg-[#14141c] min-h-full pb-32 overflow-x-hidden text-[#e5e1e8]">
      {/* Background Layer (Global Subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 dot-matrix-elite opacity-5" />
      </div>

      {/* CABEÃ‡ALHO PADRÃƒO GLOBAL */}
      <StandardHeader 
        title="MEU" 
        coloredPart="ATLETA" 
        subtitle="PERFIL DO ATLETA" 
        accentColor="#f59e0b"
        rightElement={
          <div className="flex items-center gap-4 shrink-0">
            {onClose && (
              <button onClick={onClose} className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 transition-all border border-white/10 backdrop-blur-md shadow-lg">
                <ChevronLeft size={18} className="text-white" />
              </button>
            )}
            {/* Avatar ClicÃ¡vel com Feedback Visual */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="relative w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            >
              {/* Anel Pulsante Subtil para Indicar ClicÃ¡vel */}
              <div className="absolute inset-0 rounded-full border border-[#f59e0b]/50 animate-[ping_3s_ease-out_infinite] opacity-30 group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-full border-2 border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-shadow" />
              <div className="w-full h-full rounded-full overflow-hidden relative z-10 p-[2px]">
                <img alt={student.name} className="w-full h-full object-cover rounded-full" src={student.photo} />
              </div>
            </button>
          </div>
        }
      />

      {/* HERO SECTION WITH CARD STYLE (AS SEEN IN VIDEO) */}
      <section className="relative h-[450px] mx-6 w-[calc(100%-48px)] overflow-hidden z-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 mt-6">
        {/* 1. IMAGEM DE FUNDO (PHOTO FULL & CENTERED) */}
        <img 
          alt={student.name} 
          className="absolute inset-0 w-full h-full object-cover object-center brightness-110 z-0 scale-105" 
          src={student.photo} 
        />
        
        {/* 2. MÃSCARA HUD VIGNETTE (INTEGRAÃ‡ÃƒO COM FUNDO ESCURO) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/40 to-transparent z-10" />

        {/* INFO ANCORADA NO HERO (Canto inferior esquerdo - PÃ­lula e Nome) */}
        <div className="absolute bottom-12 left-0 w-full px-10 z-30 flex flex-col items-start gap-4">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="px-3 py-1 bg-[#f59e0b]/20 border border-[#f59e0b]/40 rounded-md font-inter text-[9px] font-black tracking-[0.3em] text-[#f59e0b] uppercase backdrop-blur-md shadow-lg">
              DIV {categoryInfo.label}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="font-massive italic text-4xl text-white uppercase leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            {firstName} <span className="text-[#f59e0b]">{lastName}</span>
          </motion.h2>
        </div>
      </section>

      <div className="px-6 relative z-20 space-y-6 max-w-5xl mx-auto w-full pt-6 pb-10">
        {/* EVOLUÃ‡ÃƒO GERAL */}
        <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, amount: 0.2 }} className="glass-panel-elite p-8 relative overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-t border-t-white/10 transition-transform hover:scale-[1.01]">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#7a45f0]/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative flex flex-col items-center text-center gap-4 border-b border-white/5 pb-8">
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                <span className="font-inter text-[11px] tracking-[0.4em] font-black text-white/70 uppercase">DESEMPENHO</span>
              </div>
              <h2 className="font-massive text-6xl tracking-tight uppercase italic flex flex-col items-center justify-center -space-y-1">
                <span className="text-white relative z-10 leading-[0.85]">EVOLUÃ‡ÃƒO</span>
                <span className="text-[#f59e0b] relative z-20 leading-[0.85]">INCRÃVEL</span>
              </h2>
            </div>
            
            <div className="w-full max-w-[280px] mx-auto pt-4">
              <div className="h-[6px] w-full bg-white/5 rounded-full relative overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }} 
                   whileInView={{ width: `${student.attendance}%` }} 
                   viewport={{ once: false, amount: 0.3 }} 
                   transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1] }} 
                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7a45f0] to-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.4)] rounded-full" 
                />
              </div>
            </div>
            
            <div className="flex items-baseline justify-center gap-2 mt-4">
              <span className="font-massive text-[140px] font-black text-white leading-[0.75] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{student.attendance}</span>
              <span className="font-oswald text-5xl font-bold text-[#f59e0b]">%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="flex flex-col border-l border-white/10 pl-5 relative group cursor-help">
              <span className="font-inter text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase mb-1.5">RITMO</span>
              <p className="font-oswald text-2xl text-white font-bold tracking-wider leading-none">32.4 <span className="text-[9px] text-white/40 block mt-1 tracking-[0.2em] font-normal font-inter">KM/H</span></p>
              
              <div className="absolute bottom-full left-5 mb-2 w-max max-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                <div className="bg-[#14141c]/95 backdrop-blur-md border border-white/5 rounded-lg p-2 shadow-xl">
                  <p className="text-[8px] font-inter text-white/70 leading-tight">MÃ©dia de velocidade atingida nos Ãºltimos treinos</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col border-l border-white/10 pl-5 relative group cursor-help">
              <span className="font-inter text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase mb-1.5">SAÃšDE</span>
              <p className="font-oswald text-[22px] text-[#f59e0b] font-bold tracking-wider uppercase leading-none mt-1">FORTE</p>
              
              <div className="absolute bottom-full left-5 mb-2 w-max max-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                <div className="bg-[#14141c]/95 backdrop-blur-md border border-white/5 rounded-lg p-2 shadow-xl">
                  <p className="text-[8px] font-inter text-white/70 leading-tight">CondiÃ§Ã£o fÃ­sica avaliada via biometria e relato</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col border-l border-white/10 pl-5 relative group cursor-help">
              <span className="font-inter text-[9px] font-bold text-white/30 tracking-[0.3em] uppercase mb-1.5">CANSAÃ‡O</span>
              <p className="font-oswald text-[22px] text-white/60 font-bold tracking-wider uppercase leading-none mt-1 underline decoration-[#f59e0b]/50 underline-offset-4">BAIXO</p>
              
              <div className="absolute bottom-full left-5 mb-2 w-max max-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                <div className="bg-[#14141c]/95 backdrop-blur-md border border-white/5 rounded-lg p-2 shadow-xl">
                  <p className="text-[8px] font-inter text-white/70 leading-tight">NÃ­vel de fadiga muscular reportado no pÃ³s-jogo</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DONUT CHARTS (1 Coluna fiel ao Mobile da Imagem) */}
        <div className="grid grid-cols-1 gap-5 pt-4">
          <DonutCard value={student.goals} max={20} label="GOLS" sub="BRILHANDO" colorHex="#f59e0b" shadowClass="donut-shadow-elite" tooltip="Total de gols marcados nesta temporada (Meta: 20)" />
          <DonutCard value={student.assists} max={15} label="ASSIST." sub="EQUIPE" colorHex="#a064ff" shadowClass="donut-shadow-violet-elite" tooltip="Passes decisivos que resultaram em gols (VisÃ£o de Jogo)" />
          <DonutCard value={Math.floor(student.attendance / 10)} max={10} label="JOGOS" sub="PRESENÃ‡A" colorHex="#f59e0b" shadowClass="donut-shadow-elite" tooltip="NÃºmero de partidas oficiais disputadas no mÃªs" />
        </div>

        {/* AÃ‡Ã•ES */}
        {isParentView && (
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/55${student.phone}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-6 w-full glass-panel-elite bg-[#0d0d10]/95 rounded-[24px] py-6 flex items-center justify-center gap-4 text-white font-inter text-xs font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all shadow-2xl border border-white/5 active:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#f59e0b]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            <span className="drop-shadow-sm">CONTATAR COMISSÃƒO</span>
          </motion.a>
        )}
      </div>

      {/* MODAL CONFIGURAÃ‡Ã•ES / COMPARTILHAR DO ATLETA (PORTAL PARA POSIÃ‡OAMENTO FIXO CORRETO) */}
      {createPortal(
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 z-[9999] flex flex-col justify-center items-center p-6 bg-black/90 backdrop-blur-sm pointer-events-auto"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-sm glass-panel-elite bg-[#0d0d10] rounded-[40px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.9)] border-t border-white/10 relative"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#f59e0b] p-[2px] overflow-hidden">
                      <img src={student.photo} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-oswald text-xl text-white font-bold leading-none uppercase">{firstName}</h3>
                      <p className="font-inter text-[10px] text-white/50 tracking-[0.2em] uppercase mt-1">OpÃ§Ãµes do Perfil</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setIsSettingsOpen(false); setIsEditingBase(false); }}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {isEditingBase ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
                      <div>
                        <label className="text-[9px] font-inter text-white/40 font-bold uppercase tracking-[0.2em]">Nome Completo</label>
                        <input 
                          type="text" 
                          value={editForm.name} 
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full mt-1 bg-[#14141c] border border-white/10 rounded-lg p-3 text-white font-inter text-sm focus:border-[#f59e0b] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-inter text-white/40 font-bold uppercase tracking-[0.2em]">Categoria HUD</label>
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                          className="w-full mt-1 bg-[#14141c] border border-white/10 rounded-lg p-3 text-white font-inter text-sm focus:border-[#f59e0b] focus:outline-none appearance-none"
                        >
                          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-inter text-white/40 font-bold uppercase tracking-[0.2em]">EndereÃ§o Completo</label>
                        <input 
                          type="text" 
                          value={editForm.address} 
                          onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                          className="w-full mt-1 bg-[#14141c] border border-white/10 rounded-lg p-3 text-white font-inter text-sm focus:border-[#f59e0b] focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                         <button onClick={() => setIsEditingBase(false)} className="flex-1 py-3 px-4 rounded-xl border border-white/10 font-oswald text-white/60 tracking-widest text-xs uppercase hover:bg-white/5">Cancelar</button>
                         <button onClick={handleSaveBase} className="flex-1 py-3 px-4 rounded-xl bg-[#f59e0b] text-black font-oswald font-bold tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(245,158,11,0.4)]">Salvar Base</button>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      {/* BotÃ£o de Compartilhar Estilo Premium WhatsApp */}
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleShare}
                        className="w-full bg-[#14141c] rounded-[28px] p-2 flex items-center justify-between text-[#f59e0b] font-inter text-xs font-black uppercase tracking-[0.2em] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 hover:border-[#f59e0b]/30 transition-all group active:scale-[0.98] outline-none"
                      >
                        <div className="flex items-center w-full">
                          <div className="w-14 h-14 bg-[#1c1c26] rounded-[22px] flex items-center justify-center border border-[#f59e0b]/20 shadow-[inset_0_0_15px_rgba(245,158,11,0.1)] group-hover:border-[#f59e0b]/40 transition-colors ml-1">
                            <Share2 size={24} className="text-[#f59e0b] drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                          </div>
                          <div className="flex-1 flex flex-col items-center justify-center -ml-2">
                             <div className="text-center font-inter font-black text-[11px] leading-tight flex flex-col items-center">
                               <span>Compartilhar</span>
                               <span className="opacity-80">Desempenho</span>
                             </div>
                          </div>
                        </div>
                      </motion.button>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <button 
                          onClick={() => setIsEditingBase(true)}
                          className="flex flex-col items-center justify-center gap-2 p-5 rounded-[28px] bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-[#f59e0b] active:scale-95"
                        >
                          <UserIcon size={24} className="text-[#f59e0b]" />
                          <span className="font-inter text-[10px] font-bold uppercase tracking-[0.1em] text-center leading-tight text-[#87868B]">Editar<br/>Base</span>
                        </button>
                        
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="relative flex flex-col items-center justify-center gap-2 p-5 rounded-[28px] bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-[#f59e0b] active:scale-95"
                        >
                          <Camera size={24} className="text-[#f59e0b]" />
                          <span className="font-inter text-[10px] font-bold uppercase tracking-[0.1em] text-center leading-tight text-[#87868B]">Nova<br/>Foto</span>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handlePhotoUpload} 
                            className="hidden" 
                            accept="image/*" 
                          />
                        </button>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAbsence}
                        className="w-full py-6 rounded-[28px] bg-white/5 border border-white/5 flex items-center justify-center gap-4 group mt-4 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:border-[#f59e0b]/20 transition-all active:scale-95"
                      >
                        <AlertTriangle size={20} className="text-[#f59e0b]" />
                        <span className="font-oswald text-[11px] font-bold tracking-[0.2em] text-[#f59e0b] uppercase">Avisar AusÃªncia no Treino</span>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// --- GESTOR VIEWS ---

function RosterView({ students, setStudents, onOpenProfile, isFocusMode }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Todos');
  const [selectedPos, setSelectedPos] = useState('Todos');
  const [selectedPay, setSelectedPay] = useState('Todos');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '', category: 'sub11', guardian: '', phone: '', position: 'NÃ£o definido', photo: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const phoneDigits = normalizePhoneBR(formData.phone);
    if (phoneDigits.length < 10) return toast.error('Telefone invÃ¡lido');
    
    // Gerador de Token no PadrÃ£o RC-XXXX
    const generatedToken = `RC-${Math.floor(1000 + Math.random() * 9000)}`;

    setStudents([...students, { 
      id: Date.now(), 
      name: formData.name, 
      age: Number(formData.age), 
      category: formData.category, 
      guardian: formData.guardian, 
      position: formData.position, 
      phone: phoneDigits, 
      photo: formData.photo || getBoyPhoto(Date.now()), 
      goals: 0, 
      assists: 0, 
      attendance: 100, 
      yellowCard: false, 
      paymentStatus: 'pending',
      accessCode: generatedToken
    }]);

    setShowForm(false);
    toast.success('Atleta cadastrado com sucesso!', { description: `Token de acesso: ${generatedToken}` });
    setFormData({ name: '', age: '', category: 'sub11', guardian: '', phone: '', position: 'NÃ£o definido', photo: '' });
  };

  const positions = ['Todos', 'Goleiro', 'Zagueiro', 'Lateral', 'Meia', 'Atacante'];
  const payStatus = [
    { id: 'Todos', label: 'Todos' },
    { id: 'paid', label: 'Pago' },
    { id: 'pending', label: 'Pendente' },
    { id: 'review', label: 'Em AnÃ¡lise' }
  ];

  const filtered = students.filter((s) => 
    s.name.toLowerCase().includes(search.toLowerCase()) && 
    (selectedCat === 'Todos' || s.category === selectedCat) &&
    (selectedPos === 'Todos' || s.position === selectedPos) &&
    (selectedPay === 'Todos' || s.paymentStatus === selectedPay)
  );

  return (
    <div className="flex flex-col flex-1 pb-32 pt-12 relative overflow-hidden bg-[#020204]">
      {/* Background HUD Layers */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 telemetry-grid-html opacity-10 pointer-events-none z-0" />

        {/* Header HUD Identity */}
      {!isFocusMode && (
        <StandardHeader 
          title="ELENCO" 
          coloredPart="TÃTICO" 
          subtitle="RECRUTAMENTO & ELENCO" 
          accentColor="#FF6D00" 
          rightElement={
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  toast.success('BAIXANDO BANCO DE DADOS', { 
                    description: 'Roster exportado em formato CSV.',
                    style: { background: '#020204', color: '#FF6D00', border: '1px solid #FF6D0040' }
                  });
                }}
                className="w-10 h-14 bg-white/5 backdrop-blur-xl rounded-l-xl rounded-r-sm flex items-center justify-center text-[#FF6D00] shadow-inner active:scale-90 transition-transform hover:bg-[#FF6D00]/10 border border-[#FF6D00]/20"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)' }}
                title="Exportar CSV"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
              </button>
              <button 
                onClick={() => setShowForm(true)}
                className="w-14 h-14 bg-[#FF6D00] rounded-r-xl rounded-l-sm flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] active:scale-90 transition-transform hover:brightness-110"
                style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              >
                <Plus size={24} />
              </button>
            </div>
          }
        />
      )}

      <div className="px-6 space-y-6 relative z-10">
        {/* Search Input HUD */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-[#FF6D00]/50 group-focus-within:text-[#FF6D00] transition-colors" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="PROCURAR ATLETA..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full bg-[#14141c]/60 backdrop-blur-xl border border-white/5 text-white font-oswald text-xs tracking-widest rounded-r-3xl rounded-l-md py-5 pl-12 pr-4 focus:outline-none focus:border-[#FF6D00]/40 transition-all placeholder:text-white/20 uppercase" 
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
            <div className="w-1 h-3 bg-[#FF6D00]/20 rounded-full" />
            <div className="w-1 h-3 bg-[#FF6D00]/40 rounded-full" />
          </div>
        </div>

        {/* ADVANCED FILTERS HUD */}
        {!isFocusMode && (
          <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            {/* Category HUD Filters */}
            <div className="space-y-2">
              <span className="text-[7px] font-black text-[#FF6D00] uppercase tracking-[0.2em] ml-1 opacity-60">Filtrar Categoria</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {['Todos', ...CATEGORIES.map((c) => c.id)].map((cat) => {
                  const isActive = selectedCat === cat;
                  const catInfo = CATEGORIES.find(c => c.id === cat);
                  return (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCat(cat)} 
                      className={`px-4 py-1.5 rounded-sm font-headline text-[9px] tracking-widest uppercase transition-all border whitespace-nowrap
                        ${isActive 
                          ? 'bg-[#FF6D00] text-black border-[#FF6D00] shadow-[0_0_10px_rgba(255,215,0,0.3)]' 
                          : 'bg-[#14141c]/40 text-white/40 border-white/5'}`}
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                    >
                      {cat === 'Todos' ? 'Base Total' : catInfo?.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Position HUD Filters */}
            <div className="space-y-2">
              <span className="text-[7px] font-black text-[#FF6D00] uppercase tracking-[0.2em] ml-1 opacity-60">Filtrar PosiÃ§Ã£o</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {positions.map((pos) => {
                  const isActive = selectedPos === pos;
                  return (
                    <button 
                      key={pos} 
                      onClick={() => setSelectedPos(pos)} 
                      className={`px-4 py-1.5 rounded-sm font-headline text-[9px] tracking-widest uppercase transition-all border whitespace-nowrap
                        ${isActive 
                          ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                          : 'bg-[#14141c]/40 text-white/40 border-white/5'}`}
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                    >
                      {pos}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment HUD Filters */}
            <div className="space-y-2">
              <span className="text-[7px] font-black text-[#FF6D00] uppercase tracking-[0.2em] ml-1 opacity-60">Status Pagamento</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {payStatus.map((status) => {
                  const isActive = selectedPay === status.id;
                  return (
                    <button 
                      key={status.id} 
                      onClick={() => setSelectedPay(status.id)} 
                      className={`px-4 py-1.5 rounded-sm font-headline text-[9px] tracking-widest uppercase transition-all border whitespace-nowrap
                        ${isActive 
                          ? 'bg-[#00ddea] text-black border-[#00ddea] shadow-[0_0_10px_rgba(0,221,234,0.3)]' 
                          : 'bg-[#14141c]/40 text-white/40 border-white/5'}`}
                      style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                    >
                      {status.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Athlete Grid HUD */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-4 pb-24">
          {filtered.map((student) => (
            <motion.div 
              variants={itemVariant} 
              key={student.id} 
              onClick={() => onOpenProfile(student.id)} 
              className="group bg-[#14141c]/40 backdrop-blur-2xl rounded-2xl border border-white/5 p-4 flex items-center gap-4 cursor-pointer hover:bg-[#14141c]/60 hover:border-[#FF6D00]/20 transition-all relative overflow-hidden shadow-xl card-holo-glow"
              style={{ '--card-glow': 'rgba(255,215,0,0.1)' } as any}
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF6D00]/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div className="relative">
                <img 
                  src={student.photo} 
                  alt={student.name} 
                  className="w-16 h-16 rounded-xl object-cover border border-white/10 group-hover:border-[#FF6D00]/40 transition-colors" 
                />
                <div className="absolute -bottom-1 -right-1 bg-black/80 border border-white/20 px-1.5 py-0.5 rounded text-[7px] font-bold text-[#FF6D00] tracking-tighter">
                  ID.{student.id.toString().slice(-4)}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-oswald font-bold text-white text-lg tracking-tight leading-none mb-1 uppercase">
                  {student.name.split(' ')[0]} <span className="text-white/40">{student.name.split(' ').slice(1).join(' ')}</span>
                </h4>
                <div className="flex items-center gap-2">
                  <span className="font-inter text-[8px] text-[#FF6D00] font-black uppercase tracking-[0.2em]">
                    {student.category.replace('sub', 'SUB-')}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-inter text-[8px] text-white/40 font-bold uppercase tracking-[0.15em]">
                    {student.position}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {student.accessCode && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://wa.me/?text=Ol%C3%A1%2C%20o%20token%20de%20acesso%20do%20seu%20filho%20no%20Real%20Casa%20%C3%A9%3A%20${student.accessCode}`, '_blank');
                        toast.success('Link do WhatsApp aberto!');
                      }}
                      className="w-8 h-8 rounded-full bg-[#1db954]/10 flex items-center justify-center border border-[#1db954]/30 hover:bg-[#1db954] hover:text-black transition-all text-[#1db954]"
                      title="Enviar Token via WhatsApp"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </button>
                  )}
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#FF6D00] group-hover:text-black transition-all">
                    <ChevronLeft size={16} className="rotate-180" />
                  </div>
                </div>
                <div className="flex gap-1">
                  {student.accessCode && (
                    <div className="px-2 py-0.5 rounded-sm bg-[#FF6D00]/10 border border-[#FF6D00]/20">
                      <span className="text-[6px] text-[#FF6D00] font-bold uppercase tracking-widest">{student.accessCode}</span>
                    </div>
                  )}
                  {student.paymentStatus === 'pending' && (
                    <div className="px-2 py-0.5 rounded-sm bg-[#E50000]/20 border border-[#E50000]/30">
                      <span className="text-[6px] text-[#E50000] font-black uppercase tracking-tighter">Pendente</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {filtered.length === 0 && (
            <motion.div variants={itemVariant} className="bg-[#14141c]/40 backdrop-blur-xl rounded-3xl border border-white/5 p-12 text-center flex flex-col items-center gap-4">
              <Search size={32} className="text-white/10" />
              <div>
                <p className="font-oswald text-white/60 text-sm uppercase tracking-widest">Nenhum registro encontrado</p>
                <p className="font-inter text-[9px] text-white/20 uppercase mt-1">Verifique os filtros ou ID da missÃ£o</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Register Form HUD Drawer */}
      <AnimatePresence>
        {showForm && (
          <div className="absolute inset-0 z-[100] flex flex-col justify-start items-center p-6 bg-black/90 backdrop-blur-md pt-10">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#0D0D10] w-full max-w-sm mx-auto rounded-[40px] p-8 relative z-[110] border border-[#FF6D00]/30 shadow-[0_30px_70px_rgba(0,0,0,1)] max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="font-inter text-[8px] text-[#FF6D00] tracking-[0.4em] font-bold uppercase mb-1">REGISTRO DE ASPIRANTE</span>
                  <h3 className="font-massive italic text-3xl text-white tracking-widest uppercase leading-none">NOVO <span className="text-[#FF6D00]">TALENTO</span></h3>
                </div>
                <button 
                  onClick={() => setShowForm(false)} 
                  className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 border border-white/10 hover:border-white/20 transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                {/* Photo Upload Area */}
                <div className="flex justify-center mb-8">
                  <label className="relative cursor-pointer group">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <div className="w-32 h-32 rounded-3xl bg-[#14141c] border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden relative group-hover:border-[#FF6D00]/50 transition-all">
                      {formData.photo ? (
                        <img src={formData.photo} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Camera size={32} className="text-white/20 group-hover:text-[#FF6D00] transition-colors" />
                          <span className="text-[7px] text-white/20 font-black uppercase tracking-widest">SUBIR ARQUIVO</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">IdentificaÃ§Ã£o</label>
                    <input required type="text" placeholder="NOME COMPLETO" className="w-full bg-[#14141c] border border-white/5 rounded-2xl px-6 py-5 text-sm font-oswald tracking-widest text-white outline-none focus:border-[#FF6D00]/40 placeholder:text-white/10" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 space-y-1">
                      <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Cronologia</label>
                      <input required type="number" placeholder="IDADE" className="w-full bg-[#14141c] border border-white/5 rounded-2xl px-6 py-5 text-sm font-oswald tracking-widest text-white outline-none focus:border-[#FF6D00]/40 placeholder:text-white/10" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value, category: suggestCategoryByAge(Number(e.target.value)) })} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Segmento</label>
                      <select className="w-full bg-[#14141c] border border-white/5 rounded-2xl px-6 py-5 text-sm font-oswald tracking-widest text-white outline-none appearance-none cursor-pointer" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {CATEGORIES.map((c) => (<option key={c.id} value={c.id} className="bg-[#14141c]">{c.label.toUpperCase()}</option>))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">PosiÃ§Ã£o</label>
                    <select 
                      required 
                      className="w-full bg-[#14141c] border border-white/5 rounded-2xl px-6 py-5 text-sm font-oswald tracking-widest text-white outline-none appearance-none cursor-pointer focus:border-[#FF6D00]/40" 
                      value={formData.position} 
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    >
                      <option value="NÃ£o definido" disabled>SELECIONE A POSIÃ‡ÃƒO</option>
                      <option value="Goleiro" className="bg-[#14141c]">GOLEIRO</option>
                      <option value="Zagueiro" className="bg-[#14141c]">ZAGUEIRO</option>
                      <option value="Lateral" className="bg-[#14141c]">LATERAL</option>
                      <option value="Meia" className="bg-[#14141c]">MEIA</option>
                      <option value="Atacante" className="bg-[#14141c]">ATACANTE</option>
                    </select>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="space-y-1">
                      <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Tutor Legal</label>
                      <input required type="text" placeholder="NOME DO RESPONSÃVEL" className="w-full bg-[#14141c] border border-white/5 rounded-2xl px-6 py-5 text-sm font-oswald tracking-widest text-white outline-none focus:border-[#FF6D00]/40 placeholder:text-white/10" value={formData.guardian} onChange={(e) => setFormData({ ...formData, guardian: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">ComunicaÃ§Ã£o WhatsApp</label>
                      <input required type="tel" placeholder="(00) 0 0000-0000" className="w-full bg-[#14141c] border border-white/5 rounded-2xl px-6 py-5 text-sm font-oswald tracking-widest text-white outline-none focus:border-[#FF6D00]/40 placeholder:text-white/10" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>
                </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      className="w-full bg-[#FF6D00] text-black font-oswald text-xl py-5 rounded-2xl flex items-center justify-center gap-3 tracking-[0.4em] uppercase shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:brightness-110 active:scale-95 transition-all"
                    >
                      <Save size={20} /> FINALIZAR CADASTRO
                    </button>
                    <p className="text-center mt-6 text-[7px] text-white/20 font-black uppercase tracking-[0.5em]">SISTEMA DE GESTÃƒO - BASE ELITE</p>
                  </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AttendanceView({ students }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  
  const filtered = (selectedCat === 'all' ? students : students.filter((s) => s.category === selectedCat))
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    
  const totalInFilter = filtered.length;
  const presentInFilter = filtered.filter((s) => attendance[s.id] === true).length;
  const percentage = totalInFilter > 0 ? Math.round((presentInFilter / totalInFilter) * 100) : 0;

  const globalTotal = students.length;
  const globalPresent = students.filter(s => attendance[s.id] === true).length;
  const globalPercent = globalTotal > 0 ? Math.round((globalPresent / globalTotal) * 100) : 0;

  return (
    <div className="flex flex-col flex-1 pb-32 relative overflow-hidden bg-[#020204]">
      {/* Background HUD Layers */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 telemetry-grid-html opacity-10 pointer-events-none z-0" />

      <StandardHeader 
        title="PLANO" 
        coloredPart="DE CHAMADA" 
        subtitle="CONTROLE TÃTICO DE PRESENÃ‡A" 
        accentColor="#FF6D00" 
      />

      <div className="px-6 space-y-8 relative z-10 flex-1">
        
        {/* Quadro de Chamada Geral HUD */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#14141c]/60 backdrop-blur-xl border-l border-white/5 p-5 flex flex-col gap-1 rounded-2xl card-holo-glow" style={{ '--card-glow': 'rgba(255,255,255,0.05)' } as any}>
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.3em]">Total Presentes</span>
            <div className="flex items-end gap-2">
              <span className="font-massive text-3xl text-white italic">{globalPresent}</span>
              <span className="text-white/20 font-inter text-xs mb-1 font-bold">/ {globalTotal}</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: `${globalPercent}%` }} className="h-full bg-[#FF6D00]" />
            </div>
          </div>
          <div className="bg-[#14141c]/60 backdrop-blur-xl border-l border-white/5 p-5 flex flex-col gap-1 rounded-2xl card-holo-glow" style={{ '--card-glow': 'rgba(255,109,0,0.1)' } as any}>
             <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.3em]">EficiÃªncia Global</span>
             <span className="font-massive text-3xl text-[#FF6D00] italic">{globalPercent}%</span>
             <span className="text-[7px] font-inter text-white/40 font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-[#FF6D00] animate-pulse" /> Sincronizado
             </span>
          </div>
        </div>

        {/* Optimized Filters & Search */}
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-[#FF6D00]/50 group-focus-within:text-[#FF6D00] transition-colors" size={18} />
            </div>
            <input 
              type="text" 
              placeholder="PESQUISAR ATLETA..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full bg-[#14141c]/60 backdrop-blur-xl border border-white/5 text-white font-oswald text-xs tracking-widest rounded-r-3xl rounded-l-md py-5 pl-12 pr-4 focus:outline-none focus:border-[#FF6D00]/40 transition-all placeholder:text-white/20 uppercase" 
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => setSelectedCat('all')} 
              className={`flex items-center px-6 py-3 rounded-xl font-inter font-black text-[9px] tracking-[0.15em] uppercase transition-all shrink-0 border relative overflow-hidden ${
                selectedCat === 'all' 
                ? 'bg-[#FF6D00] text-black border-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.4)]' 
                : 'bg-[#14141c]/60 text-[#FF6D00]/60 border-[#FF6D00]/20'
              }`}
            >
              <div 
                className={`absolute left-0 top-1/4 bottom-1/4 w-[3.5px] rounded-full transition-all ${
                  selectedCat === 'all' ? 'bg-black/40' : 'bg-[#FF6D00] shadow-[0_0_8px_rgba(255,109,0,0.6)]'
                }`} 
              />
              <span className="ml-2">TODOS OS ESCALÃ•ES</span>
            </button>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setSelectedCat(cat.id)} 
                className={`flex items-center px-5 py-3 rounded-xl font-inter font-black text-[9px] tracking-[0.15em] uppercase transition-all shrink-0 border relative overflow-hidden ${
                  selectedCat === cat.id 
                  ? 'bg-[#FF6D00] text-black border-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.4)]' 
                  : 'bg-[#14141c]/60 text-[#FF6D00]/60 border-[#FF6D00]/20 hover:border-[#FF6D00]/40'
                }`}
              >
                {/* HUD Reference Accent Bar */}
                <div 
                  className={`absolute left-0 top-1/4 bottom-1/4 w-[3.5px] rounded-full transition-all ${
                    selectedCat === cat.id ? 'bg-black/40' : 'bg-[#FF6D00] shadow-[0_0_8px_rgba(255,109,0,0.6)]'
                  }`} 
                />
                <span className="ml-2">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Squad List HUD */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Lista de Monitoramento</span>
            <div className="h-[1px] flex-1 mx-4 bg-white/5" />
            <span className="text-[7px] font-mono text-white/20 uppercase">MODE: {selectedCat}</span>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3 pb-64">
            {filtered.map((student) => {
              const status = attendance[student.id];
              return (
                <motion.div 
                  variants={itemVariant} 
                  whileHover={{ scale: 1.01, x: 5 }}
                  key={student.id} 
                  className={`relative bg-[#14141c]/40 backdrop-blur-md rounded-2xl border transition-all duration-300 card-holo-glow shadow-[0_5px_15px_rgba(0,0,0,0.2)] ${
                    status === true ? 'border-[#FF6D00]/60 ring-1 ring-[#FF6D00]/20' : 
                    status === false ? 'border-[#E50000]/60 ring-1 ring-[#E50000]/20' : 
                    'border-white/5 hover:border-[#FF6D00]/30'
                  }`}
                  style={{ 
                    '--card-glow': status === true ? 'rgba(255, 109, 0, 0.25)' : status === false ? 'rgba(229, 0, 0, 0.25)' : 'rgba(255, 109, 0, 0.05)' 
                  } as any}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={student.photo} alt={student.name} className={`w-14 h-14 rounded-xl object-cover border transition-all duration-500 ${status === true ? 'border-[#FF6D00]' : 'border-white/10'}`} />
                      <div>
                        <h4 className="font-oswald font-bold text-white text-base tracking-wide uppercase leading-none">{student.name.split(' ').slice(0, 2).join(' ')}</h4>
                        <div className="flex items-center gap-2 mt-2">
                           <span 
                             className="px-2 py-0.5 rounded-full text-[7px] font-black uppercase border border-[#FF6D00]/30 bg-[#FF6D00]/10 text-[#FF6D00] tracking-tighter"
                           >
                             {student.category.replace('sub', 'U-')}
                           </span>
                           <span className="text-[9px] font-inter font-black text-white/30 uppercase tracking-widest">{student.position}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => setAttendance((prev) => ({ ...prev, [student.id]: true }))} 
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                          status === true 
                          ? 'bg-[#FF6D00] text-white shadow-[0_0_15px_rgba(255,109,0,0.3)]' 
                          : 'bg-white/5 text-white/20 border border-white/5'
                        }`}
                      >
                        <Check size={20} className={status === true ? "text-black" : ""} strokeWidth={3} />
                      </button>
                      <button 
                        onClick={() => setAttendance((prev) => ({ ...prev, [student.id]: false }))} 
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                          status === false 
                          ? 'bg-[#E50000] text-white shadow-[0_0_15px_rgba(229,0,0,0.3)]' 
                          : 'bg-white/5 text-white/20 border border-white/5'
                        }`}
                      >
                        <X size={20} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Float Action HUD */}
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-20">
          <button 
            onClick={() => toast.success('OPERACIONAL ATUALIZADO', { 
              description: 'RelatÃ³rio compilado e sincronizado com a Central.',
              style: { background: '#0D0D10', color: '#FF6D00', border: '1px solid #FF6D0040' }
            })} 
            className="w-full relative h-16 rounded-2xl overflow-hidden transition-all active:scale-95 shadow-[0_15px_40px_-10px_rgba(255,109,0,0.5)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6D00] to-[#FFAB00] group-hover:brightness-110 transition-all" />
            <div className="relative h-full flex items-center justify-center gap-3">
              <span className="font-brand tracking-[0.4em] text-black text-[10px] uppercase font-bold ml-1">Salvar RelatÃ³rio</span>
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-black/10" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-black/10" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoutView({ students, setStudents, onConfirmAction }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [aiLoadingId, setAiLoadingId] = useState(null);
  const [aiFeedback, setAiFeedback] = useState({});

  useEffect(() => {
    let interval;
    if (isRunning) interval = window.setInterval(() => setTime((t) => t + 1), 1000);
    return () => { if (interval) window.clearInterval(interval); };
  }, [isRunning]);

  const generateAI = async (student, e) => {
    e.stopPropagation();
    if (!process.env.GEMINI_API_KEY) {
      toast.error("Chave da API Gemini nÃ£o configurada.");
      return;
    }
    setAiLoadingId(student.id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Atue como auxiliar tÃ©cnico de futebol base. Analise: ${student.name} (${student.position}). Scout hoje: Gols: ${student.goals||0}, Ast: ${student.assists||0}, Desarmes: ${student.tackles||0}, CartÃµes: ${student.yellowCards||0}A/${student.redCards||0}V. Escreva 1 parÃ¡grafo curto (max 3 frases) com leitura tÃ¡tica reta e direta do rendimento dele no jogo, elogiando ou cobrando algo pontual.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: { thinkingConfig: { thinkingLevel: 'HIGH' } as any }
      });
      setAiFeedback(prev => ({ ...prev, [student.id]: response.text }));
      toast.success("AnÃ¡lise tÃ¡tica concluÃ­da.");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao gerar anÃ¡lise: IA IndisponÃ­vel.");
    } finally {
      setAiLoadingId(null);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  
  const handleCriticalStat = (id, type) => {
    onConfirmAction({
      isOpen: true,
      title: 'CARTÃƒO VERMELHO',
      message: 'Confirmar expulsÃ£o e registro disciplinar?',
      onConfirm: () => {
        updateStat(id, type, 1);
      }
    });
  };

  const updateStat = (id, type, amt) => {
    setStudents((p) => p.map((s) => s.id === id ? { ...s, [type]: Math.max(0, (s[type] || 0) + amt) } : s));
    if (amt > 0) {
      const labels = {
        goals: 'Gol',
        assists: 'AssistÃªncia',
        yellowCards: 'CartÃ£o Amarelo',
        redCards: 'CartÃ£o Vermelho',
        tackles: 'Desarme'
      };
      toast.success(`${labels[type]} registrado!`, { 
        style: { background: '#020204', color: '#ff4d4d', border: '1px solid #ff4d4d40' }
      });
      if (type === 'goals') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#FF6D00', '#ff4d4d', '#00ec5e'] });
    }
  };

  const filtered = students.filter((s) => s.category === 'sub15');

  const radarData = (student) => [
    { subject: 'Gols', A: student.goals || 0, fullMark: 5 },
    { subject: 'Assis.', A: student.assists || 0, fullMark: 5 },
    { subject: 'Desarmes', A: student.tackles || 2, fullMark: 10 },
    { subject: 'FÃ­sico', A: 7, fullMark: 10 },
    { subject: 'TÃ¡tico', A: 8, fullMark: 10 },
  ];

  return (
    <div className="flex flex-col flex-1 animate-in fade-in duration-300 bg-[#020204]">
      <StandardHeader 
        title="CENTRAL" 
        coloredPart="SCOUT"
        subtitle="RADAR DE PERFORMANCE TÃTICA" 
        accentColor="#ff4d4d" 
      />
      
      <div className="bg-[#14141c]/60 backdrop-blur-xl border border-white/5 p-6 flex flex-col items-center shrink-0 shadow-lg card-holo-glow rounded-3xl mx-6 mt-2 mb-4" style={{ '--card-glow': 'rgba(255,77,77,0.1)' } as any}>

        <div className="flex justify-between items-center w-full max-w-sm mx-auto gap-2">
          <span className="font-oswald font-bold text-[10px] text-white/40 tracking-[0.2em] uppercase w-20 text-center">Real Casa</span>
          <div className="flex flex-col items-center flex-1">
            <span className="font-massive italic text-5xl text-white tracking-[0.1em] leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap">2 - 0</span>
            <span className="font-inter text-[10px] font-bold tracking-[0.3em] text-[#ff4d4d] mt-3 bg-[#ff4d4d]/10 px-3 py-1 rounded-full border border-[#ff4d4d]/30 tabular-nums">{formatTime(time)}</span>
          </div>
          <span className="font-oswald font-bold text-[10px] text-white/20 tracking-[0.2em] uppercase w-20 text-center">Visitante</span>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setIsRunning(!isRunning)} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-inter font-bold uppercase tracking-widest text-white/70 hover:bg-white/10 transition-colors flex items-center gap-2">
            {isRunning ? <PauseIcon /> : <PlayIcon />} {isRunning ? 'Pausar' : 'Retomar'}
          </button>
          <button onClick={() => setTime(0)} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-inter font-bold uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors flex items-center gap-2">
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="px-6 py-8 flex-1 pb-32">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-4">
          <div className="flex justify-between items-center px-1 mb-2">
             <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Pressione para expandir HUD</span>
             <button 
                onClick={() => {
                  toast.success('DADOS EXPORTADOS', { 
                    description: 'MÃ©tricas de Scout geradas em CSV.',
                    style: { background: '#020204', color: '#ff4d4d', border: '1px solid #ff4d4d40' }
                  });
                }}
                className="flex items-center gap-1.5 text-[#ff4d4d] text-[10px] font-bold uppercase tracking-widest bg-[#ff4d4d]/10 px-3 py-1.5 rounded-full border border-[#ff4d4d]/20 hover:bg-[#ff4d4d]/20 transition-colors"
                title="Exportar CSV"
              >
                <span className="material-symbols-outlined text-[14px]">download</span> CSV
              </button>
          </div>
          {filtered.map((student) => {
            const isExpanded = expandedId === student.id;
            return (
              <motion.div 
                variants={itemVariant} 
                key={student.id} 
                className={`bg-[#14141c] rounded-3xl border overflow-hidden transition-all duration-300 relative group cursor-pointer card-holo-glow ${isExpanded ? 'border-[#ff4d4d]/50 bg-gradient-to-b from-[#ff4d4d]/10 to-transparent' : 'border-white/5 hover:border-white/20'}`}
                style={{ '--card-glow': 'rgba(255, 77, 77, 0.15)' } as any}
                onClick={() => setExpandedId(isExpanded ? null : student.id)}
              >
                {/* Expand Indicator Glow */}
                {!isExpanded && <div className="absolute inset-0 bg-gradient-to-tl from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />}

                <div className="p-5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-[#ff4d4d] to-transparent opacity-0 transition-opacity duration-300 ${isExpanded ? 'opacity-20 blur-md' : 'group-hover:opacity-10 blur-sm'}`} />
                      <img src={student.photo} className="w-16 h-16 rounded-2xl object-cover border border-white/10 relative z-10" alt="" />
                    </div>
                    <div>
                      <h4 className="font-oswald font-bold text-white text-xl tracking-tight uppercase leading-none drop-shadow-md">{student.name.split(' ')[0]}</h4>
                      <div className="flex items-center gap-1.5 mt-2 opacity-60">
                        <Activity size={10} className={isExpanded ? "text-[#ff4d4d]" : "text-white/50"} />
                        <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${isExpanded ? "text-[#ff4d4d]" : "text-white/50"}`}>{student.position}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] font-black text-[#FF6D00] uppercase tracking-widest leading-none mb-1 drop-shadow-md">Gols</span>
                      <span className="font-massive italic text-2xl text-white">{student.goals || 0}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] font-black text-[#00ec5e] uppercase tracking-widest leading-none mb-1 drop-shadow-md">Asst</span>
                      <span className="font-massive italic text-2xl text-white">{student.assists || 0}</span>
                    </div>
                    <div className="flex items-center ml-2 border-l border-white/10 pl-4">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isExpanded ? 'bg-[#ff4d4d] border-[#ff4d4d] text-white shadow-[0_0_15px_rgba(255,77,77,0.4)] rotate-180' : 'bg-white/5 border-white/10 text-white/50 group-hover:bg-white/10'}`}>
                         <ChevronDown size={16} />
                       </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <div className="p-6 pt-2 space-y-6 relative z-10" onClick={(e) => e.stopPropagation()}>
                        {/* AÃ‡Ã•ES RÃPIDAS HUD */}
                        <div className="grid grid-cols-2 gap-4 border-t border-[#ff4d4d]/20 pt-6">
                           <button onClick={(e) => { e.stopPropagation(); updateStat(student.id, 'goals', 1); }} className="bg-gradient-to-b from-[#FF6D00]/10 to-[#FF6D00]/5 border border-[#FF6D00]/30 py-6 px-4 rounded-2xl flex flex-col items-center gap-2 hover:from-[#FF6D00]/20 hover:to-[#FF6D00]/10 transition-all shadow-[0_4px_20px_-10px_rgba(255,215,0,0.3)] active:scale-95 group">
                              <span className="material-symbols-outlined text-[28px] text-[#FF6D00] group-hover:scale-110 transition-transform">sports_soccer</span>
                              <span className="text-[10px] font-black text-[#FF6D00] uppercase tracking-[0.2em]">Gol</span>
                           </button>
                           <button onClick={(e) => { e.stopPropagation(); updateStat(student.id, 'tackles', 1); }} className="bg-gradient-to-b from-[#00ec5e]/10 to-[#00ec5e]/5 border border-[#00ec5e]/30 py-6 px-4 rounded-2xl flex flex-col items-center gap-2 hover:from-[#00ec5e]/20 hover:to-[#00ec5e]/10 transition-all shadow-[0_4px_20px_-10px_rgba(0,236,94,0.3)] active:scale-95 group">
                              <span className="material-symbols-outlined text-[28px] text-[#00ec5e] group-hover:scale-110 transition-transform">security</span>
                              <span className="text-[10px] font-black text-[#00ec5e] uppercase tracking-[0.2em]">Desarme</span>
                           </button>
                           <button onClick={(e) => { e.stopPropagation(); updateStat(student.id, 'yellowCards', 1); }} className="bg-gradient-to-b from-[#ffca28]/10 to-[#ffca28]/5 border border-[#ffca28]/30 py-6 px-4 rounded-2xl flex flex-col items-center gap-2 hover:from-[#ffca28]/20 hover:to-[#ffca28]/10 transition-all shadow-[0_4px_20px_-10px_rgba(255,202,40,0.3)] active:scale-95 group">
                              <span className="material-symbols-outlined text-[28px] text-[#ffca28] group-hover:scale-110 transition-transform">style</span>
                              <span className="text-[10px] font-black text-[#ffca28] uppercase tracking-[0.2em]">Amarelo</span>
                           </button>
                           <button onClick={(e) => { e.stopPropagation(); handleCriticalStat(student.id, 'redCards'); }} className="bg-gradient-to-b from-[#ff4d4d]/10 to-[#ff4d4d]/5 border border-[#ff4d4d]/30 py-6 px-4 rounded-2xl flex flex-col items-center gap-2 hover:from-[#ff4d4d]/20 hover:to-[#ff4d4d]/10 transition-all shadow-[0_4px_20px_-10px_rgba(255,77,77,0.3)] active:scale-95 group">
                              <span className="material-symbols-outlined text-[28px] text-[#ff4d4d] group-hover:scale-110 transition-transform">style</span>
                              <span className="text-[10px] font-black text-[#ff4d4d] uppercase tracking-[0.2em]">Vermelho</span>
                           </button>
                        </div>

                        {/* AI ANALYSIS BLOCK */}
                        <div className="border-t border-[#00ddea]/20 pt-6">
                           <button onClick={(e) => generateAI(student, e)} disabled={aiLoadingId === student.id} className="w-full bg-gradient-to-r from-[#00ddea]/10 via-transparent to-transparent border border-[#00ddea]/30 py-4 px-4 rounded-xl flex items-center justify-between hover:bg-[#00ddea]/20 transition-all shadow-[0_0_15px_rgba(0,221,234,0.15)] active:scale-[0.98]">
                              <div className="flex items-center gap-3">
                                 <span className={`material-symbols-outlined text-[#00ddea] ${aiLoadingId === student.id ? 'animate-spin' : ''}`}>network_intelligence</span>
                                 <span className="text-[10px] font-black text-[#00ddea] uppercase tracking-[0.2em]">Consultar IA TÃ¡tica</span>
                              </div>
                              <ChevronRight size={16} className="text-[#00ddea]/50" />
                           </button>
                           {aiFeedback[student.id] && (
                             <div className="mt-4 p-4 bg-[#0d0d10] border border-white/10 rounded-xl">
                               <p className="text-[11px] font-inter text-white/70 leading-relaxed font-semibold">
                                 {aiFeedback[student.id]}
                               </p>
                             </div>
                           )}
                        </div>

                        {/* Radar Chart Section */}
                        <div className="h-64 w-full relative border-t border-white/5 pt-6 mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData(student)}>
                              <PolarGrid stroke="#ffffff10" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 'bold' }} />
                              <Radar name={student.name} dataKey="A" stroke="#ff4d4d" fill="#ff4d4d" fillOpacity={0.4} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function StatControl({ label, value, onDec, onInc }) {
  return (
    <div className="bg-[var(--bg-base)] p-2 rounded-2xl flex justify-between items-center border border-[var(--border-subtle)] shadow-inner">
      <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-[0.25em] ml-2">{label}</span>
      <div className="flex items-center gap-1.5">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onDec} className="w-7 h-7 flex items-center justify-center bg-[var(--bg-hover)] rounded-lg text-[var(--text-muted)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover-strong)] transition-colors"><Minus size={14} /></motion.button>
        <span className="w-6 text-center font-oswald font-bold text-lg text-[var(--text-main)]">{value}</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onInc} className="w-7 h-7 flex items-center justify-center bg-[var(--bg-hover)] rounded-lg text-[var(--text-main)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover-strong)] transition-colors"><Plus size={14} /></motion.button>
      </div>
    </div>
  );
}

function FinanceView({ students, setStudents, onConfirmAction }) {
  const [activeFilters, setActiveFilters] = useState(['review', 'pending']);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const confirmPayment = (id) => {
    onConfirmAction({
      isOpen: true,
      title: 'Validar Pagamento',
      message: 'Confirmar liquidaÃ§Ã£o deste rendimento?',
      onConfirm: () => {
        setStudents(students.map((s) => s.id === id ? { ...s, paymentStatus: 'paid' } : s));
        toast.success('Rendimento validado!', { style: { background: '#020204', color: '#10b981', border: '1px solid #10b98140' } });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#00ec5e', '#ffffff'] });
      }
    });
  };

  const pendingCount = students.filter((s) => s.paymentStatus === 'pending').length;
  const reviewCount = students.filter((s) => s.paymentStatus === 'review').length;
  const paidCount = students.filter((s) => s.paymentStatus === 'paid').length;
  const totalRevenue = paidCount * 40;
  const expectedRevenue = students.length * 40;
  const progressPercent = Math.round((paidCount / students.length) * 100);

  const filteredStudents = students.filter(s => 
    activeFilters.includes(s.paymentStatus) && 
    (searchTerm === '' || s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col flex-1 animate-in fade-in duration-500 bg-[#020204] relative">
      <TransactionDetailModal 
        isOpen={!!selectedTransaction} 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
      />
      
      {/* Background Matrix/Grid Style consistent with Athlete View */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 dot-matrix-elite opacity-5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
      </div>
      
      <div className="relative z-10 flex flex-col flex-1 pb-32">
        <StandardHeader 
          title="TELEMETRIA" 
          coloredPart="FINANCEIRA" 
          subtitle="LUCRO & FLUXO" 
          accentColor="#10b981" 
        />

        {/* FINANCIAL HERO SECTION (Replacing the simple title block) */}
        <section className="relative h-[300px] mx-6 w-[calc(100%-48px)] overflow-hidden z-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 -mt-2 bg-[#0A0A0C]">
          {/* Tech/Abstract background reflecting "Finance" */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 via-transparent to-transparent" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-transparent z-10" />

          {/* Main Hero Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pt-4">
             <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-inter text-[9px] font-black tracking-[0.4em] text-[#10b981] uppercase">CAPITAL ATUAL</span>
             </div>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="flex items-baseline gap-2 translate-y-2"
             >
                <span className="font-oswald text-4xl font-bold text-white italic">R$</span>
                <span className="font-massive text-7xl italic leading-none text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                   {totalRevenue}<span className="text-white">,00</span>
                </span>
             </motion.div>
             <p className="font-inter text-[10px] text-white/30 uppercase tracking-[0.3em] mt-6">Fluxo de Caixa Consolidado</p>
          </div>
        </section>

        <div className="px-6 mt-10 mb-2">
          <div className="flex items-center gap-3">
             <div className="w-1 h-5 bg-[#10b981] shadow-[0_0_10px_#10b981]" />
             <h3 className="font-oswald text-xs font-bold text-white tracking-[0.3em] uppercase italic">DistribuiÃ§Ã£o de Capital</h3>
          </div>
        </div>

        {/* Consolidated Financial Carousel - Unique Metrics only */}
        <section className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 no-scrollbar w-full">
          
          {/* Card 1: Performance do MÃªs */}
          <div className="snap-center shrink-0 w-[85vw] max-w-[340px]">
            <div className="bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-2xl border border-[#10b981]/20 rounded-3xl p-8 flex flex-col h-[280px] shadow-2xl relative overflow-hidden transition-all hover:border-[#10b981]/40">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] font-inter text-[#10b981] uppercase tracking-[0.2em] font-black mb-1 block">METRICA MENSAL</span>
                  <p className="font-oswald text-xl font-bold text-white tracking-widest leading-none">RENDIMENTO GLOBAL</p>
                </div>
                <div className="bg-[#10b981]/10 p-2.5 rounded-xl border border-[#10b981]/20">
                  <span className="material-symbols-outlined text-[#10b981]">trending_up</span>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-end">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-sm font-oswald text-white/40 uppercase">META: </span>
                  <span className="text-2xl font-massive text-white italic">R$ {expectedRevenue}<span className="text-[#10b981]/40 text-sm"> / MÃŠS</span></span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full">
                  <div className="h-full bg-[#10b981] rounded-full shadow-[0_0_10px_#10b981]" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Alertas de Auditoria */}
          <div className="snap-center shrink-0 w-[85vw] max-w-[340px]">
            <div className="bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-2xl border border-[#10b981]/20 rounded-3xl p-8 flex flex-col h-[280px] shadow-2xl relative overflow-hidden transition-all hover:border-[#10b981]/40">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] font-inter text-[#10b981] uppercase tracking-[0.2em] font-black mb-1 block">ALERTAS HUD</span>
                  <p className="font-oswald text-xl font-bold text-white tracking-widest leading-none">PENDÃŠNCIAS</p>
                </div>
                <div className="bg-[#10b981]/10 p-2.5 rounded-xl border border-[#10b981]/20 text-[#10b981]">
                  <span className="material-symbols-outlined">feedback</span>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-end">
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-massive italic text-white leading-none">{reviewCount + pendingCount}</span>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-inter text-white/40 uppercase font-black">CASOS</span>
                    <span className="text-[9px] font-inter text-[#10b981] uppercase font-black tracking-widest animate-pulse">VERIFICAR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Progress Tracker Block - Syncing with "EVOLUÃ‡ÃƒO INCRÃVEL" pattern */}
        <div className="px-6 mb-10">
          <motion.div 
            initial={{ y: 30, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }} 
            className="glass-panel-elite p-8 relative overflow-hidden rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative flex flex-col items-center text-center gap-4">
              <div className="space-y-4 w-full flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                  <span className="font-inter text-[11px] tracking-[0.4em] font-black text-white/70 uppercase">TAXA DE LIQUIDEZ</span>
                </div>
                <h2 className="font-massive text-5xl tracking-tight uppercase italic flex flex-col items-center justify-center -space-y-1">
                  <span className="text-white leading-[0.85]">COLETA</span>
                  <span className="text-[#10b981] leading-[0.85]">EFICIENTE</span>
                </h2>
              </div>
              
              <div className="w-full max-w-[280px] mx-auto pt-6">
                <div className="h-[8px] w-full bg-white/5 rounded-full relative overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }} 
                     whileInView={{ width: `${progressPercent}%` }} 
                     transition={{ duration: 1.5, ease: "easeOut" }} 
                     className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#10b981] to-[#014737] shadow-[0_0_20px_rgba(16,185,129,0.4)] rounded-full" 
                  />
                </div>
              </div>
              
              <div className="flex items-baseline justify-center gap-2 mt-4">
                <span className="font-massive text-8xl font-black text-white leading-[0.8] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{progressPercent}</span>
                <span className="font-oswald text-3xl font-bold text-[#10b981]">%</span>
              </div>

              <div className="flex justify-between w-full pt-6 border-t border-white/5 mt-4">
                 <div className="text-left">
                    <p className="text-[9px] font-inter text-white/30 uppercase tracking-widest mb-1">EFETUADO</p>
                    <p className="font-oswald text-xl text-white font-bold tracking-widest italic">R$ {totalRevenue}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[9px] font-inter text-white/30 uppercase tracking-widest mb-1">PROJEÃ‡ÃƒO</p>
                    <p className="font-oswald text-xl text-white/60 font-bold tracking-widest italic">R$ {expectedRevenue}</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action List Section */}
        <div className="px-6 space-y-6 border-t border-white/10 pt-8 mt-2">

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <h3 className="text-[11px] font-oswald font-bold tracking-[0.3em] text-white uppercase mt-0.5">
                Controle de Mensalidades
              </h3>
            </div>
            
            {/* Elegant Export Button */}
            <button 
              onClick={() => {
                toast.success('DADOS EXPORTADOS', { 
                  description: 'RelatÃ³rio financeiro gerado em CSV.',
                  style: { background: '#020204', color: '#10b981', border: '1px solid #10b98140' }
                });
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-inter font-black text-white/60 uppercase tracking-widest hover:text-[#10b981] hover:border-[#10b981]/30 transition-all active:scale-95"
            >
              <ReceiptText size={12} />
              Exportar
            </button>
          </div>

          {/* Filtros de Telemetria Interativos */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'paid', label: 'Pagos', icon: 'check_circle' },
              { id: 'review', label: 'AnÃ¡lise', icon: 'verified' },
              { id: 'pending', label: 'Pendentes', icon: 'error' }
            ].map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <motion.button
                  key={filter.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                      : 'bg-transparent border-white/5 opacity-50 grayscale-[50%]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl mb-1.5 transition-colors ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}>
                    {filter.icon}
                  </span>
                  <span className={`font-inter text-[8px] font-black uppercase tracking-[0.1em] ${
                    isActive ? 'text-white' : 'text-white/30'
                  }`}>
                    {filter.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={16} className="text-white/30 group-focus-within:text-white transition-colors" />
            </div>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="BUSCAR ATLETA PELO NOME..."
              className="w-full bg-[#0D0D10] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-[10px] uppercase font-inter font-bold text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all focus:bg-white/[0.04]"
            />
          </div>

          {filteredStudents.length > 0 ? (
            <div className="space-y-3">
              {filteredStudents.map((student) => {
                // Simplify colors - less saturated for UI clarity
                const stColors = {
                  'paid': { bg: 'bg-[#10b981]/10', border: 'border-[#10b981]/30', text: 'text-[#10b981]', label: 'Ciclo Atual OK', icon: 'check' },
                  'review': { bg: 'bg-white/10', border: 'border-white/30', text: 'text-white', label: 'Validar Recibo', icon: 'visibility' },
                  'pending': { bg: 'bg-transparent', border: 'border-white/10', text: 'text-white/40', label: 'Pendente', icon: 'close' }
                };

                const statStyle = stColors[student.paymentStatus as keyof typeof stColors];
                
                return (
                  <motion.div 
                    key={student.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setExpandedStudentId(expandedStudentId === student.id ? null : student.id)}
                    className="bg-[#0A0A0C]/90 backdrop-blur-3xl border border-white/10 p-5 rounded-[24px] flex flex-col hover:bg-[#0D0D10] transition-colors group relative overflow-hidden cursor-pointer"
                  >
                     <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <img src={student.photo} className="w-12 h-12 rounded-[14px] object-cover border border-white/10 grayscale-[20%]" alt="" />
                          <div className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-[#0A0A0C] flex items-center justify-center ${statStyle.bg} backdrop-blur-sm`}>
                              <span className={`material-symbols-outlined text-[10px] font-black ${statStyle.text}`}>
                                {statStyle.icon}
                              </span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0 py-0.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="font-oswald font-bold text-white/90 text-sm uppercase tracking-wider truncate">{student.name}</h4>
                              <span className="font-mono text-[8px] font-black text-white/20 tracking-widest">ID#{student.id.toString().padStart(4, '0')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <p className={`font-inter text-[8px] uppercase tracking-[0.1em] font-black flex items-center gap-1.5 ${statStyle.text}`}>
                                 {student.paymentStatus === 'review' && <span className="w-1 h-1 rounded-full bg-white animate-pulse" />}
                                 {statStyle.label}
                               </p>
                            </div>
                        </div>

                        {student.paymentStatus === 'review' ? (
                          <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => { e.stopPropagation(); confirmPayment(student.id); }}
                              className="px-4 py-2 bg-white/10 border border-white/20 text-white text-[9px] font-inter font-black uppercase tracking-[0.1em] rounded-xl hover:bg-white hover:text-black transition-all relative z-10 whitespace-nowrap"
                            >
                              LIQUIDAR
                          </motion.button>
                        ) : (
                          <div className="flex items-center gap-2 pr-1 pl-2">
                             <div className="flex flex-col items-end">
                                <span className="text-sm font-oswald font-black text-white/60 tracking-wider uppercase italic leading-none">R$ 40</span>
                                <span className="text-[7px] font-inter font-black text-white/30 uppercase mt-1">OUT/26</span>
                             </div>
                          </div>
                        )}
                     </div>

                     <AnimatePresence>
                       {expandedStudentId === student.id && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="mt-4 pt-4 border-t border-white/5"
                         >
                            <div className="flex items-center justify-between mb-3 px-1">
                              <span className="text-[9px] font-inter font-black text-white/40 uppercase tracking-widest">HistÃ³rico Completo</span>
                              <span className="text-[8px] font-inter font-bold text-white/30 uppercase tracking-widest">2026</span>
                            </div>
                            <div className="space-y-1.5 flex flex-col items-stretch">
                              {[
                                { label: 'SETEMBRO', date: '04/09' },
                                { label: 'AGOSTO', date: '05/08' },
                                { label: 'JULHO', date: '02/07' }
                              ].map((h, i) => (
                                <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-transparent hover:border-white/5 transition-colors">
                                   <div className="flex items-center gap-2">
                                      <span className="material-symbols-outlined text-[12px] text-white/20">history</span>
                                      <span className="text-[9px] font-oswald font-bold text-white/50 uppercase tracking-widest">{h.label}</span>
                                   </div>
                                   <div className="text-right">
                                      <div className="text-[10px] font-oswald font-black text-white/70 tracking-widest">R$ 40</div>
                                      <div className="text-[7px] font-inter font-bold text-white/20 uppercase mt-0.5">{h.date} â€¢ PIX</div>
                                   </div>
                                </div>
                              ))}
                            </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl opacity-50 bg-white/5">
              <span className="material-symbols-outlined text-3xl mb-3 text-white/50">filter_list_off</span>
              <span className="font-inter text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Nenhum atleta na base</span>
            </div>
          )}
        </div>

        {/* HISTÃ“RICO DE FLUXO GLOBAL (Extrato de Telemetria Horizontal Carousel) */}
        <div className="mt-8 pb-12 overflow-hidden">
          <div className="px-6 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 bg-[#10b981] shadow-[0_0_12px_#10b981]" />
              <h3 className="font-oswald text-xs font-bold text-white tracking-[0.3em] uppercase">Telemetria de Fluxo</h3>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-[#10b981] rounded-full animate-ping" />
               <span className="text-[9px] font-inter font-black text-white/30 uppercase tracking-widest mt-1">Live Feed</span>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 no-scrollbar pb-6">
            {[
              { athlete: 'Lucas G. Silva', val: '40', date: '18 ABR, 05:42', type: 'PIX_RECC', status: 'verified' },
              { athlete: 'Gabriel Mendes', val: '40', date: '17 ABR, 15:20', type: 'PIX_RECC', status: 'verified' },
              { athlete: 'Enzo Rodrigues', val: '40', date: '16 ABR, 11:05', type: 'PIX_RECC', status: 'verified' },
              { athlete: 'Matheus Santos', val: '40', date: '15 ABR, 08:30', type: 'PIX_RECC', status: 'verified' },
              { athlete: 'Pedro Henrique', val: '40', date: '15 ABR, 07:45', type: 'PIX_RECC', status: 'verified' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTransaction(item)}
                className="snap-center shrink-0 w-[85vw] max-w-[320px]"
              >
                <div className="bg-gradient-to-br from-[#14141c]/80 to-transparent backdrop-blur-2xl border border-white/5 p-6 rounded-[32px] flex items-center justify-between hover:border-[#10b981]/30 transition-all card-holo-glow h-[140px] cursor-pointer" style={{ '--card-glow': 'rgba(16, 185, 129, 0.1)' } as any}>
                  <div className="flex items-center gap-4">
                    {/* Pegada Imagem Referencial: Data Grande */}
                    <div className="flex flex-col items-center justify-center border-r border-white/5 pr-4 min-w-[60px]">
                       <span className="text-[42px] font-massive italic font-black text-[#10b981] leading-none tracking-tighter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">{item.date.split(' ')[0]}</span>
                       <span className="text-xs font-oswald font-bold text-[#10b981] uppercase tracking-[0.2em]">{item.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[12px] font-oswald font-bold text-white tracking-[0.1em] uppercase leading-none truncate max-w-[100px]">{item.athlete.split(' ')[0]}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-inter font-bold text-white/30 uppercase tracking-[0.1em]">LIQUIDADO {item.date.split(',')[1]}</span>
                      </div>
                      <div className="mt-3">
                         <span className="text-[8px] font-inter font-bold text-[#10b981]/60 uppercase px-2 py-0.5 border border-[#10b981]/20 rounded bg-[#10b981]/5">REF-{item.type.split('_')[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xl font-oswald font-black text-white italic tracking-tighter">R$ {item.val}</div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[#10b981] group-hover:bg-[#10b981] group-hover:text-black transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* End Card Spacer/Indicator */}
            <div className="snap-center shrink-0 w-20 flex items-center justify-center opacity-10">
              <span className="material-symbols-outlined text-4xl">more_horiz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==============================================
// ELITE PERFORMANCE - ATHLETE VIEW
// ==============================================
export function HomeGestor({ setGestorTab }: { setGestorTab: (tab: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col flex-1 pb-[120px] relative text-white bg-[#020204] overflow-x-hidden min-h-screen font-inter"
    >
      {/* Malha TÃ©lemÃ©trica Dourada Sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'linear-gradient(#FF6D00 1px, transparent 1px), linear-gradient(90deg, #FF6D00 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-[#00e5ff]/5 to-transparent pointer-events-none mix-blend-overlay" />
      
      {/* HUD Scanline Effect for immersion */}
      <div className="hud-scanline opacity-20" />
      
      <StandardHeader title="MISSÃƒO" coloredPart="CONTROLE" subtitle="STATUS DO SISTEMA: IDEAL" accentColor="#00e5ff" icon="sports_esports" />

      <div className="px-6 space-y-6 mt-4 relative z-10">
      
          {/* SAÃšDE GLOBAL (Global Health) with loading effect */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#14141c]/60 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
          >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              <h3 className="text-[10px] text-center font-black tracking-[0.3em] uppercase text-white/50 mb-6">SaÃºde Sincronizada</h3>
              
               {/* Radial representation */}
               <div className="flex justify-center items-center relative h-36">
                   <svg viewBox="0 0 100 100" className="w-36 h-36 transform -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                      <motion.circle 
                        cx="50" cy="50" r="42" 
                        fill="none" 
                        stroke="#00e5ff" 
                        strokeWidth="6" 
                        strokeDasharray="264" 
                        initial={{ strokeDashoffset: 264 }}
                        whileInView={{ strokeDashoffset: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                        className="drop-shadow-[0_0_12px_rgba(0,229,255,0.5)]" 
                        strokeLinecap="round" 
                      />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                       <motion.span 
                         initial={{ opacity: 0, y: 10 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 1, delay: 1.5 }}
                         className="text-4xl font-massive italic leading-[0.8] text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] mt-2"
                       >
                         85<span className="text-xl text-[#00e5ff]">%</span>
                       </motion.span>
                       <motion.span 
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.5, delay: 1.8 }}
                         className="text-[8px] font-black tracking-widest text-[#00e5ff] uppercase mt-2 animate-pulse"
                       >
                         Sistema EstÃ¡vel
                       </motion.span>
                   </div>
               </div>
               
               {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#00e5ff]/40" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-[#00e5ff]/40" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-[#00e5ff]/40" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#00e5ff]/40" />
          </motion.div>

          {/* METRICS SPLIT */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4"
          >
             <div className="flex-1 bg-gradient-to-br from-[#14141c]/80 to-[#0A0A0C]/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-5 relative shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                   <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff] animate-pulse" />
                   <span className="text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase">Atletas Ativos</span>
                </div>
                <p className="text-4xl font-massive italic text-white mb-2 leading-none">142</p>
                <p className="text-[8px] text-[#00e5ff] tracking-widest font-black uppercase">â†‘ +5 vs Sem Passada</p>
             </div>

             <div className="flex-1 bg-gradient-to-br from-[#14141c]/80 to-[#0A0A0C]/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-5 relative shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-1.5 h-4 bg-white/10 rounded-full" />
                   <span className="text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase">Carga MÃ©dia</span>
                </div>
                <p className="text-4xl font-massive italic text-white mb-2 leading-none">6.8</p>
                <p className="text-[8px] text-[#f59e0b] tracking-widest font-black uppercase flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">warning</span> Elevada</p>
             </div>
          </motion.div>
          
          {/* DESTAQUE DA SEMANA (MVP) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-tr from-[#14141c] to-[#0A0A0C] border border-[#00e5ff]/20 rounded-[32px] p-6 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
              <div className="absolute inset-0 bg-[#00e5ff]/5 mix-blend-overlay border-[0.5px] border-[#00e5ff]/20 absolute inset-0 rounded-[32px] pointer-events-none" />
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#00e5ff]/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-5">
                  <div className="relative">
                      {/* Using the reference photo for Lucas Silva */}
                      <img src={getBoyPhoto('lucas_silva')} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop'; }} className="w-[68px] h-[68px] rounded-2xl object-cover border border-[#00e5ff]/30 shadow-[0_0_20px_rgba(0,229,255,0.15)] grayscale-[30%] brightness-110 contrast-110" alt="MVP Lucas Silva" />
                      <div className="absolute -bottom-2 -right-2 bg-[#00e5ff] text-[#020204] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">NÃVEL 1</div>
                  </div>
                  <div className="flex-1">
                      <span className="text-[7.5px] text-[#00e5ff] uppercase tracking-[0.2em] font-black block mb-1">DESTAQUE DA SEMANA</span>
                      <h4 className="font-massive text-[22px] italic text-white tracking-wide leading-none mb-1 text-glow">LUCAS SILVA</h4>
                      <span className="text-[9px] text-white/50 uppercase tracking-widest block font-bold">ELITE SUB-15</span>
                  </div>
                  <div className="bg-[#020204]/80 border border-[#00e5ff]/30 p-3 rounded-2xl flex flex-col items-center shadow-inner">
                      <span className="font-oswald text-xl text-[#00e5ff] font-bold leading-none animate-pulse">98.4</span>
                      <span className="text-[6px] font-black tracking-widest uppercase text-white/40 mt-1">AVALIAÃ‡ÃƒO</span>
                  </div>
              </div>
          </motion.div>

          {/* PERFORMANCE GLOBAL RADAR */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#14141c]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 relative overflow-hidden shadow-2xl"
          >
               <div className="flex items-center justify-between mb-2 relative z-10">
                   <div className="flex items-center gap-2">
                     <span className="w-1 h-3 bg-[#00e5ff]/50 rounded-full" />
                     <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">Performance Global</h3>
                   </div>
                   <span className="flex items-center gap-1 px-2 py-0.5 border border-[#00e5ff]/30 bg-[#00e5ff]/10 text-[#00e5ff] text-[8px] font-black uppercase tracking-widest rounded shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                      <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse" /> Ao Vivo
                   </span>
               </div>
               
               <div className="h-[240px] w-full mt-4 flex items-center justify-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] flex flex-col items-center pointer-events-none z-10">
                         <span className="text-4xl font-massive italic text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]">94<span className="text-xl">%</span></span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={[
                          { subject: 'RITMO', A: 120, fullMark: 150 },
                          { subject: 'FÃ”LEGO', A: 98, fullMark: 150 },
                          { subject: 'FORÃ‡A', A: 86, fullMark: 150 },
                          { subject: 'QI TÃTICO', A: 110, fullMark: 150 },
                          { subject: 'DEFESA', A: 85, fullMark: 150 },
                      ]}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'Inter', fontWeight: 800, letterSpacing: 1 }} />
                        <Radar name="Performance" dataKey="A" stroke="#00e5ff" strokeWidth={2} fill="url(#colorCyan)" fillOpacity={1} />
                        <defs>
                          <radialGradient id="colorCyan" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#00e5ff" stopOpacity={0.05} />
                          </radialGradient>
                        </defs>
                      </RadarChart>
                    </ResponsiveContainer>
               </div>
               
               <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-5 mt-2 relative z-10">
                   <div className="text-center">
                       <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase block mb-1">RITMO</span>
                       <span className="font-oswald text-white text-xl">1.2s</span>
                   </div>
                   <div className="text-center border-x border-white/5">
                       <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase block mb-1">FÃ”LEGO</span>
                       <span className="font-oswald text-[#00e5ff] text-xl drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">88%</span>
                   </div>
                   <div className="text-center">
                       <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase block mb-1">FORÃ‡A</span>
                       <span className="font-oswald text-white text-xl">3.4k</span>
                   </div>
               </div>
          </motion.div>

          {/* ACESSO RÃPIDO */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-4 gap-3 py-2"
          >
               {[
                 { i: 'groups', l: 'ATLETAS', hc: 'group-hover:text-[#FF6D00]', hdt: 'group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]', onClick: () => setGestorTab('alunos') },
                 { i: 'checklist', l: 'CHAMADA', hc: 'group-hover:text-[#FF6D00]', hdt: 'group-hover:drop-shadow-[0_0_8px_rgba(255,109,0,0.6)]', onClick: () => setGestorTab('chamada') },
                 { i: 'monitoring', l: 'SCOUT', hc: 'group-hover:text-[#E50000]', hdt: 'group-hover:drop-shadow-[0_0_8px_rgba(229,0,0,0.6)]', onClick: () => setGestorTab('scout') },
                 { i: 'payments', l: 'FINANÃ‡AS', hc: 'group-hover:text-[#00C853]', hdt: 'group-hover:drop-shadow-[0_0_8px_rgba(0,200,83,0.6)]', onClick: () => setGestorTab('financeiro') }
               ].map((btn, idx) => (
                   <button key={idx} onClick={btn.onClick} className="bg-gradient-to-b from-[#14141c]/80 to-[#0A0A0C]/90 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-all active:scale-95 group shadow-lg">
                       <span className={`material-symbols-outlined text-[26px] text-white/30 transition-all ${btn.hc} ${btn.hdt}`} style={{ fontVariationSettings: '"FILL" 1' }}>{btn.i}</span>
                       <span className="text-[7px] font-black text-white/40 tracking-widest uppercase group-hover:text-white transition-colors">{btn.l}</span>
                   </button>
               ))}
          </motion.div>

          {/* REGISTRO DE OPERAÃ‡Ã•ES (LIVE OPS) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-transparent space-y-3 pt-2"
          >
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                   <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-[#00e5ff] text-[16px] animate-pulse">route</span>
                       <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">REGISTRO DE OPERAÃ‡Ã•ES</h3>
                   </div>
                   <span className="text-[8px] font-black text-[#00e5ff] uppercase tracking-widest pl-4 py-1 border-l border-white/10 hover:text-white transition-colors cursor-pointer">VER TUDO</span>
              </div>

              {/* Event 1 */}
              <div className="bg-[#14141c]/60 backdrop-blur-md border-l-2 border-[#00e5ff] p-4 rounded-r-2xl flex items-center justify-between hover:bg-[#14141c] hover:translate-x-1 transition-all cursor-pointer shadow-md">
                   <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#00e5ff]/10 rounded-xl flex items-center justify-center border border-[#00e5ff]/20">
                           <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">sports_soccer</span>
                       </div>
                       <div>
                           <p className="text-white font-oswald font-bold tracking-wider text-[13px] mb-0.5">Gol Marcado +1</p>
                           <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Jogador: #9 Silva</p>
                       </div>
                   </div>
                   <span className="text-[8px] text-[#00e5ff] tracking-widest uppercase font-black">AGORA</span>
              </div>

              {/* Event 2 */}
              <div className="bg-[#14141c]/60 backdrop-blur-md border-l-2 border-[#FF6D00] p-4 rounded-r-2xl flex items-center justify-between hover:bg-[#14141c] hover:translate-x-1 transition-all cursor-pointer shadow-md">
                   <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#FF6D00]/10 rounded-xl flex items-center justify-center border border-[#FF6D00]/20">
                           <span className="material-symbols-outlined text-[#FF6D00] text-[18px]">payments</span>
                       </div>
                       <div>
                           <p className="text-white font-oswald font-bold tracking-wider text-[13px] mb-0.5">Pagamento Aprovado</p>
                           <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">R$ 1.250,00 â€¢ Plano Elite</p>
                       </div>
                   </div>
                   <span className="text-[8px] text-white/30 tracking-widest uppercase font-black">hÃ¡ 2m</span>
              </div>

              {/* Event 3 */}
              <div className="bg-[#14141c]/60 backdrop-blur-md border-l-2 border-[#ef4444] p-4 rounded-r-2xl flex items-center justify-between hover:bg-[#14141c] hover:translate-x-1 transition-all cursor-pointer shadow-md">
                   <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#ef4444]/10 rounded-xl flex items-center justify-center border border-[#ef4444]/20">
                           <span className="material-symbols-outlined text-[#ef4444] text-[18px]">warning</span>
                       </div>
                       <div>
                           <p className="text-white font-oswald font-bold tracking-wider text-[13px] mb-0.5">Alerta de Fadiga</p>
                           <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Limite Excedido</p>
                       </div>
                   </div>
                   <span className="text-[8px] text-[#ef4444] tracking-widest uppercase font-black">hÃ¡ 15m</span>
              </div>
              
              <button className="w-full mt-4 py-4 bg-[#14141c]/50 border border-white/5 rounded-[20px] text-[9px] text-[#00e5ff] font-black tracking-[0.2em] uppercase hover:bg-[#14141c] hover:border-[#00e5ff]/30 transition-all active:scale-95 group">
                  <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">CARREGAR EVENTOS ANTERIORES</span>
              </button>
          </motion.div>
      </div>
    </motion.div>
  );
}

// --- VIEWS ---

// Redundant views removed

// --- CONSTANTS & MOCK DATA ---
// Redundant versions removed

// ==============================================
// VIEWS DO RESPONSÃVEL
// ==============================================

export function MensalidadeView({ student }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const status = student?.paymentStatus ?? 'pending';
  const isPending = status === 'pending' || status === 'review';

  const handleCopyPix = () => {
    const textArea = document.createElement("textarea");
    textArea.value = "058.525.967-44";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Chave PIX copiada!');
    } catch (err) {
      toast.error('Erro ao copiar PIX');
    }
    document.body.removeChild(textArea);
  };

  const fullHistory = [
    { month: 'DEZEMBRO', date: '05/12/2024', val: '40,00' },
    { month: 'NOVEMBRO', date: '05/11/2024', val: '40,00' },
    { month: 'OUTUBRO', date: '05/10/2024', val: '40,00' },
    { month: 'SETEMBRO', date: '04/09/2024', val: '40,00' },
    { month: 'AGOSTO', date: '05/08/2024', val: '40,00' },
    { month: 'JULHO', date: '02/07/2024', val: '40,00' }
  ];

  const visibleHistory = showAllHistory ? fullHistory : fullHistory.slice(0, 3);

  return (
    <motion.div 
      variants={pageTransitionVariants} 
      initial="initial" animate="animate" exit="exit" 
      className="flex flex-col flex-1 bg-[#020204] pb-32"
    >
      <TransactionDetailModal 
        isOpen={!!selectedTransaction} 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
      />

      <StandardHeader 
        title="MINHA" coloredPart="CONTA" subtitle="CONTROLE FINANCEIRO" accentColor="#10b981" 
      />

      {/* CARROSSEL HORIZONTAL LIMPO */}
      <div className="mt-4">
        <section className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 no-scrollbar">
          
          {/* Card 1: STATUS ATUAL */}
          <div className="snap-center shrink-0 w-[280px]">
            <div className="bg-[#0A0A0C] border border-[#10b981]/20 rounded-[32px] p-7 flex flex-col h-[280px] relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Status Atual</span>
                  <span className="font-oswald text-xl font-bold text-white tracking-widest uppercase italic">Financeiro</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/20">
                  <span className="material-symbols-outlined text-[#10b981] text-2xl drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                    {!isPending ? 'verified_user' : 'hourglass_empty'}
                  </span>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-center border-y border-white/5 py-4 my-2 relative">
                 <div className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.2em] mb-2 relative z-10">SituaÃ§Ã£o da Conta</div>
                 <div className="text-5xl font-oswald font-black italic tracking-tighter leading-none text-white relative z-10">
                    {!isPending ? 'PAGO' : 'ABERTO'}
                 </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] font-inter font-bold text-white uppercase tracking-[0.15em]">MÃªs de Outubro</span>
              </div>
            </div>
          </div>

          {/* Card 2: VOLUME INVESTIDO */}
          <div className="snap-center shrink-0 w-[280px]">
            <div className="bg-[#0A0A0C] border border-white/5 rounded-[32px] p-7 flex flex-col h-[280px] relative overflow-hidden group hover:border-[#10b981]/20 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="text-[9px] font-inter font-bold text-[#10b981] uppercase tracking-[0.2em] mb-1">Volume</span>
                  <span className="font-oswald text-xl font-bold text-white tracking-widest uppercase italic">Investido</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#10b981]/10 group-hover:border-[#10b981]/20 transition-colors">
                  <span className="material-symbols-outlined text-[#10b981] text-2xl drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">account_balance_wallet</span>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-center border-y border-white/5 py-4 my-2 relative">
                 <div className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.2em] mb-2 relative z-10">Total Pago Acumulado</div>
                 <div className="flex items-baseline gap-1 relative z-10">
                   <span className="text-lg font-oswald text-white/40 font-bold">R$</span>
                   <span className="text-6xl font-oswald font-black italic text-white leading-none tracking-tighter">480</span>
                   <span className="text-xl font-oswald text-white/40 font-bold">,00</span>
                 </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                 <span className="text-[10px] font-inter font-bold text-white/40 uppercase tracking-[0.15em]">Ciclo Anual de Mensalidades</span>
              </div>
            </div>
          </div>

          {/* Card 3: CRONOGRAMA DE VENCIMENTO */}
          <div className="snap-center shrink-0 w-[280px]">
            <div className="bg-[#0A0A0C] border border-white/5 rounded-[32px] p-7 flex flex-col h-[280px] relative overflow-hidden group hover:border-[#10b981]/20 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="text-[9px] font-inter font-bold text-[#10b981] uppercase tracking-[0.2em] mb-1">Cronograma</span>
                  <span className="font-oswald text-xl font-bold text-white tracking-widest uppercase italic">Vencimento</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#10b981]/10 group-hover:border-[#10b981]/20 transition-colors">
                  <span className="material-symbols-outlined text-[#10b981] text-2xl drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">calendar_today</span>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-center border-y border-white/5 py-4 my-2 relative">
                 <div className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-[0.2em] mb-2 relative z-10">PrÃ³xima Parcela</div>
                 <div className="text-5xl font-oswald font-black italic tracking-tighter leading-none text-white relative z-10">05 NOV</div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-[14px] text-[#10b981]">alarm</span>
                 <span className="text-[10px] font-inter font-bold text-[#10b981] uppercase tracking-[0.15em]">Vence em 15 Dias</span>
              </div>
            </div>
          </div>

          {/* Card 4: RESUMO DONUT COM ANIMAÃ‡ÃƒO */}
          <div className="snap-center shrink-0 w-[280px]">
            <div className="bg-[#0A0A0C] border border-white/5 rounded-[32px] p-7 flex flex-col h-[280px] relative overflow-hidden group hover:border-[#10b981]/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-inter font-bold text-[#10b981] uppercase tracking-[0.2em] mb-1">EstatÃ­stica</span>
                  <span className="font-oswald text-xl font-bold text-white tracking-widest uppercase italic">ConcluÃ­do</span>
                </div>
              </div>

              <div className="flex-grow flex flex-col items-center justify-center relative">
                 <div className="relative w-32 h-32">
                   <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                     <circle className="text-white/5" cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="6" />
                     <motion.circle 
                       className="text-[#10b981]" 
                       cx="50" cy="50" r="45" 
                       fill="transparent" 
                       stroke="currentColor" 
                       strokeDasharray="282.7" 
                       initial={{ strokeDashoffset: 282.7 }}
                       whileInView={{ strokeDashoffset: 28.27 }}
                       viewport={{ once: true }}
                       transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                       strokeWidth="8" 
                       strokeLinecap="round"
                     />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-3xl font-oswald font-black text-white tracking-tighter leading-none">90%</span>
                     <span className="text-[8px] font-inter font-bold text-white/40 uppercase tracking-widest mt-1">Status Anual</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
          
        </section>
      </div>

      <div className="px-6 space-y-6">
        {/* MÃ“DULO DE PAGAMENTO ATIVO */}
        {isPending && (
          <div className="bg-[#0A0A0C] border border-[#10b981]/20 p-6 rounded-[32px] space-y-5">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[10px] font-inter font-bold text-[#10b981] uppercase tracking-[0.2em] mb-1">Mensalidade Atual</p>
                  <div className="font-oswald text-3xl font-black text-white italic tracking-tight">R$ 40,00</div>
               </div>
               <div className="bg-[#10b981]/10 border border-[#10b981]/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'review' ? 'bg-[#10b981]' : 'bg-[#10b981]/50'}`} />
                  <span className="text-[9px] font-inter font-bold text-[#10b981] uppercase tracking-widest">
                     {status === 'review' ? 'Em ValidaÃ§Ã£o' : 'Aberto'}
                  </span>
               </div>
            </div>

            {/* Box Copia e Cola */}
            <div className="bg-[#020204] border border-white/5 rounded-2xl p-4 flex justify-between items-center group">
               <div>
                  <p className="text-[9px] font-inter font-bold text-white/30 uppercase tracking-widest mb-1">Chave PIX (CPF)</p>
                  <p className="font-oswald text-xl text-white tracking-widest font-black">058.525.967-44</p>
               </div>
               <button onClick={handleCopyPix} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 active:scale-95 transition-transform text-white/60 hover:text-white">
                 <Copy size={18} />
               </button>
            </div>

            <a 
              href={`https://wa.me/5522999946772?text=${encodeURIComponent('olÃ¡, treinador, segue comprovante. Grato(a)!')}`} 
              target="_blank" rel="noopener noreferrer" 
              className="w-full py-4 bg-[#10b981] rounded-2xl flex items-center justify-center gap-3 text-black font-oswald font-black uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <MessageCircle size={18} /> Enviar Comprovante
            </a>
          </div>
        )}

        {/* HISTÃ“RICO VERTICAL (COM TOQUE VERDE PERMANENTE E LIMITE DE ITENS) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-oswald text-sm font-bold text-white/70 tracking-[0.2em] uppercase">HistÃ³rico de Fluxo</h3>
          </div>
          
          <div className="space-y-3">
            {visibleHistory.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedTransaction({ athlete: student?.name || 'Atleta', val: item.val, date: item.date, type: 'MENSALIDADE' })}
                className="bg-[#0A0A0C] border border-white/5 rounded-2xl p-4 flex items-center justify-between cursor-pointer relative overflow-hidden transition-all hover:bg-white/5"
              >
                {/* Filete Verde Sutil */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10b981]/30" />
                
                <div className="flex items-center gap-4 pl-2">
                   <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] border border-[#10b981]/20">
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                   </div>
                   <div>
                      <h4 className="font-oswald text-sm font-bold text-white tracking-wider uppercase mb-0.5">{item.month}</h4>
                      <p className="text-[9px] font-inter font-bold text-white/40 uppercase tracking-widest">{item.date}</p>
                   </div>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="font-oswald text-lg font-black text-white italic">R$ {item.val}</div>
                   <span className="text-[8px] bg-white/5 border border-white/10 text-white/40 px-2 py-0.5 rounded uppercase font-bold tracking-widest mt-1">Fechado</span>
                </div>
              </div>
            ))}
            
            {fullHistory.length > 3 && (
              <button 
                onClick={() => setShowAllHistory(!showAllHistory)}
                className="w-full py-4 mt-2 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-inter font-bold text-white/50 uppercase tracking-[0.2em] active:scale-95 transition-all hover:bg-white/10"
              >
                {showAllHistory ? 'Ocultar HistÃ³rico' : 'Ver Todas as Mensalidades'}
              </button>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// Redundant versions removed

export function AvisosView({ student, isGestorView = false }) {
  const categoryLabel = student?.category ? student.category.toUpperCase().replace('SUB', 'SUB-') : 'CENTRAL';

  const missions = [
    {
      id: 3,
      tag: 'LOGÃSTICA',
      tagColor: 'bg-[#7a45f0] text-white',
      tagRotation: 'rotate-[-2deg]',
      code: '#LOG-EQ10',
      codeColor: 'text-[#7a45f0]',
      lineColor: 'bg-[#7a45f0]',
      title: 'NOVA ARMADURA',
      desc: '"O kit de alta performance da temporada chegou no almoxarifado. Retirada autorizada via solicitaÃ§Ã£o."',
      btnText: isGestorView ? 'ADMINISTRAR KITS' : 'REQUISITAR KIT',
      btnColor: 'bg-[#7a45f0] text-white',
      glowColor: 'rgba(122, 69, 240, 0.25)',
    },
    {
      id: 2,
      tag: 'MISSÃƒO CRÃTICA',
      tagColor: 'bg-[#ef4444] text-white',
      tagRotation: 'rotate-[2deg]',
      code: '#OP-BIO99',
      codeColor: 'text-[#ef4444]',
      lineColor: 'bg-[#ef4444]',
      title: 'AVALIAÃ‡ÃƒO BIO',
      desc: '"Sua biomÃ©trica expirou. Risco de bloqueio iminente em 48h. Agende o reparo na central mÃ©dica."',
      btnText: isGestorView ? 'GERENCIAR ALERTAS' : 'AGENDAR AGORA',
      btnColor: 'bg-[#ef4444] text-white',
      glowColor: 'rgba(239, 68, 68, 0.25)',
    },
    {
      id: 1,
      tag: 'OPERACIONAL',
      tagColor: 'bg-[#f59e0b] text-black',
      tagRotation: 'rotate-[-1deg]',
      code: '#AVISO-TK72',
      codeColor: 'text-[#f59e0b]',
      lineColor: 'bg-[#f59e0b]',
      title: 'TREINO TÃTICO',
      desc: '"Foco em transiÃ§Ã£o defensiva. InÃ­cio tÃ¡tico Ã s 08:00. Esteja no QG para aquecimento Ã s 07:45."',
      timestamp: '08:00',
      setor: 'CAMPO 02',
      btnText: isGestorView ? 'NOTIFICAR TODOS' : 'CONFIRMAR MISSÃƒO',
      btnColor: 'bg-[#f59e0b] text-black',
      glowColor: 'rgba(245, 158, 11, 0.25)',
    },
  ];

  return (
    <div className="flex flex-col flex-1 pb-32 relative overflow-hidden bg-[#020204]">
        {/* Elite Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#7a45f0]/5 to-transparent blur-[120px]" />
        </div>

        <StandardHeader 
          title={isGestorView ? "CENTRAL DE" : "QUADRO DE"} 
          coloredPart="AVISOS" 
          subtitle={isGestorView ? "GERENCIAMENTO TÃTICO" : `OPERAÃ‡Ã•ES ${categoryLabel}`} 
          accentColor="#7a45f0" 
          titleClass="text-4xl min-[400px]:text-5xl"
          rightElement={isGestorView && (
            <button className="w-12 h-12 bg-[#7a45f0] mt-10 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(122,69,240,0.3)] hover:scale-105 active:scale-95 transition-all">
              <Plus size={24} />
            </button>
          )}
        />

      <div className="px-6 space-y-8 relative z-10 flex-1 mt-6">
        {/* Status Indicators */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-[#7a45f0] animate-pulse" />
             <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">ComunicaÃ§Ãµes Ativas</span>
          </div>
          <div className="text-[9px] font-mono font-bold text-[#7a45f0]/60 uppercase tracking-tighter">
             SECURE_CHANNEL_V8
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-10 pb-20">
          {missions.map((mission) => (
            <motion.div 
              variants={itemVariant} 
              key={mission.id} 
              className="bg-[#0D0D10]/80 backdrop-blur-3xl rounded-[38px] border border-white/5 p-8 relative group transition-all duration-500 hover:border-[#7a45f0]/20 shadow-2xl"
            >
              {/* Inner Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7a45f0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              {/* Floating Tag */}
              <div className={`absolute top-0 right-10 px-6 py-2 rounded-b-2xl font-oswald text-[10px] tracking-[0.2em] font-black uppercase transition-all shadow-xl ${mission.tagColor} ${mission.tagRotation} translate-y-[-2px] group-hover:translate-y-0 duration-500 z-10`}>
                {mission.tag}
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-[9px] font-black tracking-widest ${mission.codeColor}`}>{mission.code}</span>
                    <History size={14} className="text-white/10" />
                  </div>
                  <h3 className="font-massive italic text-[44px] leading-[0.9] text-white uppercase tracking-tighter pr-10">{mission.title}</h3>
                </div>

                <div className="relative">
                   <div className={`absolute -left-6 top-1 bottom-1 w-1 ${mission.lineColor} rounded-full`} />
                   <p className="text-sm font-inter text-white/50 leading-relaxed font-medium pl-2 italic">
                     {mission.desc}
                   </p>
                </div>

                {(mission.timestamp || mission.setor) && (
                  <div className="flex gap-4">
                    {mission.timestamp && (
                      <div className="flex-1 bg-white/[0.03] px-6 py-4 rounded-3xl border border-white/5 flex flex-col items-center">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1.5">Sincronia</span>
                        <div className="flex items-center gap-2">
                           <CalendarCheck size={14} className="text-[#7a45f0]/60" />
                           <span className="font-oswald text-white font-bold text-xl tracking-tighter">{mission.timestamp}</span>
                        </div>
                      </div>
                    )}
                    {mission.setor && (
                      <div className="flex-1 bg-white/[0.03] px-6 py-4 rounded-3xl border border-white/5 flex flex-col items-center">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1.5">Setor de AtuaÃ§Ã£o</span>
                        <div className="flex items-center gap-2">
                           <Flag size={14} className="text-[#7a45f0]/60" />
                           <span className="font-oswald text-white font-bold text-xl tracking-tighter">{mission.setor}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toast.success(isGestorView ? 'COMANDOS ATUALIZADOS' : 'MISSÃƒO CONFIRMADA')}
                  className={`w-full py-5 rounded-[24px] text-[10px] font-inter font-black tracking-[0.3em] uppercase transition-all shadow-xl ${mission.btnColor} hover:brightness-110 active:brightness-90`}
                  style={{ boxShadow: `0 10px 30px ${mission.glowColor}` }}
                >
                  {mission.btnText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
