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
import NotificationPanel from '../../components/common/NotificationPanel';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/atoms/Button';
import { useNavigate } from 'react-router-dom';

const mockGroups = [
  {
    id: 1,
    name: 'CSC 201 – Data Structures',
    lecturer: 'Dr. Sarah Johnson',
    status: 'joined',
    attendanceRate: 85,
  },
  {
    id: 2,
    name: 'MAT 301 – Linear Algebra',
    lecturer: 'Prof. Michael Chen',
    status: 'joined',
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

const StudentDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

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
      case 'joined':
        return <FiCheckCircle className="text-green-400" />;
      case 'pending':
        return <FiClock className="text-yellow-400" />;
      default:
        return <FiAlertCircle className="text-t-tertiary" />;
    }
  };

  const nav=useNavigate()

  const handleMarkAttendance = (sessionId) => {
    // In real app, this would navigate to attendance marking page
    nav('/student/attendance',{state:{id:sessionId}})
  };

  const handleViewGroup = (groupId) => {
    alert(`Opening group details for group ${groupId}`);
  };

  const hasActiveSessions = mockActiveSessions.length > 0;
  const joinedGroups = mockGroups.filter((group) => group.status === 'joined');
  const pendingGroups = mockGroups.filter(
    (group) => group.status === 'pending'
  );

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
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
                        <span className="text-cyan-400">Location required</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => handleMarkAttendance(session.id)}
                  disabled={!session.canJoin}
                  text="Mark Attendance"
                  className={` whitespace-nowrap ${
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
      <div className="space-y-4">
        <h2 className="text-heading-lg text-t-secondary">Your Groups</h2>

        {joinedGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {joinedGroups.map((group) => (
              <div
                key={group.id}
                className="card-hover cursor-pointer"
                onClick={() => handleViewGroup(group.id)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(group.status)}
                    <span className="text-body-xs text-t-tertiary uppercase tracking-wide">
                      {group.status}
                    </span>
                  </div>
                  <FiBook className="text-purple-400" />
                </div>
                <h3 className="text-heading-md text-t-secondary mb-2">
                  {group.name}
                </h3>
                <p className="text-body-sm text-slate-300 mb-3">
                  {group.lecturer}
                </p>
                {group.attendanceRate && (
                  <div className="flex items-center justify-between">
                    <span className="text-body-xs text-t-tertiary">
                      Attendance Rate
                    </span>
                    <span
                      className={`text-body-sm font-semibold ${
                        group.attendanceRate >= 90
                          ? 'text-green-400'
                          : group.attendanceRate >= 70
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}>
                      {group.attendanceRate}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <FiUsers className="text-4xl text-t-tertiary mx-auto mb-3" />
            <h3 className="text-heading-md text-t-secondary mb-2">
              No groups yet
            </h3>
            <p className="text-body-sm text-t-tertiary">
              You haven't joined any groups yet. Check your email/SMS for
              invites from your lecturers.
            </p>
          </div>
        )}

        {/* Pending Groups */}
        {pendingGroups.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-body font-semibold text-slate-300">
              Pending Approvals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pendingGroups.map((group) => (
                <div
                  key={group.id}
                  className="card border-yellow-500/30 bg-yellow-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FiClock className="text-yellow-400" />
                    <span className="text-body-xs text-yellow-400 uppercase tracking-wide">
                      Pending
                    </span>
                  </div>
                  <h4 className="text-body font-semibold text-t-secondary mb-1">
                    {group.name}
                  </h4>
                  <p className="text-body-sm text-slate-300">
                    {group.lecturer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent Attendance History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-lg text-t-secondary">Recent Activity</h2>
          <button className="text-body-sm text-purple-400 hover:text-purple-300 transition-colors">
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
