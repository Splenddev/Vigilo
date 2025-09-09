import { FiCalendar, FiCheckCircle, FiUser } from 'react-icons/fi';
import { hoverEffect, itemVariants } from '../../../utils/animationVariants';
import { FaBook } from 'react-icons/fa';
import { LuActivity, LuTrendingDown, LuTrendingUp } from 'react-icons/lu';
import { motion } from 'framer-motion';

const GroupCard = ({ group, onClick }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <LuTrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <LuTrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <LuActivity className="w-4 h-4 text-yellow-400" />;
    }
  };
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      whileTap="tap"
      className="cursor-pointer"
      onClick={() => onClick(group)}>
      <motion.div
        variants={hoverEffect}
        className="h-full relative card overflow-hidden group flex flex-col">
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br  opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

        {/* Header */}
        <div className="relative mb-4">
          <div className="flex items-center gap-3 mb-2">
            {/* <div
              className={`w-10 h-10 bg-gradient-to-br ${group.color} rounded-lg flex items-center justify-center`}>
              <FaBook className="w-5 h-5 text-white" />
            </div> */}
            <div className="flex-1">
              <h3 className="font-bold text-t-primary text-lg leading-tight">
                {group.groupName}
              </h3>
              <p className="text-slate-400 text-sm">
                {group.courseId} • {group.department}
              </p>
              {/* Status Badge */}
              <div className="place-self-start">
                {group.status === 'completed' ? (
                  <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <FiCheckCircle className="w-3 h-3" />
                    Completed
                  </div>
                ) : (
                  <div className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded-full text-xs">
                    Active
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <FiUser className="w-5 h-5 text-primary" />
            <span className="text-t-tertiary">{group.lecturer}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="relative flex flex-col items-center gap-1 mb-4">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl font-bold text-t-primary">
              {group.attendanceRate}%
            </span>
            {getTrendIcon(group.trend)}
          </div>
          <div className="text-xs text-slate-400">Attendance</div>
        </div>

        <div className="relative mt-auto">
          {group.nextTopic ? (
            <div className="bg-bg-glass-lg rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <FiCalendar className="w-3 h-3 text-cyan-400" />
                <span className="text-xs font-medium text-cyan-400">
                  Next Class
                </span>
              </div>
              <div className="text-sm text-t-primary font-medium">
                {group.nextTopic}
              </div>
              <div className="text-xs text-t-tertiary">{group.schedule}</div>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
              <FiCheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <div className="text-xs text-green-400 font-medium">
                Course Completed!
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GroupCard;
