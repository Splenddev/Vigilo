import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import {
  LuChevronLeft,
  LuChevronRight,
  LuGroup,
  LuUsersRound,
} from 'react-icons/lu';
import Anchor from '../atoms/Anchor';
import {
  itemVariants,
  labelVariants,
  navItemVariants,
} from '../../utils/animationVariants';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { to: 'all', icon: LuUsersRound, label: 'All Groups' },
  { to: 'info', icon: FaInfoCircle, label: 'Group Info' },
  { to: 'sessions', icon: FaCalendarAlt, label: 'Sessions' },
  { to: 'students', icon: FaBook, label: 'Students' },
];

const GroupLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 mt-13 left-0 h-screen p-4 flex flex-col bg-white shadow-md transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'} `}>
        {/* Header */}
        <div
          className={`flex items-center ${
            !collapsed ? 'justify-end' : 'justify-center'
          } mb-6 w-full`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100 transition">
            {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-gray-700 ">
          <AnimatePresence initial={false}>
            {navItems.map(({ to, icon: Icon, label }) => (
              <motion.div
                key={to}
                variants={navItemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.25, ease: 'easeInOut' }}>
                <Anchor
                  href={to}
                  className="flex items-center gap-3 px-2 py-2 rounded-md transition hover:bg-gray-100 w-full"
                  variant="secondary">
                  <motion.span
                    variants={itemVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center flex-grow-0">
                    <Icon className="text-xl" />
                  </motion.span>

                  {!collapsed && (
                    <motion.span
                      key="label"
                      variants={labelVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.25 }}>
                      {label}
                    </motion.span>
                  )}
                </Anchor>
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={
          'flex-1' +
          (collapsed ? ' ml-20' : ' ml-64') +
          ' transition-all duration-300'
        }>
        <Outlet />
      </main>
    </div>
  );
};

export default GroupLayout;
