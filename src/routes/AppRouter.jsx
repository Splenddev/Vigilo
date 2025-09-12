import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from '../App';

// Layouts
import StudentLayout from '../components/layout/StudentLayout';
import LecturerLayout from '../components/layout/LecturerLayout';

// Shared pages
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import UserProfile from '../pages/UserProfile';
import HelpPage from '../pages/Help';
import SettingsPage from '../pages/SettingsPage';

// Lecturer features
import LecturerDashboard from '../features/lecturer/LecturerDashboard';
import SessionList from '../features/attendance/SessionList';
import CreateSession from '../features/attendance/CreateSession';
import StudentsList from '../features/lecturer/StudentsList';
import StudentInfo from '../features/lecturer/StudentInfo';
import Groups from '../features/group/Group';
import CreateGroup from '../features/group/CreateGroup';
import GroupInfo from '../features/group/GroupInfo';

// Student features
import StudentDashboard from '../features/student/StudentDashboard';
import AttendancePage from '../features/attendance/StudentAttendance';
import MarkAttendance from '../features/student/MarkAttendance';
import ViewAttendancePage from '../features/student/ViewAttendancePage';

// Utils
import ProtectedRoutes from './ProtectedRoute';
import { ROLES } from '../utils/roles';
import SessionInfoPage from '../features/lecturer/SessionInfo';
import SessionStudentsPage from '../features/lecturer/SessionStudentsList';
import StudentGroupsDashboard from '../features/student/StudentGroups';
import StudentGroupInfo from '../features/student/StudentGroupInfo';
import CreateSchool from '../admin/CreateSchool';
import AdminLayout from '../components/layout/AdminLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth', element: <Auth /> },
      { path: 'unauthorized', element: <Unauthorized /> },

      // Lecturer routes
      {
        path: 'lecturer',
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
          { path: 'sessions/:sessionId/info', element: <SessionInfoPage /> },
          {
            path: 'sessions/:sessionId/students',
            element: <SessionStudentsPage />,
          },
          { path: 'students', element: <StudentsList /> },
          { path: 'students/:studentId', element: <StudentInfo /> },
          { path: 'groups', element: <Groups /> },
          { path: 'groups/new', element: <CreateGroup /> },
          { path: 'groups/:groupId/info', element: <GroupInfo /> },
        ],
      },

      // Student routes
      {
        path: 'student',
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
          { path: 'attendance', element: <AttendancePage /> },
          { path: 'attendance/:id', element: <MarkAttendance /> },
          { path: 'attendance/:id/info', element: <ViewAttendancePage /> },
          {
            path: 'groups',
            element: <StudentGroupsDashboard />,
          },
          {
            path: 'groups/:id/info',
            element: <StudentGroupInfo />,
          },
        ],
      },

      {
        path: 'super_admin',
        element: (
          <ProtectedRoutes allowedRoles={[ROLES.ADMIN]}>
            <AdminLayout />
          </ProtectedRoutes>
        ),children:[{path:'dashboard',element:<CreateSchool/>}]
      },

      // Common authenticated routes
      { path: 'profile', element: <UserProfile /> },
      { path: 'help', element: <HelpPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
