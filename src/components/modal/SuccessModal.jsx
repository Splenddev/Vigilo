import React from 'react';
import {
  FiCheck,
  FiX,
  FiUsers,
  FiUserPlus,
  FiUserX,
  FiFileText,
  FiUpload,
  FiInfo,
  FiTrendingUp,
} from 'react-icons/fi';
import Button from '../atoms/Button';
import StatCard from '../molecules/StatCard';
import IconText from '../atoms/IconText';
import InfoRow from '../molecules/InfoRow';
import { LuGraduationCap, LuUserCheck, LuUserX } from 'react-icons/lu';

const SuccessModal = ({ isOpen, responseData, onClose }) => {
  if (!isOpen || !responseData) return null;

  const parseResponseData = (data) => {
    // Handle different response structures
    const response = data?.data || data;
    const message = data?.message || 'Operation completed successfully';

    return {
      title: getTitle(response),
      message,
      stats: extractStats(response),
      details: extractDetails(response),
      lists: extractLists(response),
    };
  };

  const getTitle = (data) => {
    if (data?.roster) return 'Roster Upload Successful';
    if (data?.group) return 'Group Created Successfully';
    if (data?.user) return 'Account Created Successfully';
    if (data?.stats) return 'Operation Completed';
    return 'Success';
  };

  const extractStats = (data) => {
    const stats = [];

    if (data?.stats) {
      const s = data.stats;
      if (s.totalStudents)
        stats.push({
          label: 'Total Students',
          value: s.totalStudents,
          icon: FiUsers,
          color: 'blue',
        });
      if (s.studentsAddedToGroup)
        stats.push({
          label: 'Added to Group',
          value: s.studentsAddedToGroup,
          icon: FiUserPlus,
          color: 'green',
        });
      if (s.studentsWithAccounts)
        stats.push({
          label: 'With Accounts',
          value: s.studentsWithAccounts,
          icon: FiCheck,
          color: 'green',
        });
      if (s.studentsWithoutAccounts)
        stats.push({
          label: 'Without Accounts',
          value: s.studentsWithoutAccounts,
          icon: FiUserX,
          color: 'orange',
        });
      if (s.registeredStudents !== undefined)
        stats.push({
          label: 'Registered',
          value: s.registeredStudents,
          icon: FiCheck,
          color: 'green',
        });
      if (s.unregisteredStudents !== undefined)
        stats.push({
          label: 'Unregistered',
          value: s.unregisteredStudents,
          icon: FiUserX,
          color: 'orange',
        });
    }

    return stats;
  };

  const extractDetails = (data) => {
    const details = [];

    if (data?.roster) {
      details.push({
        label: 'File Name',
        value: data.roster.fileName,
        icon: FiFileText,
      });
      details.push({
        label: 'Upload Date',
        value: new Date().toLocaleDateString(),
        icon: FiUpload,
      });
    }

    if (data?.group) {
      details.push({
        label: 'Course Code',
        value: data.group.courseCode,
        icon: FiInfo,
      });
      details.push({
        label: 'Level',
        value: `L${data.group.level}`,
        icon: FiTrendingUp,
      });
    }

    return details;
  };

  const extractLists = (data) => {
    const lists = [];

    if (data?.matchedStudents?.length > 0) {
      lists.push({
        title: 'Students Added to Group',
        items: data.matchedStudents,
        type: 'students',
        color: 'bg-green-300/20',
      });
    }

    if (data?.unmatchedStudents?.length > 0) {
      lists.push({
        title: 'Students Without Accounts',
        items: data.unmatchedStudents,
        type: 'students',
        color: 'bg-orange-300/20',
      });
    }

    return lists;
  };

  const renderStudentItem = (student, color) => (
    <InfoRow
      label={student.name}
      icon={student.name ? LuUserCheck : LuUserX}
      align="center"
      subLabel={student.email}
      key={student.studentId || student.email}
    />
  );

  const parsed = parseResponseData(responseData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-primary rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bg-glass-lg bg-green-light/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              <FiCheck className="text-green-600 dark:text-green-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-t-primary">
                {parsed.title}
              </h2>
              <p className="text-sm text-t-secondary">{parsed.message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Statistics Grid */}
          {parsed.stats.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-t-primary mb-3">
                Summary Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                {parsed.stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    variant="light"
                    iconColor={stat.color}
                    align="center"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          {parsed.details.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-t-primary mb-3">
                Details
              </h3>
              <div className="space-y-2">
                {parsed.details.map((detail, index) => (
                  <IconText
                    key={index}
                    className="p-3 bg-bg-tertiary rounded-lg"
                    icon={detail.icon}
                    text={
                      <span className="text-sm font-medium">
                        {detail.label}:
                      </span>
                    }
                    subText={
                      <span className="text-sm text-t-primary">
                        {detail.value}
                      </span>
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Lists */}
          {parsed.lists.map((list, listIndex) => (
            <div
              key={listIndex}
              className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-t-primary">
                  {list.title}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${list.color} text-t-primary`}>
                  {list.items.length}{' '}
                  {list.items.length === 1 ? 'student' : 'students'}
                </span>
              </div>
              <div className="min-h-10 max-h-60 overflow-y-auto space-y-2">
                {list.items.map((item) => renderStudentItem(item, list.color))}
              </div>
            </div>
          ))}

          {/* Action Message */}
          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <div className="flex items-start gap-3">
              <FiInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-200">
                  What happens next?
                </p>
                <p className="text-blue-700 dark:text-blue-300 mt-1">
                  {parsed.stats.some((s) => s.label.includes('Added'))
                    ? 'Students with accounts have been automatically enrolled and will receive notifications.'
                    : 'The operation has been completed successfully. You can now proceed with your next steps.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-bg-glass-lg dark:border-gray-700">
          <Button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Got it, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
