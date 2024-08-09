"use client"
import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaUserCircle, FaRobot, FaHeadset, FaSignOutAlt } from 'react-icons/fa';
import { RiArrowDownSLine } from "react-icons/ri";
import { useAuth } from '@/hooks/auth';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import config from '../../../config';

const UserSide = () => {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (user) {
    return <UserMenu user={user} logout={logout} />;
  }

  return <LoginButton login={login} />;
};

const LoadingIndicator = () => (
  <div className="animate-pulse bg-zinc-800/50 h-10 w-32 rounded-full"></div>
);

const UserMenu = ({ user, logout }) => (
  <div className="relative inline-block text-left">
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center space-x-2 p-2 bg-zinc-800/50 backdrop-blur-md rounded-full text-white border border-zinc-700/50 transition-all duration-200 hover:bg-zinc-700/50">
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
              alt={user.username}
              className="w-8 h-8 rounded-full border border-zinc-600"
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <MenuSection title="USER">
                <MenuItem href="/profile/@me" icon={FaUserCircle}>Profile</MenuItem>
              </MenuSection>
              <MenuSection title="ADD">
                <MenuItem href={"/bots/new"} icon={FaRobot} external>Discord Bot</MenuItem>
              </MenuSection>
              <MenuSection title="ACTIONS">
                <MenuItem href={config.links.discord} icon={FaHeadset} external>Support Server</MenuItem>
                <MenuItem onClick={logout} icon={FaSignOutAlt} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  Logout
                </MenuItem>
              </MenuSection>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  </div>
);

const MenuSection = ({ title, children }) => (
  <div className="px-4 py-3">
    <span className="text-sm text-zinc-500 font-medium">{title}</span>
    {children}
  </div>
);

const MenuItem = ({ children, href, icon: Icon, external, onClick, className = "" }) => {
  const content = (
    <div className={`group flex items-center w-full px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-colors duration-150 ${className}`}>
      <Icon className="w-5 h-5 mr-3" />
      {children}
    </div>
  );

  if (onClick) {
    return (
      <Menu.Item>
        <button onClick={onClick} className="w-full text-left">
          {content}
        </button>
      </Menu.Item>
    );
  }

  return (
    <Menu.Item>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href}>
          {content}
        </Link>
      )}
    </Menu.Item>
  );
};

const LoginButton = ({ login }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={login}
    className="bg-zinc-800/50 backdrop-blur-md text-white py-2 px-4 rounded-full flex items-center space-x-2 transition-all duration-200 border border-zinc-700/50 hover:bg-zinc-700/50"
  >
    <FaDiscord className="w-5 h-5" />
    <span className="text-sm font-medium">Login with Discord</span>
  </motion.button>
);

export default UserSide;