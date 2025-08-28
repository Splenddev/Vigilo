const getSessionTypeColor = (type) => {
  switch (type) {
    case 'lecture':
      return 'bg-blue-100 text-primary-purple-dark';
    case 'lab':
      return 'bg-purple-100 text-purple-800';
    case 'seminar':
      return 'bg-primary-cyan-light text-gray-600';
    case 'workshop':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export { getSessionTypeColor };
