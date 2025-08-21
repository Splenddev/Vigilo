import React from 'react';

const StudentCheckin = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mt-10">
        Student Check-in Page
      </h1>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <p className="text-lg font-semibold mb-4">
          Please check in for attendance
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your student ID"
              required
            />
          </div>
          <div>
            <label
              htmlFor="courseCode"
              className="block text-sm font-medium text-gray-700">
              Course Code
            </label>
            <input
              type="text"
              id="courseCode"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter course code"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Check In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Need help? Contact your lecturer.
        </p>
      </div>
    </div>
  );
};

export default StudentCheckin;
