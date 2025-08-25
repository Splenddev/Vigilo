// Dictionary of official/common abbreviations
const deptAbbreviations = {
  biochemistry: 'BCH',
  'industrial chemistry': 'ICH',
  chemistry: 'CHM',
  biology: 'BIO',
  accounting: 'ACC',
  'computer science': 'CSC',
  'mechanical engineering': 'MEE',
  'electrical engineering': 'EEE',
  mathematics: 'MTH',
  microbiology: 'MCB',
  physics: 'PHY',
  statistics: 'STA',
  economics: 'ECO',
};

// Main function
function shortenDept(name) {
  if (!name) return '';

  const normalized = name.trim().toLowerCase();

  // 1. Try dictionary first
  if (deptAbbreviations[normalized]) {
    return deptAbbreviations[normalized];
  }

  // 2. Try multi-word abbreviation (first letters)
  const words = normalized.split(/\s+/);
  if (words.length > 1) {
    return words
      .map((w) => w[0].toUpperCase())
      .join('')
      .slice(0, 3);
  }

  // 3. Single-word fallback → first 3 letters
  return normalized.slice(0, 3).toUpperCase();
}

const checkPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const getPasswordStrengthColor = (passwordStrength) => {
  if (passwordStrength <= 1) return 'bg-red-500';
  if (passwordStrength <= 2) return 'bg-orange-500';
  if (passwordStrength <= 3) return 'bg-yellow-500';
  if (passwordStrength <= 4) return 'bg-blue-500';
  return 'bg-green-500';
};

const getPasswordStrengthText = (passwordStrength) => {
  if (passwordStrength <= 1) return 'Very Weak';
  if (passwordStrength <= 2) return 'Weak';
  if (passwordStrength <= 3) return 'Fair';
  if (passwordStrength <= 4) return 'Good';
  return 'Strong';
};

export {
  shortenDept,
  checkPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
};
