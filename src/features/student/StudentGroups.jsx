import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { FiUsers, FiCheckCircle, FiBookOpen, FiClock } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/molecules/StatCard';
import { containerVariants, fadeIn } from '../../utils/animationVariants';
import EmptyState from '../../components/common/EmptyState';
import Select from '../../components/molecules/Select';
import GroupCard from '../group/components/GroupCard';

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
    credits: 3,
    schedule: 'Completed',
  },
];

const StudentGroupsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const groups = mockStudentGroups;
  const navigate = useNavigate();

  // Filter and search groups
  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
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
    navigate(`${group.id}/info`);
  };

  const stats = useMemo(() => {
    if (!groups || groups.length === 0) return [];

    const activeGroups = groups.filter((g) => g.status === 'active');
    const avgAttendance =
      groups.reduce((acc, g) => acc + g.attendanceRate, 0) / groups.length;
    const upcomingSessions = activeGroups.filter(
      (g) => g.upcomingSession
    ).length;

    return [
      {
        key: 'totalGroups',
        icon: FiUsers,
        value: groups.length,
        label: 'Total Groups',
        subtitle: 'All created groups',
        iconColor: 'blue',
      },
      {
        key: 'activeGroups',
        icon: FiCheckCircle,
        value: activeGroups.length,
        label: 'Active Groups',
        subtitle: 'Currently ongoing',
        iconColor: 'emerald',
        trend: activeGroups.length - (groups.length - activeGroups.length), // example trend
      },
      {
        key: 'avgAttendance',
        icon: FiUsers,
        value: `${Math.round(avgAttendance * 10) / 10}%`,
        label: 'Avg. Attendance',
        subtitle: 'Across all groups',
        iconColor: 'orange',
        trend: Math.round(avgAttendance - 75),
      },
      {
        key: 'upcomingSessions',
        icon: FiClock,
        value: upcomingSessions,
        label: 'Upcoming Sessions',
        subtitle: 'In active groups',
        iconColor: 'blue',
      },
    ];
  }, [groups]);

  return (
    <motion.div
      className="min-h-screen  text-white px-4 sm:px-6 py-6 sm:py-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible">
      {/* Header */}
      <motion.div
        className="mb-8"
        variants={fadeIn}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 gradient-text">
              My Course Groups
            </h1>
            <p className="text-slate-400">
              Track your attendance progress across all enrolled courses
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              subtitle={stat.subtitle}
              trend={stat.trend}
              iconColor={stat.iconColor}
              trendPosition="absolute"
            />
          ))}
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="mb-6"
        variants={fadeIn}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass border border-slate-400/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <Select
            value={filterStatus}
            className="capitalize h-full"
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'all', label: 'All Courses' },
              { value: 'active' },
              { value: 'completed' },
            ]}
          />
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
        <EmptyState
          title="No course groups found"
          message="Try adjusting your search terms or filters"
          icon={FiSearch}
          action={
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Clear Filters
            </button>
          }
        />
      )}
    </motion.div>
  );
};

export default StudentGroupsDashboard;
