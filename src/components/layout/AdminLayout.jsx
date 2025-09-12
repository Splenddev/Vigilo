import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
