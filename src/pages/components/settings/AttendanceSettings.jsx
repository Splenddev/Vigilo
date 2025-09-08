import { fadeIn, fadeInUpChild } from '../../../utils/animationVariants';
import { motion } from 'framer-motion';
import { ROLES } from '../../../utils/roles';

const AttendanceSettings = ({ user }) => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    animate="visible"
    className="space-y-6">
    {user.role === ROLES.LECTURER ? (
      <>
        <motion.div
          variants={fadeInUpChild}
          className="card-hover">
          <h3 className="text-xl font-bold text-t-primary mb-6">
            Session Defaults
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-t-muted mb-2">
                Default Duration
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-t-primary focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-t-muted mb-2">
                Plea Window
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-t-primary focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all">
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">72 hours</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUpChild}
          className="card-hover">
          <h3 className="text-xl font-bold text-t-primary mb-6">
            Location Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-t-primary">GPS Strict Mode</h4>
                <p className="text-sm text-slate-400">
                  Require precise location matching
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-6 bg-purple-500 rounded-full p-1 transition-colors">
                <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-6"></div>
              </motion.button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-t-primary">
                  Auto-close Sessions
                </h4>
                <p className="text-sm text-slate-400">
                  Automatically end sessions after duration
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-6 bg-slate-600 rounded-full p-1 transition-colors">
                <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    ) : (
      <motion.div
        variants={fadeInUpChild}
        className="card-hover">
        <h3 className="text-xl font-bold text-t-primary mb-6">
          Attendance Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-t-primary">Location Reminders</h4>
              <p className="text-sm text-slate-400">
                Get notified when sessions start
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-6 bg-purple-500 rounded-full p-1 transition-colors">
              <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-6"></div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    )}
  </motion.div>
);

export default AttendanceSettings;
