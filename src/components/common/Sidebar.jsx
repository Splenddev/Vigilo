import { AnimatePresence, motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import {
  LuX,
  LuUsers,
  LuCalendar,
  LuSettings,
  LuCircleHelp,
} from 'react-icons/lu';
import { useSidebar } from '../../hooks/useSidebar';
import Anchor from '../atoms/Anchor';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Sidebar = () => {
  const { isOpen, close } = useSidebar({ rootId: 'vigilo-sidebar' });

  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      if (!isOpen) close();
      prevPath.current = pathname;
    }
  }, [pathname, isOpen, close]);

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/lecturer/dashboard' },
    { icon: LuUsers, label: 'Students', href: '/lecturer/students' },
    { icon: LuCalendar, label: 'Sessions', href: '/lecturer/sessions' },
    { icon: LuSettings, label: 'Settings', href: '/settings' },
    { icon: LuCircleHelp, label: 'Help', href: '/help' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
            transition={{ duration: 0.2 }}
          />

          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 top-0 bottom-0 h-full w-70 glass-strong border-r border-white/20 z-70">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold gradient-text">Vigilo</h2>
              <button
                onClick={close}
                className="h-9 w-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/50 transition-all duration-200">
                <LuX className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="p-6 space-y-2 h-[calc(100dvh-160px)] overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Navigation
              </h3>

              {menuItems.map((item, index) => (
                <Anchor
                  key={item.label}
                  href={item.href}
                  variant="primary"
                  className="flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 border border-transparent hover:border-purple-400/50 transition-all duration-200 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  animated>
                  <item.icon className="w-5 h-5 mr-3 text-gray-300 group-hover:text-purple-400 transition-colors" />
                  <span className="font-medium group-hover:text-purple-300 transition-colors">
                    {item.label}
                  </span>
                </Anchor>
              ))}
            </div>

            {/* User Profile Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 glass">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">DR</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Dr. Rachel Chen
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    rachel.chen@vigilo.edu
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
