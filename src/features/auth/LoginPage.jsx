import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mt-10">
        Login Page
      </h1>
      <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
        <p className="text-lg font-semibold mb-4">
          Please enter your credentials
        </p>
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
      </form>
    </div>
  );
};

export default LoginPage;
