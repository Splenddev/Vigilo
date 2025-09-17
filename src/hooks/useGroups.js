import useGroupStore from '../stores/groupStore';

export const useGroups = () => {
  const { groups, loading, error, fetchGroups } = useGroupStore();
  return { groups, loading, error, fetchGroups };
};

export const useCreateGroup = () => {
  const { createGroup, loading, error } = useGroupStore();
  return { createGroup, loading, error };
};

export const useUploadRoster = () => {
  const { uploadRoster, loading, error } = useGroupStore();
  return { uploadRoster, loading, error };
};

export const useGroupAssign = () => {
  const { autoAssign, loading, error } = useGroupStore();
  return { autoAssign, loading, error };
};
