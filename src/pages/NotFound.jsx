import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Title from '../components/atoms/Title';

const NotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      {/* Big 404 Label */}
      <div className="text-8xl font-extrabold text-blue-600 mb-2 animate-bounce">
        404
      </div>

      {/* Icon */}
      <FaExclamationTriangle className="text-blue-500 text-4xl mb-4" />

      {/* Headline */}
      <Title contents="Page Not Found" />

      {/* Description */}
      <p className="text-gray-600 text-center max-w-md mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
        Please check the URL or return to the homepage.
      </p>

      {/* Error message (only shown if available) */}
      {error && (
        <p className="text-sm text-red-500 italic mb-8">
          {error.statusText || error.message}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          aria-label="Go to homepage"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition">
          <FaHome className="w-5 h-5" />
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition">
          <FaArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
