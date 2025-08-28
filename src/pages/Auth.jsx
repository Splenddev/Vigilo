import React, { useState, useEffect } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaUser,
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
  FaSpinner,
  FaUserTie,
} from 'react-icons/fa';
import FormInput from '../components/molecules/FormInput';
import RadioCard from '../components/molecules/RadioCard';
import PasswordInput from '../components/molecules/PasswordInput';
import { checkPasswordStrength } from '../utils/helpers';
import { emailRegex } from '../utils/regex';
import LabelCheckbox from '../components/atoms/LabelCheckbox';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'lecturer',
    rememberMe: false,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Password strength checker

  useEffect(() => {
    if (!isLogin) {
      setPasswordStrength(checkPasswordStrength(formData.password));
    }
  }, [formData.password, isLogin]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!isLogin) {
      // Name validation for signup
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Terms agreement
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (['email', 'firstName', 'lastName'].includes(name)) {
      newValue = newValue.trim();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Trim only non-password string fields
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([k, v]) =>
        typeof v === 'string' && k !== 'password' ? [k, v.trim()] : [k, v]
      )
    );

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (isLogin) {
        console.log('Login attempted:', {
          email: cleanedData.email,
          password: formData.password, // send raw password
        });
        alert('Login successful! (This is a demo)');
        navigate(`/${formData.userType}`);
      } else {
        console.log('Signup attempted:', cleanedData);
        alert('Account created successfully! (This is a demo)');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };
  // Social auth handlers (mock)

  const handleSocialAuth = (provider) => {
    console.log(`${provider} authentication attempted`);
    alert(`${provider} authentication (This is a demo)`);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'lecturer',
      rememberMe: false,
      agreeToTerms: false,
    });
    setErrors({});
    setPasswordStrength(0);
  };

  return (
    <div className="relative flex items-center justify-center p-4 w-full min-h-screen">
      {/* content */}

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
            <FaGraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join Vigilo'}
          </h1>
          <p className="text-gray-300">
            {isLogin
              ? 'Sign in to your account to continue'
              : 'Create your account to get started'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <div className="space-y-6">
            {!isLogin && (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="John"
                    onChange={handleInputChange}
                    error={errors.firstName}
                    icon={FaUser}
                  />

                  <FormInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Doe"
                    onChange={handleInputChange}
                    error={errors.lastName}
                    icon={FaUser}
                  />
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <RadioCard
                      icon={FaGraduationCap}
                      label="Student"
                      value="student"
                      selectedValue={formData.userType}
                      onChange={handleInputChange}
                      name="userType"
                    />

                    <RadioCard
                      icon={FaUserTie}
                      label="Lecturer"
                      value="lecturer"
                      selectedValue={formData.userType}
                      onChange={handleInputChange}
                      name="userType"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <FormInput
              label="Email Address"
              name="email"
              value={formData.email}
              placeholder="john@example.com"
              onChange={handleInputChange}
              error={errors.email}
              icon={FaEnvelope}
            />

            {/* Password */}
            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              showStrength={!isLogin}
              passwordStrength={passwordStrength}
            />

            {!isLogin && (
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                matchWith={formData.password}
                showMatchStatus={true}
              />
            )}

            {/* Remember Me / Terms */}
            <div className="space-y-3">
              {isLogin ? (
                <LabelCheckbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}>
                  Remember me
                </LabelCheckbox>
              ) : (
                <LabelCheckbox
                  name="agreeToTerms"
                  onChange={handleInputChange}
                  checked={formData.agreeToTerms}>
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 underline">
                    Privacy Policy
                  </a>
                </LabelCheckbox>
              )}
              {errors.agreeToTerms && (
                <p className="text-red-400 text-sm flex items-center">
                  <FaExclamationCircle className="w-3 h-3 mr-1" />
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
            {isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <RadioCard
                    icon={FaGraduationCap}
                    label="Student"
                    value="student"
                    selectedValue={formData.userType}
                    onChange={handleInputChange}
                    name="userType"
                  />

                  <RadioCard
                    icon={FaUserTie}
                    label="Lecturer"
                    value="lecturer"
                    selectedValue={formData.userType}
                    onChange={handleInputChange}
                    name="userType"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              {loading ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin w-5 h-5 mr-2" />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-900 px-4 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex">
            <button
              onClick={() => handleSocialAuth('Google')}
              className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200 transform hover:scale-[1.02] w-full">
              <FaGoogle className="w-5 h-5 mr-2 text-red-400" />
              Google
            </button>
          </div>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={switchMode}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
