import { motion } from 'framer-motion';

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-20 px-6 text-center bg-[var(--color-surface)]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-[var(--color-primary)]"
      >
        Customer Testimonials
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-center gap-16 max-w-6xl mx-auto"
      >
        <motion.div
          variants={testimonialVariants}
          whileHover={{ scale: 1.02 }}
          className="max-w-md bg-[var(--color-background)] p-6 rounded-lg shadow-lg"
        >
          <p className="mb-4 text-[var(--color-text-secondary)]">
            "SoftSell made selling my unused licenses effortless and profitable. Highly recommend!"
          </p>
          <motion.p 
            className="font-semibold text-[var(--color-primary)]"
            whileHover={{ scale: 1.05 }}
          >
            Manthan Mangla
          </motion.p>
          <p className="text-sm text-[var(--color-secondary)]">
            Software Engineer, TechCorp
          </p>
        </motion.div>

        <motion.div
          variants={testimonialVariants}
          whileHover={{ scale: 1.02 }}
          className="max-w-md bg-[var(--color-background)] p-6 rounded-lg shadow-lg"
        >
          <p className="mb-4 text-[var(--color-text-secondary)]">
            "Excellent valuation and fast payment. SoftSell is the best choice for license resale."
          </p>
          <motion.p 
            className="font-semibold text-[var(--color-primary)]"
            whileHover={{ scale: 1.05 }}
          >
            Ridhi Taneja
          </motion.p>
          <p className="text-sm text-[var(--color-secondary)]">
            IT Manager, Business Solutions
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Testimonials;
