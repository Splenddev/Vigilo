import React from 'react';

const LecturerDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mt-10">
        Lecturer Dashboard
      </h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-5 mx-auto block">
        Create Attendance
      </button>
    </div>
  );
};

export default LecturerDashboard;
