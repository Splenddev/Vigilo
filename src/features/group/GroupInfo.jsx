import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaGraduationCap,
  FaCalendar,
  FaBook,
  FaUsers,
  FaCheckCircle,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { groups } from '../../utils/data';
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

import StatCard from '../../components/molecules/StatCard';
import InfoRow from '../../components/molecules/InfoRow';
import {
  fadeIn,
  slideUp,
  cardVariants,
  itemVariants,
  containerVariants,
  hoverEffect,
  rippleEffect,
} from '../../utils/animationVariants';
import { StatGroup } from '../../components/containers/StatGroup';
import StatList from '../../components/molecules/StatList';
import { FiCalendar, FiCheckCircle, FiUsers } from 'react-icons/fi';
import GroupOverview from './compoents/GroupOverview';
import Tabs from '../../components/common/Tabs';

const GroupInfo = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const group = groups.find((g) => g.groupId === groupId);

  const [activeTab, setActiveTab] = useState('overview');

  if (!group) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        variants={fadeIn}
        initial="hidden"
        animate="visible">
        <div className="glass rounded-2xl shadow-xl p-6 sm:p-8 text-center w-full max-w-md">
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">
            Group Not Found
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            The group "{groupId}" could not be found.
          </p>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={hoverEffect}
            className="btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
            onClick={() => navigate('/lecturer/groups')}>
            Back to Groups
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Stats
  const totalStudents = group.students.length;
  const completedSessions = group.sessions.filter(
    (s) => s.status === 'completed'
  ).length;
  const avgAttendance =
    completedSessions > 0
      ? Math.round(
          group.sessions
            .filter((s) => s.status === 'completed')
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
      iconColor: 'blue', // mapped in COLOR_MAP
    },
    {
      icon: FiCalendar,
      label: 'Recent Sessions',
      value: `+ ${group.sessions.length}`,
      variant: 'glass',
      iconColor: 'purple',
    },
    {
      icon: FiCheckCircle,
      label: 'Completed sessions',
      value: completedSessions,
      variant: 'dark',
      iconColor: 'emerald',
    },
    {
      icon: LuGraduationCap,
      label: 'Avg. Attendance',
      value: `${avgAttendance}%`,
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
            <span className="font-bold text-sm">{group.courseId}</span>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 mt-2 gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                {group.groupName}
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
            <h2 className="text-xl font-bold mb-4">Students</h2>
            <motion.ul
              variants={containerVariants}
              initial="collapsed"
              animate="expanded"
              className="space-y-2">
              {group.students.map((s, i) => (
                <motion.li
                  key={s.id}
                  custom={i}
                  variants={itemVariants}
                  className="glass-strong p-3 rounded-lg flex justify-between">
                  <span>{s.name}</span>
                  <span className="text-gray-400 text-sm">{s.level}</span>
                </motion.li>
              ))}
            </motion.ul>
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
              {group.sessions.map((s, i) => (
                <motion.li
                  key={s.sessionId}
                  custom={i}
                  variants={itemVariants}
                  className="glass-strong p-3 rounded-lg flex justify-between">
                  <span>{s.date}</span>
                  <span className="text-gray-400 text-sm">{s.status}</span>
                </motion.li>
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
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-gray-400">Settings content goes here…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GroupInfo;
