import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="card animate-fade-in-up max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20 animate-pulse-glow">
            <FiAlertTriangle className="text-red-500 text-5xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold gradient-text">
          Unauthorized Access
        </h1>

        {/* Message */}
        <p className="text-base text-gray-400">
          You don’t have permission to view this page. Please check your role or
          contact your class representative.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="btn-primary rounded-xl px-6 py-3 font-semibold">
            Go Home
          </Link>
          <Link
            to="/auth"
            className="btn-ghost rounded-xl px-6 py-3 font-semibold">
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
