import {
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiXCircle,
} from 'react-icons/fi';
import Badge from '../../../components/atoms/Badge';
import { badges } from '../../attendance/assets/assets';
import { AnimatePresence, motion } from 'framer-motion';
import HighlightText from '../../../components/atoms/HighlightText';

const StudentCard = ({
  student,
  index,
  onToggleExpand,
  isExpanded,
  onUpdateStatus,
  query,
}) => {
  return (
    <motion.div
      className="bg-bg-glass-sm rounded-xl border border-bg-glass-md hover:border-bg-glass-sm transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      layout>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                {student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <h4 className="font-medium text-t-primary">
                  <HighlightText
                    text={student.name}
                    query={query}
                  />
                </h4>
                <p className="text-sm text-t-tertiary">
                  <HighlightText
                    text={student.matricNumber}
                    query={query}
                  />
                </p>
              </div>
            </div>

            {student.checkInTime && (
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                <FiClock className="w-3 h-3" />
                Checked in at {student.checkInTime}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              text={student.status}
              variant={badges[student.status]}
            />
            <motion.button
              className="p-2 rounded-lg bg-bg-glass-md hover:bg-bg-glass-lg text-t-tertiary hover:text-t-primary transition-colors"
              onClick={() => onToggleExpand(student.id)}
              whileTap={{ scale: 0.95 }}>
              {isExpanded ? (
                <FiChevronUp className="w-4 h-4" />
              ) : (
                <FiChevronDown className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-4 pt-4 border-t border-bg-glass-md space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}>
              {/* Notes Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-t-secondary">
                    Notes
                  </span>
                </div>

                <p className="text-sm text-t-tertiary italic">
                  {student.remarks || 'No notes available'}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2 border-t border-bg-glass-md">
                <motion.button
                  className="flex-1 py-2 px-3 text-xs bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 flex items-center justify-center gap-1"
                  onClick={() => onUpdateStatus(student.id, 'present')}
                  whileTap={{ scale: 0.95 }}>
                  <FiCheckCircle className="w-3 h-3" />
                  Mark Present
                </motion.button>
                <motion.button
                  className="flex-1 py-2 px-3 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center justify-center gap-1"
                  onClick={() => onUpdateStatus(student.id, 'absent')}
                  whileTap={{ scale: 0.95 }}>
                  <FiXCircle className="w-3 h-3" />
                  Mark Absent
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StudentCard;
