import { motion } from 'framer-motion';
const StudentHighlightCard = ({ student, type, icon: Icon }) => (
  <motion.div
    className={`glass p-4 rounded-xl relative overflow-hidden`}
    whileHover={{ scale: 1.03, y: -3 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
    <div className="absolute top-2 right-2">
      <Icon className="text-t-secondary text-lg" />
    </div>
    <div className="pr-8">
      <div className="text-xs text-t-primary uppercase tracking-wide mb-1">
        {type}
      </div>
      <div className="text-t-primary font-semibold text-sm mb-1">
        {student.name}
      </div>
      <div className="text-t-secondary text-xs">{student.id}</div>
      <div className="text-t-tertiary text-xs mt-2">{student.stat}</div>
    </div>
  </motion.div>
);

export default StudentHighlightCard;
