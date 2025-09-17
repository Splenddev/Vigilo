import React from 'react';
import {
  LuUser,
  LuMail,
  LuHash,
  LuGraduationCap,
  LuCircleCheck,
  LuCircleX,
} from 'react-icons/lu';
import InfoRow from '../../../components/molecules/InfoRow';
import IconText from '../../../components/atoms/IconText';

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
      <InfoRow label={fullName} icon={LuUser} textColor='text-cyan-300' align='center' labelClassName='text-lg font-semibold'>
        <IconText icon={LuHash} text={matricNumber} iconClassName='text-purple-500' />
      </InfoRow>

      {/* Details */}
      <div className="flex text-sm mt-2 items-center gap-2">
        <LuMail className="text-emerald-400" />
        <span>{email || 'No email'}</span>
      </div>

      {/* Invitation status */}
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span
          className={`px-2 py-1 rounded-full ${isInvited
            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
            }`}>
          {isInvited ? 'Invited' : 'Not Invited'}
        </span>
        <span
          className={`px-2 py-1 rounded-full ${hasJoined
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            : 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
            }`}>
          {hasJoined ? 'Joined' : 'Not Joined'}
        </span>
      </div>

      {hasJoined && <>
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

        <div className="mt-4 h-2 w-full rounded-full bg-bg-tertiary overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all"
            style={{ width: `${attendanceRate}%` }}
          />
        </div>

        <div className="flex justify-between mt-3 text-xs text-t-muted">
          <span>Attendance: {attendanceRate}%</span>
          {level && <span>Level {level}</span>}
        </div>
      </>}
    </div>
  );
};

export default StudentCard;
