import React, { useState, useEffect, useMemo } from 'react';
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
  containerVariants,
  hoverEffect,
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
import { HealthStatus } from '../../components/common/HealthStatus';
import { getGroupHealth } from '../../utils/healthChecks';
import StudentsTab from './components/GroupInfoStudentsTab';
import { useAuth } from '../../hooks/useAuth';

const GroupInfo = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { groups, loading, fetchGroups, error } = useGroups();
  const group = groups.find((g) => g._id === groupId);
  const { user } = useAuth();

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
        text='Loading data...'
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        variant={error.status === 500 ? 'network' : 'error'}
        onRetry={fetchGroups}
        retryLabel='Try again'
      />
    );
  }

  if (!group) {
    return (
      <EmptyState
        title='Group not found'
        message={`The group "${groupId}" could not be found.`}
        icon={FiSearch}
        action={
          <motion.button
            whileHover='hover'
            whileTap='tap'
            variants={hoverEffect}
            className='btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg'
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

  const healthIssues = getGroupHealth(group);

  return (
    <motion.div
      className='px-4 sm:px-6 py-6 min-h-screen'
      variants={fadeIn}
      initial='hidden'
      animate='visible'>
      {/* Responsive Layout */}
      <div className='flex flex-col lg:flex-row lg:items-start lg:gap-6'>
        {/* Left column (Group Header + Stats) */}
        <motion.div
          className='lg:w-2/5 lg:sticky lg:top-17 glass rounded-2xl shadow-xl border h-full border-slate-200 p-6 sm:p-8 mb-6 lg:mb-0'
          variants={slideUp}
          initial='hidden'
          animate='visible'>
          <div className='relative'>
            <motion.div
              className='flex items-center gap-2 text-accent px-4 py-2 rounded-xl place-self-start shadow-md bg-primary-cyan-light/20 shrink-0'
              variants={cardVariants}
              initial='hidden'
              animate='visible'>
              <FaBook className='w-4 h-4' />
              <span className='font-bold text-sm'>{group.courseCode}</span>
            </motion.div>
            <div className='flex flex-col mb-6 mt-2 gap-4'>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={fadeIn}>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-2'>
                  {group.name}
                </h1>
                <p className='text-sm sm:text-base text-t-secondary'>
                  {group.description}
                </p>

                <HealthStatus
                  issues={healthIssues}
                  setActiveTab={setActiveTab}
                />
              </motion.div>
            </div>
            <StatList
              variant='light'
              stats={stats}
            />
          </div>
        </motion.div>

        {/* Right column (Tabs + Tab Content) */}
        <div className='lg:w-3/5 flex flex-col'>
          {/* Tabs */}
          <Tabs
            tabs={[
              { key: 'overview', label: 'Overview', icon: LuBookText },
              { key: 'students', label: 'Students', icon: LuUsers },
              { key: 'sessions', label: 'Sessions', icon: LuClipboardList },
              { key: 'settings', label: 'Settings', icon: LuSettings },
            ]}
            defaultActive={() => {
              return activeTab;
            }}
            variant='pills'
            onChange={(k) => setActiveTab(k)}
          />

          {/* Tab Content */}
          <AnimatePresence mode='wait'>
            {activeTab === 'overview' && <GroupOverview />}

            {activeTab === 'students' && (
              <StudentsTab
                user={user}
                fetchGroups={fetchGroups}
                group={group}
              />
            )}

            {activeTab === 'sessions' && (
              <motion.div
                key='sessions'
                className='glass rounded-2xl shadow-xl border border-slate-200 p-6'
                variants={fadeIn}
                initial='hidden'
                animate='visible'
                exit='exit'>
                <h2 className='text-xl font-bold mb-4'>Sessions</h2>
                <motion.ul
                  variants={containerVariants}
                  initial='collapsed'
                  animate='expanded'
                  className='space-y-2'>
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
                key='settings'
                className='glass rounded-2xl shadow-xl border border-slate-200 p-6'
                variants={fadeIn}
                initial='hidden'
                animate='visible'
                exit='exit'>
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
