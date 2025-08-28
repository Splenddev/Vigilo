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
import { useNavigate, useParams } from 'react-router-dom';
import { groups } from '../../utils/data';
import {
  LuBookText,
  LuCalendar,
  LuClipboardList,
  LuSchool,
  LuUsers,
  LuX,
} from 'react-icons/lu';
import StatCard from '../../components/molecules/StatCard';
import InfoRow from '../../components/molecules/InfoRow';

const GroupInfo = () => {
  const { groupId } = useParams(); // Demo
  const navigate = useNavigate();
  const group = groups.find((g) => g.groupId === groupId);

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl shadow-xl p-6 sm:p-8 text-center w-full max-w-md">
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">
            Group Not Found
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            The group "{groupId}" could not be found.
          </p>
          <button
            className="btn-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
            onClick={() => navigate('/lecturer/groups')}>
            Back to Groups
          </button>
        </div>
      </div>
    );
  }

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
    <div>
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-3 mb-6 flex-col sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-white hover:text-primary transition-all duration-200 glass px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:shadow-md border border-slate-200 hover:border-primary-purple-soft text-sm sm:text-base">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">Back to Groups</span>
          </button>

          <div className="flex-1 gap-3 items-center flex justify-end ">
            <button
              onClick={() =>
                navigate('/lecturer/sessions', { state: { id: group.groupId } })
              }
              className="glass flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 shadow-md hover:scale-105 transition-all duration-200">
              <LuClipboardList className="w-4 h-4" />
              <span className="font-medium">Sessions</span>
            </button>

            <button
              onClick={() =>
                navigate('/lecturer/students', {
                  state: { id: group.groupId },
                })
              }
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl">
              <LuUsers className="w-4 h-4" />
              <span className="font-medium">Students</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="glass rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-10 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16"></div>
          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                  {group.groupName}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300">
                  {group.description}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 btn-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg shrink-0">
                <FaBook className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-bold text-sm sm:text-base lg:text-lg">
                  {group.courseId}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard
                icon={FaUsers}
                label="Students"
                value={totalStudents}
                iconColor=""
              />

              <StatCard
                icon={FaCalendar}
                label="Sessions"
                value={group.sessions.length}
                iconColor=""
              />

              <StatCard
                icon={FaCheckCircle}
                label="Completed"
                value={completedSessions}
                iconColor=""
              />

              <StatCard
                icon={FaGraduationCap}
                label="Avg. Attendance"
                value={avgAttendance}
                iconColor=""
              />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left - Details & Sessions */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Course Details */}
            <div className="glass rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <LuBookText className="text-primary-pink-dark w-5 h-5 sm:w-6 sm:h-6" />
                <span>Course Details</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-xs:grid-cols-1">
                <InfoRow
                  icon={FaGraduationCap}
                  label="Department"
                  className="glass-strong p-4 rounded-xl"
                  align="center">
                  <span className="text-gray-300">{group.department}</span>
                </InfoRow>
                <InfoRow
                  icon={LuSchool}
                  label="Faculty"
                  className="glass-strong p-4 rounded-xl"
                  align="center">
                  <span className="text-gray-300">{group.faculty}</span>
                </InfoRow>
                <InfoRow
                  icon={LuCalendar}
                  label="Academic Year"
                  className="glass-strong p-4 rounded-xl"
                  align="center">
                  <span className="text-gray-300">
                    {`${group.academicYear.start} - ${group.academicYear.end}`}
                  </span>
                </InfoRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
