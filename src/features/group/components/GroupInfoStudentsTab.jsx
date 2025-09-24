import { motion } from 'framer-motion';
import StudentRosterExplainer from '../../../components/modal/StudentRosterExplainer';
import StatList from '../../../components/molecules/StatList';
import {
  containerVariants,
  fadeIn,
  itemVariants,
} from '../../../utils/animationVariants';
import {
  LuUsers,
  LuUserCheck,
  LuUserSearch,
  LuUserPlus,
  LuShieldCheck,
} from 'react-icons/lu';
import { useMemo, useState } from 'react';
import StudentCard from './StudentCard';
import RosterUploadModal from './RoosterUploadModal';

const GroupInfoStudentsTab = ({ group, user, fetchGroups }) => {
  const [filter, setFilter] = useState('all');
  const [showRosterModal, setShowRosterModal] = useState(false);
  const rosterStats = [
    {
      key: 'total',
      icon: LuUsers,
      label: 'Total in Roster',
      iconColor: 'blue',
      value: group.studentsRosterId?.students?.length || 0,
    },
    {
      key: 'matched',
      icon: LuUserCheck,
      label: 'Matched & Joined',
      iconColor: 'emerald',
      value:
        group.studentsRosterId?.students?.filter((s) => s.hasJoined)?.length ||
        0,
    },
    {
      key: 'awaiting',
      icon: LuUserSearch,
      label: 'Awaiting Registration',
      iconColor: 'orange',
      value:
        group.studentsRosterId?.students?.filter((s) => !s.hasJoined)?.length ||
        0,
    },
    {
      key: 'invited',
      icon: LuUserPlus,
      label: 'Invitations Sent',
      iconColor: 'pink',
      value: group.invitedCount || 0,
    },
    {
      key: 'fraud',
      icon: LuShieldCheck,
      label: 'Fraud Prevention',
      iconColor: 'green',
      value: group.fraudPreventionEnabled ? 'Enabled' : 'Disabled',
    },
  ];

  const filteredStudents = useMemo(() => {
    const students = group.studentsRosterId?.students || [];
    switch (filter) {
      case 'matched':
        return students.filter((s) => s.hasJoined);
      case 'awaiting':
        return students.filter((s) => !s.hasJoined);
      case 'all':
      case 'total':
        return students;
      default:
        return students; // "fraud" or unknown → no filter
    }
  }, [filter, group.studentsRosterId?.students]);

  // Click handler
  const handleStatClick = (key) => {
    if (key === 'fraud') return;
    setFilter(key);
  };

  return (
    <>
      <motion.div
        key='students'
        className='glass rounded-2xl shadow-xl border border-slate-200 p-6'
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        exit='exit'>
        {/* Header */}
        <StudentRosterExplainer />

        {/* Stats */}
        <div className='mb-6'>
          <StatList
            variant='light'
            stats={rosterStats}
            onStatClick={handleStatClick}
          />
        </div>

        {/* Roster preview */}
        {!group.studentsRosterId?.students?.length ? (
          <div className='p-4 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50'>
            <p className='text-gray-600 font-medium'>
              No roster has been uploaded yet.
            </p>
            <p className='text-gray-400 text-sm mt-1'>
              Upload a student roster file to begin managing students in this
              group.
            </p>
          </div>
        ) : (
          <>
            <motion.ul
              variants={containerVariants}
              initial='collapsed'
              animate='expanded'
              className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4'>
              {filteredStudents.length > 0 ? (
                filteredStudents.slice(0, 20).map((s, i) => (
                  <motion.li
                    key={s.id}
                    custom={i}
                    variants={itemVariants}>
                    <StudentCard
                      student={s}
                      showStatus
                    />
                  </motion.li>
                ))
              ) : (
                <p>No Students found</p>
              )}
            </motion.ul>

            {group.studentsRosterId.students.length > 20 && (
              <div className='mt-4 text-center'>
                <button className='text-blue-500 hover:underline text-sm'>
                  View all students
                </button>
              </div>
            )}
          </>
        )}

        {/* Actions */}
        <div className='mt-6 flex flex-wrap gap-2'>
          <button
            onClick={() => setShowRosterModal(true)}
            className='px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600'>
            Upload a New Roster
          </button>
          <button className='px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-bg-glass-md'>
            Invite Students
          </button>
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

export default GroupInfoStudentsTab;
