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
  mathematics: 'MAT',
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

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const generateGroupName = ({ faculty, department, level, courseCode }) => {
  const parts = [];

  if (courseCode) parts.push(courseCode);
  if (faculty) parts.push(faculty);
  if (department && level) {
    parts.push(`${department} ${level} level`);
  } else if (department) {
    parts.push(department);
  }

  if (courseCode && parts.length > 1) {
    return `${courseCode}- ${parts.slice(1).join(', ')}`;
  }

  return parts.join(', ');
};

const generateGroupNameSuggestions = ({
  faculty,
  department,
  level,
  courseCode,
}) => {
  const suggestions = [];
  if (!department && !courseCode) return suggestions;

  const shortLevel = level ? `${level}L` : null;
  const longLevel = level ? `${level} level` : null;

  // 1. Strict main
  if (courseCode && department && level && faculty) {
    suggestions.push(`${courseCode}- ${faculty},  ${department} ${longLevel}`);
    suggestions.push(`${courseCode}- ${department} ${shortLevel}, ${faculty}`);
    suggestions.push(`${courseCode}- ${department} ${longLevel}`);
    suggestions.push(`${courseCode}- ${faculty}, ${department} ${shortLevel}`);
  }

  // 2. Without faculty
  if (courseCode && department && level) {
    suggestions.push(`${courseCode}- ${department} ${shortLevel}`);
    suggestions.push(`${courseCode}- Class of ${department} – ${longLevel}`);
  }

  // 3. Faculty heavy
  if (courseCode && faculty && department) {
    suggestions.push(`${courseCode}- ${faculty} – ${department}`);
    suggestions.push(`${courseCode}- ${faculty}, ${department}`);
  }

  // 4. Fallbacks if courseCode missing
  if (!courseCode && department && level) {
    suggestions.push(`${department} ${longLevel}`);
    if (faculty) suggestions.push(`${faculty} ${department} ${shortLevel}`);
  }

  // Deduplicate
  return [...new Set(suggestions.filter(Boolean))];
};

const catenateName = (name = '') => {
  const [first, last] = name.split(' ');
  const result = first.split('')[0] + last.split('')[0];
  return result.toUpperCase();
};

const toggleState = (key, setState, exclusive = false) => {
  setState((prev) => {
    if (typeof prev === 'boolean') {
      // single toggle (e.g. isOpen)
      return !prev;
    }

    if (Array.isArray(prev)) {
      if (exclusive) {
        // allow only one active
        return prev.includes(key) ? [] : [key];
      }
      // multiple active allowed
      return prev.includes(key)
        ? prev.filter((id) => id !== key)
        : [...prev, key];
    }

    if (typeof prev === 'object') {
      if (exclusive) {
        // turn off all others, toggle only this one
        return Object.keys(prev).reduce(
          (acc, id) => ({
            ...acc,
            [id]: id === key ? !prev[key] : false,
          }),
          {}
        );
      }
      // independent toggles
      return {
        ...prev,
        [key]: !prev[key],
      };
    }

    return prev;
  });
};

export {
  shortenDept,
  checkPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
  formatDate,
  formatTime,
  toggleState,
  generateGroupName,
  generateGroupNameSuggestions,
  catenateName,
};
