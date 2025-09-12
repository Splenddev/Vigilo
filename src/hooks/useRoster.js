import rosterStore from '../stores/rosterStore';

const useRoster = () => {
  const {
    rosters,
    activeRoster,
    loading,
    error,
    fetchRosters,
    fetchRosterById,
    createRoster,
    deleteRoster,
  } = rosterStore();

  return {
    rosters,
    activeRoster,
    loading,
    error,
    fetchRosters,
    fetchRosterById,
    createRoster,
    deleteRoster,
  };
};

export default useRoster;
