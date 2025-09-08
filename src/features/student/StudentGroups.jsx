import React, { useState, useMemo } from 'react';
import {
  FaGraduationCap,
  FaCalendar,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaTrophy,
  FaFire,
  FaStar,
} from 'react-icons/fa';
import {
  LuBookOpen,
  LuCalendar,
  LuClock,
  LuTrendingUp,
  LuTrendingDown,
  LuUsers,
  LuBarChart3,
  LuPieChart,
  LuActivity,
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget } from 'react-icons/fi';

// Mock student groups data
const mockStudentGroups = [
  {
    id: 'CS301-A',
    groupName: 'Advanced Software Engineering',
    courseId: 'CS301',
    department: 'Computer Science',
    lecturer: 'Dr. Michael Chen',
    color: 'from-blue-500 to-purple-600',
    totalSessions: 24,
    attendedSessions: 22,
    upcomingSession: '2024-12-09',
    currentGrade: 'A-',
    attendanceRate: 91.7,
    trend: 'up',
    status: 'active',
    nextTopic: 'Design Patterns - Observer',
    difficulty: 'Advanced',
    credits: 4,
    schedule: 'Mon/Wed 10:00 AM',
  },
  {
    id: 'MAT201-B',
    groupName: 'Linear Algebra & Statistics',
    courseId: 'MAT201',
    department: 'Mathematics',
    lecturer: 'Prof. Sarah Williams',
    color: 'from-green-500 to-teal-600',
    totalSessions: 20,
    attendedSessions: 18,
    upcomingSession: '2024-12-10',
    currentGrade: 'B+',
    attendanceRate: 90.0,
    trend: 'stable',
    status: 'active',
    nextTopic: 'Eigenvalues & Eigenvectors',
    difficulty: 'Intermediate',
    credits: 3,
    schedule: 'Tue/Thu 2:00 PM',
  },
  {
    id: 'PHY101-C',
    groupName: 'Quantum Physics Fundamentals',
    courseId: 'PHY101',
    department: 'Physics',
    lecturer: 'Dr. Ahmed Hassan',
    color: 'from-purple-500 to-pink-600',
    totalSessions: 18,
    attendedSessions: 15,
    upcomingSession: '2024-12-11',
    currentGrade: 'B',
    attendanceRate: 83.3,
    trend: 'down',
    status: 'active',
    nextTopic: 'Wave-Particle Duality',
    difficulty: 'Advanced',
    credits: 4,
    schedule: 'Fri 9:00 AM',
  },
  {
    id: 'ENG102-D',
    groupName: 'Technical Writing & Communication',
    courseId: 'ENG102',
    department: 'English',
    lecturer: 'Dr. Lisa Thompson',
    color: 'from-orange-500 to-red-600',
    totalSessions: 16,
    attendedSessions: 16,
    upcomingSession: '2024-12-12',
    currentGrade: 'A',
    attendanceRate: 100.0,
    trend: 'up',
    status: 'active',
    nextTopic: 'Research Methodology',
    difficulty: 'Beginner',
    credits: 2,
    schedule: 'Wed 4:00 PM',
  },
  {
    id: 'CS202-E',
    groupName: 'Database Systems',
    courseId: 'CS202',
    department: 'Computer Science',
    lecturer: 'Dr. Robert Kim',
    color: 'from-cyan-500 to-blue-600',
    totalSessions: 22,
    attendedSessions: 19,
    upcomingSession: null,
    currentGrade: 'A-',
    attendanceRate: 86.4,
    trend: 'stable',
    status: 'completed',
    nextTopic: null,
    difficulty: 'Intermediate',
    credits: 3,
    schedule: 'Completed',
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const hoverEffect = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  tap: { scale: 0.98 },
};

// Overview Stats Component
const OverviewStats = ({ groups }) => {
  const stats = useMemo(() => {
    const activeGroups = groups.filter((g) => g.status === 'active');
    const totalCredits = groups.reduce((acc, g) => acc + g.credits, 0);
    const avgAttendance =
      groups.reduce((acc, g) => acc + g.attendanceRate, 0) / groups.length;
    const upcomingSessions = activeGroups.filter(
      (g) => g.upcomingSession
    ).length;

    return {
      totalGroups: groups.length,
      activeGroups: activeGroups.length,
      totalCredits,
      avgAttendance: Math.round(avgAttendance * 10) / 10,
      upcomingSessions,
    };
  }, [groups]);

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 text-center">
        <FaBook className="w-6 h-6 text-blue-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">{stats.totalGroups}</div>
        <div className="text-xs text-blue-300">Total Courses</div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 text-center">
        <FaFire className="w-6 h-6 text-green-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">
          {stats.activeGroups}
        </div>
        <div className="text-xs text-green-300">Active Courses</div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 text-center">
        <FaTrophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">
          {stats.totalCredits}
        </div>
        <div className="text-xs text-purple-300">Total Credits</div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-yellow-600/20 to-orange-800/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4 text-center">
        <FiTarget className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">
          {stats.avgAttendance}%
        </div>
        <div className="text-xs text-yellow-300">Avg Attendance</div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-pink-600/20 to-red-800/20 backdrop-blur-sm border border-pink-500/30 rounded-xl p-4 text-center">
        <FaCalendar className="w-6 h-6 text-pink-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">
          {stats.upcomingSessions}
        </div>
        <div className="text-xs text-pink-300">Upcoming Classes</div>
      </motion.div>
    </motion.div>
  );
};

// Group Card Component
const GroupCard = ({ group, onClick }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <LuTrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <LuTrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <LuActivity className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      className="cursor-pointer"
      onClick={() => onClick(group)}>
      <motion.div
        variants={hoverEffect}
        className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 overflow-hidden group">
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {group.status === 'completed' ? (
            <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <FaCheckCircle className="w-3 h-3" />
              Completed
            </div>
          ) : (
            <div className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full text-xs">
              Active
            </div>
          )}
        </div>

        {/* Header */}
        <div className="relative mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-10 h-10 bg-gradient-to-br ${group.color} rounded-lg flex items-center justify-center`}>
              <FaBook className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg leading-tight">
                {group.groupName}
              </h3>
              <p className="text-slate-400 text-sm">
                {group.courseId} • {group.department}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">👨‍🏫 {group.lecturer}</span>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(
                  group.difficulty
                )}`}>
                {group.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div
              className={`text-xl font-bold ${getGradeColor(
                group.currentGrade
              )}`}>
              {group.currentGrade}
            </div>
            <div className="text-xs text-slate-400">Current Grade</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-bold text-white">
                {group.attendanceRate}%
              </span>
              {getTrendIcon(group.trend)}
            </div>
            <div className="text-xs text-slate-400">Attendance</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Progress</span>
            <span>
              {group.attendedSessions}/{group.totalSessions}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${group.color}`}
              initial={{ width: 0 }}
              animate={{
                width: `${
                  (group.attendedSessions / group.totalSessions) * 100
                }%`,
              }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Next Session */}
        <div className="relative">
          {group.nextTopic ? (
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <FaCalendar className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium text-blue-400">
                  Next Class
                </span>
              </div>
              <div className="text-sm text-white font-medium">
                {group.nextTopic}
              </div>
              <div className="text-xs text-slate-400">{group.schedule}</div>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
              <FaCheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <div className="text-xs text-green-400 font-medium">
                Course Completed!
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const StudentGroupsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Filter and search groups
  const filteredGroups = useMemo(() => {
    return mockStudentGroups.filter((group) => {
      const matchesSearch =
        group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterStatus === 'all' || group.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus]);

  const handleGroupClick = (group) => {
    console.log('Navigate to group:', group.id);
    // In real app: navigate(`/student/groups/${group.id}`)
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 py-6 sm:py-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible">
      {/* Header */}
      <motion.div
        className="mb-8"
        variants={fadeIn}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              My Courses
            </h1>
            <p className="text-slate-400">
              Track your academic progress across all enrolled courses
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-lg p-1 border border-slate-600/30">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}>
                <LuBarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}>
                <LuPieChart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <OverviewStats groups={mockStudentGroups} />
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="mb-6"
        variants={fadeIn}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-slate-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option value="all">All Courses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Groups Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${searchTerm}-${filterStatus}`}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={handleGroupClick}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <motion.div
          className="text-center py-16"
          variants={fadeIn}
          initial="hidden"
          animate="visible">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">
            No courses found
          </h3>
          <p className="text-slate-400 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Clear Filters
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentGroupsDashboard;
