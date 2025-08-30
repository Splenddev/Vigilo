import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import StatusModal from './components/modal/StatusModal';

const App = () => {
  return (
    <div className="">
      <StatusModal />
      <Outlet />
    </div>
  );
};

export default App;
