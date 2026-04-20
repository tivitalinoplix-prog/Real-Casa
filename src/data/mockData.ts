export const STORAGE_VERSION = 7; // Bump version for strict dark mode
export const STORAGE_KEYS = {
  role: 'realcasa.role',
  gestorTab: 'realcasa.gestor.activeTab',
  responsavelTab: 'realcasa.responsavel.activeTab',
  students: 'realcasa.students',
  waitlist: 'realcasa.waitlist',
  selectedStudentId: 'realcasa.responsavel.selectedStudentId',
};

export const CATEGORIES = [
  { id: 'sub11', label: 'Sub-11', color: '#2C2C35' },
  { id: 'sub13', label: 'Sub-13', color: '#2C2C35' },
  { id: 'sub15', label: 'Sub-15', color: '#7e22ce' },
  { id: 'sub17', label: 'Sub-17', color: '#E50000' },
];

export const getBoyPhoto = (_id: number) => 'https://images.pexels.com/photos/33217156/pexels-photo-33217156.jpeg';
export const CREST_URL = 'https://i.postimg.cc/8kYGV4DF/Brasao.jpg';

export const initialStudents = [
  {
    id: 1, name: 'Lucas Silva', age: 12, category: 'sub13', guardian: 'Maria (Mãe)', phone: '11999999999',
    photo: getBoyPhoto(1), position: 'Atacante', goals: 12, assists: 4, attendance: 90, yellowCard: false, paymentStatus: 'pending',
  },
  {
    id: 2, name: 'Pedro Santos', age: 14, category: 'sub15', guardian: 'João (Pai)', phone: '11988888888',
    photo: getBoyPhoto(2), position: 'Zagueiro', goals: 2, assists: 1, attendance: 85, yellowCard: true, paymentStatus: 'paid',
  },
  {
    id: 3, name: 'Mateus Oliveira', age: 10, category: 'sub11', guardian: 'Ana (Mãe)', phone: '11977777777',
    photo: getBoyPhoto(3), position: 'Meia', goals: 5, assists: 8, attendance: 95, yellowCard: false, paymentStatus: 'paid',
  },
  {
    id: 4, name: 'Gabriel Costa', age: 13, category: 'sub13', guardian: 'Carlos (Pai)', phone: '11966666666',
    photo: getBoyPhoto(4), position: 'Goleiro', goals: 0, assists: 0, attendance: 100, yellowCard: false, paymentStatus: 'review',
  },
  {
    id: 5, name: 'Felipe Mendes', age: 14, category: 'sub15', guardian: 'Roberto (Pai)', phone: '11955555555',
    photo: getBoyPhoto(5), position: 'Atacante', goals: 9, assists: 2, attendance: 80, yellowCard: false, paymentStatus: 'pending',
  },
];

export const initialWaitlist = [
  { id: 101, name: 'Rafael Souza', age: 11, guardian: 'Fernanda', phone: '11955555555', date: 'Há 2 dias' },
  { id: 102, name: 'Thiago Lima', age: 14, guardian: 'Roberto', phone: '11944444444', date: 'Há 4 dias' },
];

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const pageTransitionVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};
