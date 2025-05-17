import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    { title: "List Your License", icon: "📝", description: "Submit your software license details" },
    { title: "Verify & Price", icon: "✅", description: "We verify and set competitive pricing" },
    { title: "Connect & Sell", icon: "🤝", description: "Match with buyers and complete the sale" },
    { title: "Get Paid", icon: "💰", description: "Receive secure payment instantly" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-10 px-6"
    >
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-16"
      >
        How It Works
      </motion.h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-4xl mb-4"
            >
              {step.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-[var(--color-text-secondary)]">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;