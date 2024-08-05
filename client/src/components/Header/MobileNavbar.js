import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import config from '../../../config';

const MobileNavbar = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-3 left-3 right-3 bg-zinc-900/20 backdrop-blur-sm border border-white/5 py-3 px-4 md:hidden rounded-2xl shadow-lg"
        >
            <div className="flex justify-around items-center">
                {config.navItems.map((item, index) => (
                    <Link href={item.target} key={index} className="group flex flex-col items-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 rounded-xl bg-zinc-800/50 text-gray-400 group-hover:text-indigo-400 transition-colors duration-200"
                        >
                            <item.icon className="w-5 h-5" />
                            <motion.div
                                className="absolute inset-0 bg-indigo-500/20 rounded-xl"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        </motion.div>
                        <span className="text-xs mt-1 text-gray-400 group-hover:text-indigo-400 transition-colors duration-200">{item.label}</span>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

export default MobileNavbar;