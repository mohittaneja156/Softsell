import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ darkMode }) => {
  return (
    <section className="py-10 px-6 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div 
          className="flex-1 text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-[var(--color-text)]">
            Transform Your Unused <span className="text-[var(--color-primary)]">Software Licenses</span> Into Value
          </h1>
          <p className="text-xl mb-8 text-[var(--color-text-secondary)]">
            Securely sell your unused software licenses at the best market rates. Fast, reliable, and professional service.
          </p>
          <motion.button 
            className="px-8 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Selling Today
          </motion.button>
        </motion.div>
        <motion.div 
          className="flex-1 flex justify-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="bg-[var(--color-surface)] p-6 rounded-lg shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-[var(--color-primary)] text-center mb-4">
              <span className="text-4xl font-bold">500+</span>
              <p className="text-[var(--color-text-secondary)]">Successful Transactions</p>
            </div>
            <div className="border-t border-[var(--color-border)] pt-4 mt-4">
              <p className="text-[var(--color-text-secondary)] text-center">
                Trusted by leading tech companies worldwide
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;