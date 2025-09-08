import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiAward,
  FiAlertCircle,
  FiBookOpen,
  FiClock,
  FiTarget,
  FiActivity,
} from 'react-icons/fi';
import {
  LuGraduationCap,
  LuSchool,
  LuCalendar,
  LuUserCheck,
  LuUserX,
  LuTrophy,
  LuAlarmClock,
} from 'react-icons/lu';

const InfoCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  className = '',
}) => (
  <motion.div
    className={`glass p-4 rounded-xl hover:glass-strong transition-all duration-300 ${className}`}
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
    <div className="flex items-start justify-between mb-2">
      <Icon className="text-purple-400 text-xl" />
      {trend && (
        <div
          className={`flex items-center text-sm ${
            trend > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
          {trend > 0 ? (
            <FiTrendingUp className="mr-1" />
          ) : (
            <FiTrendingDown className="mr-1" />
          )}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="text-sm text-gray-400 mb-1">{label}</div>
    <div className="text-lg font-semibold text-white">{value}</div>
    {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
  </motion.div>
);

const StudentCard = ({ student, type, icon: Icon, bgGradient }) => (
  <motion.div
    className={`glass p-4 rounded-xl relative overflow-hidden ${bgGradient}`}
    whileHover={{ scale: 1.03, y: -3 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
    <div className="absolute top-2 right-2">
      <Icon className="text-white/70 text-lg" />
    </div>
    <div className="pr-8">
      <div className="text-xs text-white/70 uppercase tracking-wide mb-1">
        {type}
      </div>
      <div className="text-white font-semibold text-sm mb-1">
        {student.name}
      </div>
      <div className="text-white/80 text-xs">{student.id}</div>
      <div className="text-white/60 text-xs mt-2">{student.stat}</div>
    </div>
  </motion.div>
);

const ProgressBar = ({ label, percentage, color = 'purple' }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-300">{label}</span>
      <span className="text-white font-medium">{percentage}%</span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-r ${
          color === 'purple'
            ? 'from-purple-500 to-pink-500'
            : color === 'green'
            ? 'from-green-500 to-emerald-500'
            : color === 'blue'
            ? 'from-blue-500 to-cyan-500'
            : 'from-purple-500 to-pink-500'
        }`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />
    </div>
  </div>
);

const GroupOverview = () => {
  // Mock data - replace with actual props
  const group = {
    department: 'Computer Science',
    faculty: 'Engineering',
    academicYear: { start: '2024', end: '2025' },
    courseName: 'Intro to Computer Science',
    courseCode: 'CSC401',
    totalStudents: 42,
    activeStudents: 38,
    averageAttendance: 87,
    totalSessions: 24,
    completedSessions: 18,
  };

  const stats = {
    topAttendee: {
      name: 'Sarah Johnson',
      id: 'CS2024001',
      stat: '98.5% attendance',
    },
    topAbsentee: {
      name: 'Mike Chen',
      id: 'CS2024042',
      stat: '45.2% attendance',
    },
    recentJoiner: {
      name: 'Alex Rivera',
      id: 'CS2024038',
      stat: 'Joined 2 weeks ago',
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      key="overview"
      className="space-y-6"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit">
      {/* Header Section */}
      <motion.div
        className="card"
        variants={fadeIn}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text mb-2">
              {group.courseName}
            </h1>
            <p className="text-gray-400">Course Code: {group.courseCode}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="glass px-4 py-2 rounded-lg">
              <span className="text-green-400 font-medium">
                {group.activeStudents} Active
              </span>
            </div>
            <div className="glass px-4 py-2 rounded-lg">
              <span className="text-purple-400 font-medium">
                {group.averageAttendance}% Avg
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard
            icon={LuGraduationCap}
            label="Department"
            value={group.department}
          />
          <InfoCard
            icon={LuSchool}
            label="Faculty"
            value={group.faculty}
          />
          <InfoCard
            icon={LuCalendar}
            label="Academic Year"
            value={`${group.academicYear.start}-${group.academicYear.end}`}
          />
          <InfoCard
            icon={FiUsers}
            label="Total Students"
            value={group.totalStudents}
            subtitle={`${group.activeStudents} active`}
          />
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerChildren}>
        <motion.div variants={fadeIn}>
          <InfoCard
            icon={FiTarget}
            label="Course Progress"
            value={`${group.completedSessions}/${group.totalSessions}`}
            subtitle="sessions completed"
            trend={12}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <InfoCard
            icon={FiActivity}
            label="Attendance Rate"
            value={`${group.averageAttendance}%`}
            subtitle="last 30 days"
            trend={-3}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <InfoCard
            icon={FiClock}
            label="Next Session"
            value="Tomorrow"
            subtitle="10:00 AM - Room 301"
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <InfoCard
            icon={FiBookOpen}
            label="Assignments"
            value="3 Pending"
            subtitle="Due this week"
            trend={-25}
          />
        </motion.div>
      </motion.div>

      {/* Student Highlights */}
      <motion.div
        className="card"
        variants={fadeIn}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiAward className="mr-2 text-purple-400" />
          Student Highlights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StudentCard
            student={stats.topAttendee}
            type="Top Performer"
            icon={LuTrophy}
            bgGradient="bg-gradient-to-br from-green-500/20 to-emerald-600/20"
          />

          <StudentCard
            student={stats.topAbsentee}
            type="Needs Attention"
            icon={LuAlarmClock}
            bgGradient="bg-gradient-to-br from-red-500/20 to-pink-600/20"
          />

          <StudentCard
            student={stats.recentJoiner}
            type="New Member"
            icon={LuUserCheck}
            bgGradient="bg-gradient-to-br from-blue-500/20 to-cyan-600/20"
          />
        </div>

        {/* Progress Indicators */}
        <div className="space-y-4">
          <ProgressBar
            label="Overall Attendance"
            percentage={group.averageAttendance}
            color="purple"
          />
          <ProgressBar
            label="Assignment Completion"
            percentage={76}
            color="green"
          />
          <ProgressBar
            label="Course Progress"
            percentage={(group.completedSessions / group.totalSessions) * 100}
            color="blue"
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="card"
        variants={fadeIn}>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <motion.button
            className="btn-primary px-4 py-2 rounded-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Mark Attendance
          </motion.button>
          <motion.button
            className="btn-secondary px-4 py-2 rounded-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            View Reports
          </motion.button>
          <motion.button
            className="btn-ghost px-4 py-2 rounded-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Send Notification
          </motion.button>
          <motion.button
            className="btn-ghost px-4 py-2 rounded-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Export Data
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GroupOverview;
