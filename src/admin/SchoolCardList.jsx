import React, { useEffect } from 'react';
import SchoolCard from './SchoolCard';
import { useSchoolStore } from '../stores/schoolStore';

const SchoolCardList = ({ onAction }) => {
  const { schools, loading, error, fetchSchools } = useSchoolStore();

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  if (loading) return <p>Loading schools...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="school-list">
      {schools.map((school) => (
        <SchoolCard
          key={school._id}
          school={school}
          onAction={(schId) => onAction(schId)}
        />
      ))}
    </div>
  );
};

export default SchoolCardList;
