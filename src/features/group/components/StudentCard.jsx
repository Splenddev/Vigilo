import React from 'react';
import {
  LuUser,
  LuMail,
  LuHash,
  LuGraduationCap,
  LuCircleCheck,
  LuCircleX,
} from 'react-icons/lu';

const StudentCard = ({ student }) => {
  const {
    firstName,
    lastName,
    matricNumber,
    email,
    level, // optional (may come from group-level)
    attendanceRecord = [],
    isInvited,
    hasJoined,
  } = student;

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Unnamed';

  // Attendance summary
  const total = attendanceRecord.length;
  const present = attendanceRecord.filter((r) => r.status === 'present').length;
  const absent = total - present;
  const attendanceRate = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="card-hover animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-t-primary flex items-center gap-2">
          <LuUser className="text-cyan-400" />
          {fullName}
        </h3>
        {level && (
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            Level {level}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-sm text-t-secondary">
        <div className="flex items-center gap-2">
          <LuHash className="text-purple-400" />
          <span>{matricNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <LuMail className="text-emerald-400" />
          <span>{email || 'No email'}</span>
        </div>
      </div>

      {/* Invitation status */}
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span
          className={`px-2 py-1 rounded-full ${
            isInvited
              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
              : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
          }`}>
          {isInvited ? 'Invited' : 'Not Invited'}
        </span>
        <span
          className={`px-2 py-1 rounded-full ${
            hasJoined
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
          }`}>
          {hasJoined ? 'Joined' : 'Pending'}
        </span>
      </div>

      {/* Attendance */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <LuCircleCheck
            className="text-green-500"
            size={18}
          />
          <span className="text-sm">{present} Present</span>
        </div>
        <div className="flex items-center gap-2">
          <LuCircleX
            className="text-red-500"
            size={18}
          />
          <span className="text-sm">{absent} Absent</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2 w-full rounded-full bg-bg-tertiary overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all"
          style={{ width: `${attendanceRate}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-3 text-xs text-t-muted">
        <span>Attendance: {attendanceRate}%</span>
        {level && <span>Level {level}</span>}
      </div>
    </div>
  );
};

export default StudentCard;
