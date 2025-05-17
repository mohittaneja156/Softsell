import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Best Market Value",
      description: "Get the highest value for your software licenses with our market-driven pricing",
      icon: "📈"
    },
    {
      title: "Secure Transactions",
      description: "Experience worry-free transfers with our secure transaction process",
      icon: "🔒"
    },
    {
      title: "Fast Processing",
      description: "Quick verification and payment processing within 24-48 hours",
      icon: "⚡"
    },
    {
      title: "Expert Support",
      description: "Dedicated team of specialists to assist you throughout the process",
      icon: "👥"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-20 px-6 bg-[var(--color-surface)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          variants={cardVariants}
          className="text-4xl font-bold mb-16 text-center text-[var(--color-primary)]"
        >
          Why Choose SoftSell
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="bg-[var(--color-background)] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div 
                variants={iconVariants}
                whileHover="hover"
                className="text-4xl mb-4 inline-block"
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-[var(--color-text)]">
                {benefit.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;