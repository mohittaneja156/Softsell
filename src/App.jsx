import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import ChatWidget from './components/ChatWidget';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen transition-all duration-500 font-sans bg-[var(--color-background)] text-[var(--color-text)]"
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <motion.main 
        className="flex flex-col"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <HeroSection darkMode={darkMode} />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ContactForm />
      </motion.main>
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-6 text-center border-t border-[var(--color-border)] text-[var(--color-text-secondary)]"
      >
        © 2024 SoftSell. All rights reserved.
      </motion.footer>
      <ChatWidget darkMode={darkMode} />
    </motion.div>
  );
};

export default App;
