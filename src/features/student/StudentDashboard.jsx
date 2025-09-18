import React, { useState, useEffect } from 'react';
import {
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiBell,
  FiUser,
  FiMapPin,
  FiWifi,
  FiAlertCircle,
  FiCalendar,
  FiBook,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useGroupAssign, useGroups } from '../../hooks/useGroups';
import InlineLoader from '../../components/loaders/InlineLoader';
import { ROLES } from '../../utils/roles';

const mockGroups = [
  {
    id: 1,
    name: 'CSC 201 – Data Structures',
    lecturer: 'Dr. Sarah Johnson',
    status: 'joine',
    attendanceRate: 85,
  },
  {
    id: 2,
    name: 'MAT 301 – Linear Algebra',
    lecturer: 'Prof. Michael Chen',
    status: 'joine',
    attendanceRate: 92,
  },
  {
    id: 3,
    name: 'ENG 205 – Technical Writing',
    lecturer: 'Dr. Emily Davis',
    status: 'pending',
    attendanceRate: null,
  },
];

const mockActiveSessions = [
  {
    id: 1,
    groupName: 'CSC 201 – Data Structures',
    timeRemaining: 8, // minutes
    location: 'Room A-205',
    requiresLocation: true,
    sessionCode: 'DS2024',
    canJoin: true,
  },
];

const mockRecentHistory = [
  {
    id: 1,
    groupName: 'CSC 201',
    date: '2024-09-03',
    status: 'present',
    time: '10:00 AM',
  },
  {
    id: 2,
    groupName: 'MAT 301',
    date: '2024-09-02',
    status: 'present',
    time: '2:00 PM',
  },
  {
    id: 3,
    groupName: 'ENG 205',
    date: '2024-09-01',
    status: 'late',
    time: '9:15 AM',
  },
];

const StudentDashboard = ({ attendanceData = { attendanceRate: 85 } }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();
  const { autoAssign, loading, error } = useGroupAssign();
  const {
    fetchGroups,
    loading: grpLoading,
    error: grpError,
    groups,
  } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleGroupAssignment = async () => {
    try {
      // Show a loading state if you have one
      console.log('Checking rosters for matric match...');

      const res = await autoAssign();

      if (res.success) {
        alert(res.message || `You have been successfully assigned to groups`);
        fetchGroups();
      } else {
        alert(data.message || 'No matching group found.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong while assigning group.');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 120000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeRemaining = (minutes) => {
    if (minutes < 1) return 'Less than 1 min';
    return `${minutes} min${minutes !== 1 ? 's' : ''} left`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-green-400';
      case 'late':
        return 'text-yellow-400';
      case 'absent':
        return 'text-red-400';
      default:
        return 'text-t-tertiary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-400 rounded-full" />;
      case 'archived':
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-blue-400 rounded-full" />;
    }
  };

  const attendanceRate = attendanceData?.attendanceRate || null;

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'archived':
        return 'Archived';
      default:
        return 'Unknown';
    }
  };

  const getLevelColor = (level) => {
    if (level >= 500) return 'text-purple-400 bg-purple-400/10';
    if (level >= 400) return 'text-blue-400 bg-blue-400/10';
    if (level >= 300) return 'text-green-400 bg-green-400/10';
    if (level >= 200) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-orange-400 bg-orange-400/10';
  };

  const nav = useNavigate();

  const handleMarkAttendance = () => {
    nav(`/${ROLES.STUDENT}/attendance/:id`);
  };

  const handleViewGroup = (groupId) => {
    nav(`/${ROLES.STUDENT}/groups/${groupId}/info`);
  };

  const hasActiveSessions = mockActiveSessions.length > 0;
  const joinedGroups = (groups || mockGroups).filter(
    (group) => group.status === 'active'
  );

  const networkStatus = 'online';

  return (
    <div className="lg:space-x-6 flex flex-col lg:flex-row ">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-heading-xl gradient-text mb-1">
              Hi, {user.firstName || ''}
            </h1>
            <div className="flex items-center gap-4 text-body-sm text-t-tertiary">
              <span>
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <div className="flex items-center gap-1">
                <span
                  className={
                    hasActiveSessions ? 'text-green-400' : 'text-t-tertiary'
                  }>
                  {hasActiveSessions
                    ? `${mockActiveSessions.length} Active Session${
                        mockActiveSessions.length !== 1 ? 's' : ''
                      }`
                    : 'All sessions complete today'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions - Priority Placement */}
        {hasActiveSessions && (
          <div className="card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-heading-md text-t-secondary">
                Active Attendance Sessions
              </h2>
            </div>
            <div className="space-y-3">
              {mockActiveSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-bg-glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-purple-500/10 hover:border-purple-500/50 transition-300 transition-all ease-in-out">
                  <div className="flex-1">
                    <h3 className="text-body font-semibold text-t-secondary mb-1">
                      {session.groupName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-body-sm text-slate-300">
                      <div className="flex items-center gap-1">
                        <FiClock className="text-yellow-400" />
                        <span className="text-yellow-400 font-medium">
                          {formatTimeRemaining(session.timeRemaining)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMapPin />
                        <span>{session.location}</span>
                      </div>
                      {session.requiresLocation && (
                        <div className="flex items-center gap-1">
                          <FiWifi className="text-cyan-400" />
                          <span className="text-cyan-400">
                            Location required
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleMarkAttendance(session.id)}
                    disabled={!session.canJoin}
                    text="Mark Attendance"
                    className={` whitespace-nowrap  place-self-end ${
                      !session.canJoin
                        ? 'opacity-50 cursor-not-allowed'
                        : 'animate-pulse-glow'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Active Sessions */}
        {!hasActiveSessions && (
          <div className="card text-center py-8">
            <FiCheckCircle className="text-4xl text-green-400 mx-auto mb-3" />
            <h3 className="text-heading-md text-t-secondary mb-2">
              No active sessions right now
            </h3>
            <p className="text-body-sm text-t-tertiary">
              You're all caught up! Check back when your lecturers start new
              attendance sessions.
            </p>
          </div>
        )}

        {/* Groups/Courses Section */}
        <div className="space-y-4 ">
          <h2 className="text-heading-lg text-t-secondary">Your Groups</h2>

          {grpLoading ? (
            <InlineLoader />
          ) : joinedGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {joinedGroups.map((group) => (
                <div
                  key={group._id}
                  className="card-hover cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
                  onClick={() => handleViewGroup(group._id)}>
                  {/* Header with status and course icon */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(group.status)}
                      <span className="text-body-xs text-t-tertiary uppercase tracking-wide">
                        {getStatusText(group.status)}
                      </span>
                    </div>
                    <FiBook className="text-purple-400" />
                  </div>

                  {/* Course information */}
                  <div className="mb-3">
                    <h3 className="text-heading-md text-t-secondary mb-1">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-body-sm font-medium text-t-primary">
                        {group.courseCode}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                          group.level
                        )}`}>
                        L{group.level}
                      </span>
                    </div>
                    <p className="text-body-sm text-slate-300">
                      {group.department} • {group.faculty}
                    </p>
                  </div>

                  {/* Lecturer information */}
                  {group.createdBy && (
                    <div className="flex items-center gap-2 mb-3">
                      <FiUsers className="text-gray-400 w-4 h-4" />
                      <span className="text-body-sm text-t-tertiary">
                        Lecturer:{' '}
                        {group.createdBy.name ||
                          group.createdBy.firstName +
                            ' ' +
                            group.createdBy.lastName}
                      </span>
                    </div>
                  )}

                  {/* Class size */}
                  {group.members && group.members.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <FiUsers className="text-gray-400 w-4 h-4" />
                      <span className="text-body-sm text-t-tertiary">
                        {group.members.length} student
                        {group.members.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {group.description && (
                    <p className="text-body-sm text-t-tertiary mb-3 line-clamp-2">
                      {group.description}
                    </p>
                  )}

                  {/* Footer with attendance rate and last updated */}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      {/* Attendance rate */}
                      {attendanceRate !== null && (
                        <div className="flex items-center justify-between">
                          <span className="text-body-xs text-t-tertiary">
                            Your Attendance
                          </span>
                          <span
                            className={`text-body-sm font-semibold ml-2 ${
                              attendanceRate >= 90
                                ? 'text-green-400'
                                : attendanceRate >= 70
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}>
                            {attendanceRate}%
                          </span>
                        </div>
                      )}

                      {/* Last updated */}
                      <div className="flex items-center gap-1">
                        <FiCalendar className="text-gray-400 w-3 h-3" />
                        <span className="text-body-xs text-t-tertiary">
                          {new Date(group.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8 space-y-4">
              <FiUsers className="text-4xl text-t-tertiary mx-auto mb-3" />
              <h3 className="text-heading-md text-t-secondary mb-2">
                No groups yet
              </h3>
              <p className="text-body-sm text-t-tertiary max-w-md mx-auto">
                You haven’t been assigned to any class groups yet. Click the
                button below to proceed with automatic group assignment. We’ll
                check your matric number against your school’s rosters and
                assign you to the right group if a match is found.
              </p>

              <Button
                text="Proceed to Group Assignment"
                className="mt-4 mx-auto"
                onClick={handleGroupAssignment}
              />
            </div>
          )}
        </div>
      </div>

      {/* Recent Attendance History */}
      <div
        className={`glass p-4 md:p-6 lg:w-90 sticky ${
          networkStatus === 'online' ? 'top-0' : 'sm:top-13 top-16'
        }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-lg text-t-secondary">Recent Activity</h2>
          <button
            className="text-body-sm text-purple-400 hover:text-purple-300 transition-colors"
            onClick={() => nav('/student/attendance')}>
            View Full History
          </button>
        </div>

        {mockRecentHistory.length > 0 ? (
          <div className="space-y-3">
            {mockRecentHistory.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-purple-400" />
                  <div>
                    <p className="text-body text-t-secondary">
                      <span className="font-medium">{record.groupName}</span> •{' '}
                      {record.time}
                    </p>
                    <p className="text-body-sm text-t-tertiary">
                      {record.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-body-sm font-medium capitalize ${getStatusColor(
                    record.status
                  )}`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiCalendar className="text-4xl text-t-tertiary mx-auto mb-3" />
            <p className="text-body-sm text-t-tertiary">
              No records yet. Mark your first attendance to see history here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
