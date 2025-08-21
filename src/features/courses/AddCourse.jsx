import React from 'react';

const AddCourse = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mt-10">
        Create a Course
      </h1>
      <p>
        {' '}
        As a lecturer, you can create a course to manage your students and their
        attendance.
      </p>
      <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md space-y-4">
        <div>
          <label
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter course name"
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
          Create Course
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Need help? Contact support.
        </p>
      </form>
    </div>
  );
};

export default AddCourse;
