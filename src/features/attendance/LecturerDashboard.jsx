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
import RecentSession from './components/RecentSession';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// Mock data for demonstration
const recentSessions = [
  {
    id: 1,
    course: { name: 'Advanced React Development' },
    date: '2025-08-26',
    time: '05:00 AM - 07:30 AM',
    attendance: { present: 28, total: 32 },
  },
  {
    id: 3,
    course: { name: 'UI/UX Design Fundamentals' },
    date: '2024-01-12',
    time: '9:00 AM - 10:30 AM',
    attendance: { present: 30, total: 35 },
  },
  {
    id: 2,
    course: { name: 'Database Design Principles' },
    date: '2024-01-14',
    time: '2:00 PM - 3:30 PM',
    attendance: { present: 24, total: 26 },
  },
  {
    id: 4,
    course: { name: 'Machine Learning Basics' },
    date: '2024-01-10',
    time: '3:00 PM - 4:30 PM',
    attendance: { present: 22, total: 28 },
  },
];

const LecturerDashboard = () => {
  const now = new Date();

  // Helper to determine status
  const getStatus = (session) => {
    const [startTimeStr, endTimeStr] = session.time.split(' - ');
    const startDateTime = new Date(`${session.date} ${startTimeStr}`);
    const endDateTime = new Date(`${session.date} ${endTimeStr}`);

    if (now < startDateTime) return 'Scheduled';
    if (now >= startDateTime && now <= endDateTime) return 'Ongoing';
    return 'Completed';
  };

  // Group sessions
  const groupedSessions = {
    Ongoing: [],
    Scheduled: [],
    Completed: [],
  };

  recentSessions.forEach((session) => {
    const status = getStatus(session);
    groupedSessions[status].push({ ...session, status });
  });

  const handleStartSession = () => {
    console.log('Starting new session...');
  };

  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Section */}
      <div className="mb-8 sm:mb-12">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--gradient-primary)] shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-white/5 rounded-full -ml-12 sm:-ml-24 -mb-12 sm:-mb-24"></div>
          </div>

          <div className="relative px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 shadow-2xs bg-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <Title
                contents="Start Attendance Session"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4"
              />
              <p className="text-base sm:text-lg lg:text-xl text-[var(--color-text-secondary)] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Take attendance in seconds with Vigilo's intelligent session
                management system
              </p>

              <Button
                onClick={handleStartSession}
                className="group inline-flex"
                size="lg">
                <LuPlay className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-rotate-20 transition-transform" />
                Start New Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide">
                Total Sessions
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                24
              </p>
            </div>
            <div className="bg-[var(--color-primary-purple-soft)] p-2 sm:p-3 rounded-lg">
              <LuBookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide">
                Avg. Attendance
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                87%
              </p>
            </div>
            <div className="bg-[var(--color-success-light)]/20 p-2 sm:p-3 rounded-lg">
              <LuTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-success)]" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide">
                Students
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                156
              </p>
            </div>
            <div className="bg-[var(--color-primary-cyan-soft)] p-2 sm:p-3 rounded-lg">
              <LuUsers className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-accent)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <section className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
            Recent Sessions
          </h2>
          <Button
            variant="custom"
            className="text-sm sm:text-base text-[var(--color-primary)] hover:text-[var(--color-primary-purple-light)] font-semibold transition-colors self-start sm:self-auto"
            text="View All Sessions"
            icon={FiArrowRight}
            iconPosition="right"
            size="none" onClick={()=>navigate('sessions')}></Button>
        </div>

        <RecentSession groupedSessions={groupedSessions} />
      </section>

      {/* Feature Teaser */}
      <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border-accent)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="bg-[var(--color-warning-light)]/20 p-2 sm:p-3 rounded-lg shrink-0">
            <LuPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-warning)]" />
          </div>
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
      </div>
    </div>
  );
};

export default LecturerDashboard;
