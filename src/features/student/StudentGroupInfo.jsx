import { useState, useEffect } from 'react';
import { FaCalendar, FaBook } from 'react-icons/fa';
import {
  LuBookText,
  LuCalendar,
  LuClipboardCheck,
  LuUser,
  LuClock,
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import {
  containerVariants,
  fadeIn,
  itemVariants,
  slideUp,
} from '../../utils/animationVariants';
import Tabs from '../../components/common/Tabs';
import StatCard from '../../components/molecules/StatCard';
import { FiAlertTriangle, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useGroups } from '../../hooks/useGroups';

// Session Item Component
const SessionItem = ({ session, isUpcoming = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-300/20 text-green-400 border-green-500/30';
      case 'Absent':
        return 'bg-red-300/20 text-red-400 border-red-500/30';
      case 'Late':
        return 'bg-yellow-300/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-blue-300/20 text-cyan-400 border-blue-500/30';
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="glass p-4 rounded-xl border border-slate-600/30"
      whileHover={{ x: 4, transition: { duration: 0.2 } }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="font-medium text-t-primary">{session.topic}</span>
        </div>
        {!isUpcoming && (
          <span
            className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(
              session.status
            )}`}>
            {session.status}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <FaCalendar className="w-3 h-3" />
          {session.date}
          {session.time && ` at ${session.time}`}
        </span>
        {session.location && (
          <span className="text-slate-500">📍 {session.location}</span>
        )}
      </div>
    </motion.div>
  );
};

const tabs = [
  { key: 'overview', label: 'Overview', icon: LuBookText },
  { key: 'upcoming', label: 'Upcoming', icon: LuCalendar },
  { key: 'history', label: 'History', icon: LuClipboardCheck },
];
import CourseOverview from './components/CourseOverview' 

const StudentGroupInfo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { groups, loading, error, fetchGroups } = useGroups();

  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    if (groups && id) {
      const found = groups.find((g) => g._id === id);
      setGroup(found || null);
    }
  }, [groups, id]);

  if (loading) return <div className="p-6">Loading group info...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!group) return <div className="p-6">No group found.</div>;

  const { student, attendance = {}, upcomingSessions = [], recentSessions = [] } = group;

  const getAttendanceStatus = () => {
  const rate = attendance?.attendanceRate || 0;

  if (rate >= 90) {
    return {
      color: 'green-400',
      status: 'Excellent',
      message:
        'Your attendance is outstanding. Consistently attending classes shows strong commitment and greatly improves your chances of success.',
      advice:
        'Keep up the great habit—maintaining this level of attendance helps you stay fully engaged and on track academically.'
    };
  }

  if (rate >= 75) {
    return {
      color: 'yellow-400',
      status: 'Good',
      message:
        'Your attendance is above average. You are doing well, but there are some gaps that may affect your overall performance if not addressed.',
      advice:
        'Aim to attend more regularly to move into the excellent range. A small improvement can make a big difference.'
    };
  }

  return {
    color: 'red-400',
    status: 'Needs Improvement',
    message:
      'Your attendance is currently below the expected standard. Missing classes often puts you at risk of falling behind academically.',
    advice:
      'Try to reduce absences as much as possible. Consistent attendance will help you catch up, stay informed, and improve your performance.'
  };
};


  const attendanceStatus = getAttendanceStatus();

  return (
    <motion.div
      className="min-h-[calc(100vh-100px)] text-t-primary px-4 py-6"
      variants={fadeIn}
      initial="hidden"
      animate="visible">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
        {/* Left Sidebar */}
        <motion.div
          className="lg:w-2/5 lg:sticky lg:top-20 space-y-6"
          variants={slideUp}>
          <div className="card p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shrink-0">
                <FaBook className="w-6 h-6 text-white " />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  {group.name}
                </h1>
                <p className="text-t-secondary">
                  {group.courseCode} • {group.department}
                </p>
              </div>
            </div>
            <p className="text-slate-400 mb-4">{group.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-t-secondary">
                <LuUser className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Lecturer: {group.createdBy.firstName + ' ' + group.createdBy.lastName}</span>
              </div>
            </div>

            {/* Attendance Badge */}
            <div
  className={`mt-6 px-6 py-5 rounded-xl border text-center transition-colors duration-300 
    bg-${attendanceStatus.color}/20 border-${attendanceStatus.color}/40 text-${attendanceStatus.color}`}
>
  {/* Attendance Rate */}
  <div className="text-3xl font-bold mb-1">
    {attendance?.attendanceRate || 0}%
  </div>
  <div className="text-sm text-t-tertiary">Your Attendance Rate</div>

  {/* Status */}
  <div className="mt-2 text-base font-semibold">
    {attendanceStatus.status}
  </div>

  {/* Message */}
  {attendanceStatus.message && (
    <p className="mt-2 text-sm text-t-secondary leading-snug">
      {attendanceStatus.message}
    </p>
  )}

  {/* Advice */}
  {attendanceStatus.advice && (
    <p className="mt-1 text-xs italic text-t-tertiary">
      {attendanceStatus.advice}
    </p>
  )}
</div>

          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="collapsed"
            animate="expanded">
            <StatCard
              icon={FiCheckCircle}
              label="Sessions Attended"
              value={attendance?.present||0}
              iconColor="emerald"
            />
            <StatCard
              icon={FiAlertTriangle}
              label="Sessions Missed"
              value={attendance?.absent||0}
              iconColor="red"
            />
            <StatCard
              icon={FiCalendar}
              label="Total Sessions"
              value={group?.totalSessions||0}
              iconColor="purple"
            />
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <div className="lg:w-3/5 flex flex-col">
          <Tabs
            tabs={tabs}
            onChange={(key) => setActiveTab(key)}
            defaultActive={activeTab}
            variant="pills"
          />

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <CourseOverview  activeTab={activeTab} group={group} student={student} fadeIn={fadeIn} />
            )}

            {activeTab === 'upcoming' && (
              <motion.div
                key="upcoming"
                className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 card"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit">
                <h2 className="text-xl font-bold mb-6 text-t-primary">
                  Upcoming Sessions
                </h2>
                <motion.div
                  variants={containerVariants}
                  initial="collapsed"
                  animate="expanded"
                  className="space-y-4">
                  { upcomingSessions?.map((session, i) => (
                    <SessionItem key={i} session={session} isUpcoming />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                className="glass-card rounded-2xl shadow-xl border border-slate-600/30 p-6 card"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit">
                <h2 className="text-xl font-bold mb-6 text-t-primary">
                  Recent Sessions
                </h2>
                <motion.div
                  variants={containerVariants}
                  initial="collapsed"
                  animate="expanded"
                  className="space-y-4">
                  {recentSessions?.map((session, i) => (
                    <SessionItem key={i} session={session} />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentGroupInfo;
