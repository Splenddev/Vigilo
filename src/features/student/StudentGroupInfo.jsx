import { useState } from 'react';
import { FaCalendar, FaBook } from 'react-icons/fa';
import {
  LuBookText,
  LuCalendar,
  LuClipboardCheck,
  LuUser,
  LuClock,
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import {
  containerVariants,
  fadeIn,
  itemVariants,
  slideUp,
} from '../../utils/animationVariants';
import Tabs from '../../components/common/Tabs';
import StatCard from '../../components/molecules/StatCard';
import { FiAlertTriangle, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockStudentData = {
  student: {
    id: 'S12345',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    level: 'Year 3',
    enrollmentDate: '2023-09-15',
  },
  group: {
    groupId: 'CS301-A',
    groupName: 'Advanced Software Engineering',
    courseId: 'CS301',
    description:
      'Advanced concepts in software engineering, design patterns, and system architecture.',
    department: 'Computer Science',
    faculty: 'Engineering & Technology',
    lecturer: 'Dr. Michael Chen',
    academicYear: { start: '2024', end: '2025' },
    totalSessions: 24,
    schedule: 'Mondays & Wednesdays, 10:00 AM - 12:00 PM',
    location: 'Lab A-205',
  },
  attendance: {
    present: 18,
    absent: 3,
    late: 1,
    attendanceRate: 85.7,
  },
  upcomingSessions: [
    {
      date: '2024-12-09',
      time: '10:00 AM',
      topic: 'Design Patterns - Observer',
      location: 'Lab A-205',
    },
    {
      date: '2024-12-11',
      time: '10:00 AM',
      topic: 'Microservices Architecture',
      location: 'Lab A-205',
    },
    {
      date: '2024-12-16',
      time: '10:00 AM',
      topic: 'Testing Strategies',
      location: 'Lab A-205',
    },
  ],
  recentSessions: [
    {
      date: '2024-12-04',
      topic: 'Design Patterns - Factory',
      status: 'Present',
      grade: 'A',
    },
    {
      date: '2024-12-02',
      topic: 'SOLID Principles',
      status: 'Present',
      grade: 'B+',
    },
    {
      date: '2024-11-27',
      topic: 'Code Review Best Practices',
      status: 'Absent',
      grade: '-',
    },
    {
      date: '2024-11-25',
      topic: 'Agile Methodologies',
      status: 'Late',
      grade: 'B',
    },
    {
      date: '2024-11-20',
      topic: 'Version Control Advanced',
      status: 'Present',
      grade: 'A-',
    },
  ],
};

const tabs = [
  { key: 'overview', label: 'Overview', icon: LuBookText },
  { key: 'upcoming', label: 'Upcoming', icon: LuCalendar },
  { key: 'history', label: 'History', icon: LuClipboardCheck },
];

// Session Item Component
const SessionItem = ({ session, isUpcoming = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Absent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Late':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-cyan-400 border-blue-500/30';
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="glass p-4 rounded-xl border border-slate-600/30"
      whileHover={{ x: 4, transition: { duration: 0.2 } }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="font-medium text-t-primary">{session.topic}</span>
        </div>
        {!isUpcoming && (
          <span
            className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(
              session.status
            )}`}>
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
          <span className="font-medium text-cyan-400">{session.grade}</span>
        )}
      </div>
    </motion.div>
  );
};

const StudentGroupInfo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { student, group, attendance, upcomingSessions, recentSessions } =
    mockStudentData;

  const getAttendanceStatus = () => {
    if (attendance.attendanceRate >= 90)
      return { color: 'green-500', status: 'Excellent' };
    if (attendance.attendanceRate >= 75)
      return { color: 'yellow-500', status: 'Good' };
    return { color: 'red-500', status: 'Needs Improvement' };
  };

  const attendanceStatus = getAttendanceStatus();

  return (
    <motion.div
      className="min-h-screen  text-t-primary px-4 sm:px-6 py-6 sm:py-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible">
      {/* Course Header */}
      <motion.div
        className="card "
        variants={slideUp}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                <FaBook className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-t-primary">
                  {group.groupName}
                </h1>
                <p className="text-t-secondary">
                  {group.courseId} • {group.department}
                </p>
              </div>
            </div>
            <p className="text-slate-400 mb-4">{group.description}</p>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-t-secondary">
                <LuUser className="w-4 h-4 text-cyan-400" />
                <span>Lecturer: {group.lecturer}</span>
              </div>
              <div className="flex items-center gap-2 text-t-secondary">
                <LuClock className="w-4 h-4 text-cyan-400" />
                <span>{group.schedule}</span>
              </div>
            </div>
          </div>

          {/* Attendance Status Badge */}
          <div
            className={`text-${attendanceStatus.color} bg-${attendanceStatus.color}/10 px-6 py-4 rounded-xl border border-${attendanceStatus.color} text-center`}>
            <div className="text-2xl font-bold">
              {attendance.attendanceRate}%
            </div>
            <div className="text-sm text-t-secondary">Attendance Rate</div>
            <div className={`text-xs mt-1 text-${attendanceStatus.color}`}>
              {attendanceStatus.status}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="collapsed"
          animate="expanded">
          <StatCard
            icon={FiCheckCircle}
            label="Sessions Attended"
            value={attendance.present}
            iconColor="emerald"
            trend={5}
            trendPosition="absolute"
          />
          <StatCard
            icon={FiAlertTriangle}
            label="Sessions Missed"
            value={attendance.absent}
            iconColor="red"
          />
          <StatCard
            icon={FiCalendar}
            label="Total Sessions"
            value={group.totalSessions}
            iconColor="purple"
          />
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        onChange={(key) => setActiveTab(key)}
        defaultActive={activeTab}
        variant="pills"
      />

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
            {/* Course Information */}
            <div className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 card">
              <h2 className="text-xl font-bold mb-4 text-t-primary">
                Course Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Academic Year:</span>
                    <span className="text-t-primary">
                      {group.academicYear.start} - {group.academicYear.end}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Faculty:</span>
                    <span className="text-t-primary">{group.faculty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-t-primary">{group.location}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Student Ranking:</span>
                    <span className="text-t-primary">125th</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Level:</span>
                    <span className="text-t-primary">{student.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Enrolled:</span>
                    <span className="text-t-primary">
                      {student.enrollmentDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'upcoming' && (
          <motion.div
            key="upcoming"
            className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 card"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <h2 className="text-xl font-bold mb-6 text-t-primary">
              Upcoming Sessions
            </h2>
            <motion.div
              variants={containerVariants}
              initial="collapsed"
              animate="expanded"
              className="space-y-4">
              {upcomingSessions.map((session, i) => (
                <SessionItem
                  key={i}
                  session={session}
                  isUpcoming={true}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 card"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <h2 className="text-xl font-bold mb-6 text-t-primary">
              Recent Sessions
            </h2>
            <motion.div
              variants={containerVariants}
              initial="collapsed"
              animate="expanded"
              className="space-y-4">
              {recentSessions.map((session, i) => (
                <SessionItem
                  key={i}
                  session={session}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentGroupInfo;
