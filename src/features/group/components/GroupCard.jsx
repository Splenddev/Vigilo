import { FiCalendar, FiCheckCircle, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { LuActivity, LuTrendingDown, LuTrendingUp } from 'react-icons/lu';
import { itemVariants } from '../../../utils/animationVariants';
import HighlightText from '../../../components/atoms/HighlightText'

const GroupCard = ({ group, query='', onClick }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <LuTrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <LuTrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <LuActivity className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => onClick(group)}
      className="cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: '0 8px 10px rgba(0,0,0,0.12)' }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col h-full card"
      >
        {/* Header */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-t-primary text-lg leading-snug">
                <HighlightText text={group.name} query={query}/>
              </h3>
              <p className="text-slate-400 text-sm">
                <HighlightText text={group.courseCode} query={query}/> • <HighlightText text={group.department} query={query}/>

              </p>
            </div>

            {/* Status badge */}
            {group.status === 'completed' ? (
              <span className="flex items-center gap-1 bg-green-100 text-green-600 border border-green-200 px-2 py-1 rounded-full text-xs font-medium">
                <FiCheckCircle className="w-3 h-3" /> Completed
              </span>
            ) : (
              <span className="bg-cyan-100 text-cyan-600 border border-cyan-200 px-2 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            )}
          </div>

          {/* Lecturer */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <FiUser className="w-4 h-4 text-primary" />
              <span className="text-t-tertiary">{group.createdBy.firstName} {group.createdBy.lastName}
            </span>
          </div>

          {/* Attendance Stat */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-t-primary">
              {group.attendanceRate||0}%
            </span>
            {getTrendIcon(group.trend||0)}
          </div>
          <p className="text-xs text-slate-500">Attendance rate</p>
        </div>

        {/* Footer meta */}
        <div className="bg-bg-glass-sm rounded-md px-4 py-2 text-sm text-t-secondary flex items-center gap-3 mt-3">
          <FiCalendar className="w-4 h-4" />
          Next: {group.nextClass || 'No schedule'}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GroupCard;
