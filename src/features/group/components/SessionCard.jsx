import { LuCalendar, LuClock, LuCircleCheck, LuCircleX } from 'react-icons/lu';

const SessionCard = ({ session }) => {
  const { date, topic, duration, status, attendance } = session;

  const isCompleted = status === 'completed';
  const present = attendance.present ?? 0;
  const absent = attendance.absent ?? 0;
  const total = present + absent;
  const attendanceRate = total ? Math.round((present / total) * 100) : 0;

  return (
    <div className="card-hover animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold gradient-text">{topic}</h3>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            isCompleted
              ? 'bg-green-500/10 text-green-400 border border-green-500/30'
              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
          }`}>
          {status}
        </span>
      </div>

      {/* Date & Duration */}
      <div className="flex items-center gap-4 text-sm text-t-tertiary mb-4">
        <div className="flex items-center gap-2">
          <LuCalendar
            size={16}
            className="text-purple-400"
          />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <LuClock
            size={16}
            className="text-cyan-400"
          />
          <span>{duration}</span>
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

export default SessionCard;
