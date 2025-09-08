import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AnimatedSectionProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  duration?: number;
};

const AnimatedSection = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.5,
}: AnimatedSectionProps) => {
  const getDirectionVariants = () => {
    switch (direction) {
      case 'up':
        return { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } };
      case 'down':
        return { hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } };
      case 'left':
        return { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } };
      case 'right':
        return { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1 } };
      default:
        return { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: duration, delay: delay }}
      variants={getDirectionVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;