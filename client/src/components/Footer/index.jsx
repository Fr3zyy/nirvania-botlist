"use client"
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-zinc-950/20 border-t border-zinc-700 py-8 fixed bottom-0 left-0 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <a href="/" className="text-xl font-bold text-white">Nirvania</a>
                        <p className="text-sm text-zinc-400 mt-1">© 2024 Nirvania. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" target='_blank' className="text-zinc-400 hover:text-white">
                            <FaGithub className='w-5 h-5'/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
