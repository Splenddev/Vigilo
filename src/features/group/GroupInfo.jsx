import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBook } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyGroupSettings } from '../../utils/data';
import {
  LuBookText,
  LuCalendar,
  LuClipboardList,
  LuSchool,
  LuUsers,
  LuSettings,
  LuGraduationCap,
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeIn,
  slideUp,
  cardVariants,
  itemVariants,
  containerVariants,
  hoverEffect,
  rippleEffect,
} from '../../utils/animationVariants';
import StatList from '../../components/molecules/StatList';
import { FiCalendar, FiCheckCircle, FiSearch, FiUsers } from 'react-icons/fi';
import GroupOverview from './components/GroupOverview';
import Tabs from '../../components/common/Tabs';
import EmptyState from '../../components/common/EmptyState';
import SessionCard from './components/SessionCard';
import GroupSettings from './components/GroupSettings';
import StudentCard from './components/StudentCard';
import { useGroups } from '../../hooks/useGroups';
import useLoader from '../../hooks/useLoader';
import { PageLoader } from '../../components/PageLoader';
import ErrorState from '../../components/common/ErrorState';

const GroupInfo = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, loading, fetchGroups, error } = useGroups();
  const group = groups.find((g) => g._id === groupId);

  useEffect(() => {
    fetchGroups();
  }, []);

  const [activeTab, setActiveTab] = useState('overview');
  if (loading) {
    return (
      <PageLoader
        loading={loading}
        fullscreen
        text="Loading data..."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load groups"
        message={error}
        onRetry={fetchGroups}
        retryLabel="Try again"
      />
    );
  }

  if (!group) {
    return (
      <EmptyState
        title="Group not found"
        message={`The group "${groupId}" could not be found.`}
        icon={FiSearch}
        action={
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            className="btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
            onClick={() => navigate('/lecturer/groups')}>
            Back to Groups
          </motion.button>
        }
      />
    );
  }

  // Stats
  const totalStudents = group.studentsRosterId?.students?.length || 0;
  const completedSessions =
    group.sessions?.filter((s) => s.status === 'completed')?.length || 0;
  const avgAttendance =
    completedSessions > 0
      ? Math.round(
          group.sessions
            ?.filter((s) => s.status === 'completed')
            .reduce((acc, s) => acc + s.attendance.present, 0) /
            completedSessions
        )
      : 0;

  const stats = [
    {
      icon: FiUsers,
      label: 'New Students',
      value: `+ ${totalStudents}`,
      variant: 'light',
      iconColor: 'blue',
    },
    {
      icon: FiCalendar,
      label: 'Recent Sessions',
      value: `+ ${group.sessions?.length || 0}`,
      variant: 'glass',
      iconColor: 'purple',
    },
    {
      icon: FiCheckCircle,
      label: 'Completed sessions',
      value: completedSessions || 0,
      variant: 'dark',
      iconColor: 'emerald',
    },
    {
      icon: LuGraduationCap,
      label: 'Avg. Attendance',
      value: `${avgAttendance || 0}%`,
      variant: 'light',
      iconColor: 'orange',
    },
  ];

  return (
    <motion.div
      className="px-4 sm:px-6 py-6 sm:py-8 min-h-screen"
      variants={fadeIn}
      initial="hidden"
      animate="visible">
      {/* Back Button */}
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible">
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={rippleEffect}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-t-primary glass px-3 sm:px-4 py-2 rounded-xl border border-slate-200 shadow-md text-sm sm:text-base mb-5">
          <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="font-medium">Back to Groups</span>
        </motion.button>
      </motion.div>

      {/* Group Header */}
      <motion.div
        className="glass rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden"
        variants={slideUp}
        initial="hidden"
        animate="visible">
        <div className="relative">
          <motion.div
            className="flex items-center gap-2 text-accent px-4 py-2 rounded-xl place-self-start shadow-md bg-primary-cyan-light/20 shrink-0"
            variants={cardVariants}
            initial="hidden"
            animate="visible">
            <FaBook className="w-4 h-4" />
            <span className="font-bold text-sm">{group.courseCode}</span>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 mt-2 gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                {group.name}
              </h1>
              <p className="text-sm sm:text-base text-t-secondary">
                {group.description}
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <StatList
            variant="light"
            stats={stats}
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { key: 'overview', label: 'Overview', icon: LuBookText },
          { key: 'students', label: 'Students', icon: LuUsers },
          { key: 'sessions', label: 'Sessions', icon: LuClipboardList },
          { key: 'settings', label: 'Settings', icon: LuSettings },
        ]}
        defaultActive={activeTab}
        variant="pills"
        onChange={(k) => setActiveTab(k)}
      />

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && <GroupOverview />}

        {activeTab === 'students' && (
          <motion.div
            key="students"
            className="glass rounded-2xl shadow-xl border border-slate-200 p-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold">Student Roster & Enrollment</h2>
              <p className="text-sm text-gray-500 mt-1">
                Students are added to this group by{' '}
                <strong>roster upload</strong>,<strong> email invites</strong>,
                or <strong>group search</strong> (if privacy allows). Accounts
                matching the roster are joined automatically once students sign
                up.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-sm text-gray-500">
                  Students Roster Uploaded
                </p>
                <p className="text-lg font-semibold">
                  {group.studentsRosterId?.students?.length || 0}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                <p className="text-sm text-gray-500">Joined Students</p>
                <p className="text-lg font-semibold">
                  {group.joinedCount || 0}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                <p className="text-sm text-gray-500">Pending Matches</p>
                <p className="text-lg font-semibold">
                  {(group.studentsRosterId?.students?.length || 0) -
                    (group.joinedCount || 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                <p className="text-sm text-gray-500">Invited</p>
                <p className="text-lg font-semibold">
                  {group.invitedCount || 0}
                </p>
              </div>
            </div>

            {/* Roster preview */}
            {!group.studentsRosterId?.students?.length ? (
              <div className="p-4 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <p className="text-gray-600 font-medium">
                  No roster has been uploaded yet.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Upload a student roster file to begin managing students in
                  this group.
                </p>
              </div>
            ) : (
              <>
                <motion.ul
                  variants={containerVariants}
                  initial="collapsed"
                  animate="expanded"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {group.studentsRosterId.students.slice(0, 20).map((s, i) => (
                    <motion.li
                      key={s.id}
                      custom={i}
                      variants={itemVariants}>
                      <StudentCard
                        student={s}
                        showStatus
                      />
                    </motion.li>
                  ))}
                </motion.ul>

                {group.studentsRosterId.students.length > 20 && (
                  <div className="mt-4 text-center">
                    <button className="text-blue-500 hover:underline text-sm">
                      View all students
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600">
                Upload New Roster
              </button>
              <button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50">
                Export Summary
              </button>
              <button className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50">
                Invite Students
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'sessions' && (
          <motion.div
            key="sessions"
            className="glass rounded-2xl shadow-xl border border-slate-200 p-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <h2 className="text-xl font-bold mb-4">Sessions</h2>
            <motion.ul
              variants={containerVariants}
              initial="collapsed"
              animate="expanded"
              className="space-y-2">
              {group.sessions.map((s) => (
                <SessionCard
                  key={s.sessionId}
                  session={s}
                />
              ))}
            </motion.ul>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            className="glass rounded-2xl shadow-xl border border-slate-200 p-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <GroupSettings settings={dummyGroupSettings} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GroupInfo;
