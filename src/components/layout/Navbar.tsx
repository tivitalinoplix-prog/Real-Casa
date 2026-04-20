import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function useNavbarLogic() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 4. Topo absoluto
      if (currentScrollY <= 0) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // 3. Final absoluto
      if (currentScrollY + windowHeight >= documentHeight - 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // 1 & 2. Rolagem para cima/baixo
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Rolando para baixo -> esconde
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);  // Rolando para cima -> mostra
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return isVisible;
}

export function Navbar({ children }: { children: React.ReactNode }) {
  const isVisible = useNavbarLogic();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: 100, opacity: 0 }} 
          transition={{ type: 'spring', stiffness: 300, damping: 25 }} 
          className="fixed bottom-0 w-full bg-[var(--bg-nav)] backdrop-blur-3xl border-t border-[var(--border-subtle)] z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--brand-gold)] to-transparent opacity-30" />
            {children}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
