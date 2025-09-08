import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiBook,
  FiSearch,
  FiFilter,
  FiDownload,
  FiBell,
  FiUsers,
  FiBarChart,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import Badge from '../../components/atoms/Badge';
import Select from '../../components/molecules/Select';
import AttendanceStats from './components/AttendanceStats';
import { generateMockStudentsRecord } from '../../utils/dataGenerate';
import StudentCard from './components/StudentCard';
import EmptyState from '../../components/common/EmptyState';

const mockStudents = generateMockStudentsRecord(50, '22/67AM');
// Mock Data
const mockSession = {
  id: 'abc123',
  title: 'Biochemistry Lecture – Enzyme Kinetics',
  courseCode: 'BIO 402',
  lecturer: 'Dr. A. Johnson',
  date: '2025-09-05',
  startTime: '10:00 AM',
  endTime: '12:00 PM',
  location: 'Science Lab 201',
  status: 'completed',
  totalEnrolled: mockStudents.length,
};

// Main Component
export default function SessionStudentsPage() {
  const [loading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [expandedStudents, setExpandedStudents] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock async fetch with realistic loading time
    setTimeout(() => {
      setSessionInfo(mockSession);
      setStudents(mockStudents);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'checkInTime':
          if (!a.checkInTime) return 1;
          if (!b.checkInTime) return -1;
          return a.checkInTime.localeCompare(b.checkInTime);
        case 'attendanceRate':
          return b.attendanceRate - a.attendanceRate;
        default:
          return 0;
      }
    });
  }, [students, searchTerm, statusFilter, sortBy]);

  const handleToggleExpand = (studentId) => {
    const newExpanded = new Set(expandedStudents);
    if (newExpanded.has(studentId)) {
      newExpanded.delete(studentId);
    } else {
      newExpanded.add(studentId);
    }
    setExpandedStudents(newExpanded);
  };

  const handleUpdateStatus = (studentId, newStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status: newStatus,
              checkInTime: newStatus === 'absent' ? null : '10:30 AM',
            }
          : student
      )
    );
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
          />
          <p className="text-t-tertiary">Loading session details...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 min-h-screen">
      {/* Header Section */}
      <motion.div
        className="glass rounded-2xl border border-white/10 p-6 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <motion.h1
              className="text-2xl lg:text-3xl font-bold gradient-text mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>
              {sessionInfo.title}
            </motion.h1>
            <div className="flex flex-wrap gap-4 text-sm text-t-tertiary">
              <div className="flex items-center gap-2">
                <FiBook className="w-4 h-4 text-purple-400" />
                <span>{sessionInfo.courseCode}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.button
              className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 flex items-center gap-2 text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <FiDownload className="w-4 h-4" />
              Export
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-pink-500/10 text-pink-400 rounded-xl hover:bg-pink-500/20 flex items-center gap-2 text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <FiBell className="w-4 h-4" />
              Notify
            </motion.button>
          </div>
        </div>

        {/* Session Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <FiUsers className="w-4 h-4 text-green-400" />
            <span className="text-t-tertiary">
              {students.filter((s) => s.status !== 'absent').length} attend
              {sessionInfo.status === 'completed' ? 'ed' : 'ing'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FiBarChart className="w-4 h-4 text-purple-400" />
            <span className="text-t-tertiary">
              {sessionInfo.totalEnrolled} students in group
            </span>
          </div>
        </div>

        {/* Statistics */}
        <AttendanceStats students={students} />
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        className="glass rounded-2xl border border-white/10 p-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-t-tertiary w-4 h-4" />
            <input
              type="text"
              placeholder="Search students by name or matric number..."
              className="w-full pl-10 pr-4 py-2 bg-bg-glass-sm border border-bg-glass-lg rounded-xl text-t-primary placeholder-t-tertiary focus:border-purple-500/50 focus:bg-bg-glass-md transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters Toggle */}
          <motion.button
            className="px-4 py-2 bg-bg-glass-sm border border-bg-glass-lg rounded-xl text-t-secondary hover:text-t-primary hover:border-purple-500/50 flex items-center gap-2 transition-all justify-center"
            onClick={() => setShowFilters(!showFilters)}
            whileTap={{ scale: 0.95 }}>
            <FiFilter className="w-4 h-4" />
            Filters
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.2 }}>
              <FiChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mt-4 pt-4 border-t border-bg-glass-lg flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}>
              <Select
                label="Status Filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Students' },
                  { value: 'present', label: 'Present Only' },
                  { value: 'late', label: 'Late Only' },
                  { value: 'absent', label: 'Absent Only' },
                ]}
              />
              <Select
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={[
                  { value: 'name', label: 'Name' },
                  { value: 'status', label: 'Status' },
                  { value: 'checkInTime', label: 'Check-in Time' },
                  { value: 'attendanceRate', label: 'Attendance Rate' },
                ]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Students List */}
      <motion.div
        className="glass rounded-2xl border border-white/10 shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-t-primary">
            Students ({filteredAndSortedStudents.length})
          </h2>

          {filteredAndSortedStudents.length > 0 && (
            <div className="flex gap-2">
              <motion.button
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                onClick={() =>
                  setExpandedStudents(
                    new Set(filteredAndSortedStudents.map((s) => s.id))
                  )
                }
                whileTap={{ scale: 0.95 }}>
                Expand All
              </motion.button>
              <span className="text-t-tertiary">|</span>

              <motion.button
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                onClick={() => setExpandedStudents(new Set())}
                whileTap={{ scale: 0.95 }}>
                Collapse All
              </motion.button>
            </div>
          )}
        </div>

        {filteredAndSortedStudents.length === 0 ? (
          <EmptyState
            title="No Students found"
            message="Try adjusting your search or filter criteria"
            variant="warning"
            icon={FiUsers}
          />
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredAndSortedStudents.map((student, index) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  index={index}
                  isExpanded={expandedStudents.has(student.id)}
                  onToggleExpand={handleToggleExpand}
                  onUpdateStatus={handleUpdateStatus}
                  query={searchTerm}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
