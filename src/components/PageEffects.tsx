import React, { useEffect, useState } from 'react';
import { ArrowUp, Moon, Sun } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500 origin-left z-50 pointer-events-none"
    />
  );
};

export const CustomCursor: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 450, damping: 32, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (prefersReduced) return;
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return;

    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY, prefersReduced]);

  if (!enabled || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      className="fixed top-0 left-0 w-7 h-7 rounded-full border border-indigo-400/50 dark:border-indigo-400/40 bg-indigo-500/5 pointer-events-none z-50 hidden lg:block transition-opacity duration-150"
    />
  );
};

interface FloatingControlsProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ theme, onToggleTheme }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2.5">
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="w-11 h-11 rounded-xl bg-white/90 dark:bg-[#0D1424]/90 backdrop-blur-md border border-slate-300/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-indigo-500/60 hover:text-indigo-600 dark:hover:text-indigo-300 shadow-lg flex items-center justify-center transition-colors cursor-pointer"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Moon className="w-4 h-4" aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export const InitialLoader: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 320);
    return () => window.clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#070B14] pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <p
              className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Raheela Rani
            </p>
            <div className="w-36 h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 origin-left"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
