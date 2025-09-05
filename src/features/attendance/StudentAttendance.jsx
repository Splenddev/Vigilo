import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock,
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiArrowRight,
  FiFilter,
  FiSearch,
  FiCheckCircle,
  FiAlertCircle,
  FiPlay,
  FiPause,
  FiRefreshCw,
} from 'react-icons/fi';
import {
  LuClock,
  LuMapPin,
  LuUsers,
  LuCalendar,
  LuCircleCheck,
  LuTriangleAlert,
  LuPlay,
  LuClock3,
  LuFilter,
  LuSearch,
  LuArrowRight,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';
import InfoRow from '../../components/molecules/InfoRow';

// Mock attendance sessions data
const mockAttendanceSessions = [
  // Ongoing sessions
  {
    id: 1,
    groupName: 'CSC 201 – Data Structures',
    lecturer: 'Dr. Sarah Johnson',
    status: 'ongoing',
    timeRemaining: 12,
    location: 'Room A-205',
    building: 'Engineering Block',
    startTime: '10:00 AM',
    endTime: '10:20 AM',
    date: new Date(),
    attendees: 45,
    maxAttendees: 50,
    hasAttended: false,
    sessionCode: 'DS2024',
  },
  {
    id: 2,
    groupName: 'MAT 301 – Linear Algebra',
    lecturer: 'Prof. Michael Chen',
    status: 'ongoing',
    timeRemaining: 8,
    location: 'Room B-103',
    building: 'Science Block',
    startTime: '11:30 AM',
    endTime: '11:45 AM',
    date: new Date(),
    attendees: 32,
    maxAttendees: 40,
    hasAttended: true,
    sessionCode: 'LA301',
  },

  // Completed sessions
  {
    id: 3,
    groupName: 'ENG 105 – Technical Writing',
    lecturer: 'Dr. Amanda Clarke',
    status: 'completed',
    location: 'Room C-201',
    building: 'Arts Block',
    startTime: '8:00 AM',
    endTime: '8:15 AM',
    date: new Date(),
    attendees: 28,
    maxAttendees: 30,
    hasAttended: true,
    completedAt: '8:12 AM',
  },
  {
    id: 4,
    groupName: 'PHY 202 – Quantum Mechanics',
    lecturer: 'Dr. Robert Kim',
    status: 'completed',
    location: 'Room A-301',
    building: 'Science Block',
    startTime: '9:00 AM',
    endTime: '9:20 AM',
    date: new Date(Date.now() - 86400000), // Yesterday
    attendees: 22,
    maxAttendees: 25,
    hasAttended: false,
    completedAt: '9:20 AM',
  },

  // Upcoming sessions
  {
    id: 5,
    groupName: 'CSC 305 – Database Systems',
    lecturer: 'Dr. Lisa Wang',
    status: 'upcoming',
    location: 'Room A-105',
    building: 'Engineering Block',
    startTime: '2:00 PM',
    endTime: '2:15 PM',
    date: new Date(),
    maxAttendees: 45,
    sessionCode: 'DB305',
  },
  {
    id: 6,
    groupName: 'BUS 201 – Marketing Principles',
    lecturer: 'Prof. James Miller',
    status: 'upcoming',
    location: 'Room D-205',
    building: 'Business Block',
    startTime: '3:30 PM',
    endTime: '3:45 PM',
    date: new Date(Date.now() + 86400000), // Tomorrow
    maxAttendees: 60,
    sessionCode: 'MKT201',
  },
];

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const AttendanceListPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'ongoing', 'completed', 'upcoming'
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeRemaining = (minutes) => {
    if (minutes < 1) return 'Less than 1 min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m left`;
    }
    return `${mins} min${mins !== 1 ? 's' : ''} left`;
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status, hasAttended) => {
    switch (status) {
      case 'ongoing':
        return hasAttended ? (
          <LuCircleCheck className="text-xl shrink-0 text-green-400" />
        ) : (
          <LuPlay className="text-xl shrink-0 text-purple-400" />
        );
      case 'completed':
        return hasAttended ? (
          <LuCircleCheck className="text-xl shrink-0 text-green-400" />
        ) : (
          <LuTriangleAlert className="text-xl shrink-0 text-red-400" />
        );
      case 'upcoming':
        return <LuClock3 className="text-xl shrink-0 text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status, hasAttended) => {
    switch (status) {
      case 'ongoing':
        return hasAttended
          ? 'border-green-500/30 bg-green-500/5'
          : 'border-purple-500/30 bg-purple-500/5';
      case 'completed':
        return hasAttended
          ? 'border-green-500/30 bg-green-500/5'
          : 'border-red-500/30 bg-red-500/5';
      case 'upcoming':
        return 'border-blue-500/30 bg-blue-500/5';
      default:
        return 'border-white/10 bg-white/5';
    }
  };

  const getStatusText = (status, hasAttended) => {
    switch (status) {
      case 'ongoing':
        return hasAttended ? 'Attended' : 'Mark Now';
      case 'completed':
        return hasAttended ? 'Attended' : 'Missed';
      case 'upcoming':
        return 'Scheduled';
      default:
        return '';
    }
  };

  const filteredSessions = mockAttendanceSessions.filter((session) => {
    const matchesFilter =
      activeFilter === 'all' || session.status === activeFilter;
    const matchesSearch =
      session.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.lecturer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFilterCounts = () => {
    return {
      all: mockAttendanceSessions.length,
      ongoing: mockAttendanceSessions.filter((s) => s.status === 'ongoing')
        .length,
      completed: mockAttendanceSessions.filter((s) => s.status === 'completed')
        .length,
      upcoming: mockAttendanceSessions.filter((s) => s.status === 'upcoming')
        .length,
    };
  };

  const counts = getFilterCounts();

  const handleMarkAttendance = (session) => {
    navigate(`/student/attendance/${session.id}`, { state: { session } });
  };

  const handleViewDetails = (session) => {
    // In real app, navigate to session details
    alert(`Viewing details for ${session.groupName}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Attendance Sessions
              </h1>
              <p className="text-slate-400 mt-1">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-t-primary">
                {currentTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-sm text-slate-400">Current Time</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search sessions or lecturers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-t-primary placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border transition-all flex items-center gap-2 ${
                showFilters
                  ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                  : 'border-white/10 glass text-t-secondary hover:border-purple-500/50'
              }`}>
              <LuFilter />
              Filters
            </button>
          </div>

          {/* Filter Tabs */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}>
                {[
                  { key: 'all', label: 'All Sessions', count: counts.all },
                  { key: 'ongoing', label: 'Ongoing', count: counts.ongoing },
                  {
                    key: 'upcoming',
                    label: 'Upcoming',
                    count: counts.upcoming,
                  },
                  {
                    key: 'completed',
                    label: 'Completed',
                    count: counts.completed,
                  },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`p-3 rounded-xl border transition-all ${
                      activeFilter === filter.key
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                        : 'border-white/10 bg-white/5 text-t-secondary hover:border-purple-500/50'
                    }`}>
                    <div className="text-sm font-medium">{filter.label}</div>
                    <div className="text-xs opacity-75">{filter.count}</div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sessions List */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          {filteredSessions.length === 0 ? (
            <EmptyState
              title="No sessions found"
              variant="warning"
              message={
                searchTerm
                  ? 'Try adjusting your search terms'
                  : 'No sessions match the selected filter'
              }
              icon={LuCalendar}
            />
          ) : (
            filteredSessions.map((session) => (
              <motion.div
                key={session.id}
                className={`rounded-2xl border backdrop-blur-sm p-6 hover:shadow-lg transition-all cursor-pointer ${getStatusColor(
                  session.status,
                  session.hasAttended
                )}`}
                variants={cardVariants}
                whileHover="hover"
                onClick={() =>
                  session.status === 'ongoing' && !session.hasAttended
                    ? handleMarkAttendance(session)
                    : handleViewDetails(session)
                }>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <InfoRow
                      icon={getStatusIcon(session.status, session.hasAttended)}
                      label={session.groupName}
                      labelClassName="text-lg font-semibold text-t-primary"
                      align="center"
                      subLabel={session.lecturer}
                    />

                    {/* Session Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <InfoRow
                        icon={LuClock}
                        textColor="text-cyan-400"
                        iconSize="text-sm" align='center'
                        label={`${session.startTime} - ${session.endTime}`}>
                        {session.status === 'ongoing' && (
                          <div className="text-cyan-400 font-medium">
                            {formatTimeRemaining(session.timeRemaining)}
                          </div>
                        )}
                        {session.status === 'completed' &&
                          session.completedAt && (
                            <div className="text-slate-400">
                              Ended at {session.completedAt}
                            </div>
                          )}
                      </InfoRow>
                      <div className="flex items-center gap-2">
                        <LuClock className="text-cyan-400" />
                        <div>
                          <span className="text-t-secondary">
                            {session.startTime} - {session.endTime}
                          </span>
                          {session.status === 'ongoing' && (
                            <div className="text-cyan-400 font-medium">
                              {formatTimeRemaining(session.timeRemaining)}
                            </div>
                          )}
                          {session.status === 'completed' &&
                            session.completedAt && (
                              <div className="text-slate-400">
                                Ended at {session.completedAt}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <LuMapPin className="text-purple-400" />
                        <div>
                          <span className="text-t-secondary">
                            {session.location}
                          </span>
                          <div className="text-slate-400">
                            {session.building}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {session.attendees ? (
                          <>
                            <LuUsers className="text-pink-400" />
                            <div>
                              <span className="text-t-secondary">
                                {session.attendees}/{session.maxAttendees}
                              </span>
                              <div className="text-slate-400">Attendees</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <LuCalendar className="text-blue-400" />
                            <div>
                              <span className="text-t-secondary">
                                {formatDate(session.date)}
                              </span>
                              <div className="text-slate-400">
                                Max: {session.maxAttendees}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Progress bar for ongoing sessions */}
                    {session.status === 'ongoing' && (
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              ((20 - session.timeRemaining) / 20) * 100
                            }%`,
                          }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Status Badge and Action */}
                  <div className="flex flex-col items-end gap-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'ongoing'
                          ? session.hasAttended
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-purple-500/20 text-purple-400'
                          : session.status === 'completed'
                          ? session.hasAttended
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                      {getStatusText(session.status, session.hasAttended)}
                    </div>

                    {session.status === 'ongoing' && !session.hasAttended && (
                      <motion.button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-t-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAttendance(session);
                        }}>
                        Mark Now
                        <LuArrowRight />
                      </motion.button>
                    )}

                    {(session.status === 'completed' ||
                      session.status === 'upcoming' ||
                      session.hasAttended) && (
                      <LuArrowRight className="text-slate-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {counts.ongoing}
            </div>
            <div className="text-sm text-slate-400">Ongoing</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {counts.upcoming}
            </div>
            <div className="text-sm text-slate-400">Upcoming</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {mockAttendanceSessions.filter((s) => s.hasAttended).length}
            </div>
            <div className="text-sm text-slate-400">Attended</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {
                mockAttendanceSessions.filter(
                  (s) => s.status === 'completed' && !s.hasAttended
                ).length
              }
            </div>
            <div className="text-sm text-slate-400">Missed</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AttendanceListPage;
