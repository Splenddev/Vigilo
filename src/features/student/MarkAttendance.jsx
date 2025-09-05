import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock,
  FiMapPin,
  FiWifi,
  FiCheckCircle,
  FiAlertCircle,
  FiCamera,
  FiArrowLeft,
  FiUser,
  FiUsers,
  FiLock,
  FiUnlock,
  FiRefreshCw,
  FiHash,
  FiX,
} from 'react-icons/fi';
import {
  LuScanLine,
  LuMapPin,
  LuWifi,
  LuClock,
  LuShield,
  LuCircleCheck,
  LuTriangleAlert,
} from 'react-icons/lu';

// Mock session data
const mockSession = {
  id: 1,
  groupName: 'CSC 201 – Data Structures',
  lecturer: 'Dr. Sarah Johnson',
  timeRemaining: 12, // minutes
  location: 'Room A-205',
  building: 'Engineering Block',
  sessionCode: 'DS2024',
  requiresLocation: true,
  requiresCamera: false,
  startTime: '10:00 AM',
  endTime: '10:20 AM',
  attendees: 45,
  maxAttendees: 50,
};

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
};

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.4 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

const progressVariants = {
  initial: { width: 0 },
  animate: { width: '100%', transition: { duration: 0.8, delay: 0.3 } },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

const MarkAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceMethod, setAttendanceMethod] = useState('qr'); // 'qr' or 'code'
  const [manualCode, setManualCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('marking'); // 'marking', 'success', 'error'
  const [locationStatus, setLocationStatus] = useState('checking'); // 'checking', 'verified', 'failed'
  const [errorMessage, setErrorMessage] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const videoRef = useRef(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock location verification
  useEffect(() => {
    if (mockSession.requiresLocation) {
      const timer = setTimeout(() => {
        // Simulate location check result
        const isLocationValid = Math.random() > 0.3; // 70% success rate
        setLocationStatus(isLocationValid ? 'verified' : 'failed');
        if (!isLocationValid) {
          setErrorMessage(
            'You must be in or near the classroom to mark attendance'
          );
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLocationStatus('verified');
    }
  }, []);

  const formatTimeRemaining = (minutes) => {
    if (minutes < 1) return 'Less than 1 min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m left`;
    }
    return `${mins} min${mins !== 1 ? 's' : ''} left`;
  };

  const getTimeProgress = () => {
    // Mock: assume 20 minute session window
    const totalMinutes = 20;
    const elapsed = totalMinutes - mockSession.timeRemaining;
    return Math.min((elapsed / totalMinutes) * 100, 100);
  };

  const handleQRScan = () => {
    setShowQRScanner(true);
    // In a real app, this would access camera and scan QR codes
    // For demo, we'll simulate a successful scan after 3 seconds
    setTimeout(() => {
      setShowQRScanner(false);
      handleAttendanceSubmit();
    }, 3000);
  };

  const handleManualCodeSubmit = () => {
    if (manualCode.toLowerCase() === mockSession.sessionCode.toLowerCase()) {
      handleAttendanceSubmit();
    } else {
      setErrorMessage('Invalid session code. Please try again.');
      setAttendanceStatus('error');
    }
  };

  const handleAttendanceSubmit = () => {
    if (locationStatus !== 'verified') {
      setErrorMessage('Location verification required');
      setAttendanceStatus('error');
      return;
    }

    setIsSubmitting(true);
    setAttendanceStatus('marking');

    // Simulate API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate

      if (isSuccess) {
        setAttendanceStatus('success');
      } else {
        setAttendanceStatus('error');
        setErrorMessage('Failed to mark attendance. Please try again.');
      }
      setIsSubmitting(false);
    }, 2000);
  };

  const handleRetry = () => {
    setAttendanceStatus('marking');
    setErrorMessage('');
    setManualCode('');
  };

  const handleGoBack = () => {
    // In real app, this would navigate back to dashboard
    alert('Returning to dashboard...');
  };

  const getStatusColor = () => {
    switch (attendanceStatus) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-t-primary';
    }
  };

  const isLocationReady = locationStatus === 'verified';
  const canSubmit =
    isLocationReady && !isSubmitting && attendanceStatus !== 'success';

  return (
    <motion.div
      className="min-h-screen p-4 md:p-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}>
          <button
            onClick={handleGoBack}
            className="btn-ghost p-3 rounded-xl">
            <FiArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-heading-lg gradient-text">Mark Attendance</h1>
            <p className="text-body-sm text-slate-400">
              {currentTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </motion.div>

        {/* Session Info Card */}
        <motion.div
          className="card"
          variants={cardVariants}
          initial="initial"
          animate="animate">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-heading-md text-t-primary mb-1">
                {mockSession.groupName}
              </h2>
              <p className="text-body-sm text-slate-300 mb-3">
                {mockSession.lecturer}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-body-sm">
                <div className="flex items-center gap-2">
                  <LuClock className="text-cyan-400" />
                  <span className="text-cyan-400 font-medium">
                    {formatTimeRemaining(mockSession.timeRemaining)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <LuMapPin className="text-purple-400" />
                  <span className="text-slate-300">{mockSession.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="text-pink-400" />
                  <span className="text-slate-300">
                    {mockSession.attendees}/{mockSession.maxAttendees}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Progress Ring */}
            <div className="relative w-16 h-16">
              <svg
                className="w-16 h-16 transform -rotate-90"
                viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 28 * (1 - getTimeProgress() / 100)
                  }`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 28 * (1 - getTimeProgress() / 100),
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%">
                    <stop
                      offset="0%"
                      stopColor="#7c3aed"
                    />
                    <stop
                      offset="100%"
                      stopColor="#ec4899"
                    />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-body-xs text-t-primary font-semibold">
                  {mockSession.timeRemaining}m
                </span>
              </div>
            </div>
          </div>

          {/* Time Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </div>

          {/* Session Details */}
          <div className="flex items-center justify-between text-body-xs text-slate-400">
            <span>
              Session: {mockSession.startTime} - {mockSession.endTime}
            </span>
            <span>Code: {mockSession.sessionCode}</span>
          </div>
        </motion.div>

        {/* Location Status */}
        {mockSession.requiresLocation && (
          <motion.div
            className={`card ${
              locationStatus === 'verified'
                ? 'border-green-500/30 bg-green-500/5'
                : locationStatus === 'failed'
                ? 'border-red-500/30 bg-red-500/5'
                : 'border-yellow-500/30 bg-yellow-500/5'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}>
            <div className="flex items-center gap-3">
              {locationStatus === 'checking' && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}>
                    <FiRefreshCw className="text-xl text-yellow-400" />
                  </motion.div>
                  <div>
                    <p className="text-body text-t-primary">
                      Verifying location...
                    </p>
                    <p className="text-body-sm text-slate-400">
                      Please ensure you're in {mockSession.location}
                    </p>
                  </div>
                </>
              )}

              {locationStatus === 'verified' && (
                <>
                  <LuShield className="text-xl text-green-400" />
                  <div>
                    <p className="text-body text-t-primary">
                      Location verified
                    </p>
                    <p className="text-body-sm text-slate-400">
                      You're in the correct area
                    </p>
                  </div>
                </>
              )}

              {locationStatus === 'failed' && (
                <>
                  <LuTriangleAlert className="text-xl text-red-400" />
                  <div>
                    <p className="text-body text-t-primary">
                      Location verification failed
                    </p>
                    <p className="text-body-sm text-slate-400">
                      Move closer to {mockSession.location}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Attendance Methods */}
        <AnimatePresence mode="wait">
          {attendanceStatus === 'marking' && (
            <motion.div
              key="marking"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              {/* Method Selector */}
              <div className="card">
                <h3 className="text-heading-md text-t-primary mb-4">
                  Choose attendance method
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <motion.button
                    className={`p-4 rounded-xl border-2 transition-all ${
                      attendanceMethod === 'qr'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/20 bg-white/5'
                    }`}
                    onClick={() => setAttendanceMethod('qr')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <LuScanLine className="text-2xl mx-auto mb-2 text-purple-400" />
                    <p className="text-body-sm text-t-primary font-medium">
                      Scan QR
                    </p>
                    <p className="text-body-xs text-slate-400">
                      Quick & secure
                    </p>
                  </motion.button>

                  <motion.button
                    className={`p-4 rounded-xl border-2 transition-all ${
                      attendanceMethod === 'code'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/20 bg-white/5'
                    }`}
                    onClick={() => setAttendanceMethod('code')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <FiHash className="text-2xl mx-auto mb-2 text-pink-400" />
                    <p className="text-body-sm text-t-primary font-medium">
                      Enter Code
                    </p>
                    <p className="text-body-xs text-slate-400">Manual entry</p>
                  </motion.button>
                </div>

                {/* QR Scanner */}
                {attendanceMethod === 'qr' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}>
                    <motion.button
                      className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-3 text-lg"
                      onClick={handleQRScan}
                      disabled={!canSubmit}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap">
                      <FiCamera />
                      Scan QR Code
                    </motion.button>
                  </motion.div>
                )}

                {/* Manual Code Entry */}
                {attendanceMethod === 'code' && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}>
                    <div>
                      <label className="block text-body-sm text-slate-300 mb-2">
                        Session Code
                      </label>
                      <input
                        type="text"
                        value={manualCode}
                        onChange={(e) =>
                          setManualCode(e.target.value.toUpperCase())
                        }
                        placeholder="Enter session code"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-t-primary placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        maxLength={10}
                      />
                    </div>
                    <motion.button
                      className="btn-primary w-full py-4 rounded-xl text-lg"
                      onClick={handleManualCodeSubmit}
                      disabled={!canSubmit || !manualCode.trim()}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap">
                      Submit Attendance
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {attendanceStatus === 'success' && (
            <motion.div
              key="success"
              className="card border-green-500/30 bg-green-500/5 text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
              <motion.div
                variants={pulseVariants}
                animate="animate">
                <LuCircleCheck className="text-6xl text-green-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-heading-lg text-t-primary mb-2">
                Attendance Marked!
              </h3>
              <p className="text-body text-slate-300 mb-6">
                You've successfully marked your attendance for{' '}
                {mockSession.groupName}
              </p>
              <motion.button
                className="btn-primary px-8 py-3 rounded-xl"
                onClick={handleGoBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                Back to Dashboard
              </motion.button>
            </motion.div>
          )}

          {/* Error State */}
          {attendanceStatus === 'error' && (
            <motion.div
              key="error"
              className="card border-red-500/30 bg-red-500/5 text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
              <FiAlertCircle className="text-6xl text-red-400 mx-auto mb-4" />
              <h3 className="text-heading-lg text-t-primary mb-2">
                Attendance Failed
              </h3>
              <p className="text-body text-slate-300 mb-6">{errorMessage}</p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  className="btn-secondary px-6 py-3 rounded-xl"
                  onClick={handleRetry}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  Try Again
                </motion.button>
                <motion.button
                  className="btn-ghost px-6 py-3 rounded-xl"
                  onClick={handleGoBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  Go Back
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State Overlay */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                className="card text-center py-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="mb-4">
                  <FiRefreshCw className="text-4xl text-purple-400 mx-auto" />
                </motion.div>
                <h3 className="text-heading-md text-t-primary mb-2">
                  Marking Attendance...
                </h3>
                <p className="text-body-sm text-slate-400">
                  Please wait while we verify your attendance
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QR Scanner Modal */}
        <AnimatePresence>
          {showQRScanner && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                className="card max-w-md w-full text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-heading-md text-t-primary">
                    Scan QR Code
                  </h3>
                  <button
                    onClick={() => setShowQRScanner(false)}
                    className="btn-ghost p-2 rounded-lg">
                    <FiX />
                  </button>
                </div>

                <div className="bg-white/5 rounded-xl p-8 mb-4 aspect-square flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <LuScanLine className="text-8xl text-purple-400" />
                  </motion.div>
                </div>

                <p className="text-body-sm text-slate-400">
                  Point your camera at the QR code displayed by your lecturer
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MarkAttendance;
