import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import AuthLayout from '../components/layout/AuthLayout';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import StudentLayout from '../components/layout/StudentLayout';
import LecturerLayout from '../components/layout/LecturerLayout';
import LecturerDashboard from '../features/attendance/LecturerDashboard';
import SessionList from '../features/attendance/SessionList';
import Groups from '../features/group/Group';
import GroupLayout from '../components/layout/GroupLayout';
import GroupInfo from '../features/group/GroupInfo';

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
      // Nested routes for authentication
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <LoginPage /> }, // /auth
          { path: 'login', element: <LoginPage /> }, // /auth/login
          { path: 'register', element: <RegisterPage /> }, // /auth/register
        ],
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
            element: <GroupLayout />,
            children: [
              { index: true, element: <Groups /> },
              { path: '', element: <Groups /> },
              { path: 'info/:groupId', element: <GroupInfo /> },
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
