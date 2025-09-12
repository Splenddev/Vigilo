import { emailRegex, matricNoRegex } from '../../utils/regex';

export const validateForm = (formData, isLogin) => {
  const newErrors = {};

  // Email validation (all roles)
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  // Password validation (all roles)
  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (!isLogin && formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters long';
  }

  if (!isLogin) {
    // Shared for both student/lecturer/admin → basic identity
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (formData.role === 'student') {
      // Student-specific validation
      if (!matricNoRegex.test(formData.matricNumber)) {
        newErrors.matricNumber = 'Please enter a valid matric number';
      }
      if (!formData.department) {
        newErrors.department = 'Department is required';
      }
      if (!formData.faculty) {
        newErrors.faculty = 'Faculty is required';
      }
      if (!formData.level) {
        newErrors.level = 'Level is required';
      }
    }

    if (formData.role === 'lecturer') {
      // Lecturer-specific validation
      if (!formData.department) {
        newErrors.department = 'Department is required';
      }
      if (!formData.faculty) {
        newErrors.faculty = 'Faculty is required';
      }
      // (No matric or level for lecturers)
    }

    if (formData.role !== 'admin') {
      if (!formData.schoolId) {
        newErrors.schoolId = 'Please select a school';
      }
    }
    if (formData.role === 'admin') {
      // Admin-specific validation
      // Only needs firstName, lastName, email, password → already covered above
      // So no extra checks here
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

  return newErrors;
};
