// hooks/useSharedView.js
import { useLocation } from 'react-router-dom';

export const useSharedView = (propShared = false) => {
  const { search } = useLocation();
  const isQueryShared = new URLSearchParams(search).get('shared') === 'true';
  return propShared || isQueryShared;
};
