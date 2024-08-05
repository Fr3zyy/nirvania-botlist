"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';

const UserSide = () => {
  return (
    <div className="flex items-center space-x-2">
      <motion.button
        className="p-1.5 rounded-full text-gray-400 hover:text-indigo-500 transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="bg-blue-950/20 text-white py-1.5 px-3 rounded-md border border-sky-500/50 flex items-center space-x-1 transition-colors duration-200 text-sm"
      >
        <FaDiscord className="w-4 h-4" />
        <span>Login with Discord</span>
      </motion.button>
    </div>
  );
};

export default UserSide;