import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Landing Page</h1>
      <p className="text-lg mt-4">
        This is the starting point of our application.
      </p>
      <div className="mt-6 p-4 bg-gray-100 rounded shadow-md">
        <p className="text-base text-gray-700">
          Explore our features and get started with your journey.
        </p>
        <ul className="mt-4 list-disc list-inside">
          <li className="mb-2">Learn about our services</li>
          <li className="mb-2">Sign up for an account</li>
          <li className="mb-2">Contact us for more information</li>
        </ul>
      </div>
      <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Get Started
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
