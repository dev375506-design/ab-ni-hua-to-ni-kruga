import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type PageTransitionProps = {
  children: React.ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 bg-intern-bg z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-medium font-poppins mb-4">
              <span className="text-intern-purple">Intern</span>
              <span className="text-intern-red">मित्र</span>
            </div>
            <motion.div
              className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-intern-orange"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;