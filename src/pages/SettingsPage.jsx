import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu } from 'react-icons/hi';
import { FiHome } from 'react-icons/fi';
import {
  containerVariants,
  labelVariants,
  navItemVariants,
  drawerLeft,
  staggerContainer,
  fadeInUpChild,
} from '../utils/animationVariants';
import Button from '../components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import GeneralSettings from './components/settings/GeneralSettings';
import PrivacySecurity from './components/settings/PrivacySecurity';
import { settingsSections } from '../features/attendance/assets/assets';
import GroupSettings from './components/settings/GroupSettings';
import AttendanceSettings from './components/settings/AttendanceSettings';
import NotificationSettings from './components/settings/NotificationSettings';
import DangerZone from './components/settings/DangerZone';

const VigiloSettings = () => {
  const [userRole, setUserRole] = useState('lecturer'); // 'lecturer' or 'student'
  const [activeSection, setActiveSection] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

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

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings user={user} />;
      case 'privacy':
        return <PrivacySecurity user={user} />;
      case 'groups':
        return <GroupSettings user={user} />;
      case 'attendance':
        return <AttendanceSettings user={user} />;
      case 'notifications':
        return <NotificationSettings user={user} />;
      case 'danger':
        return <DangerZone user={user} />;
      default:
        return <GeneralSettings user={user} />;
    }
  };

  return (
    <div className="glass">
      <div className="flex h-[100dvh] overflow-hidden">
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
    </div>
  );
};

export default VigiloSettings;
