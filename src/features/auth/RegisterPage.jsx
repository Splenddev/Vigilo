import React from 'react';

const RegisterPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mt-10">
        Register Page
      </h1>
      <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <p className="text-lg font-semibold mb-4">Please enter your details</p>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Register
        </button>{' '}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
