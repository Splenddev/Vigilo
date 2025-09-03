import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineUserCircle,
  HiOutlineExclamationCircle,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { FiLock, FiUpload, FiDownload, FiHome } from 'react-icons/fi';
import { FaUsersCog, FaUserShield } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineAssignment } from 'react-icons/md';
import {
  fadeIn,
  containerVariants,
  // cardVariants,
  // expandVariants,
  itemVariants,
  labelVariants,
  navItemVariants,
  slideUp,
  // slideInRight,
  drawerLeft,
  drawerBottom,
  shake,
  scaleIn,
  staggerContainer,
  fadeInUpChild,
  flip,
} from '../utils/animationVariants';
import Button from '../components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import ThemeToggler from '../components/common/ThemeToggler';
import FormInput from '../components/molecules/FormInput';
import { useAuth } from '../hooks/useAuth';
import GeneralSettings from './components/settings/GeneralSettings';
import PrivacySecurity from './components/settings/PrivacySecurity';

const VigiloSettings = () => {
  const [userRole, setUserRole] = useState('lecturer'); // 'lecturer' or 'student'
  const [activeSection, setActiveSection] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  const { user } = useAuth();

  const settingsSections = [
    {
      id: 'general',
      label: 'General Settings',
      icon: HiOutlineUserCircle,
      color: 'text-purple-400',
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      icon: FiLock,
      color: 'text-cyan-400',
    },
    {
      id: 'groups',
      label: 'Group Settings',
      icon: FaUsersCog,
      color: 'text-pink-400',
    },
    {
      id: 'attendance',
      label: 'Attendance Settings',
      icon: AiOutlineCalendar,
      color: 'text-green-400',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: IoNotificationsOutline,
      color: 'text-yellow-400',
    },
    {
      id: 'assignments',
      label: 'Assignments & Media',
      icon: MdOutlineAssignment,
      color: 'text-blue-400',
    },
    {
      id: 'roles',
      label: 'Roles & Collaboration',
      icon: FaUserShield,
      color: 'text-indigo-400',
    },
    {
      id: 'danger',
      label: 'Danger Zone',
      icon: HiOutlineExclamationCircle,
      color: 'text-red-400',
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const SidebarNavigation = () => (
    <motion.div
      className="w-80 bg-bg-primary backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto h-full hide-scrollbar"
      variants={drawerLeft}
      initial="hidden"
      animate="visible"
      exit="exit">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-t-primary mb-2 flex items-center justify-between">
          Settings
          <FiHome onClick={() => navigate('/lecturer')} />
        </h2>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <span className="text-sm text-slate-400 capitalize">
            {userRole} Mode
          </span>
          <button
            onClick={() =>
              setUserRole(userRole === 'lecturer' ? 'student' : 'lecturer')
            }
            className="ml-auto text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors">
            Switch
          </button>
        </div>
      </div>

      <motion.nav
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-2">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <motion.button
              key={section.id}
              variants={navItemVariants}
              custom={index}
              onClick={() => {
                setActiveSection(section.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                  : 'hover:bg-white/5 border border-transparent'
              }`}>
              <Icon
                className={`text-xl ${
                  isActive ? section.color : 'text-slate-400'
                }`}
              />
              <motion.span
                variants={labelVariants}
                animate={sidebarOpen ? 'expanded' : 'expanded'}
                className={`font-medium ${
                  isActive ? 'text-t-primary' : 'text-t-muted'
                }`}>
                {section.label}
              </motion.span>
            </motion.button>
          );
        })}
      </motion.nav>
    </motion.div>
  );

  const GroupSettings = () => (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      {userRole === 'lecturer' ? (
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

  const AttendanceSettings = () => (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      {userRole === 'lecturer' ? (
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
                  <h4 className="font-medium text-t-primary">
                    GPS Strict Mode
                  </h4>
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
                <h4 className="font-medium text-t-primary">
                  Location Reminders
                </h4>
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

  const NotificationSettings = () => (
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

  const AssignmentSettings = () => (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      {userRole === 'lecturer' ? (
        <motion.div
          variants={fadeInUpChild}
          className="card-hover">
          <h3 className="text-xl font-bold text-t-primary mb-6">
            Assignment Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-t-primary">
                  Enable Submissions
                </h4>
                <p className="text-sm text-slate-400">
                  Allow students to submit assignments
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
                  Auto-approve Submissions
                </h4>
                <p className="text-sm text-slate-400">
                  Automatically approve valid submissions
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
      ) : (
        <motion.div
          variants={fadeInUpChild}
          className="card-hover">
          <h3 className="text-xl font-bold text-t-primary mb-6">
            Storage Usage
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-t-muted">Used Storage</span>
                <span className="text-t-primary">2.3 GB / 5 GB</span>
              </div>
              <motion.div
                variants={scaleIn}
                className="w-full bg-slate-700 rounded-full h-3">
                <motion.div
                  variants={scaleIn}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  style={{ width: '46%' }}></motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const RoleSettings = () => (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      <motion.div
        variants={flip}
        className="card-hover">
        <h3 className="text-xl font-bold text-t-primary mb-6">
          Role Management
        </h3>
        {userRole === 'lecturer' ? (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-t-primary mb-4">
                Assign Co-Representatives
              </h4>
              <div className="space-y-3">
                {['Alice Johnson', 'Bob Smith', 'Carol Davis'].map(
                  (student, index) => (
                    <motion.div
                      key={student}
                      variants={itemVariants}
                      custom={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-t-primary font-medium">
                          {student
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-medium text-t-primary">
                            {student}
                          </p>
                          <p className="text-sm text-slate-400">Student</p>
                        </div>
                      </div>
                      <select className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-t-primary text-sm focus:outline-none focus:border-purple-500">
                        <option value="student">Student</option>
                        <option value="co-rep">Co-Representative</option>
                        <option value="assistant">Teaching Assistant</option>
                      </select>
                    </motion.div>
                  )
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-t-primary mb-4">
                Role Permissions
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h5 className="font-medium text-purple-300 mb-2">
                    Co-Representative
                  </h5>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Manage attendance sessions</li>
                    <li>• View student data</li>
                    <li>• Send notifications</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h5 className="font-medium text-cyan-300 mb-2">
                    Teaching Assistant
                  </h5>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Grade assignments</li>
                    <li>• Moderate discussions</li>
                    <li>• Create content</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <FaUserShield className="text-2xl text-t-primary" />
              </div>
              <h4 className="font-medium text-t-primary mb-2">
                Current Role: Student
              </h4>
              <p className="text-slate-400">
                You have standard student privileges
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h5 className="font-medium text-t-primary mb-3">
                Available Upgrades
              </h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-purple-300">
                      Co-Representative
                    </p>
                    <p className="text-sm text-slate-400">
                      Help manage group activities
                    </p>
                  </div>
                  <button className="btn-secondary px-4 py-2 rounded-lg text-sm">
                    Request
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-cyan-300">
                      Teaching Assistant
                    </p>
                    <p className="text-sm text-slate-400">
                      Assist with course management
                    </p>
                  </div>
                  <button className="btn-secondary px-4 py-2 rounded-lg text-sm">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  const DangerZone = () => (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      <motion.div
        variants={fadeInUpChild}
        whileHover="visible"
        className="border-2 border-red-500/30 rounded-2xl p-6 bg-red-500/5">
        <motion.div variants={shake}>
          <div className="flex items-center gap-3 mb-6">
            <HiOutlineExclamationCircle className="text-2xl text-red-400" />
            <h3 className="text-xl font-bold text-red-400">Danger Zone</h3>
          </div>

          <div className="space-y-6">
            {userRole === 'lecturer' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-t-primary mb-2">
                    Delete Group
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Permanently delete this group and all associated data. This
                    action cannot be undone.
                  </p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn-danger px-6 py-3 rounded-xl">
                    Delete Group
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-t-primary mb-2">
                    Transfer Ownership
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Transfer group ownership to another lecturer or
                    co-representative.
                  </p>
                  <button className="btn-danger-light">Transfer Group</button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h4 className="font-medium text-t-primary mb-2">
                  Leave All Groups
                </h4>
                <p className="text-sm text-slate-400 mb-4">
                  Leave all groups you're currently a member of. You can rejoin
                  if groups allow it.
                </p>
                <button className="btn-danger px-6 py-3 rounded-xl">
                  Leave All Groups
                </button>
              </div>
            )}

            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <h4 className="font-medium text-t-primary mb-2">
                Delete Account
              </h4>
              <p className="text-sm text-slate-400 mb-4">
                Permanently delete your Vigilo account and all personal data.
                This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn-danger px-6 py-3 rounded-xl">
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const DeleteConfirmationModal = () => (
    <AnimatePresence>
      {showDeleteModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowDeleteModal(false)}
          />
          <motion.div
            variants={drawerBottom}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-white/10 rounded-t-2xl p-6 z-50">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <HiOutlineExclamationCircle className="text-3xl text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-t-primary mb-2">
                  Confirm Deletion
                </h3>
                <p className="text-slate-400">
                  This action is permanent and cannot be undone. Are you sure
                  you want to proceed?
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 btn-ghost px-6 py-3 rounded-xl">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    // Handle deletion logic here
                  }}
                  className="flex-1 btn-danger px-6 py-3 rounded-xl">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings user={user} />;
      case 'privacy':
        return <PrivacySecurity user={user} />;
      case 'groups':
        return <GroupSettings />;
      case 'attendance':
        return <AttendanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'assignments':
        return <AssignmentSettings />;
      case 'roles':
        return <RoleSettings />;
      case 'danger':
        return <DangerZone />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen glass">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
                <SidebarNavigation />
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900/50 backdrop-blur-xl border-b border-white/10">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-white/5 text-t-primary hover:bg-white/10 transition-colors">
              <HiOutlineMenu className="text-xl" />
            </button>
            <h1 className="text-xl font-bold text-t-primary">Settings</h1>
            <div className="w-10"></div>
          </div>

          {/* Content Area */}
          <motion.div
            variants={containerVariants}
            initial="collapsed"
            animate="expanded"
            className="flex-1 overflow-y-auto p-6 lg:p-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto">
              {/* Section Header */}
              <motion.div
                variants={fadeInUpChild}
                className="mb-8">
                <h1 className="text-3xl font-bold text-t-primary mb-2">
                  {settingsSections.find((s) => s.id === activeSection)?.label}
                </h1>
                <p className="text-slate-400">
                  Manage your {activeSection} preferences and configurations
                </p>
              </motion.div>

              {/* Active Section Content */}
              {renderActiveSection()}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal />
    </div>
  );
};

export default VigiloSettings;
