import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import {
  LuUsers,
  LuCalendar,
  LuBookOpen,
  LuGraduationCap,
  LuChevronDown,
  LuChevronUp,
  LuClock,
  LuCircle,
  LuChevronRight,
} from 'react-icons/lu';
import { shortenDept } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/molecules/StatCard';

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
        return 'text-emerald-600';
      case 'scheduled':
        return 'text-blue-600';
      case 'pending':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getFacultyColor = (faculty) => {
    switch (faculty) {
      case 'Sciences':
        return 'from-emerald-100 to-teal-100 border-emerald-200';
      case 'Engineering':
        return 'from-blue-100 to-indigo-100 border-blue-200';
      default:
        return 'from-purple-100 to-pink-100 border-purple-200';
    }
  };

  const navigate = useNavigate();

  return (
    <div
      className={`bg-gradient-to-br ${getFacultyColor(
        group.faculty
      )} rounded-3xl border-2 shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 overflow-hidden`}
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'fadeInUp 0.8s ease-out forwards',
        opacity: 0,
        transform: 'translateY(20px)',
      }}>
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <LuGraduationCap className="w-6 h-6 text-slate-600" />
              <span className="text-sm font-medium text-slate-600 bg-white/60 px-3 py-1 rounded-full">
                {group.courseId}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2 leading-tight">
              {group.groupName}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {group.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
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

        <button
          onClick={() => navigate(`/lecturer/groups/info/${group.groupId}`)}
          className="w-full bg-white/70 hover:bg-white/90 backdrop-blur-sm text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group">
          <span>View Details</span>
          <LuChevronRight className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>

      {isExpanded && (
        <div className="bg-white/80 backdrop-blur-sm border-t border-white/50 animate-in slide-in-from-top-5 duration-500">
          <div className="p-8">
            <div className="flex gap-4 mb-6">
              {['overview', 'sessions', 'students'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? 'bg-slate-200 text-slate-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4 animate-in fade-in-50 duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Academic Year
                    </div>
                    <div className="text-slate-800">
                      {new Date(group.academicYear.start).getFullYear()}-
                      {new Date(group.academicYear.end).getFullYear()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Faculty
                    </div>
                    <div className="text-slate-800">{group.faculty}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Target Level
                    </div>
                    <div className="text-slate-800">{group.targets}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 mb-1">
                      Created By
                    </div>
                    <div className="text-slate-800">{group.createdBy}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sessions' && (
              <div className="space-y-3 animate-in fade-in-50 duration-500">
                {group.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white/70 rounded-xl p-4 hover:bg-white/90 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {session.status === 'completed' ? (
                          <FaCheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <LuCircle className="w-5 h-5 text-blue-600" />
                        )}
                        <h4 className="font-semibold text-slate-800">
                          {session.topic}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <LuClock className="w-4 h-4" />
                        {session.duration}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                      <span
                        className={`font-medium capitalize ${getStatusColor(
                          session.status
                        )}`}>
                        {session.status}
                      </span>
                      {session.status === 'completed' && (
                        <span>
                          Present: {session.attendance.present} | Absent:{' '}
                          {session.attendance.absent}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-3 animate-in fade-in-50 duration-500">
                {group.students.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white/70 rounded-xl p-4 hover:bg-white/90 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {student.name}
                        </h4>
                        <div className="text-sm text-slate-600">
                          {student.matricNo} • Level {student.level}
                        </div>
                        <div className="text-sm text-slate-500">
                          {student.email}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600 mb-1">
                          Attendance
                        </div>
                        <div className="flex gap-1">
                          {student.attendanceRecord.map((record, idx) => (
                            <div
                              key={idx}
                              className={`w-3 h-3 rounded-full ${
                                record.status === 'present'
                                  ? 'bg-emerald-400'
                                  : record.status === 'absent'
                                  ? 'bg-red-400'
                                  : 'bg-gray-300'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            Academic Groups
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage and monitor your academic groups with comprehensive insights
            into sessions, students, and performance.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10">
          {groups.map((group, index) => (
            <GroupCard
              key={group.courseId}
              group={group}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
