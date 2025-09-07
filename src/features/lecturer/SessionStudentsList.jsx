import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiCalendar,
  FiClock,
  FiUser,
  FiBook,
  FiSearch,
  FiFilter,
  FiDownload,
  FiBell,
  FiTrendingUp,
  FiUsers,
  FiBarChart,
  FiChevronDown,
  FiChevronUp,
  FiEdit3,
  FiMapPin,
  FiSend,
} from 'react-icons/fi';
import Badge from '../../components/atoms/Badge';
import { badges } from '../attendance/assets/assets';

const mockStudents = [
  {
    id: 1,
    name: 'Jane Doe',
    matricNumber: 'BIO/19/001',
    status: 'present',
    checkInTime: '10:05 AM',
    remarks: 'On time',
    email: 'jane.doe@university.edu',
  },
  {
    id: 2,
    name: 'John Smith',
    matricNumber: 'BIO/19/002',
    status: 'late',
    checkInTime: '10:20 AM',
    remarks: 'Traffic delay',
    email: 'john.smith@university.edu',
  },
  {
    id: 3,
    name: 'Mary Johnson',
    matricNumber: 'BIO/19/003',
    status: 'absent',
    checkInTime: null,
    remarks: 'No plea submitted',
    email: 'mary.johnson@university.edu',
  },
  {
    id: 4,
    name: 'David Brown',
    matricNumber: 'BIO/19/004',
    status: 'present',
    checkInTime: '10:02 AM',
    remarks: 'Excellent attendance record',
    email: 'david.brown@university.edu',
  },
  {
    id: 5,
    name: 'Emily Davis',
    matricNumber: 'BIO/19/005',
    status: 'present',
    checkInTime: '10:10 AM',
    remarks: 'Consistent',
    email: 'emily.davis@university.edu',
  },
  {
    id: 6,
    name: 'Michael Wilson',
    matricNumber: 'BIO/19/006',
    status: 'late',
    checkInTime: '10:25 AM',
    remarks: 'Medical appointment',
    email: 'michael.wilson@university.edu',
  },
  {
    id: 7,
    name: 'Sarah Connor',
    matricNumber: 'BIO/19/007',
    status: 'present',
    checkInTime: '09:58 AM',
    remarks: 'Early arrival',
    email: 'sarah.connor@university.edu',
  },
  {
    id: 8,
    name: 'Alex Rodriguez',
    matricNumber: 'BIO/19/008',
    status: 'absent',
    checkInTime: null,
    remarks: 'Sick leave submitted',
    email: 'alex.rodriguez@university.edu',
  },
];
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

// Attendance Statistics Component
const AttendanceStats = ({ students }) => {
  const stats = useMemo(() => {
    const present = students.filter((s) => s.status === 'present').length;
    const late = students.filter((s) => s.status === 'late').length;
    const absent = students.filter((s) => s.status === 'absent').length;
    const total = students.length;
    const attendanceRate = Math.round(((present + late) / total) * 100);

    return { present, late, absent, total, attendanceRate };
  }, [students]);

  const statCards = [
    {
      label: 'Present',
      value: stats.present,
      icon: FiCheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Late',
      value: stats.late,
      icon: FiAlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      label: 'Absent',
      value: stats.absent,
      icon: FiXCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
    {
      label: 'Rate',
      value: `${stats.attendanceRate}%`,
      icon: FiTrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-t-tertiary">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Student Card Component
const StudentCard = ({
  student,
  index,
  onToggleExpand,
  isExpanded,
  onUpdateStatus,
}) => {
  return (
    <motion.div
      className="bg-bg-glass-sm rounded-xl border border-bg-glass-md hover:border-bg-glass-lg transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      layout>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                {student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <h4 className="font-medium text-t-primary">{student.name}</h4>
                <p className="text-sm text-t-tertiary">
                  {student.matricNumber}
                </p>
              </div>
            </div>

            {student.checkInTime && (
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                <FiClock className="w-3 h-3" />
                Checked in at {student.checkInTime}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              text={student.status}
              variant={badges[student.status]}
            />
            <motion.button
              className="p-2 rounded-lg bg-bg-glass-md hover:bg-bg-glass-lg text-t-tertiary hover:text-t-primary transition-colors"
              onClick={() => onToggleExpand(student.id)}
              whileTap={{ scale: 0.95 }}>
              {isExpanded ? (
                <FiChevronUp className="w-4 h-4" />
              ) : (
                <FiChevronDown className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-4 pt-4 border-t border-bg-glass-md space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}>
              {/* Notes Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-t-secondary">
                    Notes
                  </span>
                </div>

                <p className="text-sm text-t-tertiary italic">
                  {student.remarks || 'No notes available'}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2 border-t border-bg-glass-md">
                <motion.button
                  className="flex-1 py-2 px-3 text-xs bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 flex items-center justify-center gap-1"
                  onClick={() => onUpdateStatus(student.id, 'present')}
                  whileTap={{ scale: 0.95 }}>
                  <FiCheckCircle className="w-3 h-3" />
                  Mark Present
                </motion.button>
                <motion.button
                  className="flex-1 py-2 px-3 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center justify-center gap-1"
                  onClick={() => onUpdateStatus(student.id, 'absent')}
                  whileTap={{ scale: 0.95 }}>
                  <FiXCircle className="w-3 h-3" />
                  Mark Absent
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
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

  const handleAddNote = (studentId, note) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, remarks: note } : student
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
        className="bg-bg-glass-md rounded-2xl border border-white/10 p-6 shadow-lg"
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
              <div className="flex items-center gap-2">
                <FiUser className="w-4 h-4 text-pink-400" />
                <span>{sessionInfo.lecturer}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-cyan-400" />
                <span>{sessionInfo.location}</span>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  sessionInfo.status === 'completed'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : sessionInfo.status === 'ongoing'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                }`}>
                {sessionInfo.status}
              </span>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <FiCalendar className="w-4 h-4 text-cyan-400" />
            <span className="text-t-tertiary">{sessionInfo.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FiClock className="w-4 h-4 text-yellow-400" />
            <span className="text-t-tertiary">
              {sessionInfo.startTime} – {sessionInfo.endTime}
            </span>
          </div>
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
        className="bg-bg-glass-md rounded-2xl border border-white/10 p-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        <div className="flex flex-col lg:flex-row gap-4">
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
            className="px-4 py-2 bg-bg-glass-sm border border-bg-glass-lg rounded-xl text-t-secondary hover:text-t-primary hover:border-purple-500/50 flex items-center gap-2 transition-all"
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
              <div className="flex flex-col gap-2">
                <label className="text-xs text-t-tertiary font-medium">
                  Status Filter
                </label>
                <select
                  className="px-3 py-2 bg-bg-glass-sm border border-bg-glass-lg rounded-lg text-t-primary text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All Students</option>
                  <option value="present">Present Only</option>
                  <option value="late">Late Only</option>
                  <option value="absent">Absent Only</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-t-tertiary font-medium">
                  Sort By
                </label>
                <select
                  className="px-3 py-2 bg-bg-glass-sm border border-bg-glass-lg rounded-lg text-t-primary text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}>
                  <option value="name">Name</option>
                  <option value="status">Status</option>
                  <option value="checkInTime">Check-in Time</option>
                  <option value="attendanceRate">Attendance Rate</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Students List */}
      <motion.div
        className="bg-bg-glass-md rounded-2xl border border-white/10 shadow-lg p-6"
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
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <FiUsers className="w-12 h-12 text-t-tertiary mx-auto mb-4" />
            <p className="text-t-tertiary mb-2">No students found</p>
            <p className="text-sm text-t-muted">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
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
                  onAddNote={handleAddNote}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
