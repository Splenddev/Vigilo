import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const LecturerLayout = () => {
  return (
    <div className="m">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default LecturerLayout;
