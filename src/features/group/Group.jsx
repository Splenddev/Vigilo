import {
  LuUsers,
  LuCalendar,
  LuBookOpen,
  LuGraduationCap,
  LuChevronRight,
} from 'react-icons/lu';
import StatCard from '../../components/molecules/StatCard';
import { useNavigate } from 'react-router-dom';
import { groups } from '../../utils/data';
import { cardVariants } from '../../utils/animationVariants'; /* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const GroupCard = ({ group, index }) => {
  const totalStudents = group.students.length;
  const totalSessions = group.sessions.length;
  const completedSessions = group.sessions.filter(
    (s) => s.status === 'completed'
  ).length;

  const navigate = useNavigate();

  const shortenDept = (department) => {
    const words = department.split(' ');
    if (words.length > 2) {
      return words.map((word) => word.charAt(0).toUpperCase()).join('');
    }
    return department;
  };

  const handleViewDetails = () => {
    navigate(`${group.groupId}/info`);
  };

  return (
    <motion.div
      className="card-hover bg-gradient-to-br  overflow-hidden rounded-2xl"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}>
      <div className="">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <LuGraduationCap className="w-6 h-6 text-purple-400" />
              <span className="text-body-sm font-medium text-white bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                {group.courseId}
              </span>
            </div>
            <h3 className="text-heading-lg text-white mb-3 leading-tight">
              {group.groupName}
            </h3>
            <p className="text-body text-gray-300 leading-relaxed">
              {group.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
  );
};

export default function Groups() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-heading-xl gradient-text mb-4">
            Academic Groups
          </h1>
          <p className="text-body text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Manage and monitor your academic groups with comprehensive insights
            into sessions, students, and performance.
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8">
          {groups.map((group, index) => (
            <GroupCard
              key={group.courseId}
              group={group}
              index={index}
            />
          ))}
        </div>

        {/* Empty state for when no groups exist */}
        {groups.length === 0 && (
          <div className="card text-center py-12 animate-fade-in-up">
            <LuGraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-heading-md text-white mb-2">No Groups Yet</h3>
            <p className="text-body text-gray-300 mb-6">
              Create your first academic group to start tracking attendance
            </p>
            <button className="btn-primary px-6 py-3 rounded-xl">
              Create First Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
