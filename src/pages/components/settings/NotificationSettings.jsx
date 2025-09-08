import {
  fadeIn,
  fadeInUpChild,
  itemVariants,
  staggerContainer,
} from '../../../utils/animationVariants';
import { motion } from 'framer-motion';

const NotificationSettings = () => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      <motion.div
        variants={fadeInUpChild}
        className="card-hover">
        <h3 className="text-xl font-bold text-t-primary mb-6">
          Notification Preferences
        </h3>
        <motion.div
          variants={staggerContainer}
          className="space-y-4">
          {[
            {
              label: 'Email Notifications',
              description: 'Receive updates via email',
            },
            {
              label: 'In-App Notifications',
              description: 'Show notifications in the app',
            },
            {
              label: 'Daily Summaries',
              description: 'Get daily attendance summaries',
            },
            {
              label: 'Weekly Reports',
              description: 'Receive weekly progress reports',
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              custom={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <h4 className="font-medium text-t-primary">{item.label}</h4>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-6 bg-purple-500 rounded-full p-1 transition-colors">
                <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-6"></div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationSettings;
