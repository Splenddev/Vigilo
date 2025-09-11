import { useEffect } from 'react';
import { useSchoolStore } from '../stores/schoolStore';

export const useSchools = () => {
  const { schools, fetchSchools, createSchool, loading, error } =
    useSchoolStore();

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  return {
    schools,
    createSchool,
    loading,
    error,
  };
};
