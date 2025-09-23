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
  LuUserCheck,   
  LuUserSearch,
  LuUserPlus, 
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
import { PageLoader } from '../../components/loaders/PageLoader';
import ErrorState from '../../components/common/ErrorState';
import { HealthStatus } from '../../components/common/HealthStatus'
import { getGroupHealth } from '../../utils/healthChecks'

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
        variant='dots'
        text="Loading data..."
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        variant={error.status === 500 ? 'network' : 'error'}
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
            onClick={() => navigate('/lecturer/groups')}
          >
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
            .reduce((acc, s) => acc + s.attendance.present, 0) / completedSessions
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

  const rosterStats = [
  {
    icon: LuUsers,
    label: 'Students In Roster',
    iconColor: 'blue',
    value: group.studentsRosterId?.students?.length || 0,
  },
  {
    icon: LuUserCheck,
    label: 'Joined Students',
    iconColor: 'emerald',
    value: group.studentsRosterId?.students?.filter((s) => s.hasJoined)?.length || 0,
  },
  {
    icon: LuUserSearch,
    label: 'Pending Matches',
    iconColor: 'orange',
    value:
      group.studentsRosterId?.students?.filter((s) => !s.hasJoined)?.length || 0,
  },
  {
    icon: LuUserPlus,
    label: 'Invited',
    iconColor: 'gray',
    value: group.invitedCount || 0,
  },
];
    
    const healthIssues = getGroupHealth(group);

  return (
    <motion.div
      className="px-4 sm:px-6 py-6 min-h-screen"
      variants={fadeIn}
      initial="hidden"
      animate="visible">
      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
        {/* Left column (Group Header + Stats) */}
        <motion.div
          className="lg:w-2/5 lg:sticky lg:top-17 glass rounded-2xl shadow-xl border h-full border-slate-200 p-6 sm:p-8 mb-6 lg:mb-0"
          variants={slideUp}
          initial="hidden"
          animate="visible">
          <div className="relative">
            <motion.div
              className="flex items-center gap-2 text-accent px-4 py-2 rounded-xl place-self-start shadow-md bg-primary-cyan-light/20 shrink-0"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <FaBook className="w-4 h-4" />
              <span className="font-bold text-sm">{group.courseCode}</span>
            </motion.div>
            <div className="flex flex-col mb-6 mt-2 gap-4">
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  {group.name}
                </h1>
                <p className="text-sm sm:text-base text-t-secondary">
                  {group.description}
                </p>

                <HealthStatus issues={healthIssues} />
              </motion.div>
            </div>
            <StatList variant="light" stats={stats} />
          </div>
        </motion.div>

        {/* Right column (Tabs + Tab Content) */}
        <div className="lg:w-3/5 flex flex-col">
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
                  <p className="text-sm text-t-secondary mt-1">
                    This list shows{' '}
                    <strong>students extracted from the uploaded roster</strong>.
                    When a lecturer uploads a roster for this group, the system
                    automatically cross-checks each entry against registered student
                    accounts in the school.
                    <br />
                    <br />✅ If a student’s <strong>matric number</strong> or{' '}
                    <strong>email</strong> matches, the student is automatically
                    enrolled in the group once they create or log into their
                    account.
                    <br />
                    ✅ If there’s no immediate match, the student remains on the
                    roster until they register, at which point the system links them
                    automatically.
                    <br />✅ Lecturers can also send <strong>
                      email invites
                    </strong>{' '}
                    or allow students to join through <strong>group search</strong>{' '}
                    (depending on privacy settings).
                    <br />
                    <br />
                    This ensures that every student in the roster is correctly
                    assigned to their respective group with minimal manual
                    intervention, while still allowing flexibility for invites and
                    self-joining where appropriate.
                  </p>
                </div>

                {/* Stats */}
                <div className="mb-6">
                  <StatList variant="light" stats={rosterStats} />
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
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
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
                exit="exit"
              >
                <h2 className="text-xl font-bold mb-4">Sessions</h2>
                <motion.ul
                  variants={containerVariants}
                  initial="collapsed"
                  animate="expanded"
                  className="space-y-2"
                >
                  {group.sessions.map((s) => (
                    <SessionCard key={s.sessionId} session={s} />
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
                exit="exit"
              >
                <GroupSettings settings={dummyGroupSettings} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GroupInfo;

