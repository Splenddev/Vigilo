import React, { useState } from 'react';
import {
  LuCheck,
  LuUsers,
  LuCalendar,
  LuBookOpen,
  LuGraduationCap,
  LuChevronRight,
  LuClock,
  LuCircle,
  LuUser,
  LuMail,
} from 'react-icons/lu';
import StatCard from '../../components/molecules/StatCard';
import { useNavigate } from 'react-router-dom';
import { groups } from '../../utils/data';

const GroupCard = ({ group, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const totalStudents = group.students.length;
  const totalSessions = group.sessions.length;
  const completedSessions = group.sessions.filter(
    (s) => s.status === 'completed'
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'scheduled':
        return 'text-cyan-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getFacultyGradient = (faculty) => {
    switch (faculty) {
      case 'Sciences':
        return 'from-green-500/20 to-cyan-500/20';
      case 'Engineering':
        return 'from-blue-500/20 to-purple-500/20';
      default:
        return 'from-purple-500/20 to-pink-500/20';
    }
  };

  const navigate = useNavigate();

  const shortenDept = (department) => {
    const words = department.split(' ');
    if (words.length > 2) {
      return words.map((word) => word.charAt(0).toUpperCase()).join('');
    }
    return department;
  };

  const handleViewDetails = () => {
    navigate(`${group.groupId}/info`);
  };

  return (
    <div
      className={`card-hover bg-gradient-to-br ${getFacultyGradient(
        group.faculty
      )} animate-fade-in-up overflow-hidden`}
      style={{
        animationDelay: `${index * 150}ms`,
      }}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <LuGraduationCap className="w-6 h-6 text-purple-400" />
              <span className="text-body-sm font-medium text-white bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                {group.courseId}
              </span>
            </div>
            <h3 className="text-heading-lg text-white mb-3 leading-tight">
              {group.groupName}
            </h3>
            <p className="text-body text-gray-300 leading-relaxed">
              {group.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={LuUsers}
            value={totalStudents}
            label="Students"
          />
          <StatCard
            icon={LuCalendar}
            value={`${completedSessions}/${totalSessions}`}
            label="Sessions"
          />
          <StatCard
            icon={LuBookOpen}
            value={shortenDept(group.department)}
            label="Department"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleViewDetails}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl group">
            <span>View Details</span>
            <LuChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-ghost flex items-center justify-center gap-2 py-3 px-6">
            <span>{isExpanded ? 'Less' : 'More'}</span>
            <LuChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="glass-strong border-t border-white/10 animate-fade-in-up">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {['overview', 'sessions', 'students'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4">
                    <div className="text-body-sm font-medium text-gray-300 mb-1">
                      Academic Year
                    </div>
                    <div className="text-white">
                      {new Date(group.academicYear.start).getFullYear()}-
                      {new Date(group.academicYear.end).getFullYear()}
                    </div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="text-body-sm font-medium text-gray-300 mb-1">
                      Faculty
                    </div>
                    <div className="text-white">{group.faculty}</div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="text-body-sm font-medium text-gray-300 mb-1">
                      Target Level
                    </div>
                    <div className="text-white">{group.targets}</div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="text-body-sm font-medium text-gray-300 mb-1">
                      Created By
                    </div>
                    <div className="text-white">{group.createdBy}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-3 animate-fade-in-up">
                {group.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {session.status === 'completed' ? (
                          <LuCheck className="w-5 h-5 text-green-400" />
                        ) : (
                          <LuCircle className="w-5 h-5 text-cyan-400" />
                        )}
                        <h4 className="font-semibold text-white">
                          {session.topic}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-body-sm text-gray-300">
                        <LuClock className="w-4 h-4" />
                        {session.duration}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between gap-2 text-body-sm text-gray-300">
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-medium capitalize ${getStatusColor(
                            session.status
                          )}`}>
                          {session.status}
                        </span>
                        {session.status === 'completed' && (
                          <span className="text-gray-300">
                            Present: {session.attendance.present} | Absent:{' '}
                            {session.attendance.absent}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-3 animate-fade-in-up">
                {group.students.map((student) => (
                  <div
                    key={student.id}
                    className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <LuUser className="w-4 h-4 text-purple-400" />
                          <h4 className="font-semibold text-white">
                            {student.name}
                          </h4>
                        </div>
                        <div className="text-body-sm text-gray-300 mb-1">
                          {student.matricNo} • Level {student.level}
                        </div>
                        <div className="flex items-center gap-2 text-body-sm text-gray-400">
                          <LuMail className="w-4 h-4" />
                          {student.email}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-body-sm text-gray-300 mb-2">
                          Attendance Record
                        </div>
                        <div className="flex gap-1">
                          {student.attendanceRecord.map((record, idx) => (
                            <div
                              key={idx}
                              className={`w-3 h-3 rounded-full ${
                                record.status === 'present'
                                  ? 'bg-green-400'
                                  : record.status === 'absent'
                                  ? 'bg-red-400'
                                  : 'bg-gray-500'
                              }`}
                              title={`Session ${idx + 1}: ${record.status}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Groups() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-heading-xl gradient-text mb-4">
            Academic Groups
          </h1>
          <p className="text-body text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Manage and monitor your academic groups with comprehensive insights
            into sessions, students, and performance.
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8">
          {groups.map((group, index) => (
            <GroupCard
              key={group.courseId}
              group={group}
              index={index}
            />
          ))}
        </div>

        {/* Empty state for when no groups exist */}
        {groups.length === 0 && (
          <div className="card text-center py-12 animate-fade-in-up">
            <LuGraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-heading-md text-white mb-2">No Groups Yet</h3>
            <p className="text-body text-gray-300 mb-6">
              Create your first academic group to start tracking attendance
            </p>
            <button className="btn-primary px-6 py-3 rounded-xl">
              Create First Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
