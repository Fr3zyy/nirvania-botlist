import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import config from '../../../config';

const DesktopNavbar = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {config.navItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={item.target} className="flex items-center space-x-1 text-gray-400 hover:text-indigo-500 transition-colors duration-200 text-sm">
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default DesktopNavbar;