import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBook, FaGraduationCap } from 'react-icons/fa';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import Anchor from '../atoms/Anchor';
import { itemVariants, navItemVariants } from '../../utils/animationVariants';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../atoms/Button';

const navItems = [
  { to: 'course', icon: FaBook, label: 'Courses' },
  { to: 'students', icon: FaGraduationCap, label: 'Students' },
];

const GroupLayout = () => {
  return (
    <div className="flex flex-col glass">
      {/* Main Content */}
      <main className="flex-1 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default GroupLayout;
