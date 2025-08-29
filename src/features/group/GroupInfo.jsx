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
  tapEffect,
  rippleEffect,
} from '../../utils/animationVariants';

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
    (s) => s.status === 'Completed'
  ).length;
  const avgAttendance =
    completedSessions > 0
      ? Math.round(
          group.sessions
            .filter((s) => s.status === 'Completed')
            .reduce((acc, s) => acc + s.attendance.present, 0) /
            completedSessions
        )
      : 0;

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
          className="group flex items-center gap-2 text-white glass px-3 sm:px-4 py-2 rounded-xl border border-slate-200 shadow-md text-sm sm:text-base mb-5">
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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                {group.groupName}
              </h1>
              <p className="text-sm sm:text-base text-gray-300">
                {group.description}
              </p>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 btn-secondary text-white px-4 py-2 rounded-xl place-self-end shadow-lg shrink-0"
              variants={cardVariants}
              initial="hidden"
              animate="visible">
              <FaBook className="w-5 h-5" />
              <span className="font-bold">{group.courseId}</span>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="collapsed"
            animate="expanded">
            {[
              { icon: FaUsers, label: 'Students', value: totalStudents },
              {
                icon: FaCalendar,
                label: 'Sessions',
                value: group.sessions.length,
              },
              {
                icon: FaCheckCircle,
                label: 'Completed',
                value: completedSessions,
              },
              {
                icon: FaGraduationCap,
                label: 'Avg. Attendance',
                value: avgAttendance,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible">
                <StatCard
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6 flex gap-3 border-b border-slate-600 overflow-x-auto">
        {[
          { key: 'overview', label: 'Overview', icon: LuBookText },
          { key: 'students', label: 'Students', icon: LuUsers },
          { key: 'sessions', label: 'Sessions', icon: LuClipboardList },
          { key: 'settings', label: 'Settings', icon: LuSettings },
        ].map((tab, i) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.key}
              whileHover="hover"
              whileTap="tap"
              variants={hoverEffect}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium outline-0 transition-all ${
                activeTab === tab.key
                  ? 'bg-slate-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}>
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            className="glass rounded-2xl shadow-xl border border-slate-200 p-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <h2 className="text-xl font-bold mb-4">Course Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfoRow
                icon={FaGraduationCap}
                label="Department"
                className="glass-strong p-4 rounded-xl">
                <span className="text-gray-300">{group.department}</span>
              </InfoRow>
              <InfoRow
                icon={LuSchool}
                label="Faculty"
                className="glass-strong p-4 rounded-xl">
                <span className="text-gray-300">{group.faculty}</span>
              </InfoRow>
              <InfoRow
                icon={LuCalendar}
                label="Academic Year"
                className="glass-strong p-4 rounded-xl">
                <span className="text-gray-300">
                  {group.academicYear.start} - {group.academicYear.end}
                </span>
              </InfoRow>
            </div>
          </motion.div>
        )}

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
