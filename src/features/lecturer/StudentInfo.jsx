import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { generateStudentData } from '../../utils/data';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/atoms/Button';
import { motion } from 'framer-motion';
import {
  LuMail,
  LuBookOpen,
  LuGraduationCap,
  LuCircleCheck,
  LuCircleX,
  LuClock,
  LuUsers,
  LuCalendar,
  LuTrendingUp,
  LuTrendingDown,
  LuMinus,
  LuMapPin,
  LuSearch,
} from 'react-icons/lu';
import { cardVariants, containerVariants } from '../../utils/animationVariants';

// Sample data (you would normally get this from props or API)
const studentsData = generateStudentData(100);

const StudentInfo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const { studentId } = useParams();
  const student = studentsData.find((s) => s.id === studentId);

  const { summary, sessions } = student?.attendance || {};
  const totalSessions = summary?.present + summary?.absent + summary?.late || 0;

  // Animation variants

  const statsVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  // Filter sessions based on status and search
  const filteredSessions =
    sessions?.filter((session) => {
      const matchesStatus =
        filterStatus === 'all' || session.status === filterStatus;
      const matchesSearch =
        session.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    }) || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-green-400 bg-green-400/20';
      case 'late':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'absent':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <LuCircleCheck className="w-4 h-4" />;
      case 'late':
        return <LuClock className="w-4 h-4" />;
      case 'absent':
        return <LuCircleX className="w-4 h-4" />;
      default:
        return <LuMinus className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (rate) => {
    if (rate >= 90) return <LuTrendingUp className="w-5 h-5 text-green-400" />;
    if (rate >= 75) return <LuMinus className="w-5 h-5 text-yellow-400" />;
    return <LuTrendingDown className="w-5 h-5 text-red-400" />;
  };

  if (!student) {
    return (
      <EmptyState
        title="Student Not Found"
        message="The student record you’re trying to access does not exist or may have been removed."
        action={
          <Button
            className="btn-primary"
            onClick={() => navigate(-1)}>
            Go Back
          </Button>
        }
        variant="danger"
      />
    );
  }

  return (
    <div
      className="min-h-screen p-6 space-y-8"
      style={{
        background: 'var(--gradient-bg-primary)',
        color: 'var(--color-t-primary)',
      }}>
      <motion.div
        variants={containerVariants}
        initial="collapsed"
        animate="expanded"
        className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="card mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}>
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-2xl border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </motion.div>

            <div className="flex-1 space-y-4">
              <div>
                <motion.h1
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}>
                  {student.name}
                </motion.h1>
                <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-2">
                    <LuMail className="w-4 h-4" />
                    {student.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <LuBookOpen className="w-4 h-4" />
                    {student.department}
                  </span>
                  <span className="flex items-center gap-2">
                    <LuGraduationCap className="w-4 h-4" />
                    Level {student.level}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-purple-500/20 rounded-xl text-sm font-medium">
                  GPA: {student.gpa}
                </div>
                <div
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    student.status === 'active'
                      ? 'bg-green-400/20 text-green-400'
                      : 'bg-red-400/20 text-red-400'
                  }`}>
                  {student.status.charAt(0).toUpperCase() +
                    student.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          variants={cardVariants}
          className="flex gap-2 mb-8 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          {['overview', 'attendance', 'groups'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 ${
                activeTab === tab
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-400 hover:border-primary hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Attendance Stats */}
              <motion.div
                variants={cardVariants}
                className="lg:col-span-2">
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">
                      Attendance Overview
                    </h3>
                    {getTrendIcon(student.attendance.rate)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                      variants={statsVariants}
                      className="text-center p-4 rounded-2xl bg-green-400/10 border border-green-400/20">
                      <LuCircleCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-400">
                        {summary.present}
                      </div>
                      <div className="text-sm opacity-70">Present</div>
                    </motion.div>

                    <motion.div
                      variants={statsVariants}
                      className="text-center p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
                      <LuClock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-400">
                        {summary.late}
                      </div>
                      <div className="text-sm opacity-70">Late</div>
                    </motion.div>

                    <motion.div
                      variants={statsVariants}
                      className="text-center p-4 rounded-2xl bg-red-400/10 border border-red-400/20">
                      <LuCircleX className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-400">
                        {summary.absent}
                      </div>
                      <div className="text-sm opacity-70">Absent</div>
                    </motion.div>

                    <motion.div
                      variants={statsVariants}
                      className="text-center p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <LuTrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-400">
                        {student.attendance.rate}%
                      </div>
                      <div className="text-sm opacity-70">Rate</div>
                    </motion.div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Attendance Progress</span>
                      <span>{student.attendance.rate}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${student.attendance.rate}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={cardVariants}
                className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">Total Sessions</span>
                      <span className="font-semibold">{totalSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">Groups Joined</span>
                      <span className="font-semibold">
                        {student.groups.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70">Academic Level</span>
                      <span className="font-semibold">
                        Level {student.level}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6">
              {/* Filters */}
              <motion.div
                variants={cardVariants}
                className="card">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 w-full"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="min-w-48">
                    <option value="all">All Status</option>
                    <option value="present">Present Only</option>
                    <option value="late">Late Only</option>
                    <option value="absent">Absent Only</option>
                  </select>
                </div>
              </motion.div>

              {/* Sessions List */}
              <motion.div
                variants={cardVariants}
                className="card">
                <h3 className="text-xl font-semibold mb-6">Session History</h3>
                <div className="space-y-4">
                  {filteredSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{session.course}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${getStatusColor(
                                session.status
                              )}`}>
                              {getStatusIcon(session.status)}
                              {session.status.charAt(0).toUpperCase() +
                                session.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm opacity-70">
                            <span className="flex items-center gap-2">
                              <LuCalendar className="w-4 h-4" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-2">
                              <LuClock className="w-4 h-4" />
                              {session.time}
                            </span>
                            <span className="flex items-center gap-2">
                              <LuMapPin className="w-4 h-4" />
                              {session.location}
                            </span>
                          </div>
                          <p className="text-sm mt-2 opacity-60">
                            {session.details}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'groups' && (
            <motion.div
              variants={cardVariants}
              className="card">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <LuUsers className="w-6 h-6" />
                Groups & Organizations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {student.groups.map((group, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <LuUsers className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm leading-tight">
                          {group}
                        </h4>
                        <p className="text-xs opacity-60 mt-1">Active Member</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentInfo;
