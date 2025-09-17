import React from 'react';
import {
  FiCheck, FiX, FiUsers, FiUserPlus, FiUserX,
  FiFileText, FiUpload, FiInfo, FiTrendingUp
} from 'react-icons/fi';

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
      lists: extractLists(response)
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
      if (s.totalStudents) stats.push({ label: 'Total Students', value: s.totalStudents, icon: FiUsers, color: 'text-blue-500' });
      if (s.studentsAddedToGroup) stats.push({ label: 'Added to Group', value: s.studentsAddedToGroup, icon: FiUserPlus, color: 'text-green-500' });
      if (s.studentsWithAccounts) stats.push({ label: 'With Accounts', value: s.studentsWithAccounts, icon: FiCheck, color: 'text-green-500' });
      if (s.studentsWithoutAccounts) stats.push({ label: 'Without Accounts', value: s.studentsWithoutAccounts, icon: FiUserX, color: 'text-orange-500' });
      if (s.registeredStudents !== undefined) stats.push({ label: 'Registered', value: s.registeredStudents, icon: FiCheck, color: 'text-green-500' });
      if (s.unregisteredStudents !== undefined) stats.push({ label: 'Unregistered', value: s.unregisteredStudents, icon: FiUserX, color: 'text-orange-500' });
    }

    return stats;
  };

  const extractDetails = (data) => {
    const details = [];

    if (data?.roster) {
      details.push({ label: 'File Name', value: data.roster.fileName, icon: FiFileText });
      details.push({ label: 'Upload Date', value: new Date().toLocaleDateString(), icon: FiUpload });
    }

    if (data?.group) {
      details.push({ label: 'Course Code', value: data.group.courseCode, icon: FiInfo });
      details.push({ label: 'Level', value: `L${data.group.level}`, icon: FiTrendingUp });
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
        color: 'green'
      });
    }

    if (data?.unmatchedStudents?.length > 0) {
      lists.push({
        title: 'Students Without Accounts',
        items: data.unmatchedStudents,
        type: 'students',
        color: 'orange'
      });
    }

    return lists;
  };

  const renderStudentItem = (student, color) => (
    <div key={student.studentId || student.email} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
      <div>
        <p className="font-medium text-sm">{student.name}</p>
        <p className="text-xs text-gray-500">{student.email}</p>
      </div>
      {student.studentId && (
        <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-700`}>
          {student.studentId}
        </span>
      )}
    </div>
  );

  const parsed = parseResponseData(responseData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <FiCheck className="text-green-600 dark:text-green-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {parsed.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {parsed.message}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Statistics Grid */}
          {parsed.stats.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Summary Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {parsed.stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          {parsed.details.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Details
              </h3>
              <div className="space-y-2">
                {parsed.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <detail.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {detail.label}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lists */}
          {parsed.lists.map((list, listIndex) => (
            <div key={listIndex} className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {list.title}
                </h3>
                <span className={`text-sm px-2 py-1 rounded-full bg-${list.color}-100 text-${list.color}-700`}>
                  {list.items.length} {list.items.length === 1 ? 'student' : 'students'}
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {list.items.map((item) => renderStudentItem(item, list.color))}
              </div>
            </div>
          ))}

          {/* Action Message */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <FiInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-200">
                  What happens next?
                </p>
                <p className="text-blue-700 dark:text-blue-300 mt-1">
                  {parsed.stats.some(s => s.label.includes('Added'))
                    ? 'Students with accounts have been automatically enrolled and will receive notifications.'
                    : 'The operation has been completed successfully. You can now proceed with your next steps.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;