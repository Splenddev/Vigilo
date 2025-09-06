import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaGraduationCap,
  FaCalendar,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaExclamationTriangle,
} from 'react-icons/fa';
import {
  LuBookText,
  LuCalendar,
  LuClipboardCheck,
  LuTrendingUp,
  LuUser,
  LuClock,
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for demonstration
const mockStudentData = {
  student: {
    id: 'S12345',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    level: 'Year 3',
    enrollmentDate: '2023-09-15'
  },
  group: {
    groupId: 'CS301-A',
    groupName: 'Advanced Software Engineering',
    courseId: 'CS301',
    description: 'Advanced concepts in software engineering, design patterns, and system architecture.',
    department: 'Computer Science',
    faculty: 'Engineering & Technology',
    lecturer: 'Dr. Michael Chen',
    academicYear: { start: '2024', end: '2025' },
    totalSessions: 24,
    schedule: 'Mondays & Wednesdays, 10:00 AM - 12:00 PM',
    location: 'Lab A-205'
  },
  attendance: {
    present: 18,
    absent: 3,
    late: 1,
    attendanceRate: 85.7
  },
  upcomingSessions: [
    { date: '2024-12-09', time: '10:00 AM', topic: 'Design Patterns - Observer', location: 'Lab A-205' },
    { date: '2024-12-11', time: '10:00 AM', topic: 'Microservices Architecture', location: 'Lab A-205' },
    { date: '2024-12-16', time: '10:00 AM', topic: 'Testing Strategies', location: 'Lab A-205' }
  ],
  recentSessions: [
    { date: '2024-12-04', topic: 'Design Patterns - Factory', status: 'Present', grade: 'A' },
    { date: '2024-12-02', topic: 'SOLID Principles', status: 'Present', grade: 'B+' },
    { date: '2024-11-27', topic: 'Code Review Best Practices', status: 'Absent', grade: '-' },
    { date: '2024-11-25', topic: 'Agile Methodologies', status: 'Late', grade: 'B' },
    { date: '2024-11-20', topic: 'Version Control Advanced', status: 'Present', grade: 'A-' }
  ]
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

const containerVariants = {
  collapsed: { opacity: 0 },
  expanded: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
  collapsed: { opacity: 0, y: 20 },
  expanded: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const hoverEffect = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color = "text-blue-400", trend = null }) => (
  <motion.div
    className="glass-card p-4 rounded-xl border border-slate-600/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50"
    variants={cardVariants}
    whileHover={{ y: -2, transition: { duration: 0.2 } }}>
    <div className="flex items-center justify-between mb-2">
      <Icon className={`w-5 h-5 ${color}`} />
      {trend && (
        <span className={`text-xs px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-slate-300">{label}</div>
  </motion.div>
);

// Session Item Component
const SessionItem = ({ session, isUpcoming = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Absent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Late': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="glass-card p-4 rounded-xl border border-slate-600/30 bg-gradient-to-r from-slate-800/30 to-slate-900/30"
      whileHover={{ x: 4, transition: { duration: 0.2 } }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="font-medium text-white">{session.topic}</span>
        </div>
        {!isUpcoming && (
          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(session.status)}`}>
            {session.status}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <FaCalendar className="w-3 h-3" />
          {session.date}
          {session.time && ` at ${session.time}`}
        </span>
        {session.location && (
          <span className="text-slate-500">📍 {session.location}</span>
        )}
        {session.grade && session.grade !== '-' && (
          <span className="font-medium text-blue-400">{session.grade}</span>
        )}
      </div>
    </motion.div>
  );
};

const StudentGroupInfo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { student, group, attendance, upcomingSessions, recentSessions } = mockStudentData;

  const handleGoBack = () => {
    console.log('Navigate back to student dashboard');
  };

  const getAttendanceStatus = () => {
    if (attendance.attendanceRate >= 90) return { color: 'text-green-400', status: 'Excellent' };
    if (attendance.attendanceRate >= 75) return { color: 'text-yellow-400', status: 'Good' };
    return { color: 'text-red-400', status: 'Needs Improvement' };
  };

  const attendanceStatus = getAttendanceStatus();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 py-6 sm:py-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible">
      
      {/* Back Button */}
      <motion.div variants={slideUp}>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={hoverEffect}
          onClick={handleGoBack}
          className="flex items-center gap-2 text-blue-400 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-600/30 shadow-lg text-sm sm:text-base mb-6 hover:bg-slate-700/50 transition-all">
          <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="font-medium">Back to Dashboard</span>
        </motion.button>
      </motion.div>

      {/* Course Header */}
      <motion.div
        className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 sm:p-8 mb-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm"
        variants={slideUp}>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaBook className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {group.groupName}
                </h1>
                <p className="text-slate-300">{group.courseId} • {group.department}</p>
              </div>
            </div>
            <p className="text-slate-400 mb-4">{group.description}</p>
            
            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <LuUser className="w-4 h-4 text-blue-400" />
                <span>Lecturer: {group.lecturer}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <LuClock className="w-4 h-4 text-blue-400" />
                <span>{group.schedule}</span>
              </div>
            </div>
          </div>

          {/* Attendance Status Badge */}
          <div className={`${attendanceStatus.color} bg-slate-800/50 px-6 py-4 rounded-xl border border-slate-600/30 text-center`}>
            <div className="text-2xl font-bold">{attendance.attendanceRate}%</div>
            <div className="text-sm text-slate-300">Attendance Rate</div>
            <div className={`text-xs mt-1 ${attendanceStatus.color}`}>{attendanceStatus.status}</div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="collapsed"
          animate="expanded">
          <StatCard
            icon={FaCheckCircle}
            label="Sessions Attended"
            value={attendance.present}
            color="text-green-400"
            trend={5}
          />
          <StatCard
            icon={FaExclamationTriangle}
            label="Sessions Missed"
            value={attendance.absent}
            color="text-red-400"
          />
          <StatCard
            icon={FaClock}
            label="Late Arrivals"
            value={attendance.late}
            color="text-yellow-400"
          />
          <StatCard
            icon={FaCalendar}
            label="Total Sessions"
            value={group.totalSessions}
            color="text-blue-400"
          />
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 p-1 bg-slate-800/50 rounded-xl border border-slate-600/30 overflow-x-auto">
        {[
          { key: 'overview', label: 'Overview', icon: LuBookText },
          { key: 'upcoming', label: 'Upcoming', icon: LuCalendar },
          { key: 'history', label: 'History', icon: LuClipboardCheck },
          { key: 'progress', label: 'Progress', icon: LuTrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.key}
              whileHover="hover"
              whileTap="tap"
              variants={hoverEffect}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all flex-1 sm:flex-none whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
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
            className="space-y-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            
            {/* Quick Actions */}
            <div className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 bg-gradient-to-r from-slate-800/30 to-slate-900/30">
              <h2 className="text-xl font-bold mb-4 text-white">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={hoverEffect}
                  className="flex items-center gap-3 p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl border border-blue-500/30 text-blue-400 transition-all">
                  <FaCalendar className="w-5 h-5" />
                  <span className="font-medium">View Schedule</span>
                </motion.button>
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={hoverEffect}
                  className="flex items-center gap-3 p-4 bg-green-600/20 hover:bg-green-600/30 rounded-xl border border-green-500/30 text-green-400 transition-all">
                  <FaChartLine className="w-5 h-5" />
                  <span className="font-medium">View Grades</span>
                </motion.button>
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={hoverEffect}
                  className="flex items-center gap-3 p-4 bg-purple-600/20 hover:bg-purple-600/30 rounded-xl border border-purple-500/30 text-purple-400 transition-all">
                  <FaBook className="w-5 h-5" />
                  <span className="font-medium">Course Materials</span>
                </motion.button>
              </div>
            </div>

            {/* Course Information */}
            <div className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 bg-gradient-to-r from-slate-800/30 to-slate-900/30">
              <h2 className="text-xl font-bold mb-4 text-white">Course Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Academic Year:</span>
                    <span className="text-white">{group.academicYear.start} - {group.academicYear.end}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Faculty:</span>
                    <span className="text-white">{group.faculty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white">{group.location}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Student ID:</span>
                    <span className="text-white">{student.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Level:</span>
                    <span className="text-white">{student.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Enrolled:</span>
                    <span className="text-white">{student.enrollmentDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'upcoming' && (
          <motion.div
            key="upcoming"
            className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 bg-gradient-to-r from-slate-800/30 to-slate-900/30"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <h2 className="text-xl font-bold mb-6 text-white">Upcoming Sessions</h2>
            <motion.div
              variants={containerVariants}
              initial="collapsed"
              animate="expanded"
              className="space-y-4">
              {upcomingSessions.map((session, i) => (
                <SessionItem key={i} session={session} isUpcoming={true} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 bg-gradient-to-r from-slate-800/30 to-slate-900/30"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <h2 className="text-xl font-bold mb-6 text-white">Recent Sessions</h2>
            <motion.div
              variants={containerVariants}
              initial="collapsed"
              animate="expanded"
              className="space-y-4">
              {recentSessions.map((session, i) => (
                <SessionItem key={i} session={session} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 bg-gradient-to-r from-slate-800/30 to-slate-900/30"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <h2 className="text-xl font-bold mb-6 text-white">Academic Progress</h2>
            
            {/* Attendance Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-white">Attendance Progress</span>
                <span className={`font-bold ${attendanceStatus.color}`}>{attendance.attendanceRate}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${attendance.attendanceRate}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Grade Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <div className="text-2xl font-bold text-green-400">A-</div>
                <div className="text-sm text-slate-400">Current Grade</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <div className="text-2xl font-bold text-blue-400">85%</div>
                <div className="text-sm text-slate-400">Course Average</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <div className="text-2xl font-bold text-purple-400">12th</div>
                <div className="text-sm text-slate-400">Class Ranking</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentGroupInfo;
