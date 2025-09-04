/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import {
  LuX,
  LuUsers,
  LuCalendar,
  LuSettings,
  LuCircleHelp,
  LuPlus,
  LuClipboardPlus,
} from 'react-icons/lu';
import { HiOutlineClipboardList, HiOutlineUserGroup } from 'react-icons/hi';
import { useSidebar } from '../../hooks/useSidebar';
import Anchor from '../atoms/Anchor';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { drawerLeft, fadeIn } from '../../utils/animationVariants';
import { useAuth } from '../../hooks/useAuth';
import { catenateName } from '../../utils/helpers';

const Sidebar = () => {
  const { isOpen, close } = useSidebar({ rootId: 'vigilo-sidebar' });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);
  const { user } = useAuth();

  const { firstName = '', lastName = '' } = user;

  const fullName = firstName + ' ' + lastName;

  const avatar = user.avatar || catenateName(fullName);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      if (isOpen) close();
      prevPath.current = pathname;
    }
  }, [pathname, isOpen, close]);

  const [openNew, setOpenNew] = useState(false);

  const menuItems = [
    { icon: FiHome, label: 'Home', href: '/lecturer/dashboard' },
    { icon: LuCalendar, label: 'Sessions', href: '/lecturer/sessions' },
    { icon: LuUsers, href: '/lecturer/groups', label: 'Groups' },
    {
      icon: HiOutlineClipboardList,
      label: 'Students',
      href: '/lecturer/students',
    },
    { icon: LuSettings, label: 'Settings', href: '/settings' },
    { icon: LuCircleHelp, label: 'Help', href: '/help' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            className="fixed inset-0 bg-bg-primary/90 backdrop-blur-xs z-60"
            transition={{ duration: 0.2 }}
          />

          <motion.aside
            variants={drawerLeft}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed left-0 top-0 bottom-0 h-full w-80 glass border-r border-white/20 z-70`}>
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <h2
                className="text-xl font-bold gradient-text cursor-pointer"
                onClick={() => navigate('/')}>
                Vigilo
              </h2>
              <button
                onClick={close}
                className="h-9 w-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/50 transition-all duration-200">
                <LuX className="w-5 h-5 text-t-primary" />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="p-6 space-y-2 h-[calc(100dvh-160px)] overflow-y-auto pt-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
                className="flex flex-col gap-1">
                {menuItems.map((item, index) => (
                  <Anchor
                    key={item.label}
                    href={item.href}
                    variant="primary"
                    className="flex items-center px-4 py-3 rounded-xl text-t-primary  transition-all font-medium duration-200 group"
                    transition={{ delay: index * 0.1 }}
                    animated>
                    <item.icon className="w-5 h-5 mr-3 text-t-secondary group-hover:text-primary transition-colors" />
                    <span className="font-medium  transition-colors">
                      {item.label}
                    </span>
                  </Anchor>
                ))}
              </motion.div>
            </div>

            {/* User Profile Section */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 glass cursor-pointer"
              onClick={() => navigate('/profile')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-t-primary truncate">
                    {fullName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.email || ''}
                  </p>
                </div>
              </div>
            </div>
            {/* Floating Action Button (FAB) */}
            <div className="absolute bottom-20 right-4 max-w-3/4">
              <AnimatePresence>
                {openNew && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="mb-3 space-y-2">
                    <Anchor
                      href="/lecturer/sessions/new"
                      variant="primary"
                      className=" px-4 py-2 rounded-lg bg-bg-glass-strong text-t-tertiary hover:text-t-primary hover:border-purple-500 border border-white/20 transition-colors flex items-center">
                      <LuClipboardPlus className="w-5 h-5 mr-3" />
                      New Session
                    </Anchor>
                    <Anchor
                      href="/lecturer/groups/new"
                      variant="primary"
                      className="flex items-center px-4 py-2 rounded-lg bg-bg-glass-strong text-t-tertiary hover:text-t-primary hover:border-purple-500 border border-white/20 transition-colors">
                      <HiOutlineUserGroup className="w-5 h-5 mr-3" />
                      New Group
                    </Anchor>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FAB button */}
              <motion.button
                onClick={() => setOpenNew(!openNew)}
                animate={{ rotate: openNew ? 45 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-10 h-10 rounded-full flex items-center justify-center 
                gradient-bg text-white shadow-lg 
                hover:scale-105 transition-transform duration-200 place-self-end">
                <LuPlus className="w-6 h-6 " />
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
