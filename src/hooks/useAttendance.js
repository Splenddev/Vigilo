const getSessionTypeColor = (type) => {
  switch (type) {
    case 'lecture':
      return 'bg-blue-100 text-blue-800';
    case 'lab':
      return 'bg-purple-100 text-purple-800';
    case 'seminar':
      return 'bg-indigo-100 text-indigo-800';
    case 'workshop':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export { getSessionTypeColor };
