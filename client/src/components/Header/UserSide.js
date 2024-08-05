"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/hooks/auth';
import { FaGear } from "react-icons/fa6";

const UserSide = () => {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 p-2">
          <img
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            alt={user.username}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-white">{user.username}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors duration-200"
        >
          <FaSignOutAlt />
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={login}
      className="bg-zinc-900/10 text-white py-1.5 px-3 rounded-md border border-white/5 flex items-center space-x-1 transition-colors duration-200 text-sm"
    >
      <FaDiscord className="w-4 h-4" />
      <span>Login with Discord</span>
    </motion.button>
  );
};

export default UserSide;