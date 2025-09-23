import React from 'react';
import {
  LuBookOpen,
  LuPin,
  LuTrendingUp,
  LuUsers,
  LuPlay,
} from 'react-icons/lu';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import RecentSession from '../attendance/components/RecentSession';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  scaleIn,
  slideUp,
} from '../../utils/animationVariants';
import { createMockSessions } from '../../utils/data';
import StatList from '../../components/molecules/StatList';
import StatCard from '../../components/molecules/StatCard';
import { ROLES } from '../../utils/roles';

const LecturerDashboard = () => {
  const recentSessions = createMockSessions(10);
  const now = new Date();

  const getStatus = (session) => {
    const [startTimeStr, endTimeStr] = session.time.split(' - ');
    const startDateTime = new Date(`${session.date} ${startTimeStr}`);
    const endDateTime = new Date(`${session.date} ${endTimeStr}`);

    if (now < startDateTime) return 'Scheduled';
    if (now >= startDateTime && now <= endDateTime) return 'Ongoing';
    return 'Completed';
  };

  const navigate = useNavigate();

  const groupedSessions = {
    Ongoing: [],
    Scheduled: [],
    Completed: [],
  };

  recentSessions.forEach((session) => {
    const status = getStatus(session);
    groupedSessions[status].push({ ...session, status });
  });

  const handleStartSession = (type = '') => {
    type && type === 'quick-session'
      ? navigate(`/${ROLES.LECTURER}/sessions/new`, { state: { type } })
      : navigate(`/${ROLES.LECTURER}/sessions/new`);
  };

  const stats = [
    {
      label: 'Total Sessions',
      value: '24',
      icon: LuBookOpen,
      iconColor: 'purple',
    },
    {
      label: 'Avg. Attendance',
      value: '87%',
      icon: LuTrendingUp,
      iconColor: 'emerald',
    },
    {
      label: 'Students',
      value: '156',
      icon: LuUsers,
      iconColor: 'blue',
    },
  ];

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      initial="collapsed"
      animate="expanded"
      variants={containerVariants}>
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="mb-8 sm:mb-12">
        <motion.div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--gradient-primary)] shadow-2xl"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: 'easeOut' }}>
          <motion.div
            className="absolute inset-0 bg-black/10"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-bg-glass rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32" />
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-bg-glass rounded-full -ml-12 sm:-ml-24 -mb-12 sm:-mb-24" />
          </motion.div>

          <div className="relative px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 bg-bg-glass-strong">
            <div className="max-w-4xl mx-auto text-center">
              <Title
                contents="Start Attendance Session"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4"
              />
              <motion.p
                className="text-base sm:text-lg lg:text-xl text-[var(--color-text-secondary)] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
                variants={slideUp}
                transition={{ delay: 0.2, duration: 0.6 }}>
                Take attendance in seconds with Vigilo&apos;s intelligent
                session management system
              </motion.p>

              <div className="flex items-center justify-center flex-col gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleStartSession}
                    className="group"
                    size="lg">
                    <motion.div
                      animate={{ rotate: [0, -20, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}>
                      <LuPlay className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    Start a course-based Session
                  </Button>
                </motion.div>
                <Button
                  text="Quick Session"
                  variant="outline"
                  onClick={() => handleStartSession('quick-session')}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid sm:grid-cols-2  md:grid-cols-3 gap-3 my-5"
        variants={containerVariants}>
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              iconColor={stat.iconColor}
              align='center'
              variant='light'
            />
          ))}
      </motion.div>

      {/* Recent Sessions */}
      <motion.section
        variants={itemVariants}
        className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3">
          <motion.h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}>
            Recent Sessions
          </motion.h2>
          <motion.div whileHover={{ x: 4 }}>
            <Button
              variant="custom"
              className="text-sm sm:text-base text-t-secondary hover:text-t-primary font-semibold transition-colors self-start sm:self-auto"
              text="View All Sessions"
              icon={FiArrowRight}
              iconPosition="right"
              size="none"
              onClick={() => navigate('/lecturer/sessions')}
            />
          </motion.div>
        </div>

        <RecentSession groupedSessions={groupedSessions} />
      </motion.section>

      {/* Feature Teaser */}
      <motion.div
        variants={itemVariants}
        className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border-accent)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-row items-start gap-3 sm:gap-4">
          <motion.div
            className="bg-warning-light/20 p-2 sm:p-3 rounded-lg shrink-0"
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}>
            <LuPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-warning)]" />
          </motion.div>
          <div className="flex-1">
            <h3 className="font-bold text-[var(--color-warning-light)] mb-1 sm:mb-2 text-sm sm:text-base">
              🚀 Coming in v1.5
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Weekly schedules, automated reminders, and comprehensive class
              history to streamline your course management workflow.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LecturerDashboard;
