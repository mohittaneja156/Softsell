import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const Header = ({ darkMode, setDarkMode }) => {
  const iconVariants = {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)] border-b border-[var(--color-border)]">
      <nav className="flex items-center justify-between p-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <img 
            src="/software-svgrepo-com.svg" 
            alt="SoftSell Logo" 
            className="w-8 h-8 fill-current text-[var(--color-primary)]"
            style={{ filter: darkMode ? 'invert(1)' : 'none' }}
          />
          <motion.h1 className="text-2xl font-bold text-[var(--color-primary)]">
            SoftSell
          </motion.h1>
        </motion.div>
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-[var(--color-surface)] transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <SunIcon className="w-6 h-6 text-[var(--color-text)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <MoonIcon className="w-6 h-6 text-[var(--color-text)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
