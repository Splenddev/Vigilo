import {
  LuUser,
  LuMail,
  LuHash,
  LuGraduationCap,
  LuCircleCheck,
  LuCircleX,
} from 'react-icons/lu';

const StudentCard = ({ student }) => {
  const { name, matricNo, email, level, attendanceRecord } = student;

  // Compute attendance summary
  const total = attendanceRecord.length;
  const present = attendanceRecord.filter((r) => r.status === 'present').length;
  const absent = total - present;
  const attendanceRate = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="card-hover animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold gradient-text flex items-center gap-2">
          <LuUser className="text-cyan-400" />
          {name}
        </h3>
        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
          Level {level}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-t-secondary">
        <div className="flex items-center gap-2">
          <LuHash className="text-purple-400" />
          <span>{matricNo}</span>
        </div>
        <div className="flex items-center gap-2">
          <LuMail className="text-emerald-400" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <LuGraduationCap className="text-yellow-400" />
          <span>{level} Level</span>
        </div>
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
      <div className="flex justify-end mt-3">
        <span className="text-xs text-t-muted">
          Attendance: {attendanceRate}%
        </span>
      </div>
    </div>
  );
};

export default StudentCard;
