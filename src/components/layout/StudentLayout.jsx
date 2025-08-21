import React from 'react';

const StudentLayout = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <p className="text-lg mt-4">Welcome to the student portal!</p>
      <div className="mt-6 p-4 bg-gray-100 rounded shadow-md">
        <p className="text-base text-gray-700">
          Here you can access your courses, assignments, and grades.
        </p>
        <ul className="mt-4 list-disc list-inside">
          <li className="mb-2">View enrolled courses</li>
          <li className="mb-2">Check assignment deadlines</li>
          <li className="mb-2">Track your grades</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentLayout;
