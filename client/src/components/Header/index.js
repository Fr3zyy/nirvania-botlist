"use client"
import React from 'react';
import { motion } from 'framer-motion';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';
import UserSide from './UserSide';
import { FaRobot } from 'react-icons/fa';

const Header = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-gray-200 py-2 px-3 mt-4"
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center space-x-2"
        >
          <FaRobot className='w-8 h-8' />
          <span className="font-bold text-lg text-white/80">Nirvania</span>
        </motion.div>
        <MobileNavbar />
        <DesktopNavbar />
        <UserSide />
      </div>
    </motion.nav>
  );
};

export default Header;