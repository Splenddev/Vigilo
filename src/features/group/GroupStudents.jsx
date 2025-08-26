import React from 'react';

const GroupStudents = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Group Students</h2>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {/* Example student items */}
        {['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince'].map(
          (student, index) => (
            <li
              key={index}
              className="bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 transition">
              {student}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default GroupStudents;
