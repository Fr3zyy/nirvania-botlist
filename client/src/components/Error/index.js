"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaDiscord, FaHome } from 'react-icons/fa';
import { getErrorDetails } from '@/utils/getErrorDetails';

const ErrorComponent = ({ errorCode = 404 }) => {
    const errorDetails = getErrorDetails(errorCode);

    return (
        <div className="my-32 flex flex-col items-center justify-center p-5 text-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="block text-7xl font-bold sm:text-9xl text-red-400">
                    {errorDetails.code}
                </h1>

                <motion.p
                    className="mt-3 text-gray-600 dark:text-neutral-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Oops, something went wrong.
                </motion.p>

                <motion.p
                    className="text-gray-600 dark:text-neutral-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {errorDetails.message}
                </motion.p>

                <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-2">
                    <Link href={"/"}>
                        <motion.span
                            className="w-full sm:w-auto p-2 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-zinc-900/30 border border-white/5 text-gray-400 hover:text-white/80 hover:bg-zinc-900/60 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <FaHome className='w-5 h-5' />
                        </motion.span>
                    </Link>
                    <Link href={"/"}>
                        <motion.span
                            className="w-full sm:w-auto p-2 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-zinc-900/30 border border-white/5 text-gray-400 hover:text-white/80 hover:bg-zinc-900/60 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <FaDiscord className='w-5 h-5' />
                            Join our Community
                        </motion.span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ErrorComponent;
