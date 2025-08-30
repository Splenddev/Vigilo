import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const EmailVerificationModal = ({ isOpen, onClose, email, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

  const { requestOtp: send, verifyOtp: verify } = useAuth();

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0].focus(), 100);
    }
  }, [isOpen]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      verifyOtp();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || '';
    }
    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const requestOtp = async () => {
    setIsRequestingOtp(true);
    setError('');
    setSuccess('');
    try {
      await send(email);
      setTimer(600);
      setSuccess('OTP sent to your email!');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to send OTP. Please try again.'
      );
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setIsVerifying(true);
    setError('');
    try {
      await verify(email, otpString);
      setSuccess('Email verified successfully!');
      onSuccess?.()
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      // Clear OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const otpInputVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md glass border border-white/20 rounded-2xl p-6 shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <FiX size={20} />
            </motion.button>

            <motion.div variants={contentVariants}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <FiMail
                    className="text-purple-400"
                    size={24}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Verify Your Email
                  </h2>
                  <p className="text-sm text-gray-400">
                    Enter the 6-digit code sent to
                  </p>
                </div>
              </div>

              {/* Email display */}
              <motion.div
                className="mb-6 p-3 bg-white/5 rounded-xl border border-white/10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}>
                <p className="text-center text-white font-medium break-all">
                  {email}
                </p>
              </motion.div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}>
                    <FiAlertCircle
                      className="text-red-400 flex-shrink-0"
                      size={16}
                    />
                    <p className="text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}>
                    <FiCheck
                      className="text-green-400 flex-shrink-0"
                      size={16}
                    />
                    <p className="text-green-300 text-sm">{success}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OTP Input Grid */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-3">
                  Verification Code
                </label>
                <div
                  className="flex gap-2 justify-center"
                  onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      custom={index}
                      variants={otpInputVariants}
                      initial="hidden"
                      animate="visible"
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-bold bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 focus:bg-white/10 transition-all duration-200"
                      disabled={isVerifying}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={verifyOtp}
                  disabled={isVerifying || otp.join('').length !== 6}
                  className="btn-primary w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  whileHover={{ scale: isVerifying ? 1 : 1.02 }}
                  whileTap={{ scale: isVerifying ? 1 : 0.98 }}>
                  {isVerifying ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}>
                        <FiLoader size={18} />
                      </motion.div>
                      Verifying...
                    </>
                  ) : (
                    'Verify Email'
                  )}
                </motion.button>

                <motion.button
                  onClick={requestOtp}
                  disabled={isRequestingOtp || timer > 0}
                  className="btn-ghost w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  whileHover={{
                    scale: isRequestingOtp || timer > 0 ? 1 : 1.02,
                  }}
                  whileTap={{ scale: isRequestingOtp || timer > 0 ? 1 : 0.98 }}>
                  {isRequestingOtp ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}>
                        <FiLoader size={16} />
                      </motion.div>
                      Sending...
                    </>
                  ) : timer > 0 ? (
                    <>
                      <motion.div
                        key={timer}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-purple-400 font-mono">
                        {formatTime(timer)}
                      </motion.div>
                      Resend Available In
                    </>
                  ) : (
                    <>
                      <FiMail size={16} />
                      Resend Code
                    </>
                  )}
                </motion.button>
              </div>

              {/* Footer hint */}
              <motion.p
                className="text-center text-xs text-gray-500 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                Check your spam folder if you don't see the email
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailVerificationModal;
