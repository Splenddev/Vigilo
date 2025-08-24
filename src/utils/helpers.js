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

export { shortenDept };
