import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import Title from '../components/atoms/Title';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      {/* 404 Illustration / Icon */}
      <div className="text-8xl font-extrabold text-blue-600 mb-4">404</div>

      {/* Headline */}
      <Title contents={'Page Not Found'} />

      {/* Description */}
      <p className="text-gray-600 text-center max-w-md mb-8">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
        Please check the URL or return to the homepage.
      </p>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          <FaHome className="w-5 h-5" />
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
          <FaArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
