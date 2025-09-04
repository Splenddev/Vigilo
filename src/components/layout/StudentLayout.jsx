import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default StudentLayout;
