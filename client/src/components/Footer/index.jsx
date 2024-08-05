"use client"
import React from 'react';
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
import config from '../../../config';

const Footer = () => {
    return (
        <footer className="bg-zinc-950/20 border-t border-zinc-700 py-8 fixed bottom-0 left-0 w-full z-10 hidden md:block">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between space-y-10 md:space-y-0">
                    <div className="flex flex-col space-y-4">
                        <a href="/" className="text-2xl font-bold text-white hover:text-gray-400 transition-colors duration-300">Nirvania</a>
                        <p className="text-sm text-gray-400">© 2024 Nirvania. All rights reserved.</p>
                        <div className="text-sm text-gray-400 space-y-2 flex flex-col">
                            <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                            <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <h3 className="text-lg font-bold text-white">Pages</h3>
                        <div className="text-sm text-gray-400 space-y-2 flex flex-col">
                            <a href="/" className="hover:text-white transition-colors duration-300">Home</a>
                            <a href="/discover" className="hover:text-white transition-colors duration-300">Discover</a>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <a href="https://github.com/Fr3zyy/nirvania-botlist" target='_blank' rel='noopener noreferrer' className="text-gray-400 hover:text-white transition-colors duration-300">
                            <FaGithub className='w-6 h-6' />
                        </a>
                        <a href="https://youtube.com/@Fr3zy" target='_blank' rel='noopener noreferrer' className="text-gray-400 hover:text-white transition-colors duration-300">
                            <FaYoutube className='w-6 h-6' />
                        </a>
                        <a href={config.links.discord} target='_blank' rel='noopener noreferrer' className="text-gray-400 hover:text-white transition-colors duration-300">
                            <FaDiscord className='w-6 h-6' />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
