import React from 'react';
import {
  FaArrowLeft,
  FaGraduationCap,
  FaCalendar,
  FaBook,
  FaUsers,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaMinusCircle,
  FaUser,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { groups } from '../../utils/data';
import { LuX } from 'react-icons/lu';
import StatCard from '../../components/molecules/StatCard';

const GroupInfo = () => {
  const { groupId } = useParams(); // Demo
  const navigate = () => console.log('Navigate back');
  const group = groups.find((g) => g.groupId === groupId);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center w-full max-w-md">
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Group Not Found
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            The group "{groupId}" could not be found.
          </p>
          <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto">
            Back to Groups
          </button>
        </div>
      </div>
    );
  }

  // Helpers
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present':
        return (
          <FaCheckCircle className="text-emerald-600 w-3 h-3 sm:w-4 sm:h-4" />
        );
      case 'absent':
        return <LuX className="text-red-600 w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return (
          <FaMinusCircle className="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
        );
    }
  };

  // Stats
  const totalStudents = group.students.length;
  const completedSessions = group.sessions.filter(
    (s) => s.status === 'Completed'
  ).length;
  const avgAttendance =
    completedSessions > 0
      ? Math.round(
          group.sessions
            .filter((s) => s.status === 'Completed')
            .reduce((acc, s) => acc + s.attendance.present, 0) /
            completedSessions
        )
      : 0;

  return (
    <div className="min-h-screen bg-transparent">
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={navigate}
          className="group flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-slate-600 hover:text-blue-600 transition-all duration-200 bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-blue-200 text-sm sm:text-base">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200 w-3 h-3 sm:w-4 sm:h-4" />
          <span className="font-medium">Back to Groups</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-10 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16"></div>
          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 sm:mb-3 leading-tight">
                  {group.groupName}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600">
                  {group.description}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg shrink-0">
                <FaBook className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-bold text-sm sm:text-base lg:text-lg">
                  {group.courseId}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard
                icon={FaUsers}
                label="Students"
                value={totalStudents}
                iconColor="emerald"
                variant="light"
              />

              <StatCard
                icon={FaCalendar}
                label="Sessions"
                value={group.sessions.length}
                variant="light"
                iconColor="blue"
              />

              <StatCard
                variant="light"
                icon={FaCheckCircle}
                label="Completed"
                value={completedSessions}
                iconColor="purple"
              />

              <StatCard
                variant="light"
                icon={FaGraduationCap}
                label="Avg. Attendance"
                value={avgAttendance}
                iconColor="orange"
              />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left - Details & Sessions */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Course Details */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FaChalkboardTeacher className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                <span>Course Details</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <DetailCard
                  icon={<FaGraduationCap />}
                  label="Department"
                  value={group.department}
                />
                <DetailCard
                  icon={<FaUser />}
                  label="Target Level"
                  value={group.targets}
                />
                <DetailCard
                  icon={<FaChalkboardTeacher />}
                  label="Faculty"
                  value={group.faculty}
                />
                <DetailCard
                  icon={<FaCalendar />}
                  label="Academic Year"
                  value={`${group.academicYear.start} - ${group.academicYear.end}`}
                />
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FaCalendar className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                <span>Sessions</span>
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {group.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 sm:p-6 border border-slate-200 rounded-xl sm:rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-r from-white to-slate-50">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-3">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 hover:text-blue-600 leading-tight">
                          {session.topic}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm sm:text-base text-slate-600">
                          <span>
                            {new Date(session.date).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>{session.duration}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border shrink-0 ${getStatusColor(
                          session.status
                        )}`}>
                        {session.status}
                      </span>
                    </div>
                    {session.status === 'Completed' && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-100">
                        <span className="text-emerald-600 font-semibold text-sm sm:text-base">
                          ✓ {session.attendance.present} Present
                        </span>
                        {session.attendance.absent > 0 && (
                          <span className="text-red-600 font-semibold text-sm sm:text-base">
                            ✗ {session.attendance.absent} Absent
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Students */}
          <div>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8 lg:sticky lg:top-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <FaUsers className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                <span>Students ({totalStudents})</span>
              </h2>
              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {group.students.map((student) => (
                  <div
                    key={student.id}
                    className="p-3 sm:p-4 border border-slate-200 rounded-xl sm:rounded-2xl hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-slate-50">
                    <div className="mb-3">
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                        {student.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {student.matricNo}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 break-all">
                        {student.email}
                      </p>
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-semibold mt-2">
                        {student.level}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                        Attendance:
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {group.sessions
                          .filter((s) => s.status === 'Completed')
                          .map((session) => {
                            const attendance = student.attendanceRecord.find(
                              (r) => r.sessionId === session.id
                            );
                            return (
                              <div
                                key={session.id}
                                className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-100"
                                title={`${session.topic}: ${
                                  attendance?.status || 'Not recorded'
                                }`}>
                                {getAttendanceIcon(attendance?.status)}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl">
    {React.cloneElement(icon, {
      className: 'text-slate-600 w-4 h-4 sm:w-5 sm:h-5 shrink-0',
    })}
    <div className="min-w-0 flex-1">
      <p className="font-semibold text-slate-800 text-sm sm:text-base">
        {label}
      </p>
      <p className="text-slate-600 text-sm sm:text-base break-words">{value}</p>
    </div>
  </div>
);

export default GroupInfo;
