"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa';
import { useAuth } from '@/hooks/auth';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import config from '../../../config';
import { RiArrowDownSLine } from "react-icons/ri";

const UserSide = () => {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="flex items-center space-x-2 p-2 text-white">
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{user.username}</span>
                <RiArrowDownSLine className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
              </Menu.Button>


              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-[#17181e]/60 border border-white/5 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-3">
                    <span className="text-sm text-gray-400">USER</span>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={"/profile/@me"}
                          className={`${active ? 'bg-[#1f2129] text-white' : 'text-gray-200'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-4 py-3">
                    <span className="text-sm text-gray-400">ACTIONS</span>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={config.links.discord}
                          target='_blank'
                          className={`${active ? 'bg-[#1f2129] text-white' : 'text-gray-200'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Support Server
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${active ? 'bg-red-500 text-white' : 'text-red-500'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
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
