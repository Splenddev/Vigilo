import { motion } from 'framer-motion';

const LinearProgressBar = ({ label, percentage, color = 'purple' }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-t-secondary">{label}</span>
      <span className="text-t-primary font-medium">{percentage}%</span>
    </div>
    <div className="h-2 bg-bg-glass-lg rounded-full overflow-hidden border border-primary">
      <motion.div
        className={`h-full bg-gradient-to-r ${
          color === 'purple'
            ? 'from-purple-500 to-pink-500'
            : color === 'green'
            ? 'from-green-500 to-emerald-500'
            : color === 'blue'
            ? 'from-blue-500 to-cyan-500'
            : 'from-purple-500 to-pink-500'
        }`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />
    </div>
  </div>
);

export default LinearProgressBar;
