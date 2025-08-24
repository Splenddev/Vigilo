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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Group Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The group "{groupId}" could not be found.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
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
        return <FaCheckCircle className="text-emerald-600 w-4 h-4" />;
      case 'absent':
        return <LuX className="text-red-600 w-4 h-4" />;
      default:
        return <FaMinusCircle className="text-gray-400 w-4 h-4" />;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={navigate}
          className="group flex items-center gap-3 mb-8 text-slate-600 hover:text-blue-600 transition-all duration-200 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-blue-200">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200 w-4 h-4" />
          <span className="font-medium">Back to Groups</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-800 mb-3">
                  {group.groupName}
                </h1>
                <p className="text-lg text-slate-600 max-w-3xl">
                  {group.description}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                <FaBook className="w-5 h-5" />
                <span className="font-bold text-lg">{group.courseId}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Details & Sessions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Details */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <FaChalkboardTeacher className="text-blue-600 w-6 h-6" /> Course
                Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
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
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <FaCalendar className="text-blue-600" /> Sessions
              </h2>
              <div className="space-y-4">
                {group.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-6 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-r from-white to-slate-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 hover:text-blue-600">
                          {session.topic}
                        </h3>
                        <div className="flex items-center gap-4 text-slate-600">
                          <span>
                            {new Date(session.date).toLocaleDateString(
                              'en-US',
                              { month: 'long', day: 'numeric', year: 'numeric' }
                            )}
                          </span>
                          <span>• {session.duration}</span>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                          session.status
                        )}`}>
                        {session.status}
                      </span>
                    </div>
                    {session.status === 'Completed' && (
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                        <span className="text-emerald-600 font-semibold">
                          ✓ {session.attendance.present} Present
                        </span>
                        {session.attendance.absent > 0 && (
                          <span className="text-red-600 font-semibold">
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
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <FaUsers className="text-blue-600" /> Students ({totalStudents})
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {group.students.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-slate-50">
                    <div className="mb-3">
                      <h4 className="font-bold text-slate-800">
                        {student.name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {student.matricNo}
                      </p>
                      <p className="text-sm text-slate-500">{student.email}</p>
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-semibold mt-2">
                        {student.level}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">
                        Attendance:
                      </p>
                      <div className="flex gap-1">
                        {group.sessions
                          .filter((s) => s.status === 'Completed')
                          .map((session) => {
                            const attendance = student.attendanceRecord.find(
                              (r) => r.sessionId === session.id
                            );
                            return (
                              <div
                                key={session.id}
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100"
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

/* Small Reusable UI Pieces */
const StatBox = ({ icon, label, value, color }) => (
  <div
    className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-4 rounded-2xl border border-${color}-200`}>
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className={`font-semibold text-${color}-800`}>{label}</span>
    </div>
    <div className={`text-2xl font-bold text-${color}-700`}>{value}</div>
  </div>
);

const DetailCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
    {React.cloneElement(icon, { className: 'text-slate-600 w-5 h-5' })}
    <div>
      <p className="font-semibold text-slate-800">{label}</p>
      <p className="text-slate-600">{value}</p>
    </div>
  </div>
);

export default GroupInfo;
