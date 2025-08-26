import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import { AnimatePresence } from 'framer-motion';

const LecturerLayout = () => {
  return (
    <div className="">
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default LecturerLayout;
