import {
  LuUsers,
  LuCalendar,
  LuBookOpen,
  LuGraduationCap,
  LuChevronRight,
  LuCircleAlert,
  LuUpload,
} from 'react-icons/lu';
import StatCard from '../../components/molecules/StatCard';
import { useNavigate } from 'react-router-dom';
// import { groups } from '../../utils/data';
import { cardVariants } from '../../utils/animationVariants'; /* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { shortenDept } from '../../utils/helpers';
import { useGroups } from '../../hooks/useGroups';
import { useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import RosterUploadModal from './components/RoosterUploadModal';
import { useAuth } from '../../hooks/useAuth';
import { PageLoader } from '../../components/loaders/PageLoader';
import ErrorState from '../../components/common/ErrorState';

const GroupCard = ({ group, index, user, fetchGroups }) => {
  const totalStudents = group.memberCount?.length || 0;
  const totalSessions = group.sessions?.length || 0;
  const completedSessions =
    group.sessions?.filter((s) => s.status === 'completed')?.length || 0;

  const navigate = useNavigate();
  const [showRosterModal, setShowRosterModal] = useState(false);

  const handleViewDetails = () => {
    navigate(`${group._id}/info`);
  };

  const needsRoster = !group.studentsRosterId;

  return (
    <>
      <motion.div
        className="card-hover overflow-hidden relative"
        custom={index}
        initial="hidden"
        animate="visible"
        variants={cardVariants}>
        <div>
          {needsRoster && (
            <div className="absolute top-0 left-0 w-full bg-red-500/90 text-white text-sm font-medium px-4 py-2 flex items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2">
                <LuCircleAlert className="w-4 h-4" />
                <span>Roster not uploaded — requires attention</span>
              </div>
              <button
                onClick={() => setShowRosterModal(true)}
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-md transition-colors">
                <LuUpload className="w-4 h-4" />
                Upload
              </button>
            </div>
          )}

          {/* Header */}
          <div
            className={`flex items-start justify-between mb-4 ${
              needsRoster ? 'pt-10' : 'pt-0'
            }`}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <LuGraduationCap className="w-6 h-6 text-purple-400" />
                <span className="text-body-sm font-medium text-t-primary bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  {group.courseCode}
                </span>
              </div>
              <h3 className="text-heading-lg text-t-primary leading-tight">
                {group.name}
              </h3>
              {group.description && (
                <p className="text-body text-t-secondary leading-relaxed mt-2">
                  {group.description}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <StatCard
              icon={LuUsers}
              value={totalStudents}
              label="Students"
            />
            <StatCard
              icon={LuCalendar}
              value={`${completedSessions}/${totalSessions}`}
              label="Sessions"
            />
            <StatCard
              icon={LuBookOpen}
              value={shortenDept(group.department)}
              label="Department"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleViewDetails}
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl group">
              <span>View Details</span>
              <LuChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </motion.div>

      {showRosterModal && (
        <RosterUploadModal
          groupId={group._id}
          schoolId={user.schoolId}
          onClose={() => setShowRosterModal(false)}
          onAction={() => fetchGroups()}
          isOpen={showRosterModal}
        />
      )}
    </>
  );
};

export default function Groups() {
  const navigate = useNavigate();
  const { groups, fetchGroups, loading: grpLoading, error } = useGroups();
  const { user } = useAuth();

  useEffect(() => {
    fetchGroups();
  }, []);

  if (grpLoading) {
    return (
      <PageLoader
        loading={grpLoading}
        fullscreen
        text="Loading data..."
        variant='bar'
      />
    );
  }
  
  if (error) {
    return (
      <ErrorState
        variant={error.status === 500 ? 'network' : 'error'}
        onRetry={fetchGroups}
        retryLabel="Try again"
      />
    );
  }

  const handleCreateGroup = () => {
    navigate('new');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-heading-xl gradient-text mb-4">
            Academic Groups
          </h1>
          <p className="text-body text-t-secondary max-w-2xl mx-auto leading-relaxed">
            Manage and monitor your academic groups with comprehensive insights
            into sessions, students, and performance.
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8">
          {groups &&
            groups.map((group, index) => (
              <GroupCard
                key={group.courseCode}
                group={group}
                index={index}
                fetchGroups={fetchGroups}
                user={user}
              />
            ))}
        </div>

        {/* Empty state for when no groups exist */}
        {groups?.length === 0 && (
          <div className="card text-center py-12 animate-fade-in-up">
            <LuGraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-heading-md text-t-primary mb-2">
              No Groups Yet
            </h3>
            <p className="text-body text-t-secondary mb-6">
              Create your first academic group to start tracking attendance
            </p>
            <button
              className="btn-primary px-6 py-3 rounded-xl"
              onClick={handleCreateGroup}>
              Create First Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
