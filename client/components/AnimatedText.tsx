import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
};

const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
  tag = 'h1',
}: AnimatedTextProps) => {
  const prefersReducedMotion = useReducedMotion();
  // Split the text into words
  const words = text.split(' ');

  // Container variants
  const container = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
          opacity: 1,
          transition: { staggerChildren: Math.min(duration, 0.03), delayChildren: Math.min(delay, 0.15) },
        }),
      };

  // Child variants (words)
  const child: any = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'tween',
            duration: 0.25,
            ease: 'easeOut',
          },
        },
      };

  const Component = motion[tag];

  return (
    <Component
      className={className}
      variants={container}
      initial={prefersReducedMotion ? undefined : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.25 }}
      style={{ willChange: prefersReducedMotion ? undefined : 'transform, opacity' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

export default AnimatedText;