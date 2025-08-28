import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { FiHome } from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';

const NotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen glass text-gray-300 px-6">
      {/* Big 404 Label */}
      <div className="text-8xl font-extrabold text-blue-600 mb-2 animate-bounce">
        404
      </div>

      {/* Icon */}
      <FaExclamationTriangle className="text-blue-500 text-4xl mb-4" />

      {/* Headline */}
      <Title contents="Page Not Found" />

      {/* Description */}
      <p className="text-gray-300 text-center max-w-md mb-6">
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
        <Button
          onClick={() => navigate('/')}
          aria-label="Go to homepage">
          <FiHome className="w-5 h-5" />
          Go Home
        </Button>
        <Button
          onClick={() => navigate('/lecturer')}
          aria-label="Go to dashboard" variant='secondary'>
          <LuLayoutDashboard className="w-5 h-5" />
          Go to Dashboard
        </Button>

        <Button
          onClick={() => navigate(-1)}
          aria-label="Go back" variant='outline'>
          <FaArrowLeft className="w-5 h-5" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
