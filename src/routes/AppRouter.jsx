import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import StudentLayout from '../components/layout/StudentLayout';
import LecturerLayout from '../components/layout/LecturerLayout';
import LecturerDashboard from '../features/attendance/LecturerDashboard';
import SessionList from '../features/attendance/SessionList';
import Groups from '../features/group/Group';
import GroupLayout from '../components/layout/GroupLayout';
import GroupInfo from '../features/group/GroupInfo';
import Auth from '../pages/Auth';
import GroupStudents from '../features/group/GroupStudents';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },

      {
        path: '/lecturer',
        element: <LecturerLayout />,
        children: [
          { index: true, element: <LecturerDashboard /> },
          { path: 'dashboard', element: <LecturerDashboard /> },
          { path: 'sessions', element: <SessionList /> },
          {
            path: 'groups',
            element: <Groups />,
          },
          {
            path: 'groups/:groupId',
            element: <GroupLayout />,
            children: [
              { index: true, element: <GroupInfo /> },
              { path: 'info', element: <GroupInfo /> },
              { path: 'students', element: <GroupStudents /> },
            ],
          },
        ],
      },
      { path: '/student', element: <StudentLayout /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
