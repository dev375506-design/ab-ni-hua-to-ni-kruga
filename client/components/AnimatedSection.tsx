import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
  const prefersReducedMotion = useReducedMotion();
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
      initial={prefersReducedMotion ? undefined : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.2 }}
      transition={prefersReducedMotion ? undefined : { duration: Math.min(duration, 0.35), delay: Math.min(delay, 0.2), ease: 'easeOut' }}
      variants={prefersReducedMotion ? undefined : getDirectionVariants()}
      style={{ willChange: prefersReducedMotion ? undefined as any : 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;