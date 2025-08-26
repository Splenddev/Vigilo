import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaUsers,
  FaBook,
  FaCalendarAlt,
  FaGraduationCap,
} from 'react-icons/fa';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import Anchor from '../atoms/Anchor';
import { itemVariants, navItemVariants } from '../../utils/animationVariants';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../atoms/Button';
import clsx from 'clsx';
import { useBreakpoint } from '../../hooks/useBreakpoint';

const navItems = [
  { to: 'course', icon: FaBook, label: 'Courses' },
  { to: 'students', icon: FaGraduationCap, label: 'Students' },
];

const GroupLayout = () => {
  const { isMobile } = useBreakpoint();
  const [collapsed, setCollapsed] = useState(isMobile ? true : false);

  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 mt-13 left-0 h-screen p-4 flex flex-col bg-white shadow-md transition-all duration-300 
          ${collapsed ? 'w-15' : 'w-45'} `}>
        {/* Header */}
        <div
          className={`flex items-center ${
            !collapsed ? 'justify-end' : 'justify-center'
          } mb-6 w-full`}>
          <Button
            size="sm"
            func={() => setCollapsed(!collapsed)}
            className="rounded-md hover:bg-gray-100 transition">
            {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 text-gray-700 ">
          <AnimatePresence>
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
                  className={clsx(
                    'flex items-center rounded-md transition hover:bg-gray-100 w-full px-3 py-2',
                    !collapsed ? 'gap-3' : 'justify-center g-0'
                  )}
                  variant="primary">
                  <motion.span
                    variants={itemVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center flex-grow-0 text-xl">
                    <Icon />
                  </motion.span>
                  {!collapsed && (
                    <motion.span
                      initial={{ x: 20 }}
                      animate={{
                        x: 0,
                        transition: {
                          duration: 0.3,
                          ease: 'easeOut',
                        },
                      }}
                      exit={{
                        x: -20,
                        transition: { duration: 0.3, ease: 'easeIn' },
                      }}
                      className="whitespace-nowrap">
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
          (collapsed ? ' ml-15' : ' ml-45') +
          ' transition-all duration-300'
        }>
        <Outlet />
      </main>
    </div>
  );
};

export default GroupLayout;
