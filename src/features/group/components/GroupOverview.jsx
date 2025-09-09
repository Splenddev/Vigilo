import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiAward,
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
  LuTrophy,
  LuAlarmClock,
} from 'react-icons/lu';
import StatCard from '../../../components/molecules/StatCard';
import { shortenDept } from '../../../utils/helpers';
import StudentHighlightCard from '../../../components/cards/StudentHighlightCard';
import LinearProgressBar from '../../../components/progress/LinearProgessBar';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../../utils/roles';

const GroupOverview = () => {
  const navigate = useNavigate();
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
        <div className="flex flex-col mb-4">
          <div>
            <h1 className="text-2xl font-bold gradient-text mb-2">
              {group.courseName}
            </h1>
            <p className="text-gray-400">Course Code: {group.courseCode}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            iconColor="purple"
            icon={LuGraduationCap}
            label="Department"
            direction="icon-label-value"
            value={shortenDept(group.department)}
            iconSize="sm"
          />
          <StatCard
            iconColor="purple"
            direction="icon-label-value"
            iconSize="sm"
            icon={LuSchool}
            label="Faculty"
            value={group.faculty}
          />
          <StatCard
            iconColor="purple"
            direction="icon-label-value"
            iconSize="sm"
            icon={LuCalendar}
            label="Academic Year"
            value={`${group.academicYear.start}-${group.academicYear.end}`}
          />
          <StatCard
            iconColor="purple"
            iconSize="sm"
            icon={FiUsers}
            label="Total Students"
            value={group.totalStudents}
            subtitle={`${group.activeStudents} active`}
          />
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerChildren}>
        <motion.div variants={fadeIn}>
          <StatCard
            icon={FiTarget}
            label="Course Progress"
            iconColor="purple"
            trendPosition="absolute"
            value={`${group.completedSessions}/${group.totalSessions}`}
            subtitle="sessions completed"
            trend={12}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <StatCard
            iconColor="purple"
            trendPosition="absolute"
            icon={FiActivity}
            label="Attendance Rate"
            value={`${group.averageAttendance}%`}
            subtitle="last 30 days"
            trend={-3}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <StatCard
            iconColor="purple"
            icon={FiClock}
            label="Next Session"
            value="Tomorrow"
            subtitle="10:00 AM - Room 301"
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <StatCard
            iconColor="purple"
            trendPosition="absolute"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <StudentHighlightCard
            student={stats.topAttendee}
            type="Top Performer"
            icon={LuTrophy}
          />

          <StudentHighlightCard
            student={stats.topAbsentee}
            type="Needs Attention"
            icon={LuAlarmClock}
          />

          <StudentHighlightCard
            student={stats.recentJoiner}
            type="New Member"
            icon={LuUserCheck}
          />
        </div>

        {/* Progress Indicators */}
        <div className="space-y-4">
          <LinearProgressBar
            label="Overall Attendance"
            percentage={group.averageAttendance}
            color="purple"
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
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/${ROLES.LECTURER}/sessions/new`)}>
            New Session
          </motion.button>
          <motion.button
            className="btn-secondary px-4 py-2 rounded-lg text-sm"
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
