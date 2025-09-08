import { FiDownload } from 'react-icons/fi';
import {
  fadeIn,
  fadeInUpChild,
  itemVariants,
} from '../../../utils/animationVariants';
import { motion } from 'framer-motion';

const GroupSettings = ({ user }) => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    animate="visible"
    className="space-y-6">
    {user.role === 'lecturer' ? (
      <>
        <motion.div
          variants={fadeInUpChild}
          className="card-hover">
          <h3 className="text-xl font-bold text-t-primary mb-6">
            Group Management
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-t-muted mb-2">
                Course Name
              </label>
              <input
                type="text"
                defaultValue="Advanced Database Systems"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-t-primary placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-t-muted mb-2">
                Description
              </label>
              <textarea
                defaultValue="Advanced concepts in database design, optimization, and management."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-t-primary placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-t-muted mb-2">
                Join Rules
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-t-primary focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all">
                <option value="open">Open - Anyone can join</option>
                <option value="request">Request - Requires approval</option>
                <option value="invite">Invite Only</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUpChild}
          className="card-hover">
          <h3 className="text-xl font-bold text-t-primary mb-6">
            Export Options
          </h3>
          <div className="flex gap-4">
            <button className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-xl">
              <FiDownload className="text-lg" />
              Export Members List
            </button>
            <button className="btn-ghost flex items-center gap-2 px-6 py-3 rounded-xl">
              <FiDownload className="text-lg" />
              Export Attendance Data
            </button>
          </div>
        </motion.div>
      </>
    ) : (
      <motion.div
        variants={fadeInUpChild}
        className="card-hover">
        <h3 className="text-xl font-bold text-t-primary mb-6">My Groups</h3>
        <div className="space-y-4">
          {[
            'Advanced Database Systems',
            'Machine Learning Fundamentals',
            'Web Development',
          ].map((group, index) => (
            <motion.div
              key={group}
              variants={itemVariants}
              custom={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <h4 className="font-medium text-t-primary">{group}</h4>
                <p className="text-sm text-slate-400">Active member</p>
              </div>
              <button className="text-red-400 hover:text-red-300 transition-colors">
                Leave Group
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </motion.div>
);

export default GroupSettings;
