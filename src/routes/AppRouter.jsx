import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import StudentLayout from '../components/layout/StudentLayout';
import LecturerLayout from '../components/layout/LecturerLayout';
import LecturerDashboard from '../features/lecturer/LecturerDashboard';
import SessionList from '../features/attendance/SessionList';
import Groups from '../features/group/Group';
import GroupInfo from '../features/group/GroupInfo';
import Auth from '../pages/Auth';
import CreateSession from '../features/attendance/CreateSession';
import UserProfile from '../pages/UserProfile';
import StudentsList from '../features/lecturer/StudentsList';
import HelpPage from '../pages/Help';
import CourseList from '../features/courses/CourseList';
import CreateGroup from '../features/group/CreateGroup';
import ProtectedRoutes from './ProtectedRoute';
import { ROLES } from '../utils/roles';
import Unauthorized from '../pages/Unauthorized';
import StudentInfo from '../features/lecturer/StudentInfo';
import SettingsPage from '../pages/SettingsPage';
import StudentDashboard from '../features/student/StudentDashboard';

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
        element: (
          <ProtectedRoutes allowedRoles={[ROLES.LECTURER]}>
            <LecturerLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="dashboard"
                replace
              />
            ),
          },
          { path: 'dashboard', element: <LecturerDashboard /> },
          { path: 'sessions', element: <SessionList /> },
          { path: 'sessions/new', element: <CreateSession /> },
          {
            path: 'students',
            element: <StudentsList />,
          },
          { path: 'students/:studentId', element: <StudentInfo /> },
          {
            path: 'groups',
            element: <Groups />,
          },
          {
            path: 'groups/new',
            element: <CreateGroup />,
          },
          { path: 'groups/:groupId/info', element: <GroupInfo /> },
          {
            path: 'courses',
            element: <CourseList />,
          },
        ],
      },
      {
        path: '/student',
        element: (
          <ProtectedRoutes allowedRoles={[ROLES.STUDENT]}>
            <StudentLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="dashboard"
                replace
              />
            ),
          },
          { path: 'dashboard', element: <StudentDashboard /> },
        ],
      },
      { path: '/profile', element: <UserProfile /> },
      { path: '/help', element: <HelpPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/unauthorized', element: <Unauthorized /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
