"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ErrorComponent = () => {
    return (
        <div className="mt-32 flex flex-col items-center justify-center p-5 text-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="block text-7xl font-bold sm:text-9xl text-red-400">
                    404
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
                    Sorry, we couldn't find your page.
                </motion.p>

                <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                    <Link href={"/"}>
                        <motion.span
                            className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-zinc-900/30 border border-white/5 text-white hover:bg-zinc-900/60 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Back to home
                        </motion.span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ErrorComponent;
