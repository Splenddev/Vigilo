import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiTrendingUp,
} from 'react-icons/fi';
import { useMemo } from 'react';
import InfoRow from '../../../components/molecules/InfoRow';
import { motion } from 'framer-motion';

const AttendanceStats = ({ students }) => {
  const stats = useMemo(() => {
    const present = students.filter((s) => s.status === 'present').length;
    const late = students.filter((s) => s.status === 'late').length;
    const absent = students.filter((s) => s.status === 'absent').length;
    const total = students.length;
    const attendanceRate = Math.round(((present + late) / total) * 100);

    return { present, late, absent, total, attendanceRate };
  }, [students]);

  const statCards = [
    {
      label: 'Present',
      value: stats.present,
      icon: FiCheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Late',
      value: stats.late,
      icon: FiAlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      label: 'Absent',
      value: stats.absent,
      icon: FiXCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
    {
      label: 'Rate',
      value: `${stats.attendanceRate}%`,
      icon: FiTrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
      {statCards.map((stat, index) => {
        const { icon: Icon, label, color, value } = stat;
        return (
          <motion.div
            key={stat.label}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}>
            <InfoRow
              label={label}
              iconPosition="right"
              className="justify-between"
              icon={Icon}
              iconSize="text-2xl"
              align="center"
              textColor={color}>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </InfoRow>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;
