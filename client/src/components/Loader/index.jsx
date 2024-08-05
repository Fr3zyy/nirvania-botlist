"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 40, primaryColor = "#3b82f6", secondaryColor = "#8b5cf6" }) => {
  const containerStyle = {
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const circleStyle = {
    width: '100%',
    height: '100%',
    border: '4px solid transparent',
    borderRadius: '50%',
    position: 'absolute',
  };

  const spinTransition = {
    repeat: Infinity,
    ease: "easeInOut",
    duration: 1.5,
  }

  return (
    <div style={containerStyle}>
      <motion.span
        style={{
          ...circleStyle,
          borderTop: `4px solid ${primaryColor}`,
          borderRight: `4px solid ${primaryColor}`,
        }}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      <motion.span
        style={{
          ...circleStyle,
          borderBottom: `4px solid ${secondaryColor}`,
          borderLeft: `4px solid ${secondaryColor}`,
          width: '75%',
          height: '75%',
        }}
        animate={{ rotate: -360 }}
        transition={{
          ...spinTransition,
          duration: 1.2,
        }}
      />
      <motion.div
        style={{
          width: '30%',
          height: '30%',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Loader;